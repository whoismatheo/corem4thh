import { serviceArt } from "./icons.js";

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pad = (index) => String(index + 1).padStart(2, "0");

export const serviceItem = (service, index) => `
<a class="svc svc-${escapeHtml(service.id)} reveal" href="#contact">
  <span class="svc-art" aria-hidden="true">${serviceArt[service.id] ?? ""}<span class="svc-arrow">↗</span></span>
  <span class="svc-copy">
    <span class="svc-index">${pad(index)}</span>
    <h3 class="svc-name" data-i18n="services.items.${escapeHtml(service.id)}.name"></h3>
    <p class="svc-text" data-i18n="services.items.${escapeHtml(service.id)}.text"></p>
  </span>
</a>`;

export const processItem = (step, index) => `
<li class="step reveal">
  <span class="step-n" aria-hidden="true">${pad(index)}</span>
  <h3 data-i18n="process.steps.${escapeHtml(step.id)}.name"></h3>
  <p data-i18n="process.steps.${escapeHtml(step.id)}.text"></p>
</li>`;

export const stackItem = (item) => `
<li class="tool reveal">
  <span class="glyph" aria-hidden="true">${escapeHtml(item.glyph)}</span>
  <span class="tool-name">${escapeHtml(item.name)}</span>
</li>`;
