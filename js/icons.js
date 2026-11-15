const open = 'fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square"';

export const serviceArt = {
  web: `<svg viewBox="0 0 240 150" ${open}>
    <rect x="12" y="12" width="216" height="126"/><path d="M12 34h216"/>
    <circle cx="24" cy="23" r="2.5"/><circle cx="34" cy="23" r="2.5"/><circle cx="44" cy="23" r="2.5"/>
    <rect x="28" y="52" width="92" height="10"/><rect x="28" y="70" width="60" height="6" opacity=".5"/><rect x="28" y="84" width="76" height="6" opacity=".5"/>
    <rect x="28" y="104" width="52" height="20"/>
    <rect x="136" y="52" width="76" height="72"/><path d="M136 52l76 72M212 52l-76 72" opacity=".35"/>
    <path class="scan" d="M12 34h216" stroke-width="1.6"/>
  </svg>`,
  software: `<svg viewBox="0 0 200 200" ${open}>
    <rect x="14" y="14" width="172" height="172"/><path d="M14 38h172"/>
    <path d="M32 62l8 6-8 6"/><rect x="50" y="64" width="70" height="6"/>
    <path d="M32 92l8 6-8 6"/><rect x="50" y="94" width="100" height="6" opacity=".5"/><rect x="50" y="110" width="60" height="6" opacity=".5"/>
    <path d="M32 140l8 6-8 6"/><rect class="caret" x="50" y="140" width="9" height="13" fill="currentColor" stroke="none"/>
    <path d="M146 64h24M146 94h24" opacity=".35"/>
  </svg>`,
  automation: `<svg viewBox="0 0 240 180" ${open}>
    <path class="flow" d="M53 83L107 47M53 97L107 133M133 47L187 83M133 133L187 97" stroke-dasharray="3 5"/>
    <circle cx="40" cy="90" r="14"/><circle cx="120" cy="38" r="14"/><circle cx="120" cy="142" r="14"/><circle cx="200" cy="90" r="14"/>
    <circle class="node" cx="40" cy="90" r="4" fill="currentColor" stroke="none"/><circle class="node" cx="120" cy="38" r="4" fill="currentColor" stroke="none"/>
    <circle class="node" cx="120" cy="142" r="4" fill="currentColor" stroke="none"/><circle class="node" cx="200" cy="90" r="4" fill="currentColor" stroke="none"/>
  </svg>`,
  web3: `<svg viewBox="0 0 240 160" ${open}>
    <g class="cube"><path d="M120 22L176 54V106L120 138L64 106V54Z"/><path d="M120 80L176 54M120 80L64 54M120 80V138" opacity=".6"/></g>
    <circle cx="32" cy="40" r="3"/><circle cx="208" cy="124" r="3"/><circle cx="210" cy="36" r="3"/>
    <path d="M35 41L64 54M205 123L176 106M207 38L176 54" opacity=".5" stroke-dasharray="2 4"/>
  </svg>`,
};
