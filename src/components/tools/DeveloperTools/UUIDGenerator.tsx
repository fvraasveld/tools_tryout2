import React, { useState } from 'react';

const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);

  const generateUUID = () => {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    if (!hyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    
    if (uppercase) {
      uuid = uuid.toUpperCase();
    }
    
    return uuid;
  };

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Number of UUIDs</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            min="1"
            max="100"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="uppercase" className="text-sm">Uppercase</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hyphens"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="hyphens" className="text-sm">Include Hyphens</label>
        </div>
      </div>

      <button
        onClick={generate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Generate UUID{count > 1 ? 's' : ''}
      </button>

      <div>
        <label className="block text-sm font-semibold mb-2">Generated UUIDs</label>
        <div className="p-4 bg-gray-50 border rounded-lg max-h-96 overflow-y-auto">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center justify-between p-2 hover:bg-white rounded">
              <code className="font-mono text-sm">{uuid}</code>
              <button
                onClick={() => navigator.clipboard.writeText(uuid)}
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
          onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
        >
          Copy All
        </button>
        <button
          onClick={() => setUuids([])}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default UUIDGenerator;
