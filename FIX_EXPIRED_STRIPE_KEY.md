# 🔑 Fix Expired Stripe API Key

## ❌ Error: "Expired API Key provided"

Your Stripe secret key in Render has expired or is invalid.

---

## 🎯 Quick Fix Steps

### Step 1: Get New Stripe Secret Key

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/apikeys
   - **Make sure:** You're in **LIVE MODE** (toggle top right)

2. **Check Your API Keys:**
   - You'll see "Secret key" (starts with `sk_live_...`)
   - If it shows "Expired" or "Revoked", you need a new one

3. **Create New Secret Key (if needed):**
   - Click "Create secret key"
   - Name it: `BISEDA.AI Production`
   - Copy the new key (starts with `sk_live_...`)
   - ⚠️ **Important:** Copy it immediately - you can't see it again!

### Step 2: Update in Render

1. **Go to Render:** https://dashboard.render.com
2. **Click:** Your BISEDA.AI service
3. **Click:** "Environment" tab
4. **Find:** `STRIPE_SECRET_KEY`
5. **Click:** Edit (or delete and recreate)
6. **Update Value:** Paste your new secret key
7. **Save**

### Step 3: Redeploy

- Render will automatically redeploy when you save
- Or click "Manual Deploy" → "Deploy latest commit"
- Wait for deployment (1-2 minutes)

### Step 4: Test Again

1. **Open your app**
2. **Click "Upgrade"**
3. **Select a plan**
4. **Should redirect to Stripe checkout**

---

## 🔍 Why This Happens

Stripe secret keys can expire if:
- Key was rotated/revoked in Stripe Dashboard
- Key expired (rare, but possible)
- Wrong key was copied (test vs live)

---

## ✅ Verify Your Key

**In Stripe Dashboard:**
1. Go to: https://dashboard.stripe.com/apikeys
2. Check "Secret key" status
3. Should show "Active" (not "Expired" or "Revoked")

**In Render:**
1. Go to Environment tab
2. Verify `STRIPE_SECRET_KEY` value
3. Should start with `sk_live_...` (for production)
4. Should NOT be the old expired key

---

## 🚨 Important Notes

- **Never share your secret key** publicly
- **Use LIVE keys** for production (`sk_live_...`)
- **Use TEST keys** for testing (`sk_test_...`)
- **Copy keys immediately** - Stripe won't show them again

---

**Go get a new Stripe secret key and update it in Render!** 🔑

