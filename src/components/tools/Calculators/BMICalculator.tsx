import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return 0;

    if (unit === 'metric') {
      return w / ((h / 100) ** 2);
    } else {
      return (w / (h ** 2)) * 703;
    }
  };

  const bmi = calculateBMI();
  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600 bg-blue-50' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600 bg-green-50' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-600 bg-orange-50' };
    return { text: 'Obese', color: 'text-red-600 bg-red-50' };
  };

  const category = bmi > 0 ? getCategory(bmi) : null;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setUnit('metric')}
          className={`px-4 py-2 rounded-lg font-semibold ${unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-4 py-2 rounded-lg font-semibold ${unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="0"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {bmi > 0 && (
        <div className="p-6 bg-white border-2 rounded-lg">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{bmi.toFixed(1)}</div>
            <div className="text-sm text-gray-600 mb-4">Your BMI</div>
            {category && (
              <div className={`inline-block px-6 py-2 rounded-full font-semibold ${category.color}`}>
                {category.text}
              </div>
            )}
          </div>
        </div>
      )}

      <button onClick={() => { setWeight(''); setHeight(''); }} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold">
        Reset
      </button>
    </div>
  );
};

export default BMICalculator;
