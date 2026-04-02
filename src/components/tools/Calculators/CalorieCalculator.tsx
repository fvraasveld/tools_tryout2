import React, { useState } from 'react';
const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const levels = [['1.2','Sedentary (little/no exercise)'],['1.375','Light (1-3 days/week)'],['1.55','Moderate (3-5 days/week)'],['1.725','Active (6-7 days/week)'],['1.9','Very Active (twice/day)']];
  const w = parseFloat(weight)||0, h = parseFloat(height)||0, a = parseInt(age)||0;
  const bmr = w && h && a ? (gender==='male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161) : 0;
  const tdee = bmr * parseFloat(activity);
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Calorie Calculator</h2>
        <p className="text-dark-600">Calculate your daily calorie needs using the Mifflin-St Jeor equation.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Gender</label>
          <div className="flex gap-2"><button onClick={()=>setGender('male')} className={`flex-1 py-2 rounded-xl font-semibold ${gender==='male'?'bg-primary-500 text-white':'bg-gray-100 text-dark-600'}`}>Male</button><button onClick={()=>setGender('female')} className={`flex-1 py-2 rounded-xl font-semibold ${gender==='female'?'bg-primary-500 text-white':'bg-gray-100 text-dark-600'}`}>Female</button></div></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Age (years)</label>
          <input type="number" value={age} onChange={e=>setAge(e.target.value)} placeholder="30" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Weight (kg)</label>
          <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="70" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Height (cm)</label>
          <input type="number" value={height} onChange={e=>setHeight(e.target.value)} placeholder="175" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-2 text-dark-700">Activity Level</label>
          <select value={activity} onChange={e=>setActivity(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            {levels.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>
      </div>
      {bmr > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-100"><div className="text-2xl font-bold text-blue-600">{Math.round(bmr)}</div><div className="text-sm text-dark-600 mt-1">BMR (cal/day)</div><div className="text-xs text-dark-500">at rest</div></div>
          <div className="bg-primary-50 rounded-xl p-5 text-center border border-primary-100"><div className="text-2xl font-bold text-primary-600">{Math.round(tdee)}</div><div className="text-sm text-dark-600 mt-1">TDEE (cal/day)</div><div className="text-xs text-dark-500">to maintain weight</div></div>
        </div>
      )}
      {bmr > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm font-semibold text-dark-700 mb-2">Daily calorie targets:</p>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div><div className="font-bold text-red-600">{Math.round(tdee-500)}</div><div className="text-dark-500">Lose weight</div></div>
            <div><div className="font-bold text-green-600">{Math.round(tdee)}</div><div className="text-dark-500">Maintain</div></div>
            <div><div className="font-bold text-blue-600">{Math.round(tdee+500)}</div><div className="text-dark-500">Gain weight</div></div>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter your gender, age, weight, and height</li><li>Select your activity level</li><li>See your BMR and daily calorie needs</li>
        </ol>
      </div>
    </div>
  );
};
export default CalorieCalculator;
