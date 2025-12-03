# Deployment Guide 🚀

This guide will help you deploy the Faculty Performance Dashboard to various platforms.

## 📋 Prerequisites

- A GitHub account
- Git installed on your local machine
- The repository files

## 🌐 Deploy to GitHub Pages (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right and select **New repository**
3. Name your repository (e.g., `faculty-dashboard`)
4. Choose **Public** (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd faculty-dashboard

# Add the remote repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/faculty-dashboard.git

# Push your code
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
5. The workflow will automatically deploy your site
6. Wait 1-2 minutes for the deployment to complete
7. Your site will be live at: `https://YOUR-USERNAME.github.io/faculty-dashboard/`

## 🎯 Alternative Deployment Options

### Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Click **Add new site** → **Import an existing project**
4. Connect your GitHub account and select the repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. Click **Deploy site**
7. Your site will be live at a Netlify URL (e.g., `random-name.netlify.app`)
8. You can customize the domain in site settings

### Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up or log in
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click **Deploy**
7. Your site will be live at a Vercel URL (e.g., `faculty-dashboard.vercel.app`)

### Deploy to Your Own Server

If you have your own web server:

```bash
# Copy files to your web server
scp -r faculty-dashboard/* user@yourserver.com:/var/www/html/

# Or use FTP/SFTP client to upload all files
```

Make sure your web server is configured to serve static files.

## 🔧 Custom Domain Setup

### GitHub Pages with Custom Domain

1. Purchase a domain from a registrar (e.g., Namecheap, GoDaddy)
2. In your repository settings → Pages:
   - Enter your custom domain (e.g., `dashboard.yourdomain.com`)
   - Click **Save**
3. In your domain registrar's DNS settings, add:
   - Type: `CNAME`
   - Name: `dashboard` (or `@` for root domain)
   - Value: `YOUR-USERNAME.github.io`
   - TTL: 3600
4. Wait for DNS propagation (can take up to 48 hours)
5. Enable **Enforce HTTPS** in GitHub Pages settings

### Netlify with Custom Domain

1. In Netlify site settings → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions provided
4. Netlify automatically provisions SSL certificate

## 🔄 Updating Your Deployment

After making changes to your code:

```bash
# Stage your changes
git add .

# Commit your changes
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

The site will automatically redeploy (if using GitHub Actions, Netlify, or Vercel).

## 🐛 Troubleshooting

### GitHub Pages not working

- Ensure repository is public
- Check that GitHub Actions workflow completed successfully (Actions tab)
- Verify the Pages source is set to "GitHub Actions"
- Clear browser cache and try again

### Charts not displaying

- Check browser console for JavaScript errors
- Ensure all CDN resources are loading (Bootstrap, Chart.js)
- Verify `consolidated_data.js` is properly formatted

### 404 Errors

- For GitHub Pages, ensure you're accessing the correct URL
- Check that all file paths are relative (not absolute)
- Verify `index.html` is in the root directory

## 📞 Need Help?

- Check the [README.md](README.md) for general information
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub for specific problems

---

Happy deploying! 🎉
