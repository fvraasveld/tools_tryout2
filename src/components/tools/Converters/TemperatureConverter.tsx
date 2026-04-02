import React, { useState } from 'react';
const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('Celsius');
  const v = parseFloat(value);
  let c=0;
  if(!isNaN(v)){if(from==='Celsius')c=v;else if(from==='Fahrenheit')c=(v-32)*5/9;else if(from==='Kelvin')c=v-273.15;}
  const f = c*9/5+32, k = c+273.15;
  const results = [{label:'Celsius',symbol:'°C',val:c},{label:'Fahrenheit',symbol:'°F',val:f},{label:'Kelvin',symbol:'K',val:k}];
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Temperature Converter</h2>
        <p className="text-dark-600">Convert between Celsius, Fahrenheit, and Kelvin.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Temperature</label>
          <input type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="100" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">From Unit</label>
          <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>Celsius</option><option>Fahrenheit</option><option>Kelvin</option></select></div>
      </div>
      {value && !isNaN(v) && (
        <div className="grid grid-cols-3 gap-4">
          {results.map(r=>(
            <div key={r.label} className={`rounded-xl p-5 text-center border ${r.label===from?'bg-primary-50 border-primary-200':'bg-gray-50 border-gray-200'}`}>
              <div className={`text-2xl font-bold ${r.label===from?'text-primary-600':'text-dark-700'}`}>{r.val.toFixed(2)}{r.symbol}</div>
              <div className="text-sm text-dark-500 mt-1">{r.label}</div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside"><li>Enter a temperature value</li><li>Select the starting unit</li><li>See all three conversions instantly</li></ol>
      </div>
    </div>
  );
};
export default TemperatureConverter;
