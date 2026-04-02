import React, { useState, useEffect } from 'react';

const RGBToHex: React.FC = () => {
  const [mode, setMode] = useState<'rgb-to-hex' | 'hex-to-rgb'>('rgb-to-hex');
  const [r, setR] = useState(255);
  const [g, setG] = useState(100);
  const [b, setB] = useState(50);
  const [hex, setHex] = useState('#FF6432');

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  useEffect(() => {
    if (mode === 'rgb-to-hex') {
      setHex(rgbToHex(r, g, b));
    }
  }, [r, g, b, mode]);

  useEffect(() => {
    if (mode === 'hex-to-rgb') {
      const rgb = hexToRgb(hex);
      if (rgb) {
        setR(rgb.r);
        setG(rgb.g);
        setB(rgb.b);
      }
    }
  }, [hex, mode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setMode('rgb-to-hex')}
          className={`px-6 py-3 rounded-lg font-semibold ${mode === 'rgb-to-hex' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          RGB → HEX
        </button>
        <button
          onClick={() => setMode('hex-to-rgb')}
          className={`px-6 py-3 rounded-lg font-semibold ${mode === 'hex-to-rgb' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          HEX → RGB
        </button>
      </div>

      {mode === 'rgb-to-hex' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Red (R)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={r}
                onChange={(e) => setR(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={r}
                onChange={(e) => setR(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Green (G)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={g}
                onChange={(e) => setG(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={g}
                onChange={(e) => setG(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Blue (B)</label>
              <input
                type="number"
                min="0"
                max="255"
                value={b}
                onChange={(e) => setB(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="range"
                min="0"
                max="255"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>

          <div className="bg-white border-2 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">HEX Color</h3>
              <button
                onClick={() => copyToClipboard(hex)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-24 h-24 rounded-lg border-4 border-gray-300"
                style={{ backgroundColor: hex }}
              />
              <div className="text-4xl font-mono font-bold">{hex}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">HEX Color</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#FF6432"
              className="w-full p-3 border-2 rounded-lg font-mono text-lg"
            />
          </div>

          <div className="bg-white border-2 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">RGB Values</h3>
              <button
                onClick={() => copyToClipboard(`rgb(${r}, ${g}, ${b})`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-24 h-24 rounded-lg border-4 border-gray-300"
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              />
              <div className="text-4xl font-mono font-bold">rgb({r}, {g}, {b})</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGBToHex;
