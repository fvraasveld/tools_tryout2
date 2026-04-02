import React, { useState } from 'react';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');

  const getCharFrequency = () => {
    const freq: { [key: string]: number } = {};
    
    for (const char of text) {
      if (char.trim()) {
        freq[char] = (freq[char] || 0) + 1;
      }
    }

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  };

  const frequency = getCharFrequency();
  const totalChars = text.replace(/\s/g, '').length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze character frequency..."
          className="textarea-field"
          rows={8}
        />
      </div>

      {frequency.length > 0 && (
        <div className="bg-white border-2 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Character Frequency (Top 20)</h3>
          <div className="text-sm text-gray-600 mb-4">Total characters (excluding spaces): {totalChars}</div>
          <div className="space-y-2">
            {frequency.map(([char, count]) => {
              const percentage = ((count / totalChars) * 100).toFixed(1);
              return (
                <div key={char} className="flex items-center gap-4">
                  <div className="w-12 text-center font-mono font-bold text-lg border rounded p-2">
                    {char}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-20 text-right font-semibold">
                        {count} ({percentage}%)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCounter;
