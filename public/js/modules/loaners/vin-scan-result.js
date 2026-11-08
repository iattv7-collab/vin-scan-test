// public/js/modules/loaners/vin-scan-result.js
// Shows the VIN from the native scan.
import { renderAppHeader } from "/js/shared/app-header.js";
const RESULT_KEY = "dexp_scan_vin";
renderAppHeader({
  title: "VIN",
  showHome: true,
});
const vin = sessionStorage.getItem(RESULT_KEY) || "";
document.getElementById("vinOut").textContent = vin;
document.getElementById("scanAgainBtn")?.addEventListener("click", () => {
  sessionStorage.removeItem(RESULT_KEY);
  location.href = "/pages/vin-scan-test/index.html";
});
