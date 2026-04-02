import React, { useState, useEffect } from 'react';
const RATES: Record<string,number> = {USD:1,EUR:0.92,GBP:0.79,JPY:149.5,CAD:1.36,AUD:1.53,CHF:0.89,CNY:7.24,INR:83.1,MXN:17.15,BRL:4.97,KRW:1325,SGD:1.34,HKD:7.82,NOK:10.55,SEK:10.42,DKK:6.88,NZD:1.63,ZAR:18.63,AED:3.67};
const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const result = (parseFloat(amount)||0) * (RATES[to]/RATES[from]);
  const swap = () => { setFrom(to); setTo(from); };
  const currencies = Object.keys(RATES);
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Currency Converter</h2>
        <p className="text-dark-600">Convert between 20 major currencies using approximate reference rates.</p>
        <p className="text-xs text-dark-400 mt-1">Rates are approximate and for reference only. For live rates, check your bank.</p>
      </div>
      <div className="space-y-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Amount</label>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"/></div>
        <div className="flex gap-3 items-center">
          <div className="flex-1"><label className="block text-sm font-semibold mb-2 text-dark-700">From</label>
            <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              {currencies.map(c=><option key={c}>{c}</option>)}</select></div>
          <button onClick={swap} className="mt-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-bold text-xl">⇄</button>
          <div className="flex-1"><label className="block text-sm font-semibold mb-2 text-dark-700">To</label>
            <select value={to} onChange={e=>setTo(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              {currencies.map(c=><option key={c}>{c}</option>)}</select></div>
        </div>
      </div>
      {amount && (
        <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 text-center">
          <div className="text-sm text-dark-600 mb-1">{parseFloat(amount).toLocaleString()} {from} =</div>
          <div className="text-4xl font-bold text-primary-600">{result.toLocaleString('en-US',{maximumFractionDigits:4})} {to}</div>
          <div className="text-xs text-dark-400 mt-2">1 {from} = {(RATES[to]/RATES[from]).toFixed(4)} {to}</div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter the amount to convert</li><li>Select the source currency (From)</li><li>Select the target currency (To)</li><li>See the converted amount instantly</li>
        </ol>
      </div>
    </div>
  );
};
export default CurrencyConverter;
