import React, { useState } from 'react';

type InputMode = 'pace_km' | 'pace_mi' | 'speed_kmh' | 'speed_mph' | 'speed_ms';

const RunningPaceConverter: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>('pace_km');
  const [val, setVal]   = useState('');
  const [mins, setMins] = useState('');
  const [secs, setSecs] = useState('');
  const [dist, setDist] = useState('');

  const isPaceMode = inputMode === 'pace_km' || inputMode === 'pace_mi';

  // Get current m/s value
  const toMs = (): number | null => {
    if (isPaceMode) {
      const m = parseInt(mins) || 0;
      const s = parseInt(secs) || 0;
      const totalSecs = m * 60 + s;
      if (totalSecs === 0) return null;
      return inputMode === 'pace_km' ? 1000 / totalSecs : 1609.34 / totalSecs;
    } else {
      const v = parseFloat(val);
      if (!v || v <= 0) return null;
      if (inputMode === 'speed_kmh') return v / 3.6;
      if (inputMode === 'speed_mph') return v * 0.44704;
      return v;
    }
  };

  // Switch mode while KEEPING the equivalent value
  const switchMode = (newMode: InputMode) => {
    const currentMs = toMs();
    setInputMode(newMode);
    if (!currentMs) return;
    const newIsPace = newMode === 'pace_km' || newMode === 'pace_mi';
    if (newIsPace) {
      const secsPerUnit = newMode === 'pace_km' ? 1000 / currentMs : 1609.34 / currentMs;
      const totalRounded = Math.round(secsPerUnit);
      setMins(String(Math.floor(totalRounded / 60)));
      setSecs(String(totalRounded % 60));
    } else {
      let newVal = 0;
      if (newMode === 'speed_kmh') newVal = currentMs * 3.6;
      else if (newMode === 'speed_mph') newVal = currentMs / 0.44704;
      else newVal = currentMs;
      setVal(newVal.toFixed(2));
    }
  };

  const fmtPace = (secsPerUnit: number): string => {
    if (!isFinite(secsPerUnit) || secsPerUnit <= 0) return '—';
    // Use Math.round on total seconds first to avoid 3:60 edge case
    const totalRounded = Math.round(secsPerUnit);
    const m = Math.floor(totalRounded / 60);
    const s = totalRounded % 60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  };

  const ms = toMs();
  const paceKm  = ms ? 1000 / ms    : null;   // seconds per km
  const paceMi  = ms ? 1609.34 / ms : null;   // seconds per mile
  const speedKmh = ms ? ms * 3.6    : null;
  const speedMph = ms ? ms / 0.44704 : null;
  const speedMs  = ms;

  // Race finish times
  const races = [
    { name: '1 km',        dist: 1000      },
    { name: '5 km',        dist: 5000      },
    { name: '10 km',       dist: 10000     },
    { name: 'Half Marathon',dist: 21097.5  },
    { name: 'Marathon',     dist: 42195    },
  ];
  const fmtTime = (secs: number) => {
    const h = Math.floor(secs/3600);
    const m = Math.floor((secs%3600)/60);
    const s = Math.round(secs%60);
    return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };

  // Custom distance finish time
  const customDist = parseFloat(dist);
  const customTime = ms && customDist > 0 ? (customDist * 1000) / ms : null;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 border border-rose-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Running Pace Converter</h2>
        <p className="text-dark-600">Convert between pace (min/km, min/mile) and speed (km/h, mph, m/s). Get race finish time predictions.</p>
      </div>

      {/* Input mode selector */}
      <div className="flex flex-wrap gap-2">
        {([
          ['pace_km',   'min/km'],
          ['pace_mi',   'min/mile'],
          ['speed_kmh', 'km/h'],
          ['speed_mph', 'mph'],
          ['speed_ms',  'm/s'],
        ] as [InputMode, string][]).map(([m, label]) => (
          <button key={m} onClick={() => { setInputMode(m); setVal(''); setMins(''); setSecs(''); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${inputMode===m?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      {isPaceMode ? (
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">
            Pace ({inputMode === 'pace_km' ? 'min:sec per km' : 'min:sec per mile'})
          </label>
          <div className="flex gap-2 items-center">
            <input type="number" value={mins} onChange={e => setMins(e.target.value)} placeholder="5" min="0"
              className="w-24 px-4 py-3 border border-gray-300 rounded-xl text-center text-lg font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            <span className="text-2xl font-bold text-gray-400">:</span>
            <input type="number" value={secs} onChange={e => setSecs(e.target.value)} placeholder="30" min="0" max="59"
              className="w-24 px-4 py-3 border border-gray-300 rounded-xl text-center text-lg font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            <span className="text-sm text-gray-500">{inputMode === 'pace_km' ? 'per km' : 'per mile'}</span>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">
            Speed ({inputMode === 'speed_kmh' ? 'km/h' : inputMode === 'speed_mph' ? 'mph' : 'm/s'})
          </label>
          <input type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="10"
            className="w-48 px-4 py-3 border border-gray-300 rounded-xl text-lg font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
        </div>
      )}

      {ms && (
        <>
          {/* Conversions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Pace (min/km)',   value: paceKm  ? fmtPace(paceKm)            : '—', highlight: inputMode==='pace_km'   },
              { label: 'Pace (min/mile)', value: paceMi  ? fmtPace(paceMi)            : '—', highlight: inputMode==='pace_mi'   },
              { label: 'Speed (km/h)',    value: speedKmh ? speedKmh.toFixed(2)        : '—', highlight: inputMode==='speed_kmh' },
              { label: 'Speed (mph)',     value: speedMph ? speedMph.toFixed(2)        : '—', highlight: inputMode==='speed_mph' },
              { label: 'Speed (m/s)',     value: speedMs  ? speedMs.toFixed(3)         : '—', highlight: inputMode==='speed_ms'  },
            ].map(r => (
              <div key={r.label} className={`rounded-xl p-4 border text-center ${r.highlight ? 'bg-primary-50 border-primary-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`text-xl font-bold ${r.highlight ? 'text-primary-600' : 'text-dark-700'}`}>{r.value}</div>
                <div className="text-xs text-dark-500 mt-1">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Race finish times */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-dark-700">🏁 Projected Race Times</span>
            </div>
            <div className="divide-y divide-gray-100">
              {races.map(r => (
                <div key={r.name} className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm font-medium text-dark-700">{r.name}</span>
                  <span className="text-sm font-bold text-dark-800">{ms ? fmtTime(r.dist / ms) : '—'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom distance */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="block text-sm font-semibold mb-2 text-dark-700">Custom distance finish time</label>
            <div className="flex gap-3 items-center">
              <input type="number" value={dist} onChange={e => setDist(e.target.value)} placeholder="21.1" step="0.1"
                className="w-32 px-3 py-2 border border-gray-300 rounded-xl text-sm" />
              <span className="text-sm text-gray-500">km</span>
              {customTime && <span className="text-sm font-bold text-primary-600 ml-2">{fmtTime(customTime)}</span>}
            </div>
          </div>
        </>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Select your input type (pace in min/km, min/mile, or speed in km/h, mph, m/s)</li>
          <li>Enter your value</li>
          <li>All equivalent speeds and paces are shown instantly</li>
          <li>Projected race finish times are calculated automatically</li>
        </ol>
      </div>
    </div>
  );
};

export default RunningPaceConverter;
