import React, { useState } from 'react';
const shapes = ['Rectangle','Square','Circle','Triangle','Trapezoid'];
const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState('Rectangle');
  const [a, setA] = useState('');const [b, setB] = useState('');const [c, setC] = useState('');
  let area = 0, formula = '';
  const av=parseFloat(a)||0,bv=parseFloat(b)||0,cv=parseFloat(c)||0;
  if(shape==='Rectangle'){area=av*bv;formula=`${av} × ${bv}`;}
  else if(shape==='Square'){area=av*av;formula=`${av}²`;}
  else if(shape==='Circle'){area=Math.PI*av*av;formula=`π × ${av}²`;}
  else if(shape==='Triangle'){area=0.5*av*bv;formula=`½ × ${av} × ${bv}`;}
  else if(shape==='Trapezoid'){area=0.5*(av+bv)*cv;formula=`½ × (${av}+${bv}) × ${cv}`;}
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 border border-teal-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Area Calculator</h2>
        <p className="text-dark-600">Calculate the area of common 2D shapes.</p>
      </div>
      <div className="flex flex-wrap gap-2">{shapes.map(s=><button key={s} onClick={()=>{setShape(s);setA('');setB('');setC('');}} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${shape===s?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>{s}</button>)}</div>
      <div className="grid grid-cols-2 gap-4">
        {(shape==='Rectangle'||shape==='Triangle'||shape==='Trapezoid')&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">{shape==='Trapezoid'?'Base 1':'Width/Base'}</label><input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
        {(shape==='Square'||shape==='Circle')&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">{shape==='Circle'?'Radius':'Side'}</label><input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
        {(shape==='Rectangle'||shape==='Triangle'||shape==='Trapezoid')&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">{shape==='Trapezoid'?'Base 2':'Height'}</label><input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
        {shape==='Trapezoid'&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">Height</label><input type="number" value={c} onChange={e=>setC(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
      </div>
      {area > 0 && <div className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100"><div className="text-sm text-dark-600 mb-1">Formula: {formula}</div><div className="text-4xl font-bold text-primary-600">{area.toFixed(4)}</div><div className="text-dark-600 mt-1">square units</div></div>}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside"><li>Select the shape</li><li>Enter the required dimensions</li><li>The area is calculated instantly</li></ol>
      </div>
    </div>
  );
};
export default AreaCalculator;
