import React, { useState } from 'react';

const WhitespaceRemover: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeWhitespace = () => {
    let result = input
      .replace(/ +/g, ' ') // Multiple spaces to single space
      .replace(/\n\n+/g, '\n\n') // Multiple line breaks to double line break
      .split('\n')
      .map(line => line.trim()) // Trim each line
      .join('\n');
    
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with multiple spaces and line breaks..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Cleaned Text</label>
          <textarea
            value={output}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="w-full h-64 p-4 border rounded-lg bg-gray-50 resize-none font-mono"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={removeWhitespace}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Remove Extra Whitespace
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
        >
          Copy Result
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); }}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default WhitespaceRemover;
