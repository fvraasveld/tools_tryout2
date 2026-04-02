import React, { useState } from 'react';

const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [separator, setSeparator] = useState('-');

  const generateSlug = () => {
    let result = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, separator) // Replace spaces and underscores with separator
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing separators
    
    setSlug(result);
  };

  React.useEffect(() => {
    if (input) generateSlug();
  }, [input, separator]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Input Text</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert to slug..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Separator</label>
        <select
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value=".">Dot (.)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Generated Slug</label>
        <div className="p-4 bg-gray-50 border rounded-lg font-mono text-lg break-all">
          {slug || <span className="text-gray-400">Your slug will appear here...</span>}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(slug)}
          disabled={!slug}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Copy Slug
        </button>
        <button
          onClick={() => { setInput(''); setSlug(''); }}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Clear
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Slugs are URL-friendly versions of text. They're lowercase, use separators instead of spaces, and remove special characters.
        </p>
      </div>
    </div>
  );
};

export default SlugGenerator;
