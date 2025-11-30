# 🚀 Deploy to Render - FREE Alternative

## ✅ Why Render?

Railway's free trial has limitations. Render offers a **free tier** that's perfect for your backend!

---

## 🎯 Step-by-Step Deployment

### Step 1: Sign Up for Render

1. **Go to:** https://render.com
2. **Click:** "Get Started for Free"
3. **Sign up with GitHub** (same account as your repo)
4. **Verify email** if needed

### Step 2: Create New Web Service

1. **Click:** "New +" button (top right)
2. **Select:** "Web Service"
3. **Connect:** Your GitHub account (if not already connected)
4. **Select Repository:** Choose your **BISEDA.AI** repository

### Step 3: Configure Service

**Fill in these settings:**

- **Name:** `biseda-backend` (or any name you like)
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 4: Add Environment Variables

**Scroll down to "Environment Variables" section:**

Click "Add Environment Variable" and add these one by one:

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

### Step 5: Deploy

1. **Scroll down** and click **"Create Web Service"**
2. **Wait 3-5 minutes** for deployment
3. **Watch the logs** - you'll see it building and starting
4. **Get your URL:** Render gives you a URL like `https://biseda-backend.onrender.com`

### Step 6: Get Production URL

After deployment completes:
- Your service will have a URL like: `https://biseda-backend.onrender.com`
- **Copy this URL!**

---

## 🔧 After Deployment

### 1. Update Frontend .env

```bash
VITE_BACKEND_URL=https://biseda-backend.onrender.com
```

### 2. Set Up Production Webhook

1. **Stripe Dashboard** → Webhooks (LIVE mode)
2. **Add endpoint:** `https://biseda-backend.onrender.com/api/stripe/webhook`
3. **Select events** (same as before)
4. **Copy webhook secret**
5. **Add to Render Environment Variables**

### 3. Test Your API

```bash
curl https://biseda-backend.onrender.com/api/usage
```

Should return JSON!

---

## ✅ Render Free Tier Benefits

- ✅ **750 hours/month** free (enough for 24/7)
- ✅ **Automatic HTTPS**
- ✅ **Auto-deploy on git push**
- ✅ **Free SSL certificate**
- ✅ **No credit card required**

---

## 🚀 Ready?

**Go to Render now:** https://render.com

**Follow the steps above and let me know when you have your URL!**

