# 🚀 How to Start Localhost

## Quick Start

### Option 1: Start Both Servers (Recommended)

```bash
# In the project root directory
npm run dev:all
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

---

### Option 2: Start Servers Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Opens: http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run backend:dev
```
Runs: http://localhost:3001

---

## 🌐 URLs to Access

### Frontend (Main App)
**URL:** http://localhost:5173

Open this in your browser to see the app.

### Backend API
**URL:** http://localhost:3001

The frontend automatically connects to this.

---

## ✅ Check if Servers are Running

### Check Frontend:
```bash
curl http://localhost:5173
```
Should return HTML content.

### Check Backend:
```bash
curl http://localhost:3001/api/health
```
Should return JSON response.

---

## 🐛 Troubleshooting

### Port Already in Use?

**Frontend (5173):**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Then start again
npm run dev
```

**Backend (3001):**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
# Then start again
npm run backend:dev
```

---

### Frontend Not Loading?

1. **Check if Vite is running:**
   ```bash
   lsof -ti:5173
   ```
   If nothing, start it:
   ```bash
   npm run dev
   ```

2. **Check browser console** for errors (F12)

3. **Try clearing cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

4. **Check if backend is running:**
   ```bash
   curl http://localhost:3001/api/health
   ```

---

### Backend Not Responding?

1. **Check if Node is running:**
   ```bash
   lsof -ti:3001
   ```
   If nothing, start it:
   ```bash
   npm run backend:dev
   ```

2. **Check backend logs** for errors

3. **Verify .env file exists:**
   ```bash
   ls backend/.env
   ```

4. **Check backend port:**
   ```bash
   grep PORT backend/.env || echo "PORT not set, using default 3001"
   ```

---

## 📋 Step-by-Step Setup

1. **Open Terminal**

2. **Navigate to project:**
   ```bash
   cd /Users/xhuljongashi/BISEDA.AI
   ```

3. **Start both servers:**
   ```bash
   npm run dev:all
   ```

4. **Wait for both to start:**
   - Frontend: "Local: http://localhost:5173"
   - Backend: "Server running on port 3001"

5. **Open browser:**
   - Go to: http://localhost:5173

---

## 🎯 Expected Output

### Frontend Terminal:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Backend Terminal:
```
✅ Backend server running on port 3001
✅ OpenAI API key loaded
✅ CORS enabled for http://localhost:5173
```

---

## 🔧 If Still Not Working

1. **Check Node version:**
   ```bash
   node --version
   ```
   Should be >= 18.0.0

2. **Reinstall dependencies:**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Check for errors:**
   ```bash
   npm run dev 2>&1 | head -20
   ```

4. **Check backend logs:**
   ```bash
   cd backend && npm run dev 2>&1 | head -20
   ```

---

## 📱 Mobile Testing

For iOS Simulator or Android Emulator:
- Frontend URL: http://localhost:5173
- Backend URL: http://localhost:3001 (or use your computer's IP)

**Note:** For mobile devices on same network:
- Replace `localhost` with your computer's IP address
- Example: http://192.168.1.100:5173

---

## ✅ Quick Test

```bash
# Test frontend
open http://localhost:5173

# Test backend
curl http://localhost:3001/api/health
```

Both should work! 🚀

