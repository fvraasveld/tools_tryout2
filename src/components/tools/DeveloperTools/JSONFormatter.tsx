import React, { useState } from 'react';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setError('');
      return JSON.stringify(parsed, null, indent);
    } catch (e) {
      setError('Invalid JSON');
      return '';
    }
  };

  const output = formatJSON();

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-sm font-semibold mb-2">Indent Size</label>
          <div className="flex gap-2">
            {[2, 4, 8].map(size => (
              <button
                key={size}
                onClick={() => setIndent(size)}
                className={`px-4 py-2 rounded-lg font-semibold ${indent === size ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {size} spaces
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={minify}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold mt-6"
        >
          Minify
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"John","age":30}'
          className="textarea-field font-mono"
          rows={10}
        />
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold">Formatted JSON</label>
            <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="textarea-field bg-gray-50 font-mono"
            rows={10}
          />
        </div>
      )}
    </div>
  );
};

export default JSONFormatter;
