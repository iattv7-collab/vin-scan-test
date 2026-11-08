# VIN Scan Test

Standalone Capacitor app for testing the native camera VIN scanner (DEXP-style blue crosshairs, ML Kit text recognition).

## Launch on Android

1. Connect an Android device (USB debugging on) or start an emulator.
2. In this folder:
   ```
   npm install
   npx cap sync
   npx cap run android
   ```
3. Grant camera permission when prompted.
4. Point at a VIN. On success it shows the VIN page. On timeout (12s) or failure, Rescan appears.

## Notes

- Uses `@pantrist/capacitor-mlkit-barcode-text-scanner` for live text recognition on the camera feed.
- Designed so the pages/JS can later drop into the main DEXP app.
- iOS requires Xcode / CocoaPods on a Mac.
