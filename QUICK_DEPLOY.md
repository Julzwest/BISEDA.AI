# ⚡ Quick Backend Deployment Guide

## 🎯 Deploy to Railway (5 minutes)

### Step 1: Sign Up
1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest)

### Step 2: Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **BISEDA.AI** repository
4. Railway will auto-detect it's a Node.js project

### Step 3: Configure Settings
**In Railway dashboard:**

1. **Go to:** Settings → Service
2. **Root Directory:** Set to `backend`
3. **Start Command:** `npm start`

### Step 4: Add Environment Variables
**Go to:** Variables tab, add these:

```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE

STRIPE_STARTER_PRICE_ID=price_1SYZLeC8OkxaxQZmxathHpry
STRIPE_PRO_PRICE_ID=price_1SYZQFC8OkxaxQZmBCD3spKB
STRIPE_PREMIUM_PRICE_ID=price_1SYZQoC8OkxaxQZmgygP6ypc

FRONTEND_URL=https://bisedaai.com

PORT=3001
```

**Note:** You'll add `STRIPE_WEBHOOK_SECRET` after setting up webhook in Stripe.

### Step 5: Deploy
1. Railway will **auto-deploy**
2. Wait 2-3 minutes
3. Get your URL: `https://your-app.up.railway.app`

### Step 6: Copy Production URL
**Copy the URL Railway gives you** - you'll need it!

---

## 🔧 After Deployment

### 1. Update Frontend .env

Add production backend URL:

```bash
# Add this to .env file
VITE_BACKEND_URL=https://your-app.up.railway.app
```

### 2. Set Up Production Webhook in Stripe

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Make sure LIVE MODE** is on (toggle top right)
3. **Click:** "Add endpoint"
4. **URL:** `https://your-app.up.railway.app/api/stripe/webhook`
5. **Select events:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
6. **Copy webhook secret** (starts with `whsec_...`)
7. **Add to Railway Variables:**
   - `STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET`

### 3. Test Production Backend

```bash
# Test if backend is working
curl https://your-app.up.railway.app/api/usage
```

Should return JSON response.

---

## ✅ Quick Checklist

- [ ] Railway account created
- [ ] Backend deployed
- [ ] Environment variables added
- [ ] Production URL copied
- [ ] Frontend `.env` updated
- [ ] Stripe webhook configured
- [ ] Test API works

---

## 🚀 Ready to Deploy?

**I can help you:**
1. Walk through Railway setup step-by-step
2. Create the deployment config
3. Test after deployment

**Or you can follow the steps above!**

---

**Which do you prefer?** 🚀

