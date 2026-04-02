import React, { useState } from 'react';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        const encoded = btoa(input);
        setOutput(encoded);
      } else {
        const decoded = atob(input);
        setOutput(decoded);
      }
    } catch (e) {
      setError('Invalid input for ' + mode);
      setOutput('');
    }
  };

  React.useEffect(() => {
    if (input) process();
    else setOutput('');
  }, [input, mode]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <label className="font-semibold">Mode:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Input ({mode === 'encode' ? 'Plain Text' : 'Base64 String'})
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-mono"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Output ({mode === 'encode' ? 'Base64 String' : 'Plain Text'})
        </label>
        <textarea
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="w-full h-40 p-4 border rounded-lg bg-gray-50 resize-none font-mono"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(output)}
          disabled={!output}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
        >
          Copy Result
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Base64Tool;
