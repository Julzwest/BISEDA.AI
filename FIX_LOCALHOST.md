# 🔧 Fix Localhost Not Loading

## Quick Fix Steps

### Step 1: Stop All Servers
```bash
# Kill all running processes
pkill -f "vite"
pkill -f "node.*server"
```

### Step 2: Start Fresh
```bash
# Start both servers
npm run dev:all
```

### Step 3: Wait for Startup
Look for these messages:
- ✅ `VITE v5.0.8  ready in XXX ms`
- ✅ `➜  Local:   http://localhost:5173/`
- ✅ `Backend server running on port 3001`

### Step 4: Open Browser
Go to: **http://localhost:5173**

---

## 🐛 Common Issues & Fixes

### Issue 1: Blank White Screen

**Check Browser Console:**
1. Press `F12` or `Cmd+Option+I`
2. Look for errors in Console tab
3. Common errors:
   - `Failed to fetch` → Backend not running
   - `Cannot find module` → Missing dependencies
   - `CORS error` → Backend CORS not configured

**Fix:**
```bash
# Reinstall dependencies
npm install
cd backend && npm install

# Restart servers
npm run dev:all
```

---

### Issue 2: "This site can't be reached"

**Check if servers are running:**
```bash
# Check frontend
lsof -ti:5173

# Check backend
lsof -ti:3001
```

**Fix:**
```bash
# Start servers
npm run dev:all
```

---

### Issue 3: Port Already in Use

**Error:** `Port 5173 is already in use`

**Fix:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Start again
npm run dev:all
```

---

### Issue 4: JavaScript Errors

**Check browser console for:**
- `Uncaught ReferenceError`
- `Uncaught TypeError`
- `Module not found`

**Fix:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm -rf backend/node_modules
npm install
cd backend && npm install

# Rebuild
npm run build

# Start dev server
npm run dev:all
```

---

### Issue 5: Network Error / CORS

**Error:** `Failed to fetch` or CORS errors

**Fix:**
1. Make sure backend is running:
   ```bash
   npm run backend:dev
   ```

2. Check backend/.env:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

3. Restart backend

---

## 🔍 Diagnostic Commands

### Check Frontend:
```bash
# Test if frontend responds
curl http://localhost:5173

# Should return HTML
```

### Check Backend:
```bash
# Test if backend responds
curl http://localhost:3001/api/health

# Should return JSON or error page
```

### Check Processes:
```bash
# See what's running
ps aux | grep -E "(vite|node.*server)" | grep -v grep
```

---

## ✅ Complete Reset

If nothing works, do a complete reset:

```bash
# 1. Stop everything
pkill -f "vite"
pkill -f "node.*server"

# 2. Clean install
rm -rf node_modules
rm -rf backend/node_modules
npm install
cd backend && npm install

# 3. Clear browser cache
# In browser: Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)

# 4. Start fresh
npm run dev:all

# 5. Open browser
# Go to: http://localhost:5173
```

---

## 📱 Try Different Browser

Sometimes browser cache causes issues:

1. **Try Incognito/Private Mode:**
   - Chrome: `Cmd+Shift+N` (Mac) or `Ctrl+Shift+N` (Windows)
   - Safari: `Cmd+Shift+N`
   - Firefox: `Cmd+Shift+P`

2. **Try Different Browser:**
   - If Chrome doesn't work, try Safari or Firefox

---

## 🎯 Step-by-Step Debugging

1. **Check Terminal Output:**
   ```bash
   npm run dev:all
   ```
   Look for errors in terminal

2. **Check Browser Console:**
   - Open http://localhost:5173
   - Press F12
   - Check Console tab for errors

3. **Check Network Tab:**
   - Press F12 → Network tab
   - Refresh page
   - Look for failed requests (red)

4. **Check Backend Logs:**
   ```bash
   cd backend
   npm run dev
   ```
   Look for errors

---

## 🚨 Still Not Working?

**Share these details:**
1. What you see in browser (blank screen? error message?)
2. Browser console errors (F12 → Console)
3. Terminal output from `npm run dev:all`
4. Browser you're using (Chrome, Safari, Firefox?)

---

## ✅ Expected Working State

**Terminal should show:**
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose

✅ Backend server running on port 3001
✅ OpenAI API key loaded
```

**Browser should show:**
- Biseda.ai home page
- Navigation bar at bottom
- Feature cards
- No errors in console

---

**Try the quick fix first, then check browser console for specific errors!**

