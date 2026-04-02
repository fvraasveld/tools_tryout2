import React, { useState, useEffect } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  useEffect(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(words / 200);

    setStats({ characters: chars, charactersNoSpaces: charsNoSpaces, words, sentences, paragraphs, readingTime });
  }, [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.words}</div>
          <div className="text-sm text-gray-600">Words</div>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.characters}</div>
          <div className="text-sm text-gray-600">Characters</div>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-gray-600">No Spaces</div>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.sentences}</div>
          <div className="text-sm text-gray-600">Sentences</div>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600">Paragraphs</div>
        </div>
        <div className="p-4 bg-white border rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{stats.readingTime}</div>
          <div className="text-sm text-gray-600">Min read</div>
        </div>
      </div>
      <button onClick={() => setText('')} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        Clear
      </button>
    </div>
  );
};

export default WordCounter;
