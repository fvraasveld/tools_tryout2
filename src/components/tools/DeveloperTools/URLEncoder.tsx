import React, { useState } from 'react';

const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      return mode === 'encode' 
        ? encodeURIComponent(input)
        : decodeURIComponent(input);
    } catch (e) {
      return 'Error: Invalid input for decoding';
    }
  };

  const output = process();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setMode('encode')}
          className={`px-6 py-3 rounded-lg font-semibold ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-6 py-3 rounded-lg font-semibold ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          {mode === 'encode' ? 'Enter URL or text to encode' : 'Enter encoded URL to decode'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'https://example.com/path with spaces' : 'https%3A%2F%2Fexample.com%2Fpath'}
          className="textarea-field"
          rows={6}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold">Output</label>
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Copy
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          className="textarea-field bg-gray-50 font-mono"
          rows={6}
        />
      </div>
    </div>
  );
};

export default URLEncoder;
