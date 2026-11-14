const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const icons = {
  web: '<rect x="3" y="4" width="18" height="16"/><path d="M3 9h18"/>',
  software: '<path d="M4 6l6 6-6 6"/><path d="M13 18h7"/>',
  automation: '<path d="M20 12a8 8 0 0 0-14-5.3L4 9"/><path d="M4 4v5h5"/><path d="M4 12a8 8 0 0 0 14 5.3L20 15"/><path d="M20 20v-5h-5"/>',
  web3: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',
};

const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="square" aria-hidden="true">${icons[name] ?? ""}</svg>`;

export const serviceItem = (service) => `
<a class="service reveal" href="#contact">
  <span class="service-top">${icon(service.icon)}<span class="arrow" aria-hidden="true">→</span></span>
  <span class="service-body">
    <span class="service-name">${escapeHtml(service.name)}</span>
    <span class="service-text">${escapeHtml(service.description)}</span>
  </span>
</a>`;

export const stackItem = (item) => `
<li class="tool reveal">
  <span class="glyph" aria-hidden="true">${escapeHtml(item.glyph)}</span>
  <span class="tool-text"><span class="tool-name">${escapeHtml(item.name)}</span><span class="tool-note">${escapeHtml(item.note)}</span></span>
</li>`;

export const processItem = (step) => `
<li class="step reveal">
  <span class="step-number">${escapeHtml(step.number)}</span>
  <h3>${escapeHtml(step.name)}</h3>
  <p>${escapeHtml(step.text)}</p>
</li>`;
