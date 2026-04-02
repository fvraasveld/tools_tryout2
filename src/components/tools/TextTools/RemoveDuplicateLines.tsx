import React, { useState } from 'react';

const RemoveDuplicateLines: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const seen = new Set<string>();
    const result: string[] = [];

    lines.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    });

    setOutput(result.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter lines of text here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Output (Duplicates Removed)</label>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="w-full h-64 p-4 border rounded-lg bg-gray-50 resize-none font-mono"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Case Sensitive</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          onClick={removeDuplicates}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Remove Duplicates
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); }}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Clear
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Copy Result
        </button>
      </div>
    </div>
  );
};

export default RemoveDuplicateLines;
