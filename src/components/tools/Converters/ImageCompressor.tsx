import React, { useState, useRef } from 'react';

const ImageCompressor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
        }
      }, 'image/jpeg', quality);
    };
    img.src = image;
  };

  const downloadCompressed = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'compressed-image.jpg';
    link.href = canvasRef.current.toDataURL('image/jpeg', quality);
    link.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const savings = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

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
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="font-semibold mb-2">Original Size: {formatBytes(originalSize)}</div>
            {compressedSize > 0 && (
              <>
                <div className="font-semibold text-green-600">Compressed Size: {formatBytes(compressedSize)}</div>
                <div className="text-sm mt-2">Savings: {savings}% smaller!</div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Quality: {Math.round(quality * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Low Quality (Smaller)</span>
              <span>High Quality (Larger)</span>
            </div>
          </div>

          <button
            onClick={compressImage}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Compress Image
          </button>

          <canvas ref={canvasRef} className="border-2 rounded-lg max-w-full" />

          {compressedSize > 0 && (
            <button
              onClick={downloadCompressed}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Download Compressed Image
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCompressor;
