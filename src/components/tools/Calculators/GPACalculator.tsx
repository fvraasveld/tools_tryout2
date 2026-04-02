import React, { useState } from 'react';
type Course = { name: string; grade: string; credits: string };
const gradeMap: Record<string,number> = {'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'F':0};
const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([{name:'',grade:'A',credits:'3'},{name:'',grade:'B',credits:'3'}]);
  const add = () => setCourses([...courses,{name:'',grade:'A',credits:'3'}]);
  const remove = (i:number) => setCourses(courses.filter((_,j)=>j!==i));
  const update = (i:number, k:keyof Course, v:string) => setCourses(courses.map((c,j)=>j===i?{...c,[k]:v}:c));
  const valid = courses.filter(c=>c.credits&&parseFloat(c.credits)>0&&gradeMap[c.grade]!==undefined);
  const totalCredits = valid.reduce((s,c)=>s+parseFloat(c.credits),0);
  const weighted = valid.reduce((s,c)=>s+(gradeMap[c.grade]*parseFloat(c.credits)),0);
  const gpa = totalCredits > 0 ? weighted/totalCredits : 0;
  const letterGrade = gpa>=3.7?'A':gpa>=3.3?'A-':gpa>=3.0?'B+':gpa>=2.7?'B':gpa>=2.3?'B-':gpa>=2.0?'C+':gpa>=1.7?'C':'D';
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">GPA Calculator</h2>
        <p className="text-dark-600">Calculate your Grade Point Average from course grades and credit hours.</p>
      </div>
      <div className="space-y-3">
        {courses.map((c,i)=>(
          <div key={i} className="flex gap-2 items-center">
            <input value={c.name} onChange={e=>update(i,'name',e.target.value)} placeholder={`Course ${i+1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"/>
            <select value={c.grade} onChange={e=>update(i,'grade',e.target.value)} className="px-3 py-2 border border-gray-300 rounded-xl text-sm">
              {Object.keys(gradeMap).map(g=><option key={g}>{g}</option>)}</select>
            <input type="number" value={c.credits} onChange={e=>update(i,'credits',e.target.value)} placeholder="3" className="w-16 px-3 py-2 border border-gray-300 rounded-xl text-sm"/>
            <button onClick={()=>remove(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">✕</button>
          </div>
        ))}
        <button onClick={add} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-dark-500 hover:border-primary-400 hover:text-primary-600 transition-colors text-sm font-medium">+ Add Course</button>
      </div>
      {totalCredits > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-xl p-5 text-center border border-primary-100"><div className="text-3xl font-bold text-primary-600">{gpa.toFixed(2)}</div><div className="text-sm text-dark-600 mt-1">GPA</div></div>
          <div className="bg-indigo-50 rounded-xl p-5 text-center border border-indigo-100"><div className="text-3xl font-bold text-indigo-600">{letterGrade}</div><div className="text-sm text-dark-600 mt-1">Letter Grade</div></div>
          <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200"><div className="text-3xl font-bold text-dark-700">{totalCredits}</div><div className="text-sm text-dark-600 mt-1">Total Credits</div></div>
        </div>
      )}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">How to Use</h3>
        <ol className="space-y-2 text-dark-700 text-sm list-decimal list-inside">
          <li>Enter your course name, letter grade, and credit hours</li><li>Add as many courses as needed</li><li>Your GPA is calculated automatically</li>
        </ol>
      </div>
    </div>
  );
};
export default GPACalculator;
