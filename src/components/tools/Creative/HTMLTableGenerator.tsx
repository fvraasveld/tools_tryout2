import React, { useState } from 'react';

const HTMLTableGenerator: React.FC = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [striped, setStriped] = useState(false);

  const generateHTML = () => {
    let html = '<table';
    
    if (bordered || striped) {
      const classes = [];
      if (bordered) classes.push('bordered');
      if (striped) classes.push('striped');
      html += ` class="${classes.join(' ')}"`;
    }
    
    html += '>\n';

    if (hasHeader) {
      html += '  <thead>\n    <tr>\n';
      for (let c = 0; c < cols; c++) {
        html += `      <th>Header ${c + 1}</th>\n`;
      }
      html += '    </tr>\n  </thead>\n';
    }

    html += '  <tbody>\n';
    for (let r = 0; r < rows; r++) {
      html += '    <tr>\n';
      for (let c = 0; c < cols; c++) {
        html += `      <td>Row ${r + 1} Col ${c + 1}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';

    return html;
  };

  const generateCSS = () => {
    return `table {
  border-collapse: collapse;
  width: 100%;
}

${bordered ? `table.bordered th,
table.bordered td {
  border: 1px solid #ddd;
  padding: 8px;
}
` : ''}
${striped ? `table.striped tr:nth-child(even) {
  background-color: #f2f2f2;
}
` : ''}
th {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  text-align: left;
}`;
  };

  const html = generateHTML();
  const css = generateCSS();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Rows: {rows}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Columns: {cols}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-semibold">Include Header Row</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bordered}
            onChange={(e) => setBordered(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-semibold">Bordered</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={striped}
            onChange={(e) => setStriped(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-semibold">Striped Rows</span>
        </label>
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} className={bordered ? 'bordered-table' : striped ? 'striped-table' : ''} />
        <style>{css}</style>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold">HTML Code</label>
          <button onClick={() => copyToClipboard(html)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Copy HTML
          </button>
        </div>
        <textarea
          value={html}
          readOnly
          className="w-full p-3 border-2 rounded-lg bg-gray-50 font-mono text-sm"
          rows={10}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold">CSS Code</label>
          <button onClick={() => copyToClipboard(css)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
            Copy CSS
          </button>
        </div>
        <textarea
          value={css}
          readOnly
          className="w-full p-3 border-2 rounded-lg bg-gray-50 font-mono text-sm"
          rows={8}
        />
      </div>
    </div>
  );
};

export default HTMLTableGenerator;
