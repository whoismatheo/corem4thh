import { serviceArt } from "./icons.js";

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const pad = (index) => String(index + 1).padStart(2, "0");

export const serviceItem = (service, index) => `
<a class="svc svc-${escapeHtml(service.id)}" href="#contact" data-r="wipe" style="--i:${index}">
  <span class="svc-art" aria-hidden="true">${serviceArt[service.id] ?? ""}</span>
  <span class="svc-head"><span class="svc-n">${pad(index)}</span><h3 class="svc-name" data-i18n="services.items.${escapeHtml(service.id)}.name"></h3><span class="svc-go" aria-hidden="true">↗</span></span>
  <p class="svc-text" data-i18n="services.items.${escapeHtml(service.id)}.text"></p>
</a>`;

export const techGroup = (group, groupIndex, offset) => `
<div class="tech-row" data-r="row">
  <p class="tech-cat"><span class="tc-i">${String.fromCharCode(65 + groupIndex)}</span><span data-i18n="stack.groups.${escapeHtml(group.id)}"></span></p>
  <ul class="tech-list">${group.items
    .map(
      (name, k) =>
        `<li style="--i:${k}"><span class="ti">${pad(offset + k)}</span><span class="tn">${escapeHtml(name)}</span></li>`,
    )
    .join("")}</ul>
</div>`;
