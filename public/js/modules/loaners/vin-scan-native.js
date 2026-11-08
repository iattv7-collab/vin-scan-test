// public/js/modules/loaners/vin-scan-native.js
// Native camera. DEXP blue cross. No status text.
import { renderAppHeader } from "/js/shared/app-header.js";
import {
  normalizeVin,
  isValidVin,
  passesVinChecksum,
  extractValidVin,
} from "/js/modules/loaners/vin-scanner.js";
const RESULT_KEY = "dexp_scan_vin";
const FAIL_MS = 12000;
const CONFIRM_READS = 2;

function textsFromEvent(event) {
  const chunks = [];
  const push = (value) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }
    const text = typeof value === "string" ? value : String(value);
    if (text.trim()) chunks.push(text);
  };
  push(event?.text);
  const blocks = event?.blocks || [];
  const lineTexts = [];
  for (const block of blocks) {
    push(block?.text);
    for (const line of block?.lines || []) {
      if (line?.text) {
        push(line.text);
        lineTexts.push(line.text);
      }
    }
  }
  if (lineTexts.length > 1) {
    push(lineTexts.join(""));
    push(lineTexts.join(" "));
  }
  return chunks;
}

function vinFromText(raw) {
  const vin = extractValidVin(raw);
  return vin && isValidVin(vin) && passesVinChecksum(vin) ? vin : "";
}

function vinFromEvent(event) {
  const chunks = textsFromEvent(event);
  for (const chunk of chunks) {
    const vin = vinFromText(chunk);
    if (vin) return vin;
  }
  return vinFromText(chunks.join("\n"));
}

function vinFromBarcode(barcode) {
  return vinFromText(
    barcode?.displayValue || barcode?.rawValue || barcode?.value || ""
  );
}

function showFail() {
  document.body.classList.remove("scanner-on");
  document.body.classList.add("failed");
}

function goResult(vin) {
  const accepted = normalizeVin(vin);
  if (!isValidVin(accepted) || !passesVinChecksum(accepted)) return;
  sessionStorage.setItem(RESULT_KEY, accepted);
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
  const votes = new Map();
  const timer = window.setTimeout(() => {
    if (done) return;
    done = true;
    BarcodeScanner.stopScan?.().catch(() => {});
    BarcodeScanner.removeAllListeners?.().catch(() => {});
    showFail();
  }, FAIL_MS);

  async function acceptVin(vin) {
    if (done) return;
    if (!isValidVin(vin) || !passesVinChecksum(vin)) return;
    done = true;
    window.clearTimeout(timer);
    await BarcodeScanner.stopScan?.().catch(() => {});
    await BarcodeScanner.removeAllListeners?.().catch(() => {});
    goResult(vin);
  }

  function voteVin(vin) {
    if (!vin || done) return;
    if (!isValidVin(vin) || !passesVinChecksum(vin)) return;
    const count = (votes.get(vin) || 0) + 1;
    votes.set(vin, count);
    if (count >= CONFIRM_READS) acceptVin(vin);
  }

  try {
    await BarcodeScanner.removeAllListeners?.().catch(() => {});
    await BarcodeScanner.addListener("textScanned", async (event) => {
      if (done) return;
      voteVin(vinFromEvent(event));
    });
    await BarcodeScanner.addListener("barcodesScanned", async (event) => {
      if (done) return;
      const barcodes = event?.barcodes || [];
      for (const barcode of barcodes) {
        const vin = vinFromBarcode(barcode);
        if (vin) {
          await acceptVin(vin);
          return;
        }
      }
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
