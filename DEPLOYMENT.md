# Deployment Guide for QuickToolkits.com

This guide covers deploying QuickToolkits to various hosting platforms.

## Prerequisites

- GitHub account
- Project pushed to a GitHub repository
- Project built successfully locally (`npm run build`)

## Option 1: Netlify (Recommended)

### Via Netlify UI

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/quicktoolkits.git
   git push -u origin main
   ```

2. **Sign in to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub

3. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add custom domain
   - Configure DNS settings

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Option 2: Vercel

### Via Vercel UI

1. **Push to GitHub** (same as above)

2. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

3. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite
   - Click "Deploy"

### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/quicktoolkits"
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/quicktoolkits/', // Your repo name
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Save

## Option 4: Custom VPS (DigitalOcean, AWS, etc.)

### Using Nginx

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist folder to server**
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/quicktoolkits
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name quicktoolkits.com;
       root /var/www/quicktoolkits;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

## Environment Variables

If you need environment variables:

1. **Create `.env` file** (don't commit this!)
   ```
   VITE_API_URL=https://api.example.com
   VITE_GA_ID=UA-XXXXXXXXX-X
   ```

2. **Access in code**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. **Configure in hosting platform**
   - Netlify: Site settings → Build & deploy → Environment
   - Vercel: Project settings → Environment Variables
   - GitHub Pages: Use GitHub Secrets

## SEO Optimization

### 1. Add robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://quicktoolkits.com/sitemap.xml
```

### 2. Generate Sitemap

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://quicktoolkits.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://quicktoolkits.com/tools/json-to-csv</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add more tool URLs -->
</urlset>
```

### 3. Meta Tags

Already included in `index.html` but customize for each tool page.

## Performance Optimization

1. **Enable Compression**
   - Netlify/Vercel: Automatic
   - Nginx: Enable gzip (see config above)

2. **CDN**
   - Netlify/Vercel: Automatic global CDN
   - Custom: Use CloudFlare

3. **Caching**
   Already optimized by Vite build

## Monitoring

### Google Analytics

1. Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console

1. Verify ownership
2. Submit sitemap
3. Monitor performance

## Troubleshooting

### Routing Issues (404 on refresh)

**Netlify**: Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Build Failures

1. Check Node version (use 18+)
2. Clear node_modules and reinstall
3. Check build logs for specific errors

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Routing works (test by refreshing on a tool page)
- [ ] Images and assets load
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Analytics tracking (if configured)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (should be automatic)
- [ ] Test all tools functionality
- [ ] Check performance (Google PageSpeed Insights)

## Continuous Deployment

All platforms support automatic deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```

2. **Automatic Build**
   - Netlify/Vercel automatically rebuild and deploy
   - Usually takes 1-2 minutes

## Cost Estimate

- **Netlify Free Tier**: 100GB bandwidth/month
- **Vercel Free Tier**: 100GB bandwidth/month
- **GitHub Pages**: Free (no custom server-side logic)
- **Custom VPS**: $5-20/month depending on provider

## Support

If you encounter issues:
1. Check platform status pages
2. Review build logs
3. Test locally first
4. Check platform documentation
5. Community forums

---

Happy deploying! 🚀
