import React, { useState } from 'react';

const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = (type: string) => {
    let result = '';
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        break;
      case 'sentence':
        result = input.toLowerCase().replace(/(^\w|\.\s+\w)/g, l => l.toUpperCase());
        break;
      case 'camel':
        result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case 'snake':
        result = input.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_');
        break;
    }
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button onClick={() => convert('upper')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          UPPERCASE
        </button>
        <button onClick={() => convert('lower')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          lowercase
        </button>
        <button onClick={() => convert('title')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          Title Case
        </button>
        <button onClick={() => convert('sentence')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          Sentence case
        </button>
        <button onClick={() => convert('camel')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          camelCase
        </button>
        <button onClick={() => convert('snake')} className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
          snake_case
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Output</label>
        <textarea
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          className="w-full h-32 p-4 border rounded-lg bg-gray-50 resize-none"
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
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold">
          Clear
        </button>
      </div>
    </div>
  );
};

export default CaseConverter;
