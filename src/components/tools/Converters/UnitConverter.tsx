import React, { useState, useEffect } from 'react';

type UnitSystem = {
  [key: string]: {
    name: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
  };
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'temperature' | 'length' | 'weight'>('temperature');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const units: Record<string, UnitSystem> = {
    temperature: {
      celsius: { name: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
      fahrenheit: { name: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
      kelvin: { name: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
    },
    length: {
      meters: { name: 'Meters (m)', toBase: (v) => v, fromBase: (v) => v },
      kilometers: { name: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      miles: { name: 'Miles (mi)', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
      feet: { name: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 }
    },
    weight: {
      kilograms: { name: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
      grams: { name: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      pounds: { name: 'Pounds (lb)', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 }
    }
  };

  const convert = () => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue('');
      return;
    }

    const currentUnits = units[category];
    const baseValue = currentUnits[fromUnit].toBase(val);
    const result = currentUnits[toUnit].fromBase(baseValue);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  useEffect(() => {
    const categoryUnits = Object.keys(units[category]);
    setFromUnit(categoryUnits[0]);
    setToUnit(categoryUnits[1] || categoryUnits[0]);
    setFromValue('');
    setToValue('');
  }, [category]);

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  const currentUnits = units[category];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Category</label>
        <div className="flex gap-2">
          {(['temperature', 'length', 'weight'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize ${
                category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {Object.entries(currentUnits).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            placeholder="Enter value"
            className="w-full p-4 text-2xl border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {Object.entries(currentUnits).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
          <div className="p-4 text-2xl bg-gray-50 border rounded-lg font-bold">
            {toValue || '0'}
          </div>
        </div>
      </div>

      <button
        onClick={() => { setFromValue(''); setToValue(''); }}
        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
      >
        Clear
      </button>
    </div>
  );
};

export default UnitConverter;
