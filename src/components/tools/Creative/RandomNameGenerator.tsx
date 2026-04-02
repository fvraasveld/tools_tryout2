import React, { useState } from 'react';

const RandomNameGenerator: React.FC = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'full' | 'first' | 'last' | 'username'>('full');
  const [names, setNames] = useState<string[]>([]);

  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Blake', 
    'Jamie', 'Dakota', 'Skyler', 'Cameron', 'Peyton', 'Logan', 'Drew', 'Dylan', 'Hunter', 'Parker'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 
    'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];

  const adjectives = ['Cool', 'Swift', 'Bright', 'Bold', 'Quick', 'Silent', 'Cosmic', 'Electric', 'Golden', 'Shadow'];
  const nouns = ['Tiger', 'Phoenix', 'Dragon', 'Wolf', 'Eagle', 'Falcon', 'Bear', 'Lion', 'Hawk', 'Storm'];

  const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generate = () => {
    const generated: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let name = '';
      
      switch (type) {
        case 'first':
          name = randomItem(firstNames);
          break;
        case 'last':
          name = randomItem(lastNames);
          break;
        case 'full':
          name = `${randomItem(firstNames)} ${randomItem(lastNames)}`;
          break;
        case 'username':
          const num = Math.floor(Math.random() * 999);
          name = `${randomItem(adjectives)}${randomItem(nouns)}${num}`.toLowerCase();
          break;
      }
      
      generated.push(name);
    }
    
    setNames(generated);
  };

  React.useEffect(() => {
    generate();
  }, [count, type]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Name Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="full">Full Name</option>
            <option value="first">First Name Only</option>
            <option value="last">Last Name Only</option>
            <option value="username">Username</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Number of Names</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            min="1"
            max="50"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Generate Names
      </button>

      {names.length > 0 && (
        <>
          <div>
            <label className="block text-sm font-semibold mb-2">Generated Names</label>
            <div className="p-4 bg-gray-50 border rounded-lg max-h-96 overflow-y-auto">
              {names.map((name, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white rounded mb-1">
                  <span className="font-mono">{name}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(name)}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(names.join('\n'))}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Copy All
            </button>
            <button
              onClick={() => setNames([])}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
            >
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomNameGenerator;
