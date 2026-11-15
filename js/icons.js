const T = (x, y, s, o = 1, extra = "") => `<text x="${x}" y="${y}" font-size="${s}" opacity="${o}" ${extra}>`;

const web = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
<defs><pattern id="ht-w" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" class="hl"/></pattern><clipPath id="cp-w"><rect x="17" y="43" width="366" height="240"/></clipPath></defs>
<rect class="sf" x="16.5" y="16.5" width="367" height="267"/><path class="st" d="M16 42.5H384"/>
<circle class="st" cx="30" cy="29" r="3.5"/><circle class="st" cx="42" cy="29" r="3.5"/><circle class="st" cx="54" cy="29" r="3.5"/>
<rect class="st" x="86.500" y="22.500" width="228" height="14"/>${T(200, 32.5, 8.5, 0.6, 'text-anchor="middle"')}example.dev</text>
<g clip-path="url(#cp-w)"><g class="pg">
 <rect x="34" y="54" width="10" height="10" fill="currentColor"/><rect x="50" y="57" width="30" height="4" opacity=".7" fill="currentColor"/>
 <rect x="250" y="58" width="22" height="3" opacity=".35" fill="currentColor"/><rect x="282" y="58" width="22" height="3" opacity=".35" fill="currentColor"/><rect x="314" y="58" width="22" height="3" opacity=".35" fill="currentColor"/><rect class="st" x="347.500" y="51.500" width="26" height="16"/>
 <path class="st" d="M17 76.500H383"/>
 ${T(34, 118, 30, 1, 'font-weight="600" letter-spacing="-1" style="font-family:var(--display)"')}Crafted for</text>
 ${T(34, 150, 30, 0.45, 'font-weight="600" letter-spacing="-1" style="font-family:var(--display)"')}the web.</text>
 <rect x="34" y="168" width="172" height="4" opacity=".35" fill="currentColor"/><rect x="34" y="178" width="138" height="4" opacity=".2" fill="currentColor"/>
 <rect x="34" y="196" width="74" height="22" fill="currentColor"/>${T(71, 210.500, 9.5, 1, 'text-anchor="middle" class="inv" font-weight="600"')}Start</text>
 <rect class="st" x="116.500" y="196.500" width="74" height="21"/>${T(153.500, 210.500, 9.5, 0.8, 'text-anchor="middle"')}Docs</text>
 <rect class="st" x="246.500" y="90.500" width="122" height="128" fill="url(#ht-w)"/><path class="st" d="M246 90l122 128M368 90L246 218" opacity=".5"/>
 <rect class="sf thumb" x="258.500" y="164.500" width="98" height="44"/><rect class="st thumb" x="258.500" y="164.500" width="98" height="44"/>
 <rect class="thumb" x="268" y="174" width="40" height="4" fill="currentColor" opacity=".8"/><rect class="thumb" x="268" y="184" width="70" height="3" fill="currentColor" opacity=".35"/><rect class="thumb" x="268" y="192" width="54" height="3" fill="currentColor" opacity=".35"/>
 <path class="st" d="M17 238.500H383"/>
 <rect class="st" x="34.500" y="252.500" width="8" height="8"/><rect x="50" y="253" width="60" height="4" opacity=".8" fill="currentColor"/><rect x="50" y="262" width="90" height="3" opacity=".3" fill="currentColor"/>
 <rect class="st" x="162.500" y="252.500" width="8" height="8"/><rect x="178" y="253" width="50" height="4" opacity=".8" fill="currentColor"/><rect x="178" y="262" width="80" height="3" opacity=".3" fill="currentColor"/>
 <rect class="st" x="290.500" y="252.500" width="8" height="8"/><rect x="306" y="253" width="56" height="4" opacity=".8" fill="currentColor"/><rect x="306" y="262" width="62" height="3" opacity=".3" fill="currentColor"/>
 <path class="st" d="M17 296.500H383"/><rect x="34" y="312" width="150" height="9" fill="currentColor" opacity=".85"/><rect x="34" y="330" width="260" height="4" fill="currentColor" opacity=".3"/>
 <rect class="st" x="34.500" y="350.500" width="100" height="60" fill="url(#ht-w)"/><rect class="st" x="146.500" y="350.500" width="100" height="60" fill="url(#ht-w)"/><rect class="st" x="258.500" y="350.500" width="100" height="60" fill="url(#ht-w)"/>
</g></g>
<rect class="st" x="377.500" y="50.500" width="3" height="52" opacity=".6"/><rect class="thumbbar" x="377" y="52" width="4" height="16" fill="currentColor" opacity=".7"/>
<rect class="st" x="16.500" y="16.500" width="367" height="267"/></svg>`;

const code = [
  [["kw", "import"], ["pl", " { db } "], ["kw", "from"], ["sg", ' "./db"'], ["pl", ";"]],
  [],
  [["kw", "export async function"], ["fn", " sync"], ["pl", "() {"]],
  [["pl", "  "], ["kw", "const"], ["pl", " rows = "], ["kw", "await"], ["fn", " db.all"], ["pl", "();"]],
  [["pl", "  "], ["kw", "for"], ["pl", " ("], ["kw", "const"], ["pl", " r "], ["kw", "of"], ["pl", " rows) {"]],
  [["pl", "    "], ["kw", "await"], ["fn", " push"], ["pl", "(r.id, r.data);"]],
  [["pl", "  }"]],
  [["pl", "  "], ["kw", "return"], ["pl", " rows.length;"]],
  [["pl", "}"]],
  [["kw", "export const"], ["pl", " ready = "], ["kw", "true"], ["pl", ";"]],
];
const lines = code
  .map((parts, i) => {
    const spans = parts.map(([c, t]) => `<tspan class="${c}">${t.replace(/ /g, "\u00a0")}</tspan>`).join("");
    const y = 64 + i * 16.5;
    return `<text x="100" y="${y}" font-size="8.5" text-anchor="end" opacity=".3">${i + 1}</text><text x="110" y="${y}" font-size="10">${spans}</text>`;
  })
  .join("");

const software = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
<rect class="sf" x="16.500" y="16.500" width="367" height="267"/>
<path class="st" d="M16 40.500H384M96.500 40V232M16 232.500H384M16 268.500H384"/>
<rect class="bgc" x="60" y="17" width="82" height="23"/>${T(76, 32, 9.5, 1)}sync.ts</text><circle cx="68" cy="28.500" r="2" fill="currentColor"/>${T(156, 32, 9.5, 0.4)}db.ts</text>${T(204, 32, 9.5, 0.4)}api.ts</text>
${T(28, 58, 7.5, 0.4, 'letter-spacing="1.2"')}EXPLORER</text>
<rect x="17" y="85" width="79" height="17" fill="currentColor" opacity=".1"/><rect x="17" y="85" width="2" height="17" fill="currentColor"/>
${T(30, 77, 9.5, 0.55)}src</text>${T(30, 98, 9.5, 1)}sync.ts</text>${T(30, 115, 9.5, 0.55)}db.ts</text>${T(30, 132, 9.5, 0.55)}api.ts</text>${T(30, 149, 9.5, 0.55)}utils.ts</text>
<rect class="hlrow" x="97" y="${64 + 5 * 16.5 - 12}" width="240" height="16.500" fill="currentColor" opacity=".08"/>
${lines}
<rect class="cover" x="97" y="${64 + 9 * 16.5 - 12}" width="240" height="17" style="fill:var(--surface)"/>
<rect class="caret" x="${110 + 10.5 * 6}" y="${64 + 9 * 16.5 - 10}" width="1.600" height="12" fill="currentColor"/>
<g opacity=".4"><rect x="352" y="52" width="24" height="2" fill="currentColor"/><rect x="352" y="58" width="16" height="2" fill="currentColor"/><rect x="352" y="64" width="22" height="2" fill="currentColor"/><rect x="352" y="70" width="12" height="2" fill="currentColor"/><rect x="352" y="76" width="20" height="2" fill="currentColor"/><rect x="352" y="82" width="8" height="2" fill="currentColor"/></g>
${T(110, 246, 8.5, 0.5)}$ npm run build</text>${T(110, 261, 8.5, 0.85)}✓ built in 1.2s</text>
<rect x="17" y="269" width="366" height="14" fill="currentColor" opacity=".9"/>${T(28, 279, 8, 1, 'class="inv"')}main</text>${T(286, 279, 8, 1, 'class="inv"')}TypeScript</text>${T(344, 279, 8, 1, 'class="inv"')}Ln 6</text>
<rect class="st" x="16.500" y="16.500" width="367" height="267"/></svg>`;

const node = (x, y, title, sub, glyph) =>
  `<g class="nd"><rect class="sf" x="${x}" y="${y}" width="92" height="42"/><rect class="st ndl" x="${x + 0.5}" y="${y + 0.5}" width="91" height="41"/>
<rect class="st" x="${x + 9.5}" y="${y + 10.5}" width="20" height="20"/><g class="gl" transform="translate(${x + 19.5} ${y + 20.5})" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="square">${glyph}</g>
${T(x + 38, y + 20, 10, 1, 'font-weight="600"')}${title}</text>${T(x + 38, y + 32, 8, 0.5)}${sub}</text>
<circle class="bgc" cx="${x}" cy="${y + 21}" r="3" stroke="currentColor" stroke-width="1"/><circle class="bgc" cx="${x + 92}" cy="${y + 21}" r="3" stroke="currentColor" stroke-width="1"/></g>`;
const wire = (d) => `<path d="${d}" pathLength="100" class="wr"/><path d="${d}" pathLength="100" class="pk"/>`;

const automation = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
<defs><pattern id="dt-a" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".25"/></pattern></defs>
<rect class="sf" x="16.500" y="16.500" width="367" height="267"/><rect x="17" y="41" width="366" height="226" fill="url(#dt-a)"/>
<path class="st" d="M16 40.500H384M16 267.500H384"/>${T(28, 32, 8.5, 0.6, 'letter-spacing="1"')}WORKFLOW / ORDER-SYNC</text>${T(372, 32, 8.5, 0.6, 'text-anchor="end"')}● ACTIVE</text>
${wire("M117 150H147")}${wire("M239 150H253Q257 150 257 146V86Q257 82 261 82H275")}${wire("M239 150H253Q257 150 257 154V214Q257 218 261 218H275")}
${node(25, 129, "Trigger", "webhook", '<path d="M-3-5l-3 6h6l-3 6"/>')}
${node(147, 129, "Transform", "map fields", '<path d="M-5-3h10M-5 3h10M-2-5l-3 2 3 2M2 1l3 2-3 2"/>')}
${node(275, 61, "Notify", "send message", '<path d="M-5-4h10v7h-5l-3 3v-3h-2z"/>')}
${node(275, 197, "Store", "write row", '<path d="M-5-4h10v9h-10zM-5 0h10M-1-4v9"/>')}
${T(372, 255, 8, 0.5, 'text-anchor="end"')}4 nodes · 1.2s</text>${T(28, 255, 8, 0.5)}● run #0142 · ok</text>
<rect class="st" x="16.500" y="16.500" width="367" height="267"/></svg>`;

const bars = [34, 52, 40, 66, 48, 78, 58, 90, 70, 100, 82, 94]
  .map((h, i) => `<rect class="bar" style="--i:${i}" x="${26 + i * 11.4}" y="${252 - h}" width="7" height="${h}" fill="currentColor" opacity="${0.35 + (i % 3) * 0.2}"/>`)
  .join("");
const block = (x, n, t) =>
  `<rect class="st sf" x="${x + 0.5}" y="64.500" width="70" height="40"/>${T(x + 8, 80, 8.5, 1, 'font-weight="600"')}#${n}</text>${T(x + 8, 93, 8, 0.5)}${t}</text><path class="st" d="M${x + 70} 84.500h8"/>`;
const tx = (y, h, v) =>
  `<circle class="st" cx="190" cy="${y + 9}" r="5"/>${T(202, y + 12, 9, 0.9)}${h}</text>${T(366, y + 12, 9, 0.9, 'text-anchor="end"')}${v}</text><path class="st" d="M178 ${y + 22.5}H370" opacity=".6"/>`;

const web3 = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
<defs><clipPath id="cp-3"><rect x="17" y="60" width="366" height="52"/></clipPath></defs>
<rect class="sf" x="16.500" y="16.500" width="367" height="267"/><path class="st" d="M16 40.500H384"/>
<path d="M30 21l7 4v8l-7 4-7-4v-8z" fill="none" stroke="currentColor" stroke-width="1.2"/>${T(44, 33, 10, 1, 'font-weight="600"')}Explorer</text>
<rect class="st" x="140.500" y="22.500" width="150" height="14"/>${T(150, 32.500, 8, 0.45)}Search address / tx hash</text>${T(372, 33, 8, 0.6, 'text-anchor="end"')}● Mainnet</text>
<g clip-path="url(#cp-3)"><g class="strip">${block(26, "19,482,308", "9 txs")}${block(104, "19,482,309", "14 txs")}${block(182, "19,482,310", "12 txs")}${block(260, "19,482,311", "11 txs")}${block(338, "19,482,312", "10 txs")}</g></g>
${T(26, 126, 8, 0.5, 'letter-spacing="1"')}ACTIVITY · 7D</text>${bars}<path class="st" d="M24 252.500H162"/>
${T(178, 126, 8, 0.5, 'letter-spacing="1"')}LATEST TRANSACTIONS</text>
<rect class="rowhl" x="178" y="135" width="192" height="22" fill="currentColor" opacity=".08"/>
${tx(136, "0x7a3f…c91e", "1.25 ETH")}${tx(160, "0x91bc…07aa", "0.08 ETH")}${tx(184, "0xd402…5be3", "3.60 ETH")}${tx(208, "0x03ee…a1f8", "0.52 ETH")}${tx(232, "0xb7c1…92d0", "0.97 ETH")}
<rect class="st" x="16.500" y="16.500" width="367" height="267"/></svg>`;

export const serviceArt = { web, software, automation, web3 };
