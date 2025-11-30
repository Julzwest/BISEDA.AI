# 🔧 Fix Home Link - Step by Step

## ✅ Problem: 404 Error When Clicking "Back to Home"

The link points to `/` which doesn't work on GitHub Pages. Need to change to `index.html`.

---

## 📝 Fix terms.html

### Step 1: Open File
1. Go to: https://github.com/Julzwest/bisedaai-legal
2. Click: `terms.html` file

### Step 2: Edit
1. Click: **Pencil icon** (Edit) - top right of file
2. Press: **Cmd+F** (or Ctrl+F) to open Find
3. Search for: `href="/"`
4. You'll find this line (around line 101):
   ```html
   <a href="/" class="back-link">← Back to Home</a>
   ```

### Step 3: Change
1. Change `href="/"` to `href="index.html"`
2. Line should now be:
   ```html
   <a href="index.html" class="back-link">← Back to Home</a>
   ```

### Step 4: Save
1. Scroll down to bottom
2. **Commit message:** "Fix home link"
3. Click: **"Commit changes"** (green button)

---

## 📝 Fix privacy.html

### Step 1: Open File
1. Go back to repository: https://github.com/Julzwest/bisedaai-legal
2. Click: `privacy.html` file

### Step 2: Edit
1. Click: **Pencil icon** (Edit)
2. Press: **Cmd+F** (Find)
3. Search for: `href="/"`
4. Find the same line:
   ```html
   <a href="/" class="back-link">← Back to Home</a>
   ```

### Step 3: Change
1. Change `href="/"` to `href="index.html"`
2. Line should be:
   ```html
   <a href="index.html" class="back-link">← Back to Home</a>
   ```

### Step 4: Save
1. Scroll down
2. **Commit message:** "Fix home link"
3. Click: **"Commit changes"**

---

## ⏱️ Wait for Update

**After committing:**
- Wait 1-2 minutes for GitHub Pages to rebuild
- GitHub automatically updates your site

---

## ✅ Test

**After 1-2 minutes, test:**

1. Go to: https://julzwest.github.io/bisedaai-legal/terms.html
2. Click: "← Back to Home"
3. Should go to homepage ✅ (no more 404!)

4. Go to: https://julzwest.github.io/bisedaai-legal/privacy.html
5. Click: "← Back to Home"
6. Should go to homepage ✅

---

## 🎯 What You're Changing

**Before:**
```html
<a href="/" class="back-link">← Back to Home</a>
```

**After:**
```html
<a href="index.html" class="back-link">← Back to Home</a>
```

**That's it!** Just change `/` to `index.html` in both files.

---

**Go edit the files on GitHub now - it takes 2 minutes!** 🚀

