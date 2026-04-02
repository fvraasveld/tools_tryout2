import React, { useState } from 'react';

const HTMLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  const encode = (str: string) => {
    return str.replace(/[&<>"']/g, (char) => htmlEntities[char]);
  };

  const decode = (str: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  };

  const output = mode === 'encode' ? encode(input) : decode(input);

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
        <label className="block text-sm font-semibold mb-2">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '<div>Hello & "World"</div>' : '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'}
          className="textarea-field"
          rows={8}
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
          rows={8}
        />
      </div>
    </div>
  );
};

export default HTMLEncoder;
