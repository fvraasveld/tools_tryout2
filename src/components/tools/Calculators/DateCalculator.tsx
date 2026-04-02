import React, { useState } from 'react';
const DateCalculator: React.FC = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);
  const [addDate, setAddDate] = useState('');
  const [addDays, setAddDays] = useState('');
  const diff = date1 && date2 ? Math.abs(new Date(date2).getTime() - new Date(date1).getTime()) : 0;
  const days = Math.floor(diff/(1000*60*60*24));
  const weeks = Math.floor(days/7);
  const months = date1 && date2 ? Math.abs((new Date(date2).getFullYear()-new Date(date1).getFullYear())*12 + new Date(date2).getMonth()-new Date(date1).getMonth()) : 0;
  const resultDate = addDate && addDays ? new Date(new Date(addDate).getTime()+(parseInt(addDays)*24*60*60*1000)).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '';
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Date Calculator</h2>
        <p className="text-dark-600">Calculate the difference between two dates, or add/subtract days from a date.</p>
      </div>
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-dark-800 mb-4">Date Difference</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold mb-2 text-dark-700">Start Date</label>
            <input type="date" value={date1} onChange={e=>setDate1(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
          <div><label className="block text-sm font-semibold mb-2 text-dark-700">End Date</label>
            <input type="date" value={date2} onChange={e=>setDate2(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        </div>
        {date1 && date2 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-primary-50 rounded-xl p-3 text-center border border-primary-100"><div className="text-xl font-bold text-primary-600">{days}</div><div className="text-xs text-dark-600">Days</div></div>
            <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-100"><div className="text-xl font-bold text-purple-600">{weeks}</div><div className="text-xs text-dark-600">Weeks</div></div>
            <div className="bg-indigo-50 rounded-xl p-3 text-center border border-indigo-100"><div className="text-xl font-bold text-indigo-600">{months}</div><div className="text-xs text-dark-600">Months</div></div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-dark-800 mb-4">Add / Subtract Days</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold mb-2 text-dark-700">Start Date</label>
            <input type="date" value={addDate} onChange={e=>setAddDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
          <div><label className="block text-sm font-semibold mb-2 text-dark-700">Days to Add (negative to subtract)</label>
            <input type="number" value={addDays} onChange={e=>setAddDays(e.target.value)} placeholder="30" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        </div>
        {resultDate && <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100 text-center font-semibold text-primary-700">{resultDate}</div>}
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Use the top section to find the difference between two dates</li><li>Use the bottom section to add or subtract days from a date</li>
        </ol>
      </div>
    </div>
  );
};
export default DateCalculator;
