import React, { useState, useRef } from 'react';

const ImageFormatConverter: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState(0.9);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  };

  const downloadConverted = () => {
    if (!canvasRef.current) return;
    
    const mimeType = format === 'png' ? 'image/png' : format === 'jpeg' ? 'image/jpeg' : 'image/webp';
    const link = document.createElement('a');
    link.download = `converted-image.${format}`;
    link.href = canvasRef.current.toDataURL(mimeType, quality);
    link.click();
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
          <div>
            <label className="block text-sm font-semibold mb-2">Convert To:</label>
            <div className="flex gap-4">
              {(['png', 'jpeg', 'webp'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-6 py-3 rounded-lg font-semibold ${format === f ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {format !== 'png' && (
            <div>
              <label className="block text-sm font-semibold mb-2">Quality: {Math.round(quality * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <button
            onClick={convertImage}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Convert Image
          </button>

          <canvas ref={canvasRef} className="border-2 rounded-lg max-w-full hidden" />

          <button
            onClick={downloadConverted}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Download {format.toUpperCase()}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageFormatConverter;
