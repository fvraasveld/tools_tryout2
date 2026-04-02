import React, { useRef, useEffect, useState, useCallback } from 'react';
import Atrament from 'atrament';
import { PDFDocument } from 'pdf-lib';
import changeDpiDataUrl from 'changedpi';

type NotepadMode = 'docked' | 'floating' | 'fullscreen' | 'hidden';
type BgPattern   = 'white' | 'cream' | 'dark' | 'lines' | 'wide-lines' | 'grid' | 'dot-grid' | 'dots' | 'graph' | 'isometric' | 'blank';
type ExportFmt   = 'png' | 'jpeg' | 'pdf' | 'tiff';

const MODE_KEY   = 'qt-np-mode-v4';
const SAVES_KEY  = 'qt-np-saves-v4';
const CANVAS_KEY = 'qt-np-canvas-v4';
const FLOAT_KEY  = 'qt-np-float-v4';

interface SaveSlot { id: number; name: string; data: string; date: string; }

const BG_OPTIONS: { key: BgPattern; label: string }[] = [
  { key: 'white',      label: 'White'       },
  { key: 'cream',      label: 'Cream'       },
  { key: 'dark',       label: 'Dark'        },
  { key: 'blank',      label: 'Transparent' },
  { key: 'lines',      label: 'Lines'       },
  { key: 'wide-lines', label: 'Wide Lines'  },
  { key: 'grid',       label: 'Grid'        },
  { key: 'graph',      label: 'Graph'       },
  { key: 'dot-grid',   label: 'Dot Grid'    },
  { key: 'dots',       label: 'Dots'        },
  { key: 'isometric',  label: 'Isometric'   },
];

export default function PersistentNotepad() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef  = useRef<HTMLCanvasElement>(null);
  const atrRef       = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const saveTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mode,      setMode]      = useState<NotepadMode>(() => (localStorage.getItem(MODE_KEY) as NotepadMode) || 'docked');
  const [color,     setColor]     = useState('#1a1a1a');
  const [size,      setSize]      = useState(2);
  const [tool,      setTool]      = useState<'draw' | 'eraser' | 'fill'>('draw');
  const [penType,   setPenType]   = useState('pen');
  const [bgPattern, setBgPattern] = useState<BgPattern>('white');
  const [bgColor,   setBgColor]   = useState('#ffffff');
  const [history,   setHistory]   = useState<string[]>([]);
  const [histIdx,   setHistIdx]   = useState(-1);
  const histRef    = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const [colors,    setColors]    = useState(['#1a1a1a','#ffffff','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899']);
  const [showCPick, setShowCPick] = useState(false);
  const [tempColor, setTempColor] = useState('#1a1a1a');
  const [saves,     setSaves]     = useState<SaveSlot[]>(() => { try { return JSON.parse(localStorage.getItem(SAVES_KEY) || '[]'); } catch { return []; } });
  const [showSaves, setShowSaves] = useState(false);
  const [showExport,setShowExport]= useState(false);
  const [showBgMenu,setShowBgMenu]= useState(false);
  const [floatPos,  setFloatPos]  = useState<{ x: number; y: number }>(() => { try { return JSON.parse(localStorage.getItem(FLOAT_KEY) || 'null') || { x: 20, y: 80 }; } catch { return { x: 20, y: 80 }; } });
  const [isDragWin, setIsDragWin] = useState(false);
  const [dragOff,   setDragOff]   = useState({ x: 0, y: 0 });

  const pens: Record<string, { label: string; smoothing: number; adaptive: boolean; weight: number; opacity: number }> = {
    pen:         { label: 'Pen',    smoothing: 0.85, adaptive: true,  weight: 1,   opacity: 1    },
    pencil:      { label: 'Pencil', smoothing: 0.5,  adaptive: true,  weight: 1.5, opacity: 0.7  },
    marker:      { label: 'Marker', smoothing: 0.9,  adaptive: false, weight: 1.3, opacity: 0.6  },
    brush:       { label: 'Brush',  smoothing: 0.95, adaptive: true,  weight: 2,   opacity: 0.85 },
    highlighter: { label: 'H/L',    smoothing: 0.7,  adaptive: false, weight: 5,   opacity: 0.3  },
  };

  const getSize = useCallback((): { w: number; h: number } => {
    if (mode === 'fullscreen') return { w: window.innerWidth - 32, h: window.innerHeight - 140 };
    if (mode === 'floating')   return { w: 400, h: 280 };
    return { w: Math.min((containerRef.current?.clientWidth || 960) - 32, 1024), h: 240 };
  }, [mode]);

  const getBgFill = (p: BgPattern, c: string) =>
    p === 'dark' ? '#1e1e2e' : p === 'cream' ? '#fdf6e3' : p === 'blank' ? 'transparent' : c;

  const drawBg = useCallback(() => {
    const bgc = bgCanvasRef.current; if (!bgc) return;
    const ctx = bgc.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const w = bgc.width / dpr, h = bgc.height / dpr;
    ctx.clearRect(0, 0, w, h);
    if (bgPattern !== 'blank') { ctx.fillStyle = getBgFill(bgPattern, bgColor); ctx.fillRect(0, 0, w, h); }
    const dark = bgPattern === 'dark';
    const lc = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)';
    const dc = dark ? 'rgba(255,255,255,0.2)'  : 'rgba(0,0,0,0.2)';
    if (bgPattern === 'lines')      { ctx.strokeStyle=lc; ctx.lineWidth=0.8; for(let y=28;y<h;y+=28){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();} }
    else if (bgPattern === 'wide-lines') { ctx.strokeStyle=lc; ctx.lineWidth=0.8; for(let y=44;y<h;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();} }
    else if (bgPattern === 'grid')  { ctx.strokeStyle=lc; ctx.lineWidth=0.7; for(let x=24;x<w;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=24;y<h;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();} }
    else if (bgPattern === 'graph') {
      ctx.strokeStyle=dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'; ctx.lineWidth=0.5;
      for(let x=8;x<w;x+=8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=8;y<h;y+=8){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
      ctx.strokeStyle=dark?'rgba(255,255,255,0.12)':'rgba(0,0,0,0.12)'; ctx.lineWidth=0.8;
      for(let x=40;x<w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=40;y<h;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    }
    else if (bgPattern === 'dot-grid') { for(let x=24;x<w;x+=24) for(let y=24;y<h;y+=24){ctx.beginPath();ctx.arc(x,y,1.2,0,Math.PI*2);ctx.fillStyle=dc;ctx.fill();} }
    else if (bgPattern === 'dots')     { for(let x=18;x<w;x+=18) for(let y=18;y<h;y+=18){ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fillStyle=dc;ctx.fill();} }
    else if (bgPattern === 'isometric') {
      const s=24; ctx.strokeStyle=lc; ctx.lineWidth=0.7;
      for(let x=-h;x<w+h;x+=s){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+h,h);ctx.stroke(); ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x-h,h);ctx.stroke();}
      for(let y=0;y<h;y+=s*0.866){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    }
  }, [bgPattern, bgColor]);

  const autosave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const c = canvasRef.current; if (!c) return;
      try { localStorage.setItem(CANVAS_KEY, c.toDataURL('image/png', 0.85)); } catch {}
    }, 600);
  }, []);

  const pushHistory = useCallback((dataUrl: string) => {
    const newHist = [...histRef.current.slice(0, histIdxRef.current + 1), dataUrl].slice(-40);
    histRef.current = newHist;
    histIdxRef.current = newHist.length - 1;
    setHistory([...newHist]);
    setHistIdx(newHist.length - 1);
  }, []);

  const saveHistory = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    pushHistory(c.toDataURL('image/png', 0.85));
    autosave();
  }, [pushHistory, autosave]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current, bgCanvas = bgCanvasRef.current;
    if (!canvas || !bgCanvas) return;
    const { w, h } = getSize();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;   canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    bgCanvas.width = w * dpr; bgCanvas.height = h * dpr;
    bgCanvas.style.width = `${w}px`; bgCanvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d', { desynchronized: true })!;
    ctx.scale(dpr, dpr);
    bgCanvas.getContext('2d')!.scale(dpr, dpr);
    if (atrRef.current) { try { atrRef.current.destroy(); } catch {} }
    const cfg = pens[penType];
    const a = new Atrament(canvas, { width: w, height: h, color, weight: size * cfg.weight, smoothing: cfg.smoothing, adaptiveStroke: cfg.adaptive });
    a.opacity = cfg.opacity; a.recordStrokes = false; atrRef.current = a;
    drawBg();
    const saved = localStorage.getItem(CANVAS_KEY);
    if (saved) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, w, h); img.src = saved; }
    a.addEventListener('strokeend', () => setTimeout(saveHistory, 50));
    const noScroll = (e: TouchEvent) => { if (e.target === canvas) e.preventDefault(); };
    document.addEventListener('touchmove', noScroll, { passive: false });
    return () => document.removeEventListener('touchmove', noScroll);
  }, [mode]); // eslint-disable-line

  useEffect(() => { const cleanup = initCanvas(); return cleanup; }, [mode]);
  useEffect(() => drawBg(), [bgPattern, bgColor]);
  useEffect(() => {
    const a = atrRef.current; if (!a) return;
    const cfg = pens[penType];
    a.color = color; a.weight = size * cfg.weight; a.smoothing = cfg.smoothing;
    a.adaptiveStroke = cfg.adaptive; a.opacity = cfg.opacity;
    a.mode = tool === 'eraser' ? 'erase' : tool === 'fill' ? 'fill' : 'draw';
  }, [color, size, tool, penType]);
  useEffect(() => localStorage.setItem(MODE_KEY, mode), [mode]);
  useEffect(() => localStorage.setItem(FLOAT_KEY, JSON.stringify(floatPos)), [floatPos]);

  const restoreFromDataUrl = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    // Use raw pixel dimensions — avoids any ambiguity about context transform state
    const cw = canvas.width, ch = canvas.height;
    const img = new Image();
    img.onload = () => {
      // Get a fresh unscaled context by resetting transform temporarily
      const ctx = canvas.getContext('2d')!;
      // Save/restore the current transform (dpr scale)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset to identity
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, cw, ch); // draw at raw pixel size
      ctx.restore();
    };
    img.src = dataUrl;
  }, []);

  const undo = () => {
    if (histIdxRef.current <= 0) return;
    histIdxRef.current--;
    setHistIdx(histIdxRef.current);
    const src = histRef.current[histIdxRef.current];
    if (src) restoreFromDataUrl(src);
  };

  const redo = () => {
    if (histIdxRef.current >= histRef.current.length - 1) return;
    histIdxRef.current++;
    setHistIdx(histIdxRef.current);
    const src = histRef.current[histIdxRef.current];
    if (src) restoreFromDataUrl(src);
  };

  const clear = () => {
    if (!confirm('Clear the notepad?')) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d')!;
    ctx.save(); ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    localStorage.removeItem(CANVAS_KEY);
    saveHistory();
  };

  // Build merged (bg + drawing) at raw DPR pixel dimensions
  const buildMerge = (): HTMLCanvasElement | null => {
    const c = canvasRef.current, bgc = bgCanvasRef.current;
    if (!c || !bgc) return null;
    const m = document.createElement('canvas');
    m.width = c.width; m.height = c.height; // raw DPR pixels
    const ctx = m.getContext('2d')!;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.width, m.height); // white base for JPEG
    if (bgPattern !== 'blank') ctx.drawImage(bgc, 0, 0);
    ctx.drawImage(c, 0, 0);
    return m;
  };

  const triggerDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const exportImg = async (fmt: ExportFmt) => {
    setShowExport(false);
    const m = buildMerge();
    if (!m) { alert('Draw something first!'); return; }

    if (fmt === 'pdf') {
      try {
        const { w, h } = getSize();
        const b64 = m.toDataURL('image/png', 1.0).split(',')[1];
        const doc = await PDFDocument.create();
        const pdfImg = await doc.embedPng(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));
        const pw = 595, ph = Math.round(pw * (h / w));
        const page = doc.addPage([pw, ph]);
        page.drawImage(pdfImg, { x: 0, y: 0, width: pw, height: ph });
        const bytes = await doc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        triggerDownload(URL.createObjectURL(blob), `notepad-${Date.now()}.pdf`);
      } catch { alert('PDF export failed.'); }
      return;
    }

    if (fmt === 'png' || fmt === 'tiff') {
      const rawUrl = m.toDataURL('image/png', 1.0);
      // changeDpiDataUrl may return falsy on some browsers - fall back to raw url
      const dpiUrl = changeDpiDataUrl(rawUrl, 300) || rawUrl;
      triggerDownload(dpiUrl, `notepad-300dpi-${Date.now()}.${fmt === 'tiff' ? 'tif' : 'png'}`);
      return;
    }

    if (fmt === 'jpeg') {
      const raw = m.toDataURL('image/jpeg', 0.95);
      const binary = atob(raw.split(',')[1]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      // Inject 300 DPI into JFIF APP0 header
      // JFIF structure: FF D8 | FF E0 | len(2) | JFIF\0 | ver(2) | units(1) | Xdpi(2) | Ydpi(2)
      // Byte offsets: 0=FF,1=D8,2=FF,3=E0,4=len_hi,5=len_lo,6=J,7=F,8=I,9=F,10=\0,11=ver_maj,12=ver_min,13=units,14=Xhi,15=Xlo,16=Yhi,17=Ylo
      if (bytes[2] === 0xFF && bytes[3] === 0xE0 && bytes[6] === 0x4A) {
        bytes[13] = 1;       // units: 1 = DPI (dots per inch)
        bytes[14] = 1;       // Xdensity high byte (300 = 0x012C)
        bytes[15] = 44;      // Xdensity low byte
        bytes[16] = 1;       // Ydensity high byte
        bytes[17] = 44;      // Ydensity low byte
      }
      const url = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
      triggerDownload(url, `notepad-300dpi-${Date.now()}.jpg`);
      return;
    }
  };

  const saveSlot = () => {
    const name = prompt('Save name:'); if (!name) return;
    const m = buildMerge(); if (!m) return;
    const ns: SaveSlot = { id: Date.now(), name, data: m.toDataURL('image/png', 0.8), date: new Date().toLocaleString() };
    const updated = [...saves, ns];
    setSaves(updated);
    localStorage.setItem(SAVES_KEY, JSON.stringify(updated));
  };

  const loadSave = (s: SaveSlot) => {
    setShowSaves(false);
    // The saved data is a merged image at raw DPR pixel dimensions (canvas.width × canvas.height)
    // We draw it back using identity transform to avoid double-scaling
    restoreFromDataUrl(s.data);
    // Delay history push until after draw completes
    setTimeout(() => {
      const c = canvasRef.current; if (!c) return;
      autosave();
      pushHistory(c.toDataURL('image/png', 0.85));
    }, 100);
  };

  const deleteSave = (id: number) => {
    const u = saves.filter(s => s.id !== id);
    setSaves(u); localStorage.setItem(SAVES_KEY, JSON.stringify(u));
  };

  const startDrag = (e: React.MouseEvent) => {
    if (mode !== 'floating') return;
    setIsDragWin(true);
    setDragOff({ x: e.clientX - floatPos.x, y: e.clientY - floatPos.y });
  };
  useEffect(() => {
    if (!isDragWin) return;
    const mv = (e: MouseEvent) => setFloatPos({ x: Math.max(0, Math.min(window.innerWidth - 420, e.clientX - dragOff.x)), y: Math.max(0, Math.min(window.innerHeight - 340, e.clientY - dragOff.y)) });
    const up = () => setIsDragWin(false);
    window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
  }, [isDragWin, dragOff]);

  if (mode === 'hidden') return (
    <div className="flex justify-center py-2 bg-white border-b border-gray-100">
      <button onClick={() => setMode('docked')} className="flex items-center gap-2 px-4 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg font-medium">
        ✏️ Show Notepad
      </button>
    </div>
  );

  const { w, h } = getSize();
  const canUndo = histIdx > 0;
  const canRedo = histIdx < history.length - 1;

  const modeBtns = (
    <div className="flex gap-0.5 ml-auto shrink-0">
      {mode !== 'docked'     && <button onClick={() => setMode('docked')}     className="px-2 py-1 rounded hover:bg-gray-100 text-gray-400 text-xs font-medium">Dock</button>}
      {mode !== 'floating'   && <button onClick={() => setMode('floating')}   className="px-2 py-1 rounded hover:bg-gray-100 text-gray-400 text-xs font-medium">Float</button>}
      {mode !== 'fullscreen' && <button onClick={() => setMode('fullscreen')} className="px-2 py-1 rounded hover:bg-gray-100 text-gray-400 text-xs font-medium">Full</button>}
      <button onClick={() => setMode('hidden')} className="px-2 py-1 rounded hover:bg-gray-100 text-gray-400 text-xs">✕</button>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-1.5 flex-wrap py-0.5">
      <div className="flex gap-0.5 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
        {(['draw', 'eraser', 'fill'] as const).map(t => (
          <button key={t} onClick={() => setTool(t)}
            className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${tool === t ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            {t === 'draw' ? '✏️' : t === 'eraser' ? '⌫' : '🪣'}
          </button>
        ))}
      </div>
      {Object.entries(pens).map(([k, v]) => (
        <button key={k} onClick={() => { setPenType(k); setTool('draw'); }}
          className={`px-2 py-1 rounded text-xs font-semibold ${penType === k && tool === 'draw' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          {v.label}
        </button>
      ))}
      <div className="flex gap-0.5 items-center">
        {colors.map(c => (
          <button key={c} onClick={() => { setColor(c); setTool('draw'); }}
            style={{ background: c, border: color === c && tool === 'draw' ? '2.5px solid #f97316' : c === '#ffffff' ? '1.5px solid #d1d5db' : '2px solid transparent' }}
            className="w-[18px] h-[18px] rounded-full hover:scale-110 transition-transform shrink-0" />
        ))}
        <button onClick={() => setShowCPick(true)} className="w-[18px] h-[18px] rounded-full border-2 border-dashed border-gray-400 text-gray-500 flex items-center justify-center text-[10px] hover:border-primary-400">+</button>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[11px] text-gray-400 w-9 shrink-0">{size}px</span>
        <input type="range" min="1" max="50" value={size} onChange={e => setSize(+e.target.value)} className="w-14 accent-primary-500" />
      </div>
      <div className="flex items-center gap-1">
        <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setBgPattern('white'); }}
          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0" title="Background color" />
        <div className="relative">
          <button onClick={() => { setShowBgMenu(!showBgMenu); setShowSaves(false); setShowExport(false); }}
            className={`px-2 py-1 rounded text-xs font-semibold ${showBgMenu ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Pattern ▾
          </button>
          {showBgMenu && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-2 w-36">
              {BG_OPTIONS.map(o => (
                <button key={o.key} onClick={() => { setBgPattern(o.key); setShowBgMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${bgPattern === o.key ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50 text-gray-700'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button onClick={undo} disabled={!canUndo}
        className={`px-2 py-1 rounded text-xs font-bold ${canUndo ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}>
        ↩ Undo
      </button>
      <button onClick={redo} disabled={!canRedo}
        className={`px-2 py-1 rounded text-xs font-bold ${canRedo ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}>
        ↪ Redo
      </button>
      <button onClick={clear} className="px-2 py-1 rounded text-xs text-gray-500 hover:bg-gray-100 font-medium">Clear</button>
      <button onClick={saveSlot} className="px-2 py-1 rounded text-xs bg-primary-500 text-white hover:bg-primary-600 font-semibold">Save</button>
      <div className="relative">
        <button onClick={() => { setShowSaves(!showSaves); setShowExport(false); setShowBgMenu(false); }}
          className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">
          Load {saves.length > 0 && <span className="ml-0.5 bg-primary-500 text-white rounded-full px-1 text-[9px]">{saves.length}</span>}
        </button>
        {showSaves && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-72 max-h-64 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-500 mb-2">Saved Notes</p>
            {saves.length === 0
              ? <p className="text-xs text-gray-400">No saves yet.</p>
              : saves.map(s => (
                <div key={s.id} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                  <img src={s.data} alt={s.name} className="w-14 h-10 object-cover rounded border border-gray-200 bg-gray-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{s.name}</div>
                    <div className="text-[10px] text-gray-400">{s.date}</div>
                  </div>
                  <button onClick={() => loadSave(s)} className="text-xs px-2 py-1 bg-primary-500 text-white rounded font-semibold hover:bg-primary-600 shrink-0">Load</button>
                  <button onClick={() => deleteSave(s.id)} className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded hover:bg-red-100 shrink-0">Del</button>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="relative">
        <button onClick={() => { setShowExport(!showExport); setShowSaves(false); setShowBgMenu(false); }}
          className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold">
          Download ▾
        </button>
        {showExport && (
          <div className="absolute top-full right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-2 w-40">
            <p className="text-[10px] text-gray-400 px-2 pb-1 font-semibold uppercase tracking-wide">300 DPI</p>
            {(['png', 'jpeg', 'pdf', 'tiff'] as ExportFmt[]).map(fmt => (
              <button key={fmt} onClick={() => exportImg(fmt)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-50 hover:text-primary-700 text-gray-700">
                {fmt.toUpperCase()}{fmt === 'pdf' ? ' (PDF)' : fmt === 'tiff' ? ' (.tif)' : ''}
              </button>
            ))}
          </div>
        )}
      </div>
      {modeBtns}
    </div>
  );

  const colorModal = showCPick && (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/40" onClick={() => setShowCPick(false)}>
      <div className="bg-white rounded-2xl p-6 shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold mb-3">Pick Color</h3>
        <input type="color" value={tempColor} onChange={e => setTempColor(e.target.value)} className="w-full h-14 rounded-lg cursor-pointer border border-gray-200 mb-3" />
        <div className="flex gap-2">
          <button onClick={() => { setColors([...colors, tempColor]); setColor(tempColor); setShowCPick(false); }} className="flex-1 py-2 bg-primary-500 text-white rounded-xl font-semibold text-sm">Add & Use</button>
          <button onClick={() => setShowCPick(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );

  const canvasArea = (
    <div style={{ position: 'relative', width: w, height: h, borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <canvas ref={bgCanvasRef} style={{ position: 'absolute', top: 0, left: 0, width: w, height: h }} />
      <canvas ref={canvasRef}   style={{ position: 'absolute', top: 0, left: 0, width: w, height: h, cursor: tool === 'eraser' ? 'cell' : 'crosshair', touchAction: 'none' }} />
    </div>
  );

  if (mode === 'floating') return (
    <>
      {colorModal}
      <div style={{ position: 'fixed', left: floatPos.x, top: floatPos.y, zIndex: 500, width: w + 24 }} className="bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div onMouseDown={startDrag} style={{ cursor: isDragWin ? 'grabbing' : 'grab' }} className="px-3 pt-2 pb-1 bg-gray-50 border-b border-gray-100 select-none rounded-t-2xl">
          <div className="flex items-center mb-1"><span className="text-xs font-semibold text-gray-500 flex-1">✏️ Quick Notes</span></div>
          {toolbar}
        </div>
        <div className="p-3">{canvasArea}</div>
      </div>
    </>
  );

  if (mode === 'fullscreen') return (
    <>
      {colorModal}
      <div style={{ position: 'fixed', inset: 0, zIndex: 900, background: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div className="px-4 pt-3 pb-2 border-b border-gray-200 bg-white">
          <div className="flex items-center mb-1"><span className="font-semibold text-dark-900 flex-1">Quick Notes</span></div>
          {toolbar}
        </div>
        <div className="flex-1 flex items-stretch p-4">{canvasArea}</div>
      </div>
    </>
  );

  return (
    <>
      {colorModal}
      <div ref={containerRef} className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center mb-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Quick Notes</span>
            <span className="text-[10px] text-gray-300 ml-2">auto-saved · {saves.length} slot{saves.length !== 1 ? 's' : ''} saved</span>
          </div>
          {toolbar}
          <div className="mt-2">{canvasArea}</div>
        </div>
      </div>
    </>
  );
}
