import React, { useState } from 'react';

const MarkdownToHTML: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.');

  const markdownToHTML = (md: string) => {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
    
    // Line breaks
    html = html.replace(/\n$/gim, '<br />');
    
    return html;
  };

  const html = markdownToHTML(markdown);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Markdown Input</label>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="# Heading&#10;**Bold text**"
          className="textarea-field font-mono"
          rows={10}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold">HTML Output</label>
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Copy HTML
          </button>
        </div>
        <textarea
          value={html}
          readOnly
          className="textarea-field bg-gray-50 font-mono"
          rows={10}
        />
      </div>

      <div className="bg-white border-2 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Preview</h3>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default MarkdownToHTML;
