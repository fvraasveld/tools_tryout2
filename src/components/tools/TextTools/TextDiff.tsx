import React, { useState } from 'react';

const TextDiff: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const getDifferences = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    const diffs = [];
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 !== line2) {
        diffs.push({
          lineNum: i + 1,
          text1: line1,
          text2: line2,
          type: !line1 ? 'added' : !line2 ? 'removed' : 'modified'
        });
      }
    }
    return diffs;
  };

  const differences = getDifferences();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Original Text</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="textarea-field"
            rows={12}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Modified Text</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="textarea-field"
            rows={12}
          />
        </div>
      </div>

      {differences.length > 0 && (
        <div className="bg-white border-2 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Differences Found: {differences.length}</h3>
          <div className="space-y-2">
            {differences.map((diff, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="text-sm font-semibold text-gray-600 mb-2">Line {diff.lineNum}</div>
                {diff.type === 'modified' && (
                  <>
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 mb-1 font-mono text-sm">
                      - {diff.text1}
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-2 font-mono text-sm">
                      + {diff.text2}
                    </div>
                  </>
                )}
                {diff.type === 'added' && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-2 font-mono text-sm">
                    + {diff.text2}
                  </div>
                )}
                {diff.type === 'removed' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-2 font-mono text-sm">
                    - {diff.text1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {differences.length === 0 && (text1 || text2) && (
        <div className="text-center p-8 bg-green-50 border-2 border-green-200 rounded-lg">
          <div className="text-4xl mb-2">✓</div>
          <p className="text-green-800 font-semibold">No differences found - texts are identical!</p>
        </div>
      )}
    </div>
  );
};

export default TextDiff;
