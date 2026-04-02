import React, { useState } from 'react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#3B82F6');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateShades = () => {
    const shades = [];
    const { r, g, b } = rgb;

    for (let i = 1; i <= 9; i++) {
      const factor = i / 10;
      const newR = Math.round(r + (255 - r) * (1 - factor));
      const newG = Math.round(g + (255 - g) * (1 - factor));
      const newB = Math.round(b + (255 - b) * (1 - factor));
      const hex = '#' + [newR, newG, newB].map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      }).join('').toUpperCase();
      shades.push(hex);
    }

    return shades;
  };

  const shades = generateShades();

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 rounded-lg p-6 text-center">
        <label className="block text-sm font-semibold mb-4">Pick a Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-32 cursor-pointer rounded-lg border-4 border-gray-300"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border-2 rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">HEX</div>
          <div className="flex items-center justify-between">
            <div className="font-mono font-bold text-lg">{color}</div>
            <button
              onClick={() => copyToClipboard(color)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="bg-white border-2 rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">RGB</div>
          <div className="flex items-center justify-between">
            <div className="font-mono font-bold text-lg">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="bg-white border-2 rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">HSL</div>
          <div className="flex items-center justify-between">
            <div className="font-mono font-bold text-lg">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
            <button
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Color Shades</h3>
        <div className="grid grid-cols-9 gap-2">
          {shades.map((shade, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: shade }}
              onClick={() => setColor(shade)}
              title={shade}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
