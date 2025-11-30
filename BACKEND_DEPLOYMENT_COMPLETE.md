# 🚀 Backend Deployment - Complete Guide

## ✅ Current Status

- ✅ GitHub Pages: Live at http://bisedaai.com/
- ✅ Custom domain: Configured
- ✅ Code: Committed and ready
- ⏳ Backend: Needs deployment to Railway

---

## 🎯 Deploy Backend to Railway

### Step 1: Push Code to GitHub (If Not Already)

```bash
# If you haven't pushed yet:
git push origin main
```

### Step 2: Go to Railway

1. **Open:** https://railway.app
2. **Login with GitHub**
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Choose:** Your BISEDA.AI repository

### Step 3: Configure Service

**After Railway creates the service:**

1. **Click on the service**
2. **Go to:** Settings tab
3. **Set Root Directory:** `backend`
4. **Set Start Command:** `npm start`

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

**Note:** `STRIPE_WEBHOOK_SECRET` will be added after webhook setup.

### Step 5: Get Production URL

After deployment, Railway gives you a URL like:
- `https://your-app.up.railway.app`

**Copy this URL!**

---

## 🔧 After Deployment

### 1. Update Frontend .env

```bash
VITE_BACKEND_URL=https://your-railway-url.up.railway.app
```

### 2. Set Up Production Webhook

1. **Stripe Dashboard** → Webhooks (LIVE mode)
2. **Add endpoint:** `https://your-railway-url.up.railway.app/api/stripe/webhook`
3. **Select events** (same as before)
4. **Copy webhook secret**
5. **Add to Railway Variables**

### 3. Enable HTTPS on GitHub Pages

**In GitHub Pages settings:**
- ✅ Check "Enforce HTTPS"
- Your site will be available at `https://bisedaai.com`

---

## ✅ Final Checklist

- [ ] Backend deployed to Railway
- [ ] Production URL obtained
- [ ] Frontend `.env` updated
- [ ] Stripe webhook configured
- [ ] HTTPS enabled on GitHub Pages
- [ ] Test API works
- [ ] Test payments work

---

**Ready to deploy? Go to Railway and follow the steps!** 🚀

