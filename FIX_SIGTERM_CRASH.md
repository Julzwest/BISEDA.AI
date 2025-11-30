# 🔧 Fix SIGTERM Crash in iOS Simulator

## Problem
App crashes with "Thread 1: signal SIGTERM" immediately on launch in Xcode.

## Root Cause
The `AppDelegate.swift` was missing the Capacitor initialization code. Capacitor apps need to:
1. Initialize the Capacitor bridge
2. Set up the window with Capacitor's view controller
3. Configure the app properly

## Solution Applied

Updated `AppDelegate.swift` to include proper Capacitor initialization:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Initialize Capacitor
    guard let bridge = ApplicationDelegateProxy.shared.application(application, didFinishLaunchingWithOptions: launchOptions) else {
        return false
    }
    
    // Set up window
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = bridge.viewController
    self.window?.makeKeyAndVisible()
    
    return true
}
```

## Steps to Fix

1. **Clean Build Folder:**
   - In Xcode: `Product → Clean Build Folder` (or `Cmd + Shift + K`)

2. **Rebuild:**
   - Press `Cmd + B` to build

3. **Run:**
   - Press `Cmd + R` to run
   - Or click the Play button (▶️)

## Additional Checks

If it still crashes, check:

1. **Capacitor Sync:**
   ```bash
   npm run build
   npm run cap:sync
   ```

2. **CocoaPods:**
   ```bash
   cd ios/App
   pod install
   ```

3. **Xcode Project:**
   - Make sure Capacitor framework is linked
   - Check Build Settings → Framework Search Paths

4. **Signing:**
   - Go to Signing & Capabilities tab
   - Select your Team
   - Enable "Automatically manage signing"

## Expected Behavior

After fix:
- ✅ App launches without crashing
- ✅ Capacitor bridge initializes properly
- ✅ Web view loads your React app
- ✅ No SIGTERM errors

## If Still Crashing

Check Xcode console for:
- Missing frameworks
- Bundle identifier issues
- Signing certificate problems
- CocoaPods dependency issues

Run:
```bash
cd ios/App
pod deintegrate
pod install
```

Then rebuild in Xcode.

---

**The fix has been applied! Clean and rebuild in Xcode.**

