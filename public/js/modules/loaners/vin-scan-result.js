// public/js/modules/loaners/vin-scan-result.js
// Shows the VIN from the native scan and a basic decode.
import { renderAppHeader } from "/js/shared/app-header.js";
import { decodeVin } from "/js/modules/loaners/vin-scanner.js";
const RESULT_KEY = "dexp_scan_vin";
renderAppHeader({
  title: "VIN",
  showHome: true,
});
const vin = sessionStorage.getItem(RESULT_KEY) || "";
const decoded = decodeVin(vin);
const vinOut = document.getElementById("vinOut");
const checksumEl = document.getElementById("checksumBadge");
const decodeEl = document.getElementById("vinDecode");

if (vinOut) {
  vinOut.textContent = decoded.vin || "No VIN found";
}

if (checksumEl) {
  if (!decoded.vin) {
    checksumEl.textContent = "No VIN to check";
    checksumEl.className = "checksum-badge checksum-missing";
  } else if (decoded.checksumPassed) {
    checksumEl.textContent = "Checksum passed";
    checksumEl.className = "checksum-badge checksum-ok";
  } else {
    checksumEl.textContent = "Checksum failed";
    checksumEl.className = "checksum-badge checksum-bad";
  }
}

function row(label, value) {
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value == null || value === "" ? "—" : String(value);
  return [dt, dd];
}

if (decodeEl) {
  decodeEl.replaceChildren(
    ...row("Manufacturer", decoded.manufacturer),
    ...row("WMI", decoded.wmi),
    ...row("Region", decoded.region),
    ...row("Model year", decoded.modelYear),
    ...row("Vehicle descriptor", decoded.vehicleDescriptor),
    ...row("Check digit", decoded.checkDigit),
    ...row("Assembly plant", decoded.plantCode),
    ...row("Serial number", decoded.serialNumber)
  );
}

document.getElementById("scanAgainBtn")?.addEventListener("click", () => {
  sessionStorage.removeItem(RESULT_KEY);
  location.href = "/pages/vin-scan-test/index.html";
});
