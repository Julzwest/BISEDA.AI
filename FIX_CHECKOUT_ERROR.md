# 🔧 Fix "Failed to start checkout" Error

## ❌ Problem
Error: "Failed to start checkout. Please try again."

## 🔍 Root Cause
**Stripe Secret Key is missing** from `backend/.env`

---

## ✅ Solution: Add Stripe Secret Key

### Step 1: Get Your Stripe Secret Key

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com
2. **Click:** Developers → API keys
3. **Find:** "Secret key" (starts with `sk_test_...`)
4. **Click:** "Reveal" to show it
5. **Copy** the entire key

---

### Step 2: Add to Backend `.env`

**File:** `backend/.env`

**Add this line:**
```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
```

**Example:**
```env
STRIPE_SECRET_KEY=sk_test_51ABC123xyz...
```

---

### Step 3: Restart Backend Server

**Important:** You MUST restart the backend after adding the key!

```bash
# Stop backend (Ctrl+C in terminal where it's running)

# Then restart:
cd backend
npm run dev
```

---

### Step 4: Test Again

1. **Refresh browser:** `http://localhost:5173`
2. **Click "Upgrade"** button
3. **Select a plan** (Starter, Pro, or Premium)
4. **Should redirect to Stripe checkout** ✅

---

## ✅ Current Status

- ✅ Price IDs: Configured
- ✅ Backend: Running
- ❌ Stripe Secret Key: **MISSING** ← This is the problem!

---

## 🎯 Quick Fix

1. Get Secret Key from Stripe Dashboard
2. Add to `backend/.env`: `STRIPE_SECRET_KEY=sk_test_...`
3. Restart backend: `cd backend && npm run dev`
4. Test checkout again

---

**Once you add the Secret Key and restart backend, checkout will work!** 🚀

