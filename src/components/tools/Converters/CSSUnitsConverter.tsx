import React, { useState } from 'react';

const CSSUnitsConverter: React.FC = () => {
  const [value, setValue] = useState(16);
  const [baseSize, setBaseSize] = useState(16); // Base font size in px

  const conversions = {
    px: value,
    rem: value / baseSize,
    em: value / baseSize,
    pt: value * 0.75,
    '%': (value / baseSize) * 100,
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Base Font Size (for rem/em): {baseSize}px</label>
        <input
          type="range"
          min="10"
          max="24"
          value={baseSize}
          onChange={(e) => setBaseSize(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>10px</span>
          <span>16px (default)</span>
          <span>24px</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Enter Value in Pixels</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          placeholder="16"
          className="w-full p-3 border-2 rounded-lg text-lg"
        />
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Conversions</h3>
        <div className="space-y-3">
          {Object.entries(conversions).map(([unit, val]) => (
            <div key={unit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-gray-700">{unit.toUpperCase()}</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-blue-600">
                  {val.toFixed(3).replace(/\.?0+$/, '')}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(`${val.toFixed(3).replace(/\.?0+$/, '')}${unit}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <div className="font-semibold mb-2">📏 Quick Reference:</div>
        <div className="text-sm text-gray-700 space-y-1">
          <div><strong>px:</strong> Absolute pixels</div>
          <div><strong>rem:</strong> Relative to root font size (html)</div>
          <div><strong>em:</strong> Relative to parent font size</div>
          <div><strong>pt:</strong> Points (print media)</div>
          <div><strong>%:</strong> Percentage of parent</div>
        </div>
      </div>
    </div>
  );
};

export default CSSUnitsConverter;
