import React, { useState } from 'react';

const ImageToDataURL: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [dataURL, setDataURL] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        setDataURL(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dataURL);
  };

  const getSize = () => {
    if (!dataURL) return '0 KB';
    const bytes = Math.round((dataURL.length * 3) / 4);
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-3 border-2 rounded-lg"
        />
      </div>

      {image && (
        <>
          <div className="bg-white border-2 rounded-lg p-6 text-center">
            <img src={image} alt="Preview" className="max-w-full max-h-64 mx-auto border rounded" />
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="font-semibold mb-2">Data URL Size: {getSize()}</div>
            <div className="text-sm text-gray-700">Use this in HTML/CSS as: src="data:image/..."</div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold">Data URL</label>
              <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Copy
              </button>
            </div>
            <textarea
              value={dataURL}
              readOnly
              className="w-full p-3 border-2 rounded-lg bg-gray-50 font-mono text-xs"
              rows={8}
            />
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="font-semibold mb-2">⚠️ Note:</div>
            <div className="text-sm text-gray-700">
              Data URLs are Base64 encoded and ~33% larger than the original file. Best for small images or inline embedding.
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageToDataURL;
