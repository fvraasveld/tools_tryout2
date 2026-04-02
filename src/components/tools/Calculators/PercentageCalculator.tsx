import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [calc1Val1, setCalc1Val1] = useState('');
  const [calc1Val2, setCalc1Val2] = useState('');
  
  const [calc2Val1, setCalc2Val1] = useState('');
  const [calc2Val2, setCalc2Val2] = useState('');
  
  const [calc3Start, setCalc3Start] = useState('');
  const [calc3End, setCalc3End] = useState('');

  // What is X% of Y?
  const result1 = (parseFloat(calc1Val1) || 0) / 100 * (parseFloat(calc1Val2) || 0);
  
  // X is what % of Y?
  const result2 = ((parseFloat(calc2Val1) || 0) / (parseFloat(calc2Val2) || 1)) * 100;
  
  // Percentage change from X to Y
  const start = parseFloat(calc3Start) || 0;
  const end = parseFloat(calc3End) || 0;
  const result3 = start !== 0 ? ((end - start) / start) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Calculator 1 */}
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-bold mb-4">What is X% of Y?</h3>
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm mb-1">Percentage</label>
            <input
              type="number"
              value={calc1Val1}
              onChange={(e) => setCalc1Val1(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center pb-3 text-xl font-bold">%  of</div>
          <div>
            <label className="block text-sm mb-1">Number</label>
            <input
              type="number"
              value={calc1Val2}
              onChange={(e) => setCalc1Val2(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <div className="text-sm mb-1">Result</div>
            <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-xl">
              {result1.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Calculator 2 */}
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-bold mb-4">X is what % of Y?</h3>
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm mb-1">Number</label>
            <input
              type="number"
              value={calc2Val1}
              onChange={(e) => setCalc2Val1(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center pb-3 text-xl font-bold">is what % of</div>
          <div>
            <label className="block text-sm mb-1">Number</label>
            <input
              type="number"
              value={calc2Val2}
              onChange={(e) => setCalc2Val2(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <div className="text-sm mb-1">Result</div>
            <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg font-bold text-xl">
              {result2.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Calculator 3 */}
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-bold mb-4">Percentage Change (Increase/Decrease)</h3>
        <div className="grid md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-sm mb-1">Start Value</label>
            <input
              type="number"
              value={calc3Start}
              onChange={(e) => setCalc3Start(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center pb-3 text-xl font-bold">→</div>
          <div>
            <label className="block text-sm mb-1">End Value</label>
            <input
              type="number"
              value={calc3End}
              onChange={(e) => setCalc3End(e.target.value)}
              placeholder="0"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <div className="text-sm mb-1">Change</div>
            <div className={`p-3 border-2 rounded-lg font-bold text-xl ${
              result3 > 0 ? 'bg-green-50 border-green-200' : 
              result3 < 0 ? 'bg-red-50 border-red-200' : 
              'bg-gray-50 border-gray-200'
            }`}>
              {result3 > 0 ? '+' : ''}{result3.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setCalc1Val1(''); setCalc1Val2('');
          setCalc2Val1(''); setCalc2Val2('');
          setCalc3Start(''); setCalc3End('');
        }}
        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
      >
        Clear All
      </button>
    </div>
  );
};

export default PercentageCalculator;
