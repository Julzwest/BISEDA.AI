# 🔧 Fix Home Button 404 Error

## ✅ Problem Fixed!

The home links were pointing to `/` which doesn't work on GitHub Pages. I've fixed them to point to `index.html`.

---

## 📤 Update Files on GitHub

### Option 1: Edit on GitHub (Easiest)

**For terms.html:**

1. **Go to:** https://github.com/Julzwest/bisedaai-legal
2. **Click:** `terms.html` file
3. **Click:** Pencil icon (Edit) - top right
4. **Find this line** (around line 101):
   ```html
   <a href="/" class="back-link">← Back to Home</a>
   ```
5. **Change to:**
   ```html
   <a href="index.html" class="back-link">← Back to Home</a>
   ```
6. **Scroll down**
7. **Commit message:** "Fix home link"
8. **Click:** "Commit changes" (green button)

**For privacy.html:**

1. **Go back to repository**
2. **Click:** `privacy.html` file
3. **Click:** Pencil icon (Edit)
4. **Find this line** (around line 101):
   ```html
   <a href="/" class="back-link">← Back to Home</a>
   ```
5. **Change to:**
   ```html
   <a href="index.html" class="back-link">← Back to Home</a>
   ```
6. **Commit message:** "Fix home link"
7. **Click:** "Commit changes"

**Wait 1-2 minutes** - GitHub Pages will rebuild automatically!

---

### Option 2: Use Git Commands (Faster)

If you have Git installed, I can help you push the fixed files directly.

**Just let me know if you want to use this method!**

---

## ✅ After Updating

**Test the links:**

- https://julzwest.github.io/bisedaai-legal/terms.html
- Click "← Back to Home" → Should go to homepage ✅
- https://julzwest.github.io/bisedaai-legal/privacy.html
- Click "← Back to Home" → Should go to homepage ✅

---

## 🎯 Quick Fix Summary

**What changed:**
- `href="/"` → `href="index.html"`

**Why:**
- GitHub Pages needs explicit file names
- `/` doesn't resolve to `index.html` automatically

**Files to update:**
- `terms.html` ✅ (fixed locally)
- `privacy.html` ✅ (fixed locally)

**Just need to upload the fixes to GitHub!**

---

**Go edit the files on GitHub now - it's quick!** 🚀

