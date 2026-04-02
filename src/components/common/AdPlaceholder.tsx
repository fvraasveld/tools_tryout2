import React from 'react';

interface AdPlaceholderProps {
  slot: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot }) => {
  return (
    <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
      {/* Google AdSense code will go here */}
      <div id={`ad-${slot}`} className="w-full h-full"></div>
    </div>
  );
};

export default AdPlaceholder;
