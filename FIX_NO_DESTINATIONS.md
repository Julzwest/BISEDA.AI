# 🔧 Fix "No Destinations" in Xcode

## Problem: "The active scheme has no targets"

This happens when CocoaPods dependencies aren't installed or the project isn't properly configured.

## Solution Steps:

### 1. Install CocoaPods Dependencies

Open Terminal and run:
```bash
cd /Users/xhuljongashi/BISEDA.AI/ios/App
pod install
```

Wait for it to complete (may take 2-5 minutes first time).

### 2. Sync Capacitor

```bash
cd /Users/xhuljongashi/BISEDA.AI
npm run cap:sync
```

### 3. Reopen Xcode

```bash
npm run cap:open:ios
```

### 4. In Xcode - Select Scheme

1. Look at the top toolbar
2. Click on **"main"** (next to "App")
3. Select **"App"** scheme from the dropdown
4. Now the device selector should appear

### 5. Alternative: Build First

Sometimes you need to build once before destinations appear:

1. In Xcode, press **Cmd + B** (Build)
2. Wait for build to complete (even if it fails)
3. Then try selecting destination again

---

## If Still Not Working:

### Check Project Structure:

1. In Xcode left sidebar, click the **blue folder icon** (Project Navigator)
2. Click on **"App"** (the blue project icon at top)
3. In main area, you should see **TARGETS** section
4. Make sure **"App"** target exists

### Manual Scheme Creation:

1. Click **"App"** project in left sidebar
2. Go to **"TARGETS"** section
3. Select **"App"** target
4. Go to **"Build Settings"** tab
5. Make sure **"iOS Deployment Target"** is set (e.g., 13.0)

---

## Quick Fix Command:

Run this in terminal:
```bash
cd /Users/xhuljongashi/BISEDA.AI
cd ios/App && pod install
cd ../..
npm run cap:sync
npm run cap:open:ios
```

Then in Xcode:
- Click **Product → Scheme → App**
- Then **Product → Destination → iPhone 15 Pro Simulator**
- Then **Product → Run** (Cmd+R)

