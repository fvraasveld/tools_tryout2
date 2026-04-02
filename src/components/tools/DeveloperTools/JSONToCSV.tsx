import React, { useState, useEffect } from 'react';
import { copyToClipboard, downloadAsFile } from '../../../utils/helpers';
import { useUser } from '../../../context/UserContext';

const JSONToCSV: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { addToolToHistory } = useUser();

  useEffect(() => {
    // Add to history when component mounts
    addToolToHistory('json-to-csv');
  }, []);

  const exampleJSON = `[
  {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "email": "jane@example.com",
    "city": "Los Angeles"
  },
  {
    "name": "Bob Johnson",
    "age": 35,
    "email": "bob@example.com",
    "city": "Chicago"
  }
]`;

  const convertJSONToCSV = (jsonString: string): string => {
    try {
      const data = JSON.parse(jsonString);

      if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects');
      }

      if (data.length === 0) {
        throw new Error('JSON array is empty');
      }

      // Get all unique keys from all objects
      const allKeys = new Set<string>();
      data.forEach(obj => {
        if (typeof obj !== 'object' || obj === null) {
          throw new Error('Each item in the array must be an object');
        }
        Object.keys(obj).forEach(key => allKeys.add(key));
      });

      const headers = Array.from(allKeys);

      // Create CSV header row
      const csvRows = [headers.join(',')];

      // Create CSV data rows
      data.forEach(obj => {
        const values = headers.map(header => {
          const value = obj[header];
          if (value === null || value === undefined) {
            return '';
          }
          // Escape quotes and wrap in quotes if contains comma, newline, or quote
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        });
        csvRows.push(values.join(','));
      });

      return csvRows.join('\n');
    } catch (err) {
      throw err;
    }
  };

  const handleConvert = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter JSON data');
      return;
    }

    try {
      const csv = convertJSONToCSV(input);
      setOutput(csv);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadAsFile(output, 'data.csv', 'text/csv');
  };

  const handleLoadExample = () => {
    setInput(exampleJSON);
    setError('');
    setOutput('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-dark-900">
            JSON Input
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={handleLoadExample}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Load Example
            </button>
            {input && (
              <button
                onClick={handleClear}
                className="text-sm text-dark-500 hover:text-dark-700 font-medium transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON array here..."
          className="textarea-field"
          rows={12}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleConvert}
          className="btn-primary mt-4 w-full sm:w-auto"
        >
          Convert to CSV →
        </button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg text-dark-900">
              CSV Output
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="btn-secondary text-sm"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="btn-primary text-sm"
              >
                ⬇️ Download
              </button>
            </div>
          </div>

          <textarea
            value={output}
            readOnly
            className="textarea-field bg-dark-50"
            rows={12}
          />

          <div className="mt-4 p-4 bg-secondary-50 border border-secondary-200 rounded-xl text-secondary-700 text-sm">
            ✅ Successfully converted {output.split('\n').length - 1} rows
          </div>
        </div>
      )}

      {/* How to Use */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          💡 How to Use
        </h3>
        <ul className="space-y-2 text-dark-700 text-sm">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Paste your JSON array into the input field</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Click "Convert to CSV" to transform your data</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Copy the result or download as a CSV file</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Import the CSV into Excel, Google Sheets, or any spreadsheet application</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JSONToCSV;
