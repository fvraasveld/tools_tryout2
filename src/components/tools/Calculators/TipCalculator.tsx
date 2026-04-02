import React, { useState } from 'react';

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [numPeople, setNumPeople] = useState(1);
  const [customTip, setCustomTip] = useState('');
  
  const bill = parseFloat(billAmount) || 0;
  const tip = customTip ? parseFloat(customTip) : tipPercent;
  const tipAmount = bill * (tip / 100);
  const total = bill + tipAmount;
  const perPerson = total / numPeople;
  const tipPerPerson = tipAmount / numPeople;

  const presetTips = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Bill Amount ($)</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full p-4 text-2xl border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Tip Percentage ({customTip || tipPercent}%)
            </label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {presetTips.map(percent => (
                <button
                  key={percent}
                  onClick={() => { setTipPercent(percent); setCustomTip(''); }}
                  className={`p-3 rounded-lg font-semibold ${
                    tipPercent === percent && !customTip
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Custom tip %"
              min="0"
              max="100"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Number of People
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full p-3 text-xl border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side - Results */}
        <div className="space-y-4">
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="text-sm text-blue-600 font-semibold mb-1">Tip Amount</div>
            <div className="text-4xl font-bold text-blue-900">${tipAmount.toFixed(2)}</div>
          </div>

          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="text-sm text-green-600 font-semibold mb-1">Total Bill</div>
            <div className="text-4xl font-bold text-green-900">${total.toFixed(2)}</div>
          </div>

          {numPeople > 1 && (
            <>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-sm text-purple-600 font-semibold mb-1">Per Person (Total)</div>
                <div className="text-3xl font-bold text-purple-900">${perPerson.toFixed(2)}</div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="text-sm text-orange-600 font-semibold mb-1">Tip Per Person</div>
                <div className="text-2xl font-bold text-orange-900">${tipPerPerson.toFixed(2)}</div>
              </div>
            </>
          )}

          <div className="p-4 bg-gray-50 border rounded-lg text-sm space-y-1">
            <div className="flex justify-between">
              <span>Original Bill:</span>
              <span className="font-semibold">${bill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tip ({customTip || tipPercent}%):</span>
              <span className="font-semibold">${tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 mt-1">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setBillAmount('');
          setTipPercent(15);
          setNumPeople(1);
          setCustomTip('');
        }}
        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
      >
        Reset
      </button>
    </div>
  );
};

export default TipCalculator;
