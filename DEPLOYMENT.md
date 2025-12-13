# Deployment Guide

This guide shows you how to deploy your CodeCraft Solutions website to the cloud for free (with upgrade options).

## Option 1: Railway (Recommended - Easiest)

Railway offers $5 free credit per month, then pay-as-you-go.

### Step 1: Prepare Your Code

1. Make sure all your code is committed to git:
```bash
cd /home/peace/claude-project/company-website
git add .
git commit -m "Prepare for deployment"
```

2. Create a GitHub account if you don't have one: https://github.com

3. Create a new repository on GitHub (don't initialize with README)

4. Push your code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway

1. Go to https://railway.app and sign up (use GitHub login)

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Railway will detect it's a Node.js app

5. Click on the deployment → Settings → Set these environment variables:
   - `PORT` = `3000`
   - `JWT_SECRET` = (generate a random string, like: `k8sD9fJ2mN5pQ7rT3vX6yZ1bC4eG8hL0`)
   - `NODE_ENV` = `production`

6. In Settings → Root Directory, set to: `backend`

7. Click "Deploy"

8. Once deployed, click "Generate Domain" to get your public URL

9. Create your first admin user (using Railway CLI or via API)

### Step 3: Create Admin User

You have two options:

**Option A: Via Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run the admin creation script
railway run node backend/createAdmin.js
```

**Option B: Via API (using curl)**
```bash
# Replace YOUR_DOMAIN with your Railway URL
curl -X POST https://YOUR_DOMAIN.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@yoursite.com","password":"yourpassword"}'

# Then manually set role to admin using Railway dashboard database viewer
```

---

## Option 2: Render (Also Free to Start)

Render offers a free tier with some limitations (sleeps after inactivity).

### Step 1: Push Code to GitHub (same as Railway above)

### Step 2: Deploy to Render

1. Go to https://render.com and sign up

2. Click "New +" → "Web Service"

3. Connect your GitHub repository

4. Configure:
   - **Name**: codecraft-solutions
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   - `JWT_SECRET` = (random string)
   - `NODE_ENV` = `production`

6. Click "Create Web Service"

7. Wait for deployment (5-10 minutes)

8. Your site will be live at: `https://codecraft-solutions.onrender.com`

### Step 3: Create Admin User

Once deployed, use the render shell:

1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: `node createAdmin.js`
4. Follow prompts to create admin

---

## Option 3: DigitalOcean App Platform ($5/month after trial)

DigitalOcean offers $200 credit for 60 days, then $5/month.

### Step 1: Sign Up

1. Go to https://www.digitalocean.com
2. Sign up (you'll get $200 credit)
3. Create new "App"

### Step 2: Deploy

1. Connect your GitHub repo
2. Select the repository
3. Configure:
   - **Type**: Web Service
   - **Source Directory**: `backend`
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`

4. Set environment variables (same as above)

5. Deploy

---

## After Deployment Checklist

Once your site is deployed:

- [ ] Visit your public URL to verify it works
- [ ] Create an admin user
- [ ] Test registration at `/register.html`
- [ ] Test login at `/login.html`
- [ ] Access admin dashboard at `/admin.html`
- [ ] Update any hardcoded URLs in your code (if needed)

## Costs

### Railway
- **Free tier**: $5 credit/month (enough for small sites)
- **After free tier**: ~$5-10/month depending on usage
- **Upgrade**: Add credit card, pay for what you use

### Render
- **Free tier**: Unlimited with limitations (sleeps after 15 min inactivity, slow cold starts)
- **Paid tier**: $7/month for always-on service
- **Upgrade**: Click "Upgrade to Paid" in dashboard

### DigitalOcean
- **Trial**: $200 credit for 60 days
- **After trial**: $5/month minimum
- **Scaling**: Can upgrade to larger droplets

## Recommended: Start with Railway

Railway is the easiest to get started with:
- ✓ Simple deployment from GitHub
- ✓ Free $5 credit/month (renews monthly)
- ✓ Easy environment variable management
- ✓ Automatic HTTPS
- ✓ Built-in database viewer
- ✓ Can upgrade anytime

## Need Help?

If you run into issues:
1. Check Railway/Render logs for errors
2. Verify environment variables are set
3. Make sure your code is pushed to GitHub
4. Check that the start command is correct

## Upgrading for More Traffic

When you outgrow the free tier:

**For moderate traffic (1000s of users)**:
- Railway/Render: $7-15/month
- DigitalOcean: $10-20/month

**For high traffic**:
- Consider upgrading to PostgreSQL instead of SQLite
- Add Redis for caching
- Use CDN for static assets
- Scale to multiple instances

Good luck with your deployment!
