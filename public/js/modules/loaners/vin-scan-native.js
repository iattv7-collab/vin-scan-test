// public/js/modules/loaners/vin-scan-native.js
// Native camera. DEXP blue cross. No status text.
import { renderAppHeader } from "/js/shared/app-header.js";
import {
  normalizeVin,
  isValidVin,
  passesVinChecksum,
} from "/js/modules/loaners/vin-scanner.js";
const RESULT_KEY = "dexp_scan_vin";
const FAIL_MS = 12000;
function vinFromText(raw) {
  const cleaned = String(raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/O/g, "0")
    .replace(/I/g, "1")
    .replace(/Q/g, "0");
  for (let i = 0; i <= cleaned.length - 17; i += 1) {
    const vin = normalizeVin(cleaned.slice(i, i + 17));
    if (isValidVin(vin) && passesVinChecksum(vin)) return vin;
  }
  return "";
}
function showFail() {
  document.body.classList.remove("scanner-on");
  document.body.classList.add("failed");
}
function goResult(vin) {
  sessionStorage.setItem(RESULT_KEY, vin);
  location.href = "/pages/vin-scan-test/result.html";
}
async function startNativeScan() {
  const plugins = window.Capacitor?.Plugins || {};
  const BarcodeScanner = plugins.BarcodeScanner || plugins.CapacitorMlkitBarcodeTextScanner;
  if (!BarcodeScanner?.startScan) {
    showFail();
    return;
  }
  document.body.classList.remove("failed");
  document.body.classList.add("scanner-on");
  let done = false;
  const timer = window.setTimeout(() => {
    if (done) return;
    done = true;
    BarcodeScanner.stopScan?.().catch(() => {});
    BarcodeScanner.removeAllListeners?.().catch(() => {});
    showFail();
  }, FAIL_MS);
  try {
    await BarcodeScanner.removeAllListeners?.().catch(() => {});
    await BarcodeScanner.addListener("textScanned", async (event) => {
      if (done) return;
      const vin = vinFromText(event?.text || "");
      if (!vin) return;
      done = true;
      window.clearTimeout(timer);
      await BarcodeScanner.stopScan?.().catch(() => {});
      await BarcodeScanner.removeAllListeners?.().catch(() => {});
      goResult(vin);
    });
    await BarcodeScanner.startScan({
      textRecognition: true,
      textRecognitionInterval: 200,
    });
  } catch {
    done = true;
    window.clearTimeout(timer);
    showFail();
  }
}
renderAppHeader({
  title: "Scan VIN",
  showHome: true,
});
document.getElementById("rescanBtn")?.addEventListener("click", () => {
  startNativeScan();
});
startNativeScan();
