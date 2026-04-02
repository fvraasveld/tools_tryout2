import React, { useState } from 'react';
const FuelCalculator: React.FC = () => {
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const d = parseFloat(distance)||0, c = parseFloat(consumption)||0, p = parseFloat(pricePerLiter)||0;
  const liters = c > 0 ? d * c / 100 : 0;
  const cost = liters * p;
  const per100km = p > 0 && c > 0 ? c * p : 0;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Fuel Cost Calculator</h2>
        <p className="text-dark-600">Calculate fuel costs for any trip based on distance and consumption.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Distance (km)</label>
          <input type="number" value={distance} onChange={e=>setDistance(e.target.value)} placeholder="500" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Consumption (L/100km)</label>
          <input type="number" value={consumption} onChange={e=>setConsumption(e.target.value)} placeholder="7.5" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">Fuel Price ($/L)</label>
          <input type="number" value={pricePerLiter} onChange={e=>setPricePerLiter(e.target.value)} placeholder="1.80" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
      </div>
      {d > 0 && c > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100"><div className="text-xl font-bold text-yellow-700">{liters.toFixed(1)}L</div><div className="text-sm text-dark-600 mt-1">Fuel Needed</div></div>
          <div className="bg-primary-50 rounded-xl p-4 text-center border border-primary-100"><div className="text-xl font-bold text-primary-600">${cost.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">Trip Cost</div></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200"><div className="text-xl font-bold text-dark-700">${per100km.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">Cost/100km</div></div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter the trip distance in kilometres</li><li>Enter your vehicle's fuel consumption (L/100km)</li><li>Enter the current fuel price per litre</li><li>See the total fuel needed and trip cost</li>
        </ol>
      </div>
    </div>
  );
};
export default FuelCalculator;
