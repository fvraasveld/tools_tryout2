import React, { useState } from 'react';

const ColorNameFinder: React.FC = () => {
  const [color, setColor] = useState('#3B82F6');

  const colorNames: { [key: string]: string } = {
    '#FF0000': 'Red',
    '#00FF00': 'Lime',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#808080': 'Gray',
    '#C0C0C0': 'Silver',
    '#800000': 'Maroon',
    '#808000': 'Olive',
    '#008000': 'Green',
    '#800080': 'Purple',
    '#008080': 'Teal',
    '#000080': 'Navy',
    '#FFA500': 'Orange',
    '#FFC0CB': 'Pink',
    '#A52A2A': 'Brown',
    '#FFD700': 'Gold',
    '#4B0082': 'Indigo',
    '#EE82EE': 'Violet',
    '#F0E68C': 'Khaki',
    '#E6E6FA': 'Lavender',
    '#FA8072': 'Salmon',
    '#20B2AA': 'Light Sea Green',
    '#87CEEB': 'Sky Blue',
    '#FF6347': 'Tomato',
    '#40E0D0': 'Turquoise',
    '#F5DEB3': 'Wheat',
  };

  const findClosestColor = (hex: string) => {
    const hexToRgb = (h: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const targetRgb = hexToRgb(hex);
    let closestName = 'Custom Color';
    let minDistance = Infinity;

    Object.entries(colorNames).forEach(([colorHex, name]) => {
      const colorRgb = hexToRgb(colorHex);
      const distance = Math.sqrt(
        Math.pow(targetRgb.r - colorRgb.r, 2) +
        Math.pow(targetRgb.g - colorRgb.g, 2) +
        Math.pow(targetRgb.b - colorRgb.b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestName = name;
      }
    });

    return closestName;
  };

  const colorName = findClosestColor(color);

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

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 text-center">
        <div className="text-sm font-semibold text-gray-600 mb-2">Color Name</div>
        <div className="text-4xl font-bold text-blue-600 mb-4">{colorName}</div>
        <div className="text-lg font-mono">{color.toUpperCase()}</div>
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Common Named Colors</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {Object.entries(colorNames).map(([hex, name]) => (
            <div
              key={hex}
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setColor(hex)}
              title={name}
            >
              <div
                className="w-full aspect-square rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: hex }}
              />
              <div className="text-xs text-center mt-1 truncate">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorNameFinder;
