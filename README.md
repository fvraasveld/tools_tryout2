# QuickToolkits.com

🛠️ **Your all-in-one platform for free online tools and utilities**

A modern, fast, and privacy-focused collection of online tools built with React, TypeScript, and Tailwind CSS. All processing happens client-side - your data never leaves your browser!

## ✨ Features

- 🎯 **16+ Tools** across 5 categories (Text, File, Developer, Calculator, Creative)
- 🔒 **100% Client-Side Processing** - Your data stays private
- ⚡ **Instant Results** - No server delays
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI** - Beautiful design with smooth animations
- 🆓 **Free Forever** - Core tools always free
- 👑 **Premium Tier** - Optional upgrade for advanced tools
- 🔍 **Search & Filter** - Find tools quickly
- ❤️ **Favorites** - Save your most-used tools
- 📊 **Usage History** - Track your tool usage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd quicktoolkits
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
quicktoolkits/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── AdPlaceholder.tsx
│   │   │   └── ToolPlaceholder.tsx
│   │   └── tools/            # Tool implementations
│   │       ├── TextTools/
│   │       ├── FileTools/
│   │       ├── DeveloperTools/
│   │       │   └── JSONToCSV.tsx  # Example implementation
│   │       ├── Calculators/
│   │       └── CreativeTools/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ToolDetailPage.tsx
│   │   └── NotFound.tsx
│   ├── context/
│   │   ├── ToolsContext.tsx
│   │   └── UserContext.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useSearch.ts
│   │   └── useFilter.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── data/
│   │   └── tools.json         # Tool definitions
│   ├── types.ts               # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🔧 Adding New Tools

Follow these steps to add a new tool:

### 1. Add Tool to Data

Edit `src/data/tools.json`:

```json
{
  "id": "your-tool-id",
  "name": "Your Tool Name",
  "category": "Text|File|Developer|Calculator|Creative",
  "description": "What your tool does",
  "exampleInput": "Example input text",
  "free": true,
  "pagePath": "/tools/your-tool-id",
  "icon": "🔧",
  "tags": ["tag1", "tag2"],
  "createdAt": "2024-01-01"
}
```

### 2. Create Tool Component

Create a new file in the appropriate category folder:

**Example:** `src/components/tools/TextTools/YourTool.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { copyToClipboard, downloadAsFile } from '../../../utils/helpers';
import { useUser } from '../../../context/UserContext';

const YourTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { addToolToHistory } = useUser();

  useEffect(() => {
    addToolToHistory('your-tool-id');
  }, []);

  const handleProcess = () => {
    // Your tool logic here
    const result = processInput(input);
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
        <h3 className="font-display font-semibold text-lg mb-4">Input</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your input..."
          className="textarea-field"
        />
        <button onClick={handleProcess} className="btn-primary mt-4">
          Process
        </button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
          <h3 className="font-display font-semibold text-lg mb-4">Output</h3>
          <textarea
            value={output}
            readOnly
            className="textarea-field bg-dark-50"
          />
          <div className="flex space-x-2 mt-4">
            <button onClick={() => copyToClipboard(output)} className="btn-secondary">
              📋 Copy
            </button>
            <button onClick={() => downloadAsFile(output, 'output.txt')} className="btn-primary">
              ⬇️ Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourTool;
```

### 3. Add Route

Update `src/pages/ToolDetailPage.tsx`:

```typescript
import YourTool from '../components/tools/TextTools/YourTool';

// In renderToolComponent():
case 'your-tool-id':
  return <YourTool />;
```

### 4. Test

- Navigate to `/tools/your-tool-id`
- Test all functionality
- Verify responsive design

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
}
```

### Fonts

Update Google Fonts in `index.html` and `tailwind.config.js`

### Ad Integration

Replace `AdPlaceholder` components with actual ad code:

```typescript
// src/components/common/AdPlaceholder.tsx
// Replace the placeholder with your Google AdSense code
```

## 🚢 Deployment

### Deploy to Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy!

### Deploy to GitHub Pages

```bash
npm run build
# Upload dist folder to gh-pages branch
```

## 🔐 Privacy & Security

- **No Server**: All processing happens in your browser
- **No Tracking**: No analytics or user tracking (optional)
- **No Storage**: Files never uploaded to servers
- **Local Only**: User data stored only in browser localStorage

## 🧪 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **Vite** - Build tool
- **Context API** - State management
- **LocalStorage** - User preferences

## 📝 Available Tools

### Text Tools
- ✅ Word Counter (Placeholder)
- ✅ Case Converter (Placeholder)
- ✅ Remove Duplicate Lines (Placeholder)
- ✅ Slug Generator (Placeholder)

### Developer Tools
- ✅ **JSON to CSV** (Fully Implemented)
- ✅ Base64 Encoder/Decoder (Placeholder)
- ✅ UUID Generator (Placeholder)
- ✅ Timestamp Converter (Placeholder)
- ✅ Regex Tester (Placeholder)

### File Tools
- ✅ Image Compressor (Placeholder)
- 👑 PDF Merge & Split (Premium - Placeholder)

### Calculators
- ✅ Loan Calculator (Placeholder)
- ✅ Percentage Calculator (Placeholder)
- ✅ Tip & Bill Split Calculator (Placeholder)

### Creative Tools
- ✅ Hashtag Generator (Placeholder)
- ✅ Random Name Generator (Placeholder)

**Note:** Currently only JSON to CSV is fully implemented. All other tools show placeholder screens with implementation instructions. See the "Adding New Tools" section to implement additional tools.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your tool following the guide above
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For questions or issues:
- Check the code comments
- Review the JSON to CSV implementation for examples
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] Implement remaining tools
- [ ] Add user authentication (Firebase/Supabase)
- [ ] Real premium payment integration
- [ ] More advanced file tools
- [ ] API for power users
- [ ] Mobile app (React Native)
- [ ] Browser extension

---

Built with ❤️ by developers, for developers.
