import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  
  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12; // Monthly interest rate
  const n = (parseFloat(years) || 0) * 12; // Total months
  
  // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = r !== 0 ? p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - p;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="100000"
            min="0"
            step="1000"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="5.5"
            min="0"
            max="100"
            step="0.1"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="30"
            min="1"
            max="50"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {p > 0 && r >= 0 && n > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="text-sm text-blue-600 font-semibold mb-1">Monthly Payment</div>
            <div className="text-3xl font-bold text-blue-900">
              ${isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : '0.00'}
            </div>
          </div>

          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="text-sm text-green-600 font-semibold mb-1">Total Payment</div>
            <div className="text-3xl font-bold text-green-900">
              ${isFinite(totalPayment) ? totalPayment.toFixed(2) : '0.00'}
            </div>
          </div>

          <div className="p-6 bg-orange-50 border-2 border-orange-200 rounded-lg">
            <div className="text-sm text-orange-600 font-semibold mb-1">Total Interest</div>
            <div className="text-3xl font-bold text-orange-900">
              ${isFinite(totalInterest) ? totalInterest.toFixed(2) : '0.00'}
            </div>
          </div>
        </div>
      )}

      {p > 0 && r >= 0 && n > 0 && (
        <div className="p-6 bg-gray-50 border rounded-lg">
          <h3 className="font-bold mb-3">Loan Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Loan Amount:</span>
              <span className="font-semibold">${p.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate:</span>
              <span className="font-semibold">{parseFloat(rate).toFixed(2)}% per year</span>
            </div>
            <div className="flex justify-between">
              <span>Loan Term:</span>
              <span className="font-semibold">{years} years ({n} months)</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span>Monthly Payment:</span>
              <span className="font-bold">${isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Paid:</span>
              <span className="font-bold text-orange-700">${isFinite(totalInterest) ? totalInterest.toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount Paid:</span>
              <span className="font-bold">${isFinite(totalPayment) ? totalPayment.toFixed(2) : '0.00'}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => { setPrincipal(''); setRate(''); setYears(''); }}
        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
      >
        Reset
      </button>
    </div>
  );
};

export default LoanCalculator;
