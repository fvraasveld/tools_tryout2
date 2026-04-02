import React, { useState } from 'react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://quicktoolkits.com');
  const [size, setSize] = useState(256);

  const getQRCodeURL = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = getQRCodeURL();
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Text or URL</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text, URL, or any data..."
          className="w-full p-3 border-2 rounded-lg"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Size: {size}x{size} px</label>
        <input
          type="range"
          min="128"
          max="512"
          step="64"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>128px</span>
          <span>256px</span>
          <span>512px</span>
        </div>
      </div>

      {text && (
        <div className="bg-white border-2 rounded-lg p-8 text-center">
          <img
            src={getQRCodeURL()}
            alt="QR Code"
            className="mx-auto border-4 border-gray-200 rounded-lg"
          />
          <button
            onClick={downloadQR}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
