# 🚀 Deploy Backend to Production - Step by Step

## 🎯 Goal
Deploy your backend to Railway (FREE) so it works for App Store users.

---

## 📋 Pre-Deployment Checklist

- [x] Stripe Secret Key configured
- [x] Price IDs configured  
- [x] Webhook secret configured (for local)
- [ ] Backend code ready
- [ ] GitHub repo ready (optional but recommended)

---

## 🚀 Option 1: Railway (Recommended - FREE)

### Step 1: Sign Up for Railway

1. **Go to:** https://railway.app
2. **Sign up** with GitHub (easiest)
3. **Verify email**

### Step 2: Create New Project

1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** Your BISEDA.AI repository
4. **Select:** `backend` folder (or we'll configure it)

### Step 3: Configure Deployment

**If Railway asks for root directory:**
- Set to: `backend`

**Or create `railway.json` in project root:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 4: Add Environment Variables

In Railway dashboard → Variables tab, add:

```bash
# OpenAI
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE

# Stripe
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
STRIPE_STARTER_PRICE_ID=price_1SYZLeC8OkxaxQZmxathHpry
STRIPE_PRO_PRICE_ID=price_1SYZQFC8OkxaxQZmBCD3spKB
STRIPE_PREMIUM_PRICE_ID=price_1SYZQoC8OkxaxQZmgygP6ypc
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_SECRET_HERE

# Frontend URL
FRONTEND_URL=https://bisedaai.com

# Port (Railway sets this automatically)
PORT=3001
```

### Step 5: Deploy

1. Railway will **auto-deploy** when you push to GitHub
2. Or click **"Deploy"** button
3. Wait for deployment (2-3 minutes)
4. Get your URL: `https://your-app.railway.app`

### Step 6: Get Production URL

After deployment, Railway gives you a URL like:
- `https://biseda-backend-production.up.railway.app`

**Copy this URL** - you'll need it!

---

## 🌐 Option 2: Render (Alternative - FREE)

### Step 1: Sign Up

1. **Go to:** https://render.com
2. **Sign up** with GitHub

### Step 2: Create Web Service

1. **Click:** "New" → "Web Service"
2. **Connect:** Your GitHub repo
3. **Settings:**
   - **Name:** `biseda-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

### Step 3: Add Environment Variables

Same as Railway (see above)

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment
3. Get URL: `https://biseda-backend.onrender.com`

---

## 🔧 After Deployment

### Step 1: Update Frontend to Use Production URL

Update `.env` file (or create production `.env.production`):

```bash
VITE_BACKEND_URL=https://your-backend-url.railway.app
```

### Step 2: Update Stripe Webhooks

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Add new endpoint** (or edit existing)
3. **URL:** `https://your-backend-url.railway.app/api/stripe/webhook`
4. **Select events:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Copy new webhook secret**
6. **Add to Railway environment variables**

### Step 3: Test Production Backend

```bash
# Test API endpoint
curl https://your-backend-url.railway.app/api/usage

# Should return JSON response
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Environment variables added
- [ ] Backend URL obtained
- [ ] Frontend `.env` updated with production URL
- [ ] Stripe webhook URL updated
- [ ] Production webhook secret added
- [ ] Test API calls work
- [ ] Test payment flow works

---

## 🧪 Testing After Deployment

1. **Update frontend `.env`:**
   ```bash
   VITE_BACKEND_URL=https://your-backend-url.railway.app
   ```

2. **Restart frontend:**
   ```bash
   npm run dev
   ```

3. **Test in app:**
   - Open app
   - Try to send a message
   - Check if API calls work
   - Test upgrade flow

---

## 🎯 Next Steps After Deployment

1. ✅ **Test everything** works with production backend
2. ✅ **Update app** to use production URL
3. ✅ **Set up production webhooks** in Stripe
4. ✅ **Test payment flow** end-to-end
5. ✅ **Ready for App Store!**

---

**Ready to deploy? Let me know which platform you prefer (Railway or Render) and I'll guide you through it!** 🚀

