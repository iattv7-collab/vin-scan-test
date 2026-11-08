export function renderAppHeader({ title = "", showHome = false } = {}) {
  const el = document.getElementById("appHeader");
  if (!el) return;
  el.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;">
    <span>${title}</span>
    ${showHome ? '<a href="/" style="color:#fff;text-decoration:none;font-size:14px;">Home</a>' : ''}
  </div>`;
}
