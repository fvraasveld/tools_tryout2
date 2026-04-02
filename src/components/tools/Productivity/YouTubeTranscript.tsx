import React, { useState } from 'react';

/**
 * YouTube Transcript Tool
 *
 * Working approach (2025):
 * 1. POST to YouTube's InnerTube /youtubei/v1/player endpoint impersonating Android client
 *    → returns clean JSON with captionTracks[].baseUrl
 * 2. Fetch the caption XML from that baseUrl
 * 3. Parse the XML into plain text
 *
 * All requests go through CORS proxies since YouTube blocks direct browser requests.
 * We try multiple proxies for each step in case one is rate-limited.
 */

const INNERTUBE_BODY = (videoId: string) => ({
  context: {
    client: {
      clientName: 'ANDROID',
      clientVersion: '20.10.38',
      androidSdkVersion: 30,
      userAgent: 'com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip',
      hl: 'en',
      gl: 'US',
    },
  },
  videoId,
});

// Returns raw text through any working CORS proxy
async function proxyGet(url: string, timeoutMs = 12000): Promise<string> {
  const proxies = [
    () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(timeoutMs),
    }).then(async r => {
      if (!r.ok) throw new Error('allorigins ' + r.status);
      const j = await r.json();
      return j.contents as string;
    }),
    () => fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(timeoutMs),
    }).then(r => {
      if (!r.ok) throw new Error('corsproxy ' + r.status);
      return r.text();
    }),
    () => fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(timeoutMs),
    }).then(r => {
      if (!r.ok) throw new Error('codetabs ' + r.status);
      return r.text();
    }),
  ];

  const errors: string[] = [];
  for (const fn of proxies) {
    try {
      const text = await fn();
      if (text && text.length > 20) return text;
    } catch (e: any) {
      errors.push(e.message);
    }
  }
  throw new Error('All GET proxies failed: ' + errors.join(' | '));
}

// POST through CORS proxy — needed for InnerTube API
async function proxyPost(url: string, body: object, timeoutMs = 12000): Promise<any> {
  const bodyStr = JSON.stringify(body);

  const attempts = [
    // corsproxy.io supports POST
    () => fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
      signal: AbortSignal.timeout(timeoutMs),
    }).then(r => {
      if (!r.ok) throw new Error('corsproxy POST ' + r.status);
      return r.json();
    }),
    // allorigins raw POST via encoded URL is not supported for POST, so skip
    // Try direct (works if CORS allows — unlikely but worth trying)
    () => fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
      signal: AbortSignal.timeout(timeoutMs),
    }).then(r => {
      if (!r.ok) throw new Error('direct POST ' + r.status);
      return r.json();
    }),
  ];

  const errors: string[] = [];
  for (const fn of attempts) {
    try {
      const data = await fn();
      if (data && typeof data === 'object') return data;
    } catch (e: any) {
      errors.push(e.message);
    }
  }
  throw new Error('All POST attempts failed: ' + errors.join(' | '));
}

// Parse YouTube transcript XML → plain text
function parseXml(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const nodes = doc.getElementsByTagName('text');
  const lines: string[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const raw = nodes[i].textContent || '';
    const decoded = raw
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n/g, ' ')
      .trim();
    if (decoded) lines.push(decoded);
  }
  return lines.join(' ');
}

// Parse json3 format (alternative transcript format)
function parseJson3(data: any): string {
  const events: any[] = data?.events || [];
  return events
    .filter(e => e.segs)
    .flatMap(e => e.segs.map((s: any) => (s.utf8 || '').replace(/\n/g, ' ')))
    .filter(t => t.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = input.trim().match(p);
    if (m) return m[1];
  }
  return null;
}

const YouTubeTranscript: React.FC = () => {
  const [url, setUrl]               = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading]       = useState(false);
  const [status, setStatus]         = useState('');
  const [error, setError]           = useState('');
  const [copied, setCopied]         = useState(false);

  const fetchTranscript = async () => {
    setError('');
    setTranscript('');
    setLoading(true);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) throw new Error('Invalid YouTube URL. Please paste a valid link.');

      // ── STRATEGY A: InnerTube player API (Android client impersonation) ──
      // This is the most reliable method — impersonating the Android app bypasses
      // many of YouTube's restrictions and returns a clean JSON response
      // with captionTracks embedded directly.
      setStatus('Calling YouTube player API…');

      let captionTracks: any[] | null = null;
      let apiKey = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'; // public innertube key

      try {
        const playerUrl = `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`;
        const playerData = await proxyPost(playerUrl, INNERTUBE_BODY(videoId), 15000);
        const tracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (tracks && tracks.length > 0) {
          captionTracks = tracks;
        }
      } catch (e: any) {
        setStatus('InnerTube API failed, trying page scrape…');
      }

      // ── STRATEGY B: Scrape watch page HTML and extract captionTracks JSON ──
      // Fallback if InnerTube POST fails through proxies
      if (!captionTracks) {
        setStatus('Fetching video page…');
        try {
          const html = await proxyGet(`https://www.youtube.com/watch?v=${videoId}`, 15000);

          // Check for consent/bot page
          if (html.includes('consent.youtube.com') || html.includes('Before you continue')) {
            setStatus('Proxy returned consent page, trying alternative…');
            throw new Error('consent');
          }

          // Extract INNERTUBE_API_KEY if present (update the key)
          const keyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
          if (keyMatch) apiKey = keyMatch[1];

          // Method 1: Extract captionTracks using JSON.parse on the full playerCaptionsTracklistRenderer block
          // Pattern: "captionTracks":[{...}] — we need the full array as valid JSON
          const ctMatch = html.match(/"captionTracks":(\[[\s\S]*?\]),"audioTracks"/);
          if (ctMatch) {
            try {
              captionTracks = JSON.parse(ctMatch[1]);
            } catch {}
          }

          // Method 2: More permissive regex for captionTracks
          if (!captionTracks || captionTracks.length === 0) {
            const ct2 = html.match(/"captionTracks":\s*(\[.*?\])\s*,\s*"(?:audioTracks|isTranslatable)"/s);
            if (ct2) {
              try { captionTracks = JSON.parse(ct2[1]); } catch {}
            }
          }

          // Method 3: Extract individual baseUrl entries using regex
          if (!captionTracks || captionTracks.length === 0) {
            const urlPattern = /"baseUrl":"(https:\/\/www\.youtube\.com\/api\/timedtext[^"]+)"/g;
            const langPattern = /"languageCode":"([^"]+)"/g;
            const urlMatches = [...html.matchAll(/"baseUrl":"(https:\\\/\\\/www\.youtube\.com\\\/api\\\/timedtext[^"]+)"/g)];

            if (urlMatches.length > 0) {
              captionTracks = urlMatches.map(m => ({
                baseUrl: m[1].replace(/\\\//g, '/').replace(/\\u0026/g, '&').replace(/\\n/g, ''),
                languageCode: 'unknown',
              }));
            } else {
              // unescaped version
              const urlMatches2 = [...html.matchAll(urlPattern)];
              if (urlMatches2.length > 0) {
                captionTracks = urlMatches2.map(m => ({
                  baseUrl: m[1].replace(/\\u0026/g, '&'),
                  languageCode: 'unknown',
                }));
              }
            }
          }

          // If we got an API key from the page, retry InnerTube with the fresh key
          if (!captionTracks && keyMatch) {
            setStatus('Retrying with fresh API key…');
            try {
              const playerUrl2 = `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`;
              const pd2 = await proxyPost(playerUrl2, INNERTUBE_BODY(videoId), 12000);
              const tracks2 = pd2?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
              if (tracks2 && tracks2.length > 0) captionTracks = tracks2;
            } catch {}
          }

        } catch (e: any) {
          if (e.message !== 'consent') {
            setStatus('Page fetch failed, trying direct timedtext…');
          }
        }
      }

      // ── STRATEGY C: Direct timedtext API with known language codes ──
      // Last resort — sometimes works without needing to discover the URL first
      if (!captionTracks || captionTracks.length === 0) {
        setStatus('Trying direct caption API…');
        for (const lang of ['en', 'a.en', 'en-US', 'en-GB']) {
          for (const fmt of ['json3', '']) {
            const fmtParam = fmt ? `&fmt=${fmt}` : '';
            const timedUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=${lang}${fmtParam}`;
            try {
              const raw = await proxyGet(timedUrl, 8000);
              if (!raw || raw.length < 30) continue;
              if (fmt === 'json3' && raw.trim().startsWith('{')) {
                const t = parseJson3(JSON.parse(raw));
                if (t.length > 30) { setTranscript(t); return; }
              }
              if (raw.includes('<text')) {
                const t = parseXml(raw);
                if (t.length > 30) { setTranscript(t); return; }
              }
            } catch { continue; }
          }
        }
        throw new Error(
          'Could not retrieve captions for this video.\n\n' +
          'Make sure the video has CC captions enabled on YouTube.\n' +
          'If it does, the CORS proxies may be temporarily rate-limited — please wait 1–2 minutes and try again.'
        );
      }

      // ── Fetch the actual transcript from the best captionTrack ──
      // Sort: prefer English, then auto-generated English, then anything
      const sorted = [...captionTracks].sort((a, b) => {
        const aCode = (a.languageCode || '').toLowerCase();
        const bCode = (b.languageCode || '').toLowerCase();
        const score = (code: string) => code === 'en' ? 3 : code.startsWith('en') ? 2 : code === 'a.en' ? 1 : 0;
        return score(bCode) - score(aCode);
      });

      for (const track of sorted) {
        const rawBaseUrl: string = track.baseUrl || '';
        // Decode any JSON-escaped characters in the URL
        const baseUrl = rawBaseUrl
          .replace(/\\u0026/g, '&')
          .replace(/\\\//g, '/')
          .replace(/\\n/g, '')
          .replace(/&fmt=\w+$/,''); // remove any existing fmt param

        if (!baseUrl || !baseUrl.includes('timedtext')) continue;

        setStatus(`Downloading ${track.languageCode || ''} captions…`);

        // Try json3 first (cleaner format)
        try {
          const raw = await proxyGet(baseUrl + '&fmt=json3', 10000);
          if (raw.trim().startsWith('{')) {
            const t = parseJson3(JSON.parse(raw));
            if (t.length > 30) { setTranscript(t); return; }
          }
        } catch {}

        // Try plain XML
        try {
          const raw = await proxyGet(baseUrl, 10000);
          if (raw.includes('<text')) {
            const t = parseXml(raw);
            if (t.length > 30) { setTranscript(t); return; }
          }
        } catch {}
      }

      throw new Error(
        'Found caption tracks but could not download them.\n' +
        'The CORS proxies may be rate-limited — please try again in a minute.'
      );

    } catch (err: any) {
      setError(err?.message || 'Unexpected error. Please try again.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([transcript], { type: 'text/plain' }));
    a.download = `transcript-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const words = transcript.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">
          YouTube Transcript Generator
        </h2>
        <p className="text-dark-600">
          Extract captions from any YouTube video. The video must have CC captions enabled.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-dark-700">YouTube URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && url.trim() && !loading && fetchTranscript()}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={fetchTranscript}
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 font-semibold whitespace-nowrap"
          >
            {loading ? 'Working…' : 'Get Transcript'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
          <p className="text-blue-700 text-sm font-medium">{status || 'Fetching transcript…'}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 font-semibold text-sm mb-1">Error</p>
          <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
        </div>
      )}

      {transcript && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-dark-700">
              Transcript{' '}
              <span className="font-normal text-dark-400">({words.toLocaleString()} words)</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
              <button
                onClick={download}
                className="px-4 py-2 bg-gray-100 text-dark-700 rounded-lg text-sm font-semibold hover:bg-gray-200"
              >
                Download .txt
              </button>
            </div>
          </div>
          <textarea
            value={transcript}
            readOnly
            rows={18}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm"
            style={{ resize: 'vertical' }}
          />
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-700 text-sm font-semibold">✓ Transcript extracted</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Paste any YouTube URL and click "Get Transcript"</li>
          <li>The tool tries multiple methods — may take 10–20 seconds</li>
          <li>Copy the result or download as a .txt file</li>
          <li>Requires CC captions to be available on the video</li>
        </ol>
      </div>
    </div>
  );
};

export default YouTubeTranscript;
