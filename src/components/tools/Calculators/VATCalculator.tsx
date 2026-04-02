import React, { useState } from 'react';
const VATCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('20');
  const [mode, setMode] = useState<'add'|'remove'>('add');
  const base = parseFloat(amount) || 0;
  const r = parseFloat(rate) || 0;
  const vat = mode === 'add' ? base * (r/100) : base - base/(1+r/100);
  const total = mode === 'add' ? base + vat : base;
  const net = mode === 'add' ? base : base/(1+r/100);
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">VAT Calculator</h2>
        <p className="text-dark-600">Add or remove VAT from any price.</p>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>setMode('add')} className={`flex-1 py-2 rounded-xl font-semibold transition-colors ${mode==='add'?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>Add VAT</button>
        <button onClick={()=>setMode('remove')} className={`flex-1 py-2 rounded-xl font-semibold transition-colors ${mode==='remove'?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>Remove VAT</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">{mode==='add'?'Price (excl. VAT)':'Price (incl. VAT)'} ($)</label>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="100.00" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">VAT Rate (%)</label>
          <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder="20" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
      </div>
      {base > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200"><div className="text-xl font-bold text-dark-700">${net.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">Net Price</div></div>
          <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100"><div className="text-xl font-bold text-orange-600">${vat.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">VAT Amount</div></div>
          <div className="bg-primary-50 rounded-xl p-4 text-center border border-primary-100"><div className="text-xl font-bold text-primary-600">${total.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">Total Price</div></div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Choose whether to add or remove VAT</li><li>Enter the price amount</li><li>Set the VAT rate (default 20%)</li><li>See the breakdown instantly</li>
        </ol>
      </div>
    </div>
  );
};
export default VATCalculator;
