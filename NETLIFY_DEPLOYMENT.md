# Netlify Deployment Guide

This guide will help you deploy your portfolio to Netlify.

## Prerequisites

1. A GitHub account
2. A Netlify account (sign up at https://www.netlify.com)
3. Your portfolio code pushed to a GitHub repository

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory:** `fronted`
   - **Build command:** `npm run build`
   - **Publish directory:** `fronted/build`
5. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   cd fronted
   npm run build
   cd ..
   netlify deploy --prod
   ```

### 3. Configure Environment Variables

After deployment, you need to set up environment variables for the email functionality:

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password (not your regular password)

   **Note:** To get a Gmail app password:
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Go to App passwords
   - Generate a new app password for "Mail"
   - Use that password as `EMAIL_PASS`

### 4. Verify Deployment

1. Visit your Netlify site URL
2. Test the contact form
3. Test the resume download

## Project Structure

```
MY_Portfolio/
├── fronted/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/              # Express backend (not used in Netlify)
├── netlify/
│   └── functions/       # Netlify serverless functions
│       ├── contact.js
│       ├── resume.js
│       ├── resume.pdf
│       └── package.json
└── netlify.toml         # Netlify configuration
```

## Important Notes

- The backend Express server is converted to Netlify serverless functions
- API endpoints are automatically available at `/api/contact` and `/api/resume`
- The resume PDF is included in the function directory
- Make sure to set environment variables in Netlify dashboard

## Troubleshooting

### Build Fails
- Check that Node version is 18 (specified in netlify.toml)
- Ensure all dependencies are in package.json
- Check build logs in Netlify dashboard

### Functions Not Working
- Verify environment variables are set correctly
- Check function logs in Netlify dashboard
- Ensure resume.pdf exists in netlify/functions/

### Resume Download Not Working
- Verify resume.pdf is in netlify/functions/ directory
- Check function logs for errors

## Support

For more information, visit:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

