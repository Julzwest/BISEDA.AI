# 🔧 Fix Payment Initiation Error

## ❌ Error: "Dështoi fillimi i pagesës. Provo përsëri."

This error occurs when the backend can't create a Stripe checkout session.

---

## 🔍 Common Causes

### 1. Missing `FRONTEND_URL` in Render

The backend needs `FRONTEND_URL` to create success/cancel URLs.

**Fix:**
1. **Go to Render:** https://dashboard.render.com
2. **Click:** Your BISEDA.AI service
3. **Go to:** Environment tab
4. **Add:** `FRONTEND_URL` = `https://bisedaai.com` (or your frontend URL)
5. **Save** and **redeploy**

### 2. Missing Price IDs

The frontend might not have the Price IDs loaded.

**Check:**
- Open browser console (F12)
- Look for errors about `VITE_STRIPE_STARTER_PRICE_ID` etc.
- Verify `.env` file has all Price IDs

### 3. Backend Not Responding

The backend might be down or unreachable.

**Check:**
- Go to Render logs
- Verify backend is running
- Check if `https://biseda-ai.onrender.com` is accessible

### 4. Stripe Secret Key Missing

Backend might not have Stripe secret key configured.

**Check:**
- Render Environment tab
- Verify `STRIPE_SECRET_KEY` is set
- Should start with `sk_live_...` or `sk_test_...`

---

## 🛠️ Step-by-Step Fix

### Step 1: Check Browser Console

1. **Open your app**
2. **Press F12** (or right-click → Inspect)
3. **Go to Console tab**
4. **Try to select a plan**
5. **Look for error messages**

You should now see detailed errors like:
- `Price ID: price_...`
- `Backend URL: https://...`
- `Failed to create checkout session: [error message]`

### Step 2: Add FRONTEND_URL to Render

1. **Go to:** https://dashboard.render.com
2. **Click:** Your BISEDA.AI service
3. **Click:** "Environment" tab
4. **Click:** "Add Environment Variable"
5. **Key:** `FRONTEND_URL`
6. **Value:** Your frontend URL:
   - If using GitHub Pages: `https://bisedaai.com`
   - If using local dev: `http://localhost:5173`
   - If using Vercel/Netlify: Your deployed URL
7. **Save**

### Step 3: Verify All Environment Variables

**In Render, make sure you have:**

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_STARTER_PRICE_ID=price_1SYZLeC8OkxaxQZmxathHpry
STRIPE_PRO_PRICE_ID=price_1SYZQFC8OkxaxQZmBCD3spKB
STRIPE_PREMIUM_PRICE_ID=price_1SYZQoC8OkxaxQZmgygP6ypc
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend URL
FRONTEND_URL=https://bisedaai.com

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Port (usually auto-set by Render)
PORT=3001
```

### Step 4: Redeploy

After adding `FRONTEND_URL`:
- Render will auto-redeploy
- Or click "Manual Deploy" → "Deploy latest commit"
- Wait for deployment to complete

### Step 5: Test Again

1. **Open your app**
2. **Click "Upgrade"**
3. **Select a plan**
4. **Check browser console** for detailed errors
5. **Should redirect to Stripe checkout**

---

## 🔍 Debugging

### Check Backend Logs

1. **Go to Render:** https://dashboard.render.com
2. **Click:** Your service → "Logs" tab
3. **Look for errors** when you try to create checkout
4. **Common errors:**
   - `FRONTEND_URL is not set`
   - `Stripe is not configured`
   - `Price ID is required`

### Check Frontend Console

1. **Open browser console** (F12)
2. **Try to select a plan**
3. **Look for:**
   - Network errors (failed requests)
   - Console errors
   - Price ID values (should not be `undefined`)

---

## ✅ After Fixing

Once `FRONTEND_URL` is added:
- Payment flow should work
- You'll be redirected to Stripe checkout
- After payment, you'll be redirected back to success page

---

**Most likely fix: Add `FRONTEND_URL` to Render environment variables!**

