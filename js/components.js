import { serviceArt } from "./icons.js";

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pad = (index) => String(index + 1).padStart(2, "0");

export const serviceItem = (service, index) => `
<a class="svc svc-${escapeHtml(service.id)} reveal" href="#contact">
  <span class="svc-art" aria-hidden="true">${serviceArt[service.id] ?? ""}</span>
  <span class="svc-copy">
    <span class="svc-index">${pad(index)}</span>
    <h3 class="svc-name" data-i18n="services.items.${escapeHtml(service.id)}.name"></h3>
    <p class="svc-text" data-i18n="services.items.${escapeHtml(service.id)}.text"></p>
  </span>
</a>`;
