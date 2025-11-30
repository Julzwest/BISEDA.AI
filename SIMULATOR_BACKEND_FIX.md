# 🔧 Fix "Load Failed" in iOS Simulator

## Problem
The iOS Simulator shows "Load failed" when trying to connect to the backend API.

## Why This Happens

### iOS Simulator Network Access:
- ✅ **iOS Simulator CAN access `localhost`** - It shares the same network as your Mac
- ❌ **But sometimes needs explicit configuration**
- ❌ **CORS might block requests**

## Solutions

### Solution 1: Use localhost (Should Work)
iOS Simulator should be able to access `localhost:3001` directly. If it's not working:

1. **Check Backend is Running:**
   ```bash
   curl http://localhost:3001/api/chat -X POST -H "Content-Type: application/json" -d '{"prompt":"test"}'
   ```

2. **Check CORS Settings:**
   The backend should allow requests from the simulator. Check `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
     credentials: true
   }));
   ```

### Solution 2: Use Your Mac's IP Address
If `localhost` doesn't work, use your Mac's local IP:

1. **Find Your Mac's IP:**
   ```bash
   ifconfig en0 | grep "inet " | awk '{print $2}'
   ```
   Example: `192.168.1.100`

2. **Update Backend CORS:**
   In `backend/server.js`, update CORS to allow simulator:
   ```javascript
   app.use(cors({
     origin: ['http://localhost:5173', 'http://192.168.1.100:5173'],
     credentials: true
   }));
   ```

3. **Create `.env` file in root:**
   ```env
   VITE_BACKEND_URL=http://192.168.1.100:3001
   ```

4. **Rebuild and sync:**
   ```bash
   npm run build
   npm run cap:sync
   ```

### Solution 3: Check Error Details
The error might be something else. Check:

1. **Browser Console in Simulator:**
   - In Xcode, go to **Debug → Open System Log**
   - Look for network errors

2. **Backend Logs:**
   ```bash
   cd backend
   npm run dev
   ```
   Watch for incoming requests

3. **Check Error Message:**
   The "Load failed" might be a generic error. Check the actual error in:
   - Browser console (if using Safari Web Inspector)
   - Backend logs

## Quick Fix Commands

```bash
# 1. Make sure backend is running
cd backend && npm run dev

# 2. Test backend from terminal
curl http://localhost:3001/api/chat -X POST -H "Content-Type: application/json" -d '{"prompt":"test"}'

# 3. If backend works, rebuild frontend
cd ..
npm run build
npm run cap:sync

# 4. Rebuild in Xcode
# Press Cmd+B then Cmd+R
```

## For Android Emulator

Android emulator uses `10.0.2.2` instead of `localhost`:

1. **Update `.env`:**
   ```env
   VITE_BACKEND_URL=http://10.0.2.2:3001
   ```

2. **Update backend CORS:**
   ```javascript
   origin: ['http://localhost:5173', 'http://10.0.2.2:5173']
   ```

## Testing

After fixing, test in simulator:
1. Open the app
2. Try sending a message
3. Check if it connects successfully
4. Check backend logs for incoming requests

---

**Most Common Issue:** Backend not running or CORS blocking the request.

