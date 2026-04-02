import React, { useState } from 'react';
const DiscountCalculator: React.FC = () => {
  const [original, setOriginal] = useState('');
  const [discount, setDiscount] = useState('');
  const orig = parseFloat(original) || 0;
  const pct = parseFloat(discount) || 0;
  const saved = orig * (pct / 100);
  const final = orig - saved;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Discount Calculator</h2>
        <p className="text-dark-600">Calculate the final price after applying a percentage discount.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Original Price ($)</label>
          <input type="number" value={original} onChange={e=>setOriginal(e.target.value)} placeholder="100.00" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Discount (%)</label>
          <input type="number" value={discount} onChange={e=>setDiscount(e.target.value)} placeholder="20" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
      </div>
      {orig > 0 && pct > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100"><div className="text-2xl font-bold text-red-600">${saved.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">You Save</div></div>
          <div className="bg-primary-50 rounded-xl p-4 text-center border border-primary-100"><div className="text-2xl font-bold text-primary-600">${final.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">Final Price</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200"><div className="text-2xl font-bold text-dark-700">{pct}%</div><div className="text-sm text-dark-600 mt-1">Off</div></div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter the original price of the item</li><li>Enter the discount percentage</li><li>See the final price and how much you save instantly</li>
        </ol>
      </div>
    </div>
  );
};
export default DiscountCalculator;
