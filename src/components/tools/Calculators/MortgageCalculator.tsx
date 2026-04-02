import React, { useState } from 'react';
const MortgageCalculator: React.FC = () => {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('30');
  const principal = (parseFloat(price)||0)-(parseFloat(down)||0);
  const r = (parseFloat(rate)||0)/100/12;
  const n = parseInt(term)*12;
  const monthly = principal > 0 && r > 0 ? principal*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1) : principal > 0 ? principal/n : 0;
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - principal;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Mortgage Calculator</h2>
        <p className="text-dark-600">Calculate your monthly mortgage payment and total interest paid.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Home Price ($)</label>
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="400000" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Down Payment ($)</label>
          <input type="number" value={down} onChange={e=>setDown(e.target.value)} placeholder="80000" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder="6.5" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Loan Term (years)</label>
          <select value={term} onChange={e=>setTerm(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="10">10 years</option><option value="15">15 years</option><option value="20">20 years</option><option value="25">25 years</option><option value="30">30 years</option>
          </select></div>
      </div>
      {monthly > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-xl p-5 text-center border border-primary-100"><div className="text-2xl font-bold text-primary-600">${monthly.toFixed(0)}/mo</div><div className="text-sm text-dark-600 mt-1">Monthly Payment</div></div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-100"><div className="text-2xl font-bold text-red-600">${(totalInterest/1000).toFixed(0)}k</div><div className="text-sm text-dark-600 mt-1">Total Interest</div></div>
          <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200"><div className="text-2xl font-bold text-dark-700">${(totalPaid/1000).toFixed(0)}k</div><div className="text-sm text-dark-600 mt-1">Total Cost</div></div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter the home price and your down payment</li><li>Set the annual interest rate and loan term</li><li>See your monthly payment and total cost</li>
        </ol>
      </div>
    </div>
  );
};
export default MortgageCalculator;
