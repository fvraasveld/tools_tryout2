import React, { useState } from 'react';
const shapes = ['Cube','Rectangular Box','Cylinder','Sphere','Cone'];
const VolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState('Cube');
  const [a, setA] = useState('');const [b, setB] = useState('');const [c, setC] = useState('');
  let volume = 0;
  const av=parseFloat(a)||0,bv=parseFloat(b)||0,cv=parseFloat(c)||0;
  if(shape==='Cube')volume=av**3;
  else if(shape==='Rectangular Box')volume=av*bv*cv;
  else if(shape==='Cylinder')volume=Math.PI*av*av*bv;
  else if(shape==='Sphere')volume=(4/3)*Math.PI*av**3;
  else if(shape==='Cone')volume=(1/3)*Math.PI*av*av*bv;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">Volume Calculator</h2>
        <p className="text-dark-600">Calculate the volume of common 3D shapes.</p>
      </div>
      <div className="flex flex-wrap gap-2">{shapes.map(s=><button key={s} onClick={()=>{setShape(s);setA('');setB('');setC('');}} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${shape===s?'bg-primary-500 text-white':'bg-gray-100 text-dark-600 hover:bg-gray-200'}`}>{s}</button>)}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-semibold mb-2 text-dark-700">{shape==='Sphere'?'Radius':shape==='Cube'?'Side':shape==='Cylinder'||shape==='Cone'?'Radius':'Length'}</label><input type="number" value={a} onChange={e=>setA(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>
        {shape!=='Cube'&&shape!=='Sphere'&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">{shape==='Rectangular Box'?'Width':'Height'}</label><input type="number" value={b} onChange={e=>setB(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
        {shape==='Rectangular Box'&&<div><label className="block text-sm font-semibold mb-2 text-dark-700">Height</label><input type="number" value={c} onChange={e=>setC(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div>}
      </div>
      {volume > 0 && <div className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100"><div className="text-4xl font-bold text-primary-600">{volume.toFixed(4)}</div><div className="text-dark-600 mt-1">cubic units</div></div>}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside"><li>Select the 3D shape</li><li>Enter the required dimensions</li><li>The volume is calculated instantly</li></ol>
      </div>
    </div>
  );
};
export default VolumeCalculator;
