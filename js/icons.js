const defs = (id) => `<defs>
  <filter id="sh-${id}" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#000" flood-opacity=".34"/></filter>
  <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="st-a"/><stop offset="1" class="st-b"/></linearGradient>
  <linearGradient id="v-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="st-a" stop-opacity=".45"/><stop offset="1" class="st-a" stop-opacity="0"/></linearGradient>
  <clipPath id="c-${id}">WIN</clipPath>
</defs>`;

const win = (id, x, y, w, h) => {
  const rect = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>`;
  return {
    defs: defs(id).replace("WIN", rect),
    base: `<g filter="url(#sh-${id})"><rect class="m-bg" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/></g>`,
    edge: `<rect class="m-ln" x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="14"/>`,
    dots: [18, 34, 50].map((d) => `<circle class="m-d" opacity=".55" cx="${x + d}" cy="${y + 18}" r="4"/>`).join(""),
  };
};

const code = (lines, x, y, step) =>
  lines
    .map((parts, index) => {
      const spans = parts.map(([cls, text]) => `<tspan class="${cls}">${text.replace(/ /g, "\u00a0")}</tspan>`).join("");
      return `<text x="${x}" y="${y + index * step}" font-size="13">${spans}</text>`;
    })
    .join("");

const web = (() => {
  const w = win("web", 36, 32, 568, 340);
  const card = (x, tone) =>
    `<rect class="m-s" x="${x}" y="292" width="170" height="62" rx="10"/><circle cx="${x + 24}" cy="316" r="9" fill="url(#g-web)" opacity="${tone}"/><rect class="m-t" x="${x + 44}" y="308" width="64" height="6" rx="3" opacity=".8"/><rect class="m-d" x="${x + 44}" y="322" width="96" height="5" rx="2.5" opacity=".45"/><rect class="m-d" x="${x + 16}" y="338" width="130" height="4" rx="2" opacity=".3"/>`;
  return `<svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">${w.defs}${w.base}
<g clip-path="url(#c-web)">
  <rect class="m-s" x="36" y="32" width="568" height="36"/>${w.dots}
  <rect class="m-s2" x="190" y="40" width="260" height="20" rx="10"/><text class="m-d" x="320" y="54" font-size="11" text-anchor="middle">example.com</text>
  <circle cx="62" cy="90" r="8" fill="url(#g-web)"/><text class="m-t" x="78" y="94" font-size="12" font-weight="700">Brand</text>
  <rect class="m-d" x="400" y="88" width="34" height="5" rx="2.5" opacity=".5"/><rect class="m-d" x="444" y="88" width="34" height="5" rx="2.5" opacity=".5"/><rect class="m-d" x="488" y="88" width="34" height="5" rx="2.5" opacity=".5"/>
  <rect x="540" y="78" width="48" height="20" rx="10" fill="url(#g-web)"/>
  <text class="m-t" x="62" y="152" font-size="30" font-weight="700" letter-spacing="-1">Launch with</text>
  <text x="62" y="186" font-size="30" font-weight="700" letter-spacing="-1" fill="url(#g-web)">confidence.</text>
  <rect class="m-d" x="62" y="206" width="214" height="6" rx="3" opacity=".45"/><rect class="m-d" x="62" y="220" width="168" height="6" rx="3" opacity=".3"/>
  <rect x="62" y="242" width="96" height="28" rx="14" fill="url(#g-web)"/><text x="110" y="260" font-size="11" font-weight="600" text-anchor="middle" fill="#fff">Get started</text>
  <rect class="m-ln" x="168.5" y="242.5" width="84" height="27" rx="13.5"/><text class="m-t" x="210" y="260" font-size="11" text-anchor="middle">Learn more</text>
  <rect x="340" y="112" width="244" height="164" rx="14" fill="url(#g-web)" opacity=".9"/>
  <rect class="m-bg" x="360" y="132" width="132" height="76" rx="10" opacity=".92"/>
  <rect class="m-t" x="374" y="146" width="56" height="6" rx="3" opacity=".8"/><rect class="m-d" x="374" y="160" width="96" height="5" rx="2.5" opacity=".5"/>
  <path d="M374 196l18-16 16 8 22-22 20 12" fill="none" stroke="var(--m-g)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect class="m-bg" x="470" y="200" width="98" height="60" rx="10" opacity=".92"/>
  <circle cx="500" cy="230" r="15" fill="none" class="m-ln" stroke-width="4"/><path d="M500 215a15 15 0 1 1-14.3 19.6" fill="none" stroke="var(--m-g)" stroke-width="4" stroke-linecap="round"/>
  <text class="m-t" x="500" y="234" font-size="11" font-weight="700" text-anchor="middle">98</text><text class="m-d" x="524" y="226" font-size="9">Perf</text><text class="m-g" x="524" y="240" font-size="9" font-weight="600">+12%</text>
  ${card(62, 1)}${card(246, 0.8)}${card(430, 0.6)}
</g>${w.edge}</svg>`;
})();

const software = (() => {
  const w = win("sw", 24, 24, 432, 432);
  const row = (n, y, cls, name, active) =>
    `${active ? `<rect x="24" y="${y - 14}" width="106" height="22" class="m-s2"/>` : ""}<rect class="${cls}" x="38" y="${y - 6}" width="8" height="8" rx="2"/><text class="${active ? "m-t" : "m-d"}" x="54" y="${y + 2}" font-size="11">${name}</text>`;
  const lines = [
    [["k", "import"], ["m-t", " { db } "], ["k", "from"], ["s", ' "./db"'], ["m-t", ";"]],
    [],
    [["k", "export async function"], ["f", " sync"], ["m-t", "() {"]],
    [["m-t", "  "], ["k", "const"], ["m-t", " rows = "], ["k", "await"], ["m-t", " db."], ["f", "all"], ["m-t", "();"]],
    [["m-t", "  "], ["k", "for"], ["m-t", " ("], ["k", "const"], ["m-t", " r "], ["k", "of"], ["m-t", " rows) {"]],
    [["m-t", "    "], ["k", "await"], ["f", " push"], ["m-t", "(r.id, r.data);"]],
    [["m-t", "  }"]],
    [["m-t", "  "], ["k", "return"], ["m-t", " rows.length;"]],
    [["m-t", "}"]],
  ];
  const numbers = lines.map((_, i) => `<text class="m-d" x="156" y="${92 + i * 22}" font-size="11" text-anchor="end" opacity=".6">${i + 1}</text>`).join("");
  return `<svg viewBox="0 0 480 480" preserveAspectRatio="xMidYMid slice">${w.defs}${w.base}
<g clip-path="url(#c-sw)">
  <rect class="m-s" x="24" y="24" width="432" height="34"/>${w.dots}
  <rect class="m-bg" x="96" y="32" width="92" height="26" rx="6"/><circle class="m-a" cx="108" cy="45" r="3"/><text class="m-t" x="118" y="49" font-size="11">sync.ts</text>
  <text class="m-d" x="204" y="49" font-size="11">db.ts</text><text class="m-d" x="256" y="49" font-size="11">api.ts</text>
  <rect class="m-s" x="24" y="58" width="106" height="366"/><text class="m-d" x="38" y="80" font-size="9" letter-spacing="1.2">EXPLORER</text>
  ${row(0, 106, "m-w", "src", false)}${row(1, 130, "m-a", "sync.ts", true)}${row(2, 154, "m-b", "db.ts", false)}${row(3, 178, "m-b", "api.ts", false)}${row(4, 202, "m-g", "utils.ts", false)}
  <rect class="m-s2" x="130" y="${92 + 5 * 22 - 15}" width="326" height="22" opacity=".7"/>
  <rect class="m-a" x="130" y="${92 + 5 * 22 - 15}" width="2" height="22"/>
  ${numbers}${code(lines, 168, 92, 22)}
  <rect fill="url(#g-sw)" x="386" y="${92 + 5 * 22 - 11}" width="1.6" height="15"/>
  <rect class="m-ln" x="130" y="306" width="326" height="118"/><rect class="m-s" x="130" y="306" width="326" height="22"/><text class="m-d" x="146" y="321" font-size="9" letter-spacing="1.2">TERMINAL</text>
  <text class="m-t" x="146" y="348" font-size="12"><tspan class="m-g">$</tspan> npm run build</text>
  <text class="m-g" x="146" y="368" font-size="12">✓ compiled 42 modules in 1.2s</text><text class="m-g" x="146" y="388" font-size="12">✓ 18 tests passed</text><text class="m-d" x="146" y="408" font-size="12">watching for changes…</text>
  <rect x="24" y="424" width="432" height="32" fill="url(#g-sw)"/>
  <text x="40" y="444" font-size="11" fill="#fff" font-weight="600">main</text><text x="300" y="444" font-size="11" fill="#fff" opacity=".9">TypeScript</text><text x="376" y="444" font-size="11" fill="#fff" opacity=".9">Ln 6</text>
</g>${w.edge}</svg>`;
})();

const automation = (() => {
  const w = win("au", 24, 24, 592, 432);
  const node = (x, y, title, sub, glyph) =>
    `<g><rect class="m-s" x="${x}" y="${y}" width="140" height="64" rx="12"/><rect class="m-ln" x="${x + 0.5}" y="${y + 0.5}" width="139" height="63" rx="11.5"/>
<circle cx="${x + 26}" cy="${y + 32}" r="15" fill="url(#g-au)"/><g fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" transform="translate(${x + 26} ${y + 32})">${glyph}</g>
<text class="m-t" x="${x + 49}" y="${y + 29}" font-size="13" font-weight="700">${title}</text><text class="m-d" x="${x + 49}" y="${y + 46}" font-size="10">${sub}</text>
<circle class="m-g" cx="${x + 132}" cy="${y + 8}" r="8" stroke="var(--m-bg)" stroke-width="2"/><path d="M${x + 128.5} ${y + 8}l2.6 2.6 4.4-5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<circle class="m-bg" cx="${x}" cy="${y + 32}" r="4" stroke="var(--m-a)" stroke-width="1.6"/><circle class="m-bg" cx="${x + 140}" cy="${y + 32}" r="4" stroke="var(--m-a)" stroke-width="1.6"/></g>`;
  const link = (d) => `<path class="flow" d="${d}" fill="none" stroke="var(--m-a)" stroke-width="2" stroke-dasharray="5 6" stroke-linecap="round" opacity=".75"/>`;
  return `<svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice">${w.defs}
<defs><pattern id="dots-au" width="20" height="20" patternUnits="userSpaceOnUse"><circle class="m-d" cx="2" cy="2" r="1" opacity=".35"/></pattern></defs>${w.base}
<g clip-path="url(#c-au)">
  <rect class="m-s" x="24" y="24" width="592" height="40"/>${w.dots}
  <text class="m-t" x="96" y="49" font-size="12" font-weight="600">Order alerts</text>
  <rect class="m-g" x="540" y="35" width="34" height="18" rx="9" opacity=".9"/><circle cx="565" cy="44" r="6.5" fill="#fff"/><text class="m-d" x="526" y="48" font-size="10" text-anchor="end">Active</text>
  <rect x="24" y="64" width="592" height="336" fill="url(#dots-au)"/>
  ${link("M184 234H230")}${link("M370 234C408 234 400 134 440 134")}${link("M370 234C408 234 400 334 440 334")}
  ${node(44, 202, "Webhook", "POST /order", '<path d="M2-8l-7 10h6l-2 8 8-11H2z"/>')}
  ${node(230, 202, "Filter", "amount &gt; 100", '<path d="M-7-6h14l-5 6v6l-4 2V0z"/>')}
  ${node(440, 102, "Discord", "send message", '<path d="M-7-5h14v9h-8l-4 3v-3h-2z"/>')}
  ${node(440, 302, "Sheets", "append row", '<path d="M-7-6h14v12h-14zM-7-1h14M-7 3h14M-1-6v12"/>')}
  <rect class="m-s" x="24" y="400" width="592" height="56"/><circle class="m-g" cx="48" cy="428" r="4"/>
  <text class="m-t" x="60" y="432" font-size="11">Last run</text><text class="m-d" x="120" y="432" font-size="11">· 4/4 steps · 1.2s</text>
  <rect x="520" y="414" width="76" height="28" rx="14" fill="url(#g-au)"/><text x="558" y="432" font-size="11" font-weight="600" text-anchor="middle" fill="#fff">Run now</text>
</g>${w.edge}</svg>`;
})();

const web3 = (() => {
  const w = win("w3", 24, 24, 552, 352);
  const stat = (x, label, value) =>
    `<rect class="m-s" x="${x}" y="78" width="164" height="58" rx="10"/><text class="m-d" x="${x + 14}" y="98" font-size="10">${label}</text><text class="m-t" x="${x + 14}" y="124" font-size="17" font-weight="700">${value}</text>`;
  const tx = (y, hash, value, age) =>
    `<circle cx="274" cy="${y + 16}" r="8" fill="url(#g-w3)"/><text class="m-t" x="292" y="${y + 20}" font-size="11">${hash}</text>
<text class="m-t" x="546" y="${y + 14}" font-size="11" font-weight="600" text-anchor="end">${value}</text><text class="m-d" x="546" y="${y + 28}" font-size="9" text-anchor="end">${age}</text><rect class="m-ln" x="262" y="${y + 36}" width="298" height="0.6"/>`;
  return `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">${w.defs}${w.base}
<g clip-path="url(#c-w3)">
  <rect class="m-s" x="24" y="24" width="552" height="42"/>
  <path d="M50 36l9 5v10l-9 5-9-5V41z" fill="url(#g-w3)"/><text class="m-t" x="68" y="50" font-size="13" font-weight="700">Explorer</text>
  <rect class="m-s2" x="180" y="34" width="240" height="22" rx="11"/><text class="m-d" x="196" y="49" font-size="10">Search address / tx hash</text>
  <rect class="m-s2" x="466" y="34" width="88" height="22" rx="11"/><circle class="m-g" cx="482" cy="45" r="3.5"/><text class="m-t" x="492" y="49" font-size="10">Mainnet</text>
  ${stat(44, "Latest block", "19,482,310")}${stat(220, "Gas price", "14 gwei")}${stat(396, "Txns (24h)", "1.18M")}
  <rect class="m-s" x="44" y="150" width="198" height="206" rx="10"/><text class="m-t" x="58" y="174" font-size="11" font-weight="600">Activity</text><text class="m-d" x="190" y="174" font-size="9">7d</text>
  <path d="M58 320L82 296l24 12 28-34 26 16 28-44 22 18 8-20v76z" fill="url(#v-w3)"/>
  <path d="M58 320L82 296l24 12 28-34 26 16 28-44 22 18 8-20" fill="none" stroke="var(--m-a)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect class="m-ln" x="58" y="338" width="170" height="0.6"/>
  <rect class="m-s" x="254" y="150" width="306" height="206" rx="10"/><text class="m-t" x="274" y="174" font-size="11" font-weight="600">Latest transactions</text>
  ${tx(184, "0x7a3f…c91e", "1.25 ETH", "12s ago")}${tx(220, "0x91bc…07aa", "0.08 ETH", "24s ago")}${tx(256, "0xd402…5be3", "3.60 ETH", "41s ago")}${tx(292, "0x03ee…a1f8", "0.52 ETH", "58s ago")}
</g>${w.edge}</svg>`;
})();

export const serviceArt = { web, software, automation, web3 };
