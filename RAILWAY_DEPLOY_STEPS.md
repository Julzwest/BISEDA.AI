# 🚀 Railway Deployment - Exact Steps

## ✅ You Have GitHub Repo Ready!

Perfect! Let's deploy your backend to Railway.

---

## 📋 Step-by-Step Instructions

### Step 1: Commit Current Changes

First, let's commit all the recent changes:

```bash
git add -A
git commit -m "Add Stripe webhook setup and deployment config"
git push
```

### Step 2: Sign Up for Railway

1. **Go to:** https://railway.app
2. **Click:** "Start a New Project"
3. **Select:** "Login with GitHub"
4. **Authorize** Railway to access your GitHub

### Step 3: Deploy Backend

1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** Your BISEDA.AI repository
4. **Railway will show:** "Configure Service"
5. **Set Root Directory:** `backend`
   - Click on the service
   - Go to Settings
   - Under "Root Directory", enter: `backend`
6. **Set Start Command:** `npm start`
   - In Settings → Start Command: `npm start`

### Step 4: Add Environment Variables

**Go to:** Variables tab in Railway dashboard

**Add these variables one by one:**

```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE

STRIPE_STARTER_PRICE_ID=price_1SYZLeC8OkxaxQZmxathHpry

STRIPE_PRO_PRICE_ID=price_1SYZQFC8OkxaxQZmBCD3spKB

STRIPE_PREMIUM_PRICE_ID=price_1SYZQoC8OkxaxQZmgygP6ypc

FRONTEND_URL=https://bisedaai.com

PORT=3001
```

**Note:** `STRIPE_WEBHOOK_SECRET` will be added after we set up production webhook.

### Step 5: Deploy

1. Railway will **automatically deploy** when you add variables
2. **Wait 2-3 minutes** for deployment
3. **Check logs** to see if it's running
4. **Get your URL:** Railway will show it (like `https://your-app.up.railway.app`)

### Step 6: Test Deployment

**Copy your Railway URL** and test:

```bash
curl https://your-app.up.railway.app/api/usage
```

Should return JSON response.

---

## 🔧 After Deployment

### 1. Update Frontend .env

Add production backend URL to `.env`:

```bash
VITE_BACKEND_URL=https://your-app.up.railway.app
```

### 2. Set Up Production Webhook

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **Make sure LIVE MODE** is on
3. **Add endpoint:** `https://your-app.up.railway.app/api/stripe/webhook`
4. **Select events** (same as before)
5. **Copy webhook secret**
6. **Add to Railway Variables:** `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] GitHub repo connected
- [ ] Backend deployed
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Production URL obtained
- [ ] Frontend `.env` updated
- [ ] Stripe webhook configured
- [ ] Test API works

---

**Ready? Let's commit your changes first, then I'll guide you through Railway!** 🚀

