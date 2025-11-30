# 🚀 Deploy to Railway - Right Now!

## ✅ Your Code is Ready!

All changes committed. Now let's deploy!

---

## 🎯 Quick Deployment Steps

### Step 1: Go to Railway

1. **Open:** https://railway.app
2. **Click:** "Start a New Project"
3. **Login with GitHub** (use the same GitHub account where your repo is)

### Step 2: Connect Your Repo

1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Find:** Your BISEDA.AI repository in the list
4. **Click** on it

### Step 3: Configure Service

**Railway will create a service. Then:**

1. **Click on the service** that was created
2. **Go to:** Settings tab
3. **Set Root Directory:** `backend`
   - Scroll down to "Root Directory"
   - Enter: `backend`
   - Save
4. **Set Start Command:** `npm start`
   - In Settings → Start Command
   - Enter: `npm start`
   - Save

### Step 4: Add Environment Variables

**Go to:** Variables tab (in Railway dashboard)

**Click "New Variable" and add these one by one:**

```bash
OPENAI_API_KEY
Value: YOUR_OPENAI_API_KEY_HERE

STRIPE_SECRET_KEY
Value: YOUR_STRIPE_SECRET_KEY_HERE

STRIPE_STARTER_PRICE_ID
Value: price_1SYZLeC8OkxaxQZmxathHpry

STRIPE_PRO_PRICE_ID
Value: price_1SYZQFC8OkxaxQZmBCD3spKB

STRIPE_PREMIUM_PRICE_ID
Value: price_1SYZQoC8OkxaxQZmgygP6ypc

FRONTEND_URL
Value: https://bisedaai.com

PORT
Value: 3001
```

**Note:** We'll add `STRIPE_WEBHOOK_SECRET` after setting up webhook.

### Step 5: Deploy

1. Railway will **auto-deploy** when you add variables
2. **Watch the logs** - you'll see it building
3. **Wait 2-3 minutes**
4. **Check:** Should see "Deployment successful"

### Step 6: Get Your Production URL

1. **Go to:** Settings → Networking
2. **Click:** "Generate Domain"
3. **Copy the URL** (like `https://your-app.up.railway.app`)

**OR**

1. Railway shows the URL at the top of the service page
2. **Copy it!**

---

## 🔧 After You Get the URL

### 1. Test It Works

Open in browser or run:
```bash
curl https://your-app.up.railway.app/api/usage
```

Should return JSON.

### 2. Update Frontend

Add to `.env` file:
```bash
VITE_BACKEND_URL=https://your-app.up.railway.app
```

### 3. Set Up Production Webhook

1. **Go to:** https://dashboard.stripe.com/webhooks
2. **LIVE MODE** (toggle on)
3. **Add endpoint:** `https://your-app.up.railway.app/api/stripe/webhook`
4. **Select events** (same as before)
5. **Copy webhook secret**
6. **Add to Railway Variables:** `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## ✅ What You'll See

**In Railway:**
- ✅ Build logs showing npm install
- ✅ Deployment successful
- ✅ Service running
- ✅ URL generated

**In Stripe:**
- ✅ Webhook endpoint created
- ✅ Events being received (after first payment)

**In Your App:**
- ✅ API calls work
- ✅ Payments work
- ✅ Subscriptions activate automatically

---

## 🚀 Ready?

**Go to Railway now and follow the steps above!**

**Once you get your production URL, share it with me and I'll help you:**
1. Update frontend configuration
2. Set up production webhook
3. Test everything works

**Let's get your backend live!** 🎉

