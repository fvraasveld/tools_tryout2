import React from 'react';

// Orange rounded-square with white SVG icon — consistent across all tools
const icons: Record<string, React.ReactNode> = {
  // TEXT
  'word-counter': <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>,
  'case-converter': <><path d="M4 7c0-1.1.9-2 2-2h3l2 4H9l-1 4H5l1-4H4V7z"/><path d="M12 7c0-1.1.9-2 2-2h3l2 4h-2l-1 4h-3l1-4h-2V7z"/></>,
  'remove-duplicates': <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  'slug-generator': <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  'lorem-ipsum': <><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></>,
  'whitespace-remover': <><polyline points="4,7 4,4 20,4 20,7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
  'text-diff': <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  'line-sorter': <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/><polyline points="17,15 21,19 17,23"/></>,
  'character-counter': <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,

  // DEVELOPER
  'json-to-csv': <><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></>,
  'csv-to-json': <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></>,
  'base64-encoder': <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  'uuid-generator': <><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 11h4M14 11h4"/></>,
  'url-encoder': <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  'html-encoder': <><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></>,
  'json-formatter': <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></>,
  'markdown-to-html': <><path d="M12 3L2 9l10 6 10-6-10-6z"/><path d="M2 17l10 6 10-6"/><path d="M2 12l10 6 10-6"/></>,
  'timestamp-converter': <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
  'css-units-converter': <><path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M14 14h6v6h-6z"/><path d="M4 14h6v6H4z"/></>,
  'image-to-data-url': <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></>,

  // CONVERTERS
  'rgb-to-hex': <><circle cx="12" cy="12" r="10" fill="none"/><path d="M12 2a10 10 0 000 20" fill="white" opacity="0.3"/><path d="M9 12h6M12 9v6"/></>,
  'unit-converter': <><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></>,
  'image-resizer': <><rect x="3" y="3" width="10" height="10"/><rect x="11" y="11" width="10" height="10"/><path d="M16 3h5v5"/><path d="M21 3l-6 6"/></>,
  'image-format-converter': <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></>,
  'image-compressor': <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><line x1="12" y1="17" x2="12" y2="11"/><line x1="9" y1="14" x2="15" y2="14"/></>,
  'text-to-pdf': <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  'color-name-finder': <><path d="M12 22s8-4.5 8-11.8A8 8 0 0012 2a8 8 0 00-8 8.2c0 7.3 8 11.8 8 11.8z"/></>,
  'time-converter': <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 8,14"/></>,
  'temperature-converter': <><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></>,
  'speed-converter': <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,10"/><path d="M4.93 4.93l14.14 14.14"/></>,

  // CALCULATORS
  'bmi-calculator': <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
  'loan-calculator': <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
  'percentage-calculator': <><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
  'tip-calculator': <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></>,
  'age-calculator': <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  'discount-calculator': <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  'vat-calculator': <><path d="M2 9V7c0-1.1.9-2 2-2h16a2 2 0 012 2v2"/><path d="M2 9h20v12H2z"/><path d="M10 13h4"/></>,
  'calorie-calculator': <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  'fuel-calculator': <><line x1="3" y1="22" x2="21" y2="22"/><line x1="4" y1="9" x2="4" y2="22"/><path d="M14 9V4l5 5"/><path d="M4 9h14"/><path d="M10 9v13"/></>,
  'gpa-calculator': <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
  'mortgage-calculator': <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
  'currency-converter': <><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
  'date-calculator': <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></>,
  'area-calculator': <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/></>,
  'volume-calculator': <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></>,

  // PRODUCTIVITY
  'password-generator': <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><line x1="12" y1="15" x2="12" y2="17"/></>,
  'invoice-generator': <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></>,
  'youtube-transcript': <><polygon points="5,3 19,12 5,21 5,3"/></>,

  // CREATIVE
  'qr-code-generator': <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3"/><rect x="16" y="5" width="3" height="3"/><rect x="16" y="16" width="3" height="3"/><rect x="5" y="16" width="3" height="3"/></>,
  'color-picker': <><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12.5" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>,
  'hashtag-generator': <><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>,
  'random-name-generator': <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  'html-table-generator': <><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></>,

  // FINANCIAL
  'budget-planner': <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  'trip-splitter': <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  'take-home-pay': <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
  // HEALTH
  'running-pace-converter': <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 2"/><path d="M16.24 7.76A6 6 0 0112 18"/></>,
  'healthy-food-swaps': <><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M8 12h8M12 8v8"/></>,
  'food-calorie-lookup': <><path d="M2.27 21.7s.97-9.5 10.71-10.35c9.73-.85 11.27-8.12 11.27-8.12"/><path d="M5 17c.8-3.6 3.8-7 9-7"/><path d="M19 7c-1-1-3-2-5-2"/></>,
};

// Fallback for unknown icons
const FallbackIcon = () => (
  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 14h-1v-5h2v5h-1zm0-7a1 1 0 110-2 1 1 0 010 2z" fill="white" stroke="none"/>
);

interface ToolIconProps {
  toolId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ToolIcon: React.FC<ToolIconProps> = ({ toolId, size = 'md', className = '' }) => {
  const sizeMap = { sm: 36, md: 48, lg: 64 };
  const svgSize = { sm: 18, md: 22, lg: 30 };
  const px = sizeMap[size];
  const sp = svgSize[size];
  const r = size === 'sm' ? 8 : size === 'md' ? 10 : 14;
  const icon = icons[toolId];

  return (
    <div
      className={className}
      style={{
        width: px,
        height: px,
        borderRadius: r,
        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(249,115,22,0.30)',
      }}
    >
      <svg
        width={sp}
        height={sp}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon || <FallbackIcon />}
      </svg>
    </div>
  );
};

export default ToolIcon;
