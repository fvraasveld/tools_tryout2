import React, { useState } from 'react';
const units = [{label:'Seconds',s:1},{label:'Minutes',s:60},{label:'Hours',s:3600},{label:'Days',s:86400},{label:'Weeks',s:604800},{label:'Months',s:2592000},{label:'Years',s:31536000}];
const TimeConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('Hours');
  const base = (parseFloat(value)||0) * (units.find(u=>u.label===from)?.s||1);
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Time Converter</h2>
        <p className="text-dark-600">Convert between seconds, minutes, hours, days, weeks, months, and years.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Value</label>
          <input type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="1" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">From Unit</label>
          <select value={from} onChange={e=>setFrom(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            {units.map(u=><option key={u.label}>{u.label}</option>)}</select></div>
      </div>
      {value && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {units.map(u=>(
            <div key={u.label} className={`rounded-xl p-4 text-center border ${u.label===from?'bg-primary-50 border-primary-200':'bg-gray-50 border-gray-200'}`}>
              <div className={`text-lg font-bold ${u.label===from?'text-primary-600':'text-dark-700'}`}>{(base/u.s).toFixed(u.s>=86400?4:2)}</div>
              <div className="text-sm text-dark-500 mt-1">{u.label}</div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside"><li>Enter a time value</li><li>Select the starting unit</li><li>See all conversions instantly</li></ol>
      </div>
    </div>
  );
};
export default TimeConverter;
