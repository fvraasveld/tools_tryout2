# 🚀 Quick Start Guide for QuickToolkits

Welcome! This guide will help you get the project running in minutes.

## Step 1: Prerequisites

Make sure you have installed:
- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)

Verify installation:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

## Step 2: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (~2-3 minutes).

## Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the QuickToolkits homepage! 🎉

## What You'll See

1. **Homepage**: A hero section with search and tool categories
2. **Tools Grid**: 16 tools organized by category
3. **JSON to CSV Tool**: Click on it to see a fully working example
4. **Other Tools**: Show placeholder screens with implementation guides

## Next Steps

### Try the Working Example

1. Click on "JSON to CSV" tool
2. Click "Load Example" to see sample data
3. Click "Convert to CSV"
4. Try copying or downloading the result

### Add Your Own Tool

Follow the detailed guide in README.md section "Adding New Tools"

### Customize the Design

Edit `tailwind.config.js` to change colors and styling

## Common Issues & Solutions

### Issue: `npm install` fails

**Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Issue: Port 3000 already in use

**Solution**: Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any available port
}
```

### Issue: Blank white screen

**Solution**: 
1. Check browser console for errors (F12)
2. Make sure all files were created correctly
3. Try clearing browser cache

## Development Tips

### Hot Module Replacement

Vite supports HMR - your changes will appear instantly without refresh!

### File Structure

```
src/
├── components/   ← Add new components here
├── pages/        ← Add new pages here  
├── context/      ← State management
├── hooks/        ← Custom React hooks
├── utils/        ← Helper functions
└── data/         ← Tool definitions
```

### Adding a New Tool - Quick Version

1. Add tool definition to `src/data/tools.json`
2. Create component in `src/components/tools/[Category]/YourTool.tsx`
3. Add route case in `src/pages/ToolDetailPage.tsx`
4. Test at `/tools/your-tool-id`

## Building for Production

When ready to deploy:

```bash
npm run build
```

Output will be in `dist/` folder - ready to upload to any hosting service!

## Need Help?

- 📖 Full documentation in `README.md`
- 🚀 Deployment guide in `DEPLOYMENT.md`
- 💡 Check JSON to CSV component for implementation example
- 🐛 Open an issue on GitHub

---

Happy coding! 🛠️
