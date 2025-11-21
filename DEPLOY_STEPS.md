# Step-by-Step Netlify Deployment Guide

Follow these steps carefully to deploy your portfolio to Netlify.

## Prerequisites Checklist

Before starting, make sure you have:
- ✅ A GitHub account (if you don't have one, create it at https://github.com)
- ✅ Your code is ready to deploy
- ✅ A Gmail account (for contact form functionality)

---

## STEP 1: Prepare Your Code

### 1.1 Check Your Files
Make sure these files exist in your project:
- ✅ `netlify.toml` (in root directory)
- ✅ `netlify/functions/contact.js`
- ✅ `netlify/functions/resume.js`
- ✅ `netlify/functions/resume.pdf`
- ✅ `fronted/package.json`

### 1.2 Test Your Build Locally (Optional but Recommended)
Open PowerShell/Command Prompt in your project directory and run:

```bash
cd fronted
npm install
npm run build
```

If the build succeeds, you're good to go! If there are errors, fix them first.

---

## STEP 2: Push Code to GitHub

### 2.1 Initialize Git (if not already done)
Open PowerShell/Command Prompt in your project root directory (`MY_Portfolio`):

```bash
git init
```

### 2.2 Create .gitignore (if not exists)
Make sure you have a `.gitignore` file in the root. It should include:
```
node_modules/
.env
.env.local
build/
dist/
.DS_Store
```

### 2.3 Add and Commit Your Files
```bash
git add .
git commit -m "Prepare for Netlify deployment"
```

### 2.4 Create GitHub Repository
1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `my-portfolio` (or any name you like)
4. Description: "My Portfolio Website"
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (you already have files)
7. Click **"Create repository"**

### 2.5 Push to GitHub
GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

**Note:** If you're asked for credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)
  - To create one: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Give it "repo" permissions

---

## STEP 3: Deploy to Netlify

### 3.1 Create Netlify Account
1. Go to https://www.netlify.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Netlify to access your GitHub account

### 3.2 Import Your Project
1. In Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify if prompted
5. Find and select your repository (`my-portfolio` or whatever you named it)
6. Click **"Import"**

### 3.3 Configure Build Settings
Netlify should auto-detect settings from `netlify.toml`, but verify these:

**Build settings:**
- **Base directory:** `fronted`
- **Build command:** `npm run build`
- **Publish directory:** `fronted/build`

**If you need to set manually:**
1. Click **"Show advanced"** or **"Edit settings"**
2. Set the values above
3. Click **"Deploy site"**

### 3.4 Wait for Deployment
- Netlify will start building your site
- This takes 2-5 minutes
- You'll see build logs in real-time
- Wait for "Site is live" message

---

## STEP 4: Configure Environment Variables

### 4.1 Get Gmail App Password
1. Go to https://myaccount.google.com
2. Click **"Security"** in the left menu
3. Enable **"2-Step Verification"** if not already enabled
4. Scroll down and click **"App passwords"**
5. Select app: **"Mail"**
6. Select device: **"Other (Custom name)"** → Type "Netlify"
7. Click **"Generate"**
8. **Copy the 16-character password** (you'll need this!)

### 4.2 Add Environment Variables in Netlify
1. In Netlify dashboard, go to your site
2. Click **"Site settings"** (top menu)
3. Click **"Environment variables"** (left sidebar)
4. Click **"Add variable"**
5. Add first variable:
   - **Key:** `EMAIL_USER`
   - **Value:** Your Gmail address (e.g., `yourname@gmail.com`)
   - Click **"Save"**
6. Add second variable:
   - **Key:** `EMAIL_PASS`
   - **Value:** The 16-character app password you copied
   - Click **"Save"**

### 4.3 Redeploy Site
After adding environment variables:
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete

---

## STEP 5: Test Your Deployment

### 5.1 Visit Your Site
1. In Netlify dashboard, you'll see your site URL (e.g., `https://your-site-name.netlify.app`)
2. Click the URL to visit your site
3. Check that everything loads correctly

### 5.2 Test Contact Form
1. Scroll to the Contact section
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the message

### 5.3 Test Resume Download
1. Scroll to the Resume section
2. Click "Download Resume"
3. Verify the PDF downloads correctly

---

## STEP 6: Custom Domain (Optional)

If you want a custom domain (e.g., `yourname.com`):

1. In Netlify dashboard → **"Site settings"** → **"Domain management"**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow Netlify's instructions to configure DNS
5. Wait for DNS propagation (can take up to 24 hours)

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Make sure all dependencies are in `package.json`
- Verify Node version is 18 (set in `netlify.toml`)

### Contact Form Not Working
- Verify environment variables are set correctly
- Check function logs: **"Functions"** tab → Click on function → View logs
- Make sure Gmail app password is correct

### Resume Not Downloading
- Verify `resume.pdf` exists in `netlify/functions/` directory
- Check function logs for errors
- Try accessing `/api/resume` directly in browser

### Site Not Loading
- Check if build completed successfully
- Verify publish directory is `fronted/build`
- Clear browser cache and try again

---

## Quick Reference Commands

```bash
# Build locally
cd fronted
npm run build

# Git commands
git add .
git commit -m "Your message"
git push origin main

# Netlify CLI (alternative method)
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Success Checklist

After deployment, verify:
- ✅ Site loads at your Netlify URL
- ✅ All sections display correctly
- ✅ Contact form sends emails
- ✅ Resume downloads successfully
- ✅ Mobile responsive design works
- ✅ No console errors in browser

---

## Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://www.netlify.com/support
- **GitHub Help:** https://docs.github.com

---

**Congratulations! Your portfolio is now live on the internet! 🎉**

