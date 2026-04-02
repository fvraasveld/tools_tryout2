import React, { useState } from 'react';

const CSVToJSON: React.FC = () => {
  const [csv, setCsv] = useState('name,age,city\nJohn,30,NYC\nJane,25,LA');
  const [json, setJson] = useState('');

  const convertToJSON = () => {
    try {
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

      setJson(JSON.stringify(result, null, 2));
    } catch (e) {
      setJson('Error: Invalid CSV format');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
  };

  const downloadJSON = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">CSV Input</label>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="name,age,city&#10;John,30,NYC"
          className="textarea-field font-mono"
          rows={10}
        />
      </div>

      <button
        onClick={convertToJSON}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Convert to JSON
      </button>

      {json && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold">JSON Output</label>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                Copy
              </button>
              <button onClick={downloadJSON} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                Download
              </button>
            </div>
          </div>
          <textarea
            value={json}
            readOnly
            className="textarea-field bg-gray-50 font-mono"
            rows={12}
          />
        </div>
      )}
    </div>
  );
};

export default CSVToJSON;
