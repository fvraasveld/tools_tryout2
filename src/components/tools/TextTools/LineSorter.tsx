import React, { useState } from 'react';

const LineSorter: React.FC = () => {
  const [input, setInput] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortType, setSortType] = useState<'alphabetical' | 'numerical'>('alphabetical');

  const sortLines = () => {
    const lines = input.split('\n').filter(line => line.trim());
    
    const sorted = [...lines].sort((a, b) => {
      if (sortType === 'numerical') {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      } else {
        return sortOrder === 'asc' 
          ? a.localeCompare(b) 
          : b.localeCompare(a);
      }
    });

    return sorted.join('\n');
  };

  const sorted = sortLines();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Sort Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSortType('alphabetical')}
              className={`px-4 py-2 rounded-lg font-semibold ${sortType === 'alphabetical' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              A-Z
            </button>
            <button
              onClick={() => setSortType('numerical')}
              className={`px-4 py-2 rounded-lg font-semibold ${sortType === 'numerical' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              0-9
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Order</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-4 py-2 rounded-lg font-semibold ${sortOrder === 'asc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Ascending
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-4 py-2 rounded-lg font-semibold ${sortOrder === 'desc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Descending
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Input (one item per line)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter lines to sort..."
          className="textarea-field"
          rows={10}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold">Sorted Output</label>
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Copy
          </button>
        </div>
        <textarea
          value={sorted}
          readOnly
          className="textarea-field bg-gray-50"
          rows={10}
        />
      </div>
    </div>
  );
};

export default LineSorter;
