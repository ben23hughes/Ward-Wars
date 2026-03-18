// ═══════════════════════════════════════════════════════
//  CHAPEL CLASH — SVG Character Sprites
//  All characters: 46×62 viewBox for gameplay
// ═══════════════════════════════════════════════════════

// Shared SVG pieces
const S = {
  shadow: `<ellipse cx="23" cy="60" rx="14" ry="4" fill="rgba(0,0,0,0.4)"/>`,
  eye: (x,y,iris='#2a1a08') => `
    <circle cx="${x}" cy="${y}" r="2.8" fill="white"/>
    <circle cx="${x+0.4}" cy="${y+0.3}" r="1.6" fill="${iris}"/>
    <circle cx="${x+0.8}" cy="${y}" r="0.7" fill="white"/>`,
  eyeSmall: (x,y,iris='#2a1a08') => `
    <circle cx="${x}" cy="${y}" r="2" fill="white"/>
    <circle cx="${x+0.3}" cy="${y+0.2}" r="1.1" fill="${iris}"/>
    <circle cx="${x+0.6}" cy="${y}" r="0.5" fill="white"/>`,
  smile: (y=18) => `<path d="M19 ${y} Q23 ${y+3} 27 ${y}" stroke="#c07040" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  frown: (y=18) => `<path d="M19 ${y+2} Q23 ${y-1} 27 ${y+2}" stroke="#8a4a30" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  smirk: (y=18) => `<path d="M20 ${y+1} Q24 ${y} 27 ${y}" stroke="#c07040" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
};

const CHAR_SVGS = {

  // ─── MISSIONARY ──────────────────────────────────────────
  missionary: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- legs / dark slacks -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#1a1a2e"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#1a1a2e"/>
  <!-- shoes -->
  <ellipse cx="18" cy="58" rx="6" ry="3.5" fill="#0a0a14"/>
  <ellipse cx="28" cy="58" rx="6" ry="3.5" fill="#0a0a14"/>
  <!-- white shirt torso -->
  <rect x="11" y="22" width="24" height="20" rx="5" fill="#e8eaf0"/>
  <rect x="11" y="22" width="24" height="9" rx="5" fill="#f4f5fa"/>
  <!-- tie -->
  <polygon points="22,24 24.5,24 24,37 22.5,37" fill="#c0392b"/>
  <polygon points="21,24 25.5,24 23.5,28" fill="#e74c3c"/>
  <!-- name tag -->
  <rect x="14" y="27" width="9" height="6" rx="1.5" fill="white" stroke="#ccc" stroke-width="0.5"/>
  <rect x="15.5" y="29" width="6" height="1" rx="0.5" fill="#3498db"/>
  <rect x="15.5" y="31" width="4" height="1" rx="0.5" fill="#bbb"/>
  <!-- left arm -->
  <rect x="2" y="23" width="11" height="7" rx="3.5" fill="#e8eaf0"/>
  <ellipse cx="3" cy="26.5" rx="2" ry="3" fill="#fddcb0"/>
  <!-- right arm (holding scriptures) -->
  <rect x="33" y="23" width="11" height="7" rx="3.5" fill="#e8eaf0"/>
  <rect x="38" y="20" width="7" height="9" rx="1.5" fill="#1a3a8e" transform="rotate(10,41,24)"/>
  <rect x="38.5" y="20.5" width="6" height="8" rx="1" fill="#2244a0" transform="rotate(10,41,24)"/>
  <!-- neck -->
  <rect x="19" y="18" width="8" height="7" rx="2.5" fill="#fddcb0"/>
  <!-- head -->
  <ellipse cx="23" cy="13" rx="12" ry="13" fill="#fddcb0"/>
  <ellipse cx="23" cy="7" rx="11" ry="7" fill="#3a2208"/>
  <!-- eyes -->
  ${S.eye(19, 13)} ${S.eye(27, 13)}
  <!-- smile -->
  ${S.smile(17)}
</svg>`,

  // ─── SCRIPTURES ──────────────────────────────────────────
  scriptures: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- robe legs -->
  <rect x="13" y="38" width="20" height="21" rx="4" fill="#1a3060"/>
  <!-- robe body -->
  <rect x="9" y="20" width="28" height="21" rx="6" fill="#2255aa"/>
  <rect x="9" y="20" width="28" height="10" rx="6" fill="#3366cc"/>
  <!-- robe trim -->
  <rect x="9" y="37" width="28" height="3" fill="#1a3060"/>
  <rect x="13" y="20" width="3" height="18" rx="1.5" fill="#4477dd"/>
  <!-- left arm holding book -->
  <rect x="0" y="24" width="12" height="8" rx="4" fill="#2255aa"/>
  <rect x="-2" y="20" width="10" height="13" rx="2" fill="#c8a060"/>
  <line x1="3" y1="21" x2="3" y2="32" stroke="#aa8040" stroke-width="0.8"/>
  <line x1="6" y1="21" x2="6" y2="32" stroke="#aa8040" stroke-width="0.8"/>
  <!-- right arm -->
  <rect x="34" y="24" width="12" height="8" rx="4" fill="#2255aa"/>
  <ellipse cx="43" cy="28" rx="2.5" ry="3.5" fill="#c07040"/>
  <!-- glow from book -->
  <ellipse cx="3" cy="26" rx="8" ry="6" fill="rgba(100,160,255,0.2)"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="6" rx="2.5" fill="#c07040"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#c07040"/>
  <!-- dark hair -->
  <ellipse cx="23" cy="5" rx="11" ry="7" fill="#1a0a00"/>
  <rect x="11" y="5" width="4" height="10" rx="2" fill="#1a0a00"/>
  <!-- eyes -->
  ${S.eye(19, 12, '#1a0800')} ${S.eye(27, 12, '#1a0800')}
  ${S.smile(16)}
</svg>`,

  // ─── ANGEL MORONI ────────────────────────────────────────
  moroni: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- wings -->
  <path d="M23 28 Q5 15 2 30 Q10 35 23 32" fill="rgba(255,255,220,0.85)" stroke="rgba(255,220,100,0.5)" stroke-width="0.5"/>
  <path d="M23 28 Q41 15 44 30 Q36 35 23 32" fill="rgba(255,255,220,0.85)" stroke="rgba(255,220,100,0.5)" stroke-width="0.5"/>
  <!-- wing detail lines -->
  <path d="M23 28 Q8 20 4 28" stroke="rgba(255,220,100,0.4)" stroke-width="0.8" fill="none"/>
  <path d="M23 28 Q38 20 42 28" stroke="rgba(255,220,100,0.4)" stroke-width="0.8" fill="none"/>
  <!-- gold robe legs -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#b8860b"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#b8860b"/>
  <ellipse cx="18" cy="58" rx="6" ry="3" fill="#8a6400"/>
  <ellipse cx="28" cy="58" rx="6" ry="3" fill="#8a6400"/>
  <!-- gold armor torso -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#d4a800"/>
  <rect x="10" y="21" width="26" height="11" rx="5" fill="#f0c820"/>
  <!-- armor detail -->
  <path d="M22 22 L24 22 L23 40 Z" fill="rgba(255,255,255,0.2)"/>
  <rect x="10" y="29" width="26" height="2" rx="1" fill="#b8900a"/>
  <!-- left arm -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#d4a800"/>
  <ellipse cx="3" cy="26.5" rx="2" ry="3" fill="#f0d060"/>
  <!-- right arm — holding trumpet -->
  <rect x="34" y="21" width="10" height="7" rx="3.5" fill="#d4a800"/>
  <path d="M38 20 Q46 18 47 22 L42 25 Q40 22 38 24 Z" fill="#e8c010"/>
  <circle cx="47" cy="20" r="3" fill="rgba(255,200,0,0.3)"/>
  <!-- glow aura -->
  <ellipse cx="23" cy="30" rx="22" ry="18" fill="rgba(255,240,100,0.07)"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2.5" fill="#f0d060"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#f0d060"/>
  <!-- halo -->
  <ellipse cx="23" cy="2" rx="10" ry="3" fill="none" stroke="#f5c842" stroke-width="2.5"/>
  <!-- golden hair -->
  <ellipse cx="23" cy="5" rx="11" ry="7" fill="#c8a010"/>
  <!-- eyes -->
  ${S.eye(19, 12, '#6a4a00')} ${S.eye(27, 12, '#6a4a00')}
  ${S.smile(16)}
</svg>`,

  // ─── NAUVOO GUARD ────────────────────────────────────────
  nauvoo: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- armored legs -->
  <rect x="13" y="40" width="9" height="19" rx="3" fill="#4a5a70"/>
  <rect x="24" y="40" width="9" height="19" rx="3" fill="#4a5a70"/>
  <ellipse cx="17.5" cy="58" rx="6.5" ry="3.5" fill="#2a3a50"/>
  <ellipse cx="28.5" cy="58" rx="6.5" ry="3.5" fill="#2a3a50"/>
  <!-- shield on left arm -->
  <rect x="-2" y="20" width="12" height="18" rx="3" fill="#1a3a8e"/>
  <rect x="-1" y="21" width="10" height="16" rx="2" fill="#2244aa"/>
  <polygon points="4,24 7,27 4,30 1,27" fill="#f5c842"/>
  <!-- sword on right side -->
  <rect x="37" y="12" width="4" height="28" rx="2" fill="#c0c8d8"/>
  <rect x="34" y="19" width="10" height="3" rx="1.5" fill="#8a8a90"/>
  <rect x="38" y="10" width="2.5" height="4" rx="1" fill="#d4d8e0"/>
  <!-- chainmail torso -->
  <rect x="10" y="22" width="26" height="20" rx="5" fill="#7a8a9a"/>
  <rect x="10" y="22" width="26" height="10" rx="5" fill="#8a9aaa"/>
  <!-- chainmail texture -->
  <rect x="12" y="24" width="22" height="16" rx="3" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  <line x1="10" y1="28" x2="36" y2="28" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="10" y1="32" x2="36" y2="32" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <!-- left arm behind shield -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#7a8a9a"/>
  <!-- right arm -->
  <rect x="34" y="23" width="10" height="7" rx="3.5" fill="#7a8a9a"/>
  <!-- neck -->
  <rect x="19" y="18" width="8" height="7" rx="2" fill="#c0b090"/>
  <!-- helmet -->
  <ellipse cx="23" cy="14" rx="13" ry="14" fill="#6a7a8a"/>
  <ellipse cx="23" cy="8" rx="12" ry="9" fill="#7a8a9a"/>
  <rect x="10" y="17" width="26" height="4" rx="2" fill="#5a6a7a"/>
  <!-- visor slit -->
  <rect x="14" y="15" width="18" height="3" rx="1" fill="#2a3a4a"/>
  <line x1="23" y1="15" x2="23" y2="18" stroke="#1a2a3a" stroke-width="0.8"/>
  <!-- eye glow through visor -->
  <rect x="15" y="15.5" width="7" height="2" rx="1" fill="rgba(100,200,255,0.4)"/>
  <rect x="24" y="15.5" width="7" height="2" rx="1" fill="rgba(100,200,255,0.4)"/>
</svg>`,

  // ─── PROPHET ─────────────────────────────────────────────
  prophet: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- white suit legs -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#d8d8e8"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#d8d8e8"/>
  <ellipse cx="18" cy="58" rx="6" ry="3.5" fill="#a0a0b8"/>
  <ellipse cx="28" cy="58" rx="6" ry="3.5" fill="#a0a0b8"/>
  <!-- walking staff -->
  <rect x="38" y="10" width="3" height="50" rx="1.5" fill="#8a5a20"/>
  <ellipse cx="39.5" cy="10" rx="3" ry="2" fill="#6a4010"/>
  <!-- white suit jacket -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#e8e8f4"/>
  <rect x="10" y="21" width="26" height="10" rx="5" fill="#f4f4fc"/>
  <!-- lapels -->
  <path d="M20 22 L23 28 L17 38" stroke="#c0c0d0" stroke-width="1.5" fill="none"/>
  <path d="M26 22 L23 28 L29 38" stroke="#c0c0d0" stroke-width="1.5" fill="none"/>
  <!-- tie -->
  <polygon points="22,24 24,24 23.5,36" fill="#c8a020"/>
  <!-- left arm -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#e8e8f4"/>
  <ellipse cx="3" cy="26.5" rx="2" ry="3" fill="#e0c8a0"/>
  <!-- right arm with staff -->
  <rect x="34" y="22" width="10" height="7" rx="3.5" fill="#e8e8f4"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2.5" fill="#e0c8a0"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#e0c8a0"/>
  <!-- white hair -->
  <ellipse cx="23" cy="5" rx="11" ry="7" fill="#d8d8e0"/>
  <!-- glasses -->
  <circle cx="19" cy="13" r="4" fill="none" stroke="#8a8a9a" stroke-width="1.2"/>
  <circle cx="27" cy="13" r="4" fill="none" stroke="#8a8a9a" stroke-width="1.2"/>
  <line x1="23" y1="13" x2="23" y2="13" stroke="#8a8a9a" stroke-width="1.2"/>
  <!-- eyes behind glasses -->
  ${S.eyeSmall(19, 13, '#1a1050')} ${S.eyeSmall(27, 13, '#1a1050')}
  ${S.smile(17)}
</svg>`,

  // ─── CTR KID ─────────────────────────────────────────────
  ctrKid: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- small legs -->
  <rect x="16" y="42" width="6" height="16" rx="3" fill="#2244aa"/>
  <rect x="24" y="42" width="6" height="16" rx="3" fill="#2244aa"/>
  <ellipse cx="19" cy="57" rx="5" ry="3" fill="#1a2a70"/>
  <ellipse cx="27" cy="57" rx="5" ry="3" fill="#1a2a70"/>
  <!-- CTR green shirt -->
  <rect x="12" y="26" width="22" height="18" rx="5" fill="#228822"/>
  <rect x="12" y="26" width="22" height="8" rx="5" fill="#2aaa2a"/>
  <!-- CTR shield on shirt -->
  <rect x="17" y="29" width="12" height="9" rx="2" fill="#1a6a1a"/>
  <text x="23" y="36.5" font-family="sans-serif" font-size="5" font-weight="bold" fill="white" text-anchor="middle">CTR</text>
  <!-- little arms -->
  <rect x="4" y="28" width="10" height="6" rx="3" fill="#228822"/>
  <ellipse cx="5" cy="31" rx="2" ry="2.5" fill="#fddcb0"/>
  <rect x="32" y="28" width="10" height="6" rx="3" fill="#228822"/>
  <ellipse cx="41" cy="31" rx="2" ry="2.5" fill="#fddcb0"/>
  <!-- neck -->
  <rect x="19" y="22" width="8" height="6" rx="2" fill="#fddcb0"/>
  <!-- head (bigger relative to body = kid) -->
  <ellipse cx="23" cy="15" rx="13" ry="14" fill="#fddcb0"/>
  <!-- hair -->
  <ellipse cx="23" cy="6" rx="12" ry="8" fill="#5a3010"/>
  <!-- freckles -->
  <circle cx="18" cy="17" r="1.2" fill="rgba(180,100,60,0.4)"/>
  <circle cx="21" cy="18" r="1" fill="rgba(180,100,60,0.4)"/>
  <circle cx="28" cy="17" r="1.2" fill="rgba(180,100,60,0.4)"/>
  <circle cx="25" cy="18" r="1" fill="rgba(180,100,60,0.4)"/>
  <!-- big eyes -->
  <circle cx="18.5" cy="14" r="3.5" fill="white"/>
  <circle cx="27.5" cy="14" r="3.5" fill="white"/>
  <circle cx="19" cy="14.5" r="2" fill="#2a5ab0"/>
  <circle cx="28" cy="14.5" r="2" fill="#2a5ab0"/>
  <circle cx="19.5" cy="14" r="0.8" fill="white"/>
  <circle cx="28.5" cy="14" r="0.8" fill="white"/>
  <!-- big smile -->
  <path d="M17 19 Q23 24 29 19" stroke="#c07040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</svg>`,

  // ─── JELLO ───────────────────────────────────────────────
  jello: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- wobble drips -->
  <ellipse cx="8" cy="48" rx="5" ry="8" fill="#e060c0" opacity="0.6"/>
  <ellipse cx="38" cy="46" rx="5" ry="7" fill="#e060c0" opacity="0.6"/>
  <ellipse cx="23" cy="55" rx="8" ry="7" fill="#d040b0" opacity="0.7"/>
  <!-- blob body -->
  <ellipse cx="23" cy="38" rx="18" ry="20" fill="#ff80e8"/>
  <ellipse cx="23" cy="36" rx="16" ry="18" fill="#ff90f0"/>
  <!-- jiggle highlights -->
  <ellipse cx="16" cy="30" rx="5" ry="8" fill="rgba(255,255,255,0.25)" transform="rotate(-15,16,30)"/>
  <ellipse cx="30" cy="32" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(15,30,32)"/>
  <!-- face area -->
  <ellipse cx="23" cy="32" rx="12" ry="13" fill="#ff80e8"/>
  <!-- eyes (cute wide) -->
  <circle cx="18.5" cy="30" r="4" fill="white"/>
  <circle cx="27.5" cy="30" r="4" fill="white"/>
  <circle cx="19" cy="31" r="2.5" fill="#9b10b0"/>
  <circle cx="28" cy="31" r="2.5" fill="#9b10b0"/>
  <circle cx="19.5" cy="30.5" r="1" fill="white"/>
  <circle cx="28.5" cy="30.5" r="1" fill="white"/>
  <!-- wobbly smile -->
  <path d="M16 36 Q20 40 23 37 Q26 40 30 36" stroke="#d040b0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- sparkles -->
  <text x="4" y="22" font-size="8">✨</text>
  <text x="34" y="20" font-size="8">✨</text>
</svg>`,

  // ─── BEEHIVE ─────────────────────────────────────────────
  beehive: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- bee wings -->
  <ellipse cx="8" cy="24" rx="10" ry="7" fill="rgba(200,230,255,0.75)" stroke="rgba(100,180,255,0.4)" stroke-width="0.8" transform="rotate(-15,8,24)"/>
  <ellipse cx="38" cy="24" rx="10" ry="7" fill="rgba(200,230,255,0.75)" stroke="rgba(100,180,255,0.4)" stroke-width="0.8" transform="rotate(15,38,24)"/>
  <ellipse cx="8" cy="32" rx="7" ry="5" fill="rgba(200,230,255,0.6)" stroke="rgba(100,180,255,0.3)" stroke-width="0.8" transform="rotate(-10,8,32)"/>
  <ellipse cx="38" cy="32" rx="7" ry="5" fill="rgba(200,230,255,0.6)" stroke="rgba(100,180,255,0.3)" stroke-width="0.8" transform="rotate(10,38,32)"/>
  <!-- hexagonal body (amber/black stripes) -->
  <polygon points="23,18 35,24 35,40 23,46 11,40 11,24" fill="#f0a000"/>
  <rect x="11" y="26" width="24" height="5" fill="#202020" opacity="0.85"/>
  <rect x="11" y="33" width="24" height="5" fill="#202020" opacity="0.85"/>
  <!-- honeycomb pattern -->
  <polygon points="23,18 35,24 35,40 23,46 11,40 11,24" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
  <!-- stubby legs -->
  <rect x="16" y="44" width="6" height="14" rx="3" fill="#c07800"/>
  <rect x="24" y="44" width="6" height="14" rx="3" fill="#c07800"/>
  <!-- arms -->
  <rect x="3" y="26" width="10" height="6" rx="3" fill="#f0a000"/>
  <rect x="33" y="26" width="10" height="6" rx="3" fill="#f0a000"/>
  <!-- neck -->
  <rect x="19" y="14" width="8" height="6" rx="2" fill="#f0c040"/>
  <!-- head -->
  <ellipse cx="23" cy="10" rx="12" ry="12" fill="#f0c040"/>
  <!-- antennae -->
  <line x1="18" y1="3" x2="13" y2="-2" stroke="#c07800" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="13" cy="-2" r="2" fill="#f0a000"/>
  <line x1="28" y1="3" x2="33" y2="-2" stroke="#c07800" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="33" cy="-2" r="2" fill="#f0a000"/>
  <!-- eyes -->
  ${S.eye(18.5, 10, '#3a1a00')} ${S.eye(27.5, 10, '#3a1a00')}
  ${S.smile(14)}
</svg>`,

  // ─── APOSTATE ────────────────────────────────────────────
  apostate: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- scruffy legs -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#5a4030"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#5a4030"/>
  <ellipse cx="18" cy="58" rx="6" ry="3.5" fill="#3a2818"/>
  <ellipse cx="28" cy="58" rx="6" ry="3.5" fill="#3a2818"/>
  <!-- torn red shirt -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#8a2020"/>
  <rect x="10" y="21" width="26" height="10" rx="5" fill="#aa3030"/>
  <!-- tear marks -->
  <line x1="20" y1="25" x2="22" y2="38" stroke="#6a1010" stroke-width="1.5"/>
  <line x1="26" y1="24" x2="24" y2="35" stroke="#6a1010" stroke-width="1.5"/>
  <!-- crossed arms -->
  <rect x="2" y="26" width="12" height="7" rx="3.5" fill="#8a2020"/>
  <rect x="8" y="30" width="15" height="7" rx="3.5" fill="#8a2020" transform="rotate(-10,15,33)"/>
  <rect x="32" y="26" width="12" height="7" rx="3.5" fill="#8a2020"/>
  <rect x="23" y="30" width="15" height="7" rx="3.5" fill="#8a2020" transform="rotate(10,30,33)"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2.5" fill="#c08060"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#c08060"/>
  <!-- messy hair -->
  <ellipse cx="23" cy="5" rx="11" ry="7" fill="#4a2808"/>
  <path d="M12 8 Q14 2 18 5" stroke="#4a2808" stroke-width="2.5" fill="none"/>
  <path d="M34 8 Q32 2 28 5" stroke="#4a2808" stroke-width="2.5" fill="none"/>
  <!-- angry eyes / furrowed brow -->
  <line x1="15" y1="10" x2="22" y2="12" stroke="#3a1808" stroke-width="2" stroke-linecap="round"/>
  <line x1="31" y1="10" x2="24" y2="12" stroke="#3a1808" stroke-width="2" stroke-linecap="round"/>
  ${S.eye(19, 13.5, '#1a0800')} ${S.eye(27, 13.5, '#1a0800')}
  ${S.frown(17)}
</svg>`,

  // ─── TEMPTATION ──────────────────────────────────────────
  temptation: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- red robe legs -->
  <rect x="13" y="38" width="20" height="21" rx="4" fill="#8a1010"/>
  <!-- dark red robe -->
  <rect x="8" y="18" width="30" height="23" rx="6" fill="#c02020"/>
  <rect x="8" y="18" width="30" height="11" rx="6" fill="#d83030"/>
  <!-- hood shadow -->
  <ellipse cx="23" cy="20" rx="15" ry="10" fill="rgba(80,0,0,0.3)"/>
  <!-- left arm -->
  <rect x="1" y="22" width="10" height="7" rx="3.5" fill="#c02020"/>
  <ellipse cx="2" cy="25.5" rx="2" ry="3" fill="#e0a890"/>
  <!-- right arm holding apple -->
  <rect x="35" y="22" width="10" height="7" rx="3.5" fill="#c02020"/>
  <circle cx="44" cy="20" r="5.5" fill="#cc2020"/>
  <circle cx="44" cy="20" r="5.5" fill="none" stroke="#aa1010" stroke-width="0.5"/>
  <ellipse cx="42" cy="17" rx="2.5" ry="2" fill="rgba(255,100,100,0.4)"/>
  <rect x="43.5" y="14" width="1.5" height="4" rx="0.75" fill="#3a6010"/>
  <path d="M43 14 Q46 11 48 14" stroke="#2a5010" stroke-width="1" fill="none"/>
  <!-- neck -->
  <rect x="19" y="14" width="8" height="7" rx="2.5" fill="#e0a890"/>
  <!-- hood -->
  <path d="M8 18 Q23 8 38 18 L35 24 Q23 16 11 24 Z" fill="#a01010"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#e0a890"/>
  <!-- dark hair framing -->
  <path d="M11 12 Q13 4 23 2 Q33 4 35 12" fill="#1a0808"/>
  <!-- smirk eyes -->
  <line x1="16" y1="10" x2="21" y2="11" stroke="#8a3820" stroke-width="1.5" stroke-linecap="round"/>
  ${S.eye(19.5, 13, '#6a0808')} ${S.eye(26.5, 13, '#6a0808')}
  ${S.smirk(17)}
</svg>`,

  // ─── DECEIVER ────────────────────────────────────────────
  deceiver: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- dark cloak legs -->
  <rect x="13" y="36" width="20" height="23" rx="4" fill="#280840"/>
  <!-- dark cloak body -->
  <rect x="7" y="17" width="32" height="23" rx="6" fill="#3a0a60"/>
  <rect x="7" y="17" width="32" height="11" rx="6" fill="#4a1070"/>
  <!-- snake motif on chest -->
  <path d="M18 24 Q22 20 26 24 Q30 28 26 32 Q22 36 18 32" stroke="#50c030" stroke-width="2" fill="none" stroke-linecap="round"/>
  <polygon points="18,24 15,22 17,26" fill="#50c030"/>
  <!-- cloak arms -->
  <rect x="1" y="21" width="9" height="7" rx="3.5" fill="#3a0a60"/>
  <rect x="36" y="21" width="9" height="7" rx="3.5" fill="#3a0a60"/>
  <!-- eerie hand glow -->
  <circle cx="2" cy="24.5" r="3.5" fill="rgba(80,200,50,0.3)"/>
  <circle cx="44" cy="24.5" r="3.5" fill="rgba(80,200,50,0.3)"/>
  <!-- deep hood -->
  <path d="M7 17 Q23 5 39 17 L35 24 Q23 14 11 24 Z" fill="#20044a"/>
  <!-- neck / shadow -->
  <rect x="19" y="13" width="8" height="7" rx="2.5" fill="#3a2840"/>
  <!-- shadowed head -->
  <ellipse cx="23" cy="11" rx="12" ry="13" fill="#2a1838"/>
  <!-- glowing eyes in shadow -->
  <circle cx="19" cy="12" r="3" fill="rgba(80,200,50,0.15)"/>
  <circle cx="27" cy="12" r="3" fill="rgba(80,200,50,0.15)"/>
  <circle cx="19" cy="12" r="1.8" fill="#50c030"/>
  <circle cx="27" cy="12" r="1.8" fill="#50c030"/>
  <circle cx="19.5" cy="11.5" r="0.7" fill="rgba(255,255,255,0.6)"/>
  <circle cx="27.5" cy="11.5" r="0.7" fill="rgba(255,255,255,0.6)"/>
</svg>`,

  // ─── ANTI-CHRIST ─────────────────────────────────────────
  antiChrist: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- fire base -->
  <ellipse cx="23" cy="57" rx="12" ry="5" fill="rgba(255,100,0,0.4)"/>
  <path d="M15 55 Q18 48 16 42 Q20 50 23 46 Q26 50 30 42 Q28 48 31 55" fill="rgba(255,130,0,0.35)"/>
  <!-- black legs -->
  <rect x="14" y="40" width="8" height="18" rx="3" fill="#1a0a0a"/>
  <rect x="24" y="40" width="8" height="18" rx="3" fill="#1a0a0a"/>
  <!-- dark red armor torso -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#700a0a"/>
  <rect x="10" y="21" width="26" height="10" rx="5" fill="#900a0a"/>
  <!-- lava cracks on armor -->
  <path d="M14 26 L18 30 L15 35" stroke="rgba(255,100,0,0.6)" stroke-width="1.2" fill="none"/>
  <path d="M28 25 L32 29 L30 34" stroke="rgba(255,100,0,0.6)" stroke-width="1.2" fill="none"/>
  <!-- spiked arms -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#700a0a"/>
  <polygon points="2,23 4,18 6,23" fill="#300808"/>
  <rect x="34" y="23" width="10" height="7" rx="3.5" fill="#700a0a"/>
  <polygon points="44,23 42,18 40,23" fill="#300808"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2" fill="#cc3030"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#cc3030"/>
  <!-- horns -->
  <polygon points="14,7 11,0 17,6" fill="#1a0a0a"/>
  <polygon points="32,7 35,0 29,6" fill="#1a0a0a"/>
  <!-- sinister eyes -->
  <circle cx="19" cy="12" r="3" fill="#ff4000"/>
  <circle cx="27" cy="12" r="3" fill="#ff4000"/>
  <circle cx="19.5" cy="12.5" r="1.5" fill="#1a0000"/>
  <circle cx="27.5" cy="12.5" r="1.5" fill="#1a0000"/>
  <circle cx="19.8" cy="12" r="0.6" fill="rgba(255,100,0,0.6)"/>
  <circle cx="27.8" cy="12" r="0.6" fill="rgba(255,100,0,0.6)"/>
  ${S.frown(17)}
</svg>`,

  // ─── KORIHOR ─────────────────────────────────────────────
  korihor: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- suit legs -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#1a1a24"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#1a1a24"/>
  <ellipse cx="18" cy="58" rx="6" ry="3.5" fill="#0a0a14"/>
  <ellipse cx="28" cy="58" rx="6" ry="3.5" fill="#0a0a14"/>
  <!-- briefcase -->
  <rect x="33" y="32" width="12" height="10" rx="2" fill="#3a2808"/>
  <rect x="33" y="32" width="12" height="10" rx="2" fill="none" stroke="#5a4010" stroke-width="0.8"/>
  <rect x="37" y="30" width="4" height="4" rx="1.5" fill="none" stroke="#5a4010" stroke-width="1.2"/>
  <rect x="37.5" y="36" width="3" height="1.5" rx="0.5" fill="#c8a020"/>
  <!-- dark suit jacket -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#1e1e2e"/>
  <rect x="10" y="21" width="26" height="10" rx="5" fill="#282838"/>
  <!-- lapels -->
  <path d="M19 22 L23 29 L16 42" stroke="#2e2e3e" stroke-width="2" fill="none"/>
  <path d="M27 22 L23 29 L30 42" stroke="#2e2e3e" stroke-width="2" fill="none"/>
  <!-- gold tie -->
  <polygon points="22,24 24,24 23.5,37" fill="#c8a020"/>
  <!-- pocket square -->
  <polygon points="28,25 30,24 30,28 28,27" fill="white"/>
  <!-- left arm -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#1e1e2e"/>
  <ellipse cx="3" cy="26.5" rx="2" ry="3" fill="#c09060"/>
  <!-- right arm holding case -->
  <rect x="34" y="28" width="10" height="7" rx="3.5" fill="#1e1e2e"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2.5" fill="#c09060"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#c09060"/>
  <!-- slicked hair -->
  <ellipse cx="23" cy="4" rx="11" ry="6" fill="#0a0808"/>
  <path d="M11 8 Q23 2 35 8 Q23 6 11 8" fill="#1a1010"/>
  <!-- eyes -->
  ${S.eye(19, 13, '#1a0808')} ${S.eye(27, 13, '#1a0808')}
  ${S.smirk(17)}
</svg>`,

  // ─── LAMAN ───────────────────────────────────────────────
  laman: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- spear -->
  <rect x="37" y="0" width="3" height="50" rx="1.5" fill="#8a5a20"/>
  <polygon points="38.5,0 36,6 41,6" fill="#a0a0b0"/>
  <!-- hide leggings -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#7a4a20"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#7a4a20"/>
  <ellipse cx="18" cy="57" rx="5.5" ry="3.5" fill="#4a2808"/>
  <ellipse cx="28" cy="57" rx="5.5" ry="3.5" fill="#4a2808"/>
  <!-- animal hide chest piece -->
  <rect x="11" y="21" width="24" height="21" rx="5" fill="#8a5020"/>
  <rect x="11" y="21" width="24" height="10" rx="5" fill="#aa6828"/>
  <!-- hide markings -->
  <path d="M14 26 Q16 30 14 34" stroke="#6a3810" stroke-width="1.5" fill="none"/>
  <path d="M30 26 Q32 30 30 35" stroke="#6a3810" stroke-width="1.5" fill="none"/>
  <!-- muscular arms -->
  <rect x="2" y="22" width="11" height="8" rx="4" fill="#8a5020"/>
  <ellipse cx="3" cy="26" rx="2.5" ry="3.5" fill="#a07040"/>
  <!-- right arm holding spear -->
  <rect x="33" y="22" width="11" height="8" rx="4" fill="#8a5020"/>
  <!-- neck -->
  <rect x="19" y="17" width="8" height="7" rx="2" fill="#a07040"/>
  <!-- head -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#a07040"/>
  <!-- wild dark hair -->
  <ellipse cx="23" cy="5" rx="12" ry="8" fill="#1a0808"/>
  <path d="M11 9 Q8 4 13 2" stroke="#1a0808" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M35 9 Q38 4 33 2" stroke="#1a0808" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M20 2 Q23 -2 26 2" stroke="#1a0808" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- angry face -->
  <line x1="14" y1="10" x2="21" y2="12.5" stroke="#6a3010" stroke-width="2" stroke-linecap="round"/>
  <line x1="32" y1="10" x2="25" y2="12.5" stroke="#6a3010" stroke-width="2" stroke-linecap="round"/>
  ${S.eye(19, 13.5, '#1a0808')} ${S.eye(27, 13.5, '#1a0808')}
  ${S.frown(17.5)}
</svg>`,

  // ─── GADIANTON ───────────────────────────────────────────
  gadianton: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- daggers -->
  <rect x="1" y="16" width="2.5" height="16" rx="1" fill="#c0c8d0" transform="rotate(-30,2,24)"/>
  <polygon points="0,16 2.5,16 1.25,11" fill="#d0d8e0" transform="rotate(-30,1.25,11)"/>
  <rect x="42" y="16" width="2.5" height="16" rx="1" fill="#c0c8d0" transform="rotate(30,43,24)"/>
  <polygon points="41.5,16 44,16 42.75,11" fill="#d0d8e0" transform="rotate(30,42.75,11)"/>
  <!-- dark ninja legs -->
  <rect x="14" y="40" width="8" height="19" rx="3" fill="#1a2218"/>
  <rect x="24" y="40" width="8" height="19" rx="3" fill="#1a2218"/>
  <ellipse cx="18" cy="58" rx="5.5" ry="3" fill="#0a1008"/>
  <ellipse cx="28" cy="58" rx="5.5" ry="3" fill="#0a1008"/>
  <!-- dark body armor -->
  <rect x="10" y="21" width="26" height="21" rx="5" fill="#1e2a1e"/>
  <rect x="10" y="21" width="26" height="10" rx="5" fill="#283828"/>
  <!-- armor straps -->
  <line x1="23" y1="22" x2="23" y2="42" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <line x1="10" y1="28" x2="36" y2="28" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
  <!-- throwing star on belt -->
  <polygon points="23,33 24.5,36 23,35 21.5,36" fill="#a0a8b0"/>
  <!-- dark arms -->
  <rect x="2" y="23" width="10" height="7" rx="3.5" fill="#1e2a1e"/>
  <rect x="34" y="23" width="10" height="7" rx="3.5" fill="#1e2a1e"/>
  <!-- neck wrap -->
  <rect x="18" y="17" width="10" height="7" rx="2" fill="#283828"/>
  <!-- head with face wrap (only eyes visible) -->
  <ellipse cx="23" cy="12" rx="12" ry="13" fill="#1e2a1e"/>
  <!-- face mask -->
  <rect x="12" y="13" width="22" height="8" rx="3" fill="#283828"/>
  <!-- only eyes visible -->
  ${S.eye(18.5, 11, '#283828')} ${S.eye(27.5, 11, '#283828')}
  <circle cx="18.5" cy="11" r="3" fill="#1e2a1e"/>
  <circle cx="27.5" cy="11" r="3" fill="#1e2a1e"/>
  <ellipse cx="18.5" cy="11" rx="2.5" ry="2" fill="#50c850"/>
  <ellipse cx="27.5" cy="11" rx="2.5" ry="2" fill="#50c850"/>
  <circle cx="19" cy="11" r="1" fill="#1a0a0a"/>
  <circle cx="28" cy="11" r="1" fill="#1a0a0a"/>
</svg>`,

  // ─── NEHOR ───────────────────────────────────────────────
  nehor: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <!-- coin purse -->
  <circle cx="8" cy="40" r="6" fill="#c8a020"/>
  <circle cx="8" cy="40" r="6" fill="none" stroke="#a88010" stroke-width="1"/>
  <text x="8" y="43" font-family="sans-serif" font-size="7" fill="#6a5000" text-anchor="middle">$</text>
  <!-- stocky legs -->
  <rect x="13" y="40" width="9" height="19" rx="3.5" fill="#6a4800"/>
  <rect x="24" y="40" width="9" height="19" rx="3.5" fill="#6a4800"/>
  <ellipse cx="17.5" cy="58" rx="7" ry="3.5" fill="#4a3000"/>
  <ellipse cx="28.5" cy="58" rx="7" ry="3.5" fill="#4a3000"/>
  <!-- gaudy gold robes (wide/fat body) -->
  <rect x="7" y="20" width="32" height="22" rx="6" fill="#d4a018"/>
  <rect x="7" y="20" width="32" height="11" rx="6" fill="#e8b820"/>
  <!-- robe decoration -->
  <rect x="7" y="28" width="32" height="3" rx="1" fill="#c89010"/>
  <circle cx="14" cy="25" r="2.5" fill="#ff6000"/>
  <circle cx="32" cy="25" r="2.5" fill="#ff6000"/>
  <circle cx="23" cy="24" r="2" fill="#ff4000"/>
  <!-- fat arms -->
  <rect x="0" y="22" width="10" height="9" rx="4.5" fill="#d4a018"/>
  <ellipse cx="1" cy="26.5" rx="3" ry="4" fill="#c09060"/>
  <!-- right arm pointing -->
  <rect x="36" y="20" width="10" height="9" rx="4.5" fill="#d4a018"/>
  <ellipse cx="45" cy="24" rx="3" ry="4" fill="#c09060"/>
  <!-- neck -->
  <rect x="18" y="16" width="10" height="7" rx="3" fill="#c09060"/>
  <!-- fat head -->
  <ellipse cx="23" cy="11" rx="14" ry="13" fill="#c09060"/>
  <!-- pompous hair -->
  <ellipse cx="23" cy="4" rx="13" ry="7" fill="#8a6000"/>
  <path d="M10 7 Q23 0 36 7 Q23 3 10 7" fill="#c09010"/>
  <!-- smug expression -->
  <line x1="15" y1="10" x2="20" y2="11.5" stroke="#8a5020" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="31" y1="10" x2="26" y2="11.5" stroke="#8a5020" stroke-width="1.5" stroke-linecap="round"/>
  ${S.eye(18.5, 12, '#5a3000')} ${S.eye(27.5, 12, '#5a3000')}
  ${S.smirk(16.5)}
</svg>`,

  // ─── MINI LAMAN (smaller version) ────────────────────────
  miniLaman: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="44" width="6" height="15" rx="3" fill="#6a3a18"/>
  <rect x="24" y="44" width="6" height="15" rx="3" fill="#6a3a18"/>
  <ellipse cx="19" cy="57" rx="5" ry="3" fill="#4a2808"/>
  <ellipse cx="27" cy="57" rx="5" ry="3" fill="#4a2808"/>
  <rect x="12" y="27" width="22" height="19" rx="5" fill="#7a4820"/>
  <rect x="4" y="29" width="10" height="6" rx="3" fill="#7a4820"/>
  <rect x="32" y="29" width="10" height="6" rx="3" fill="#7a4820"/>
  <rect x="19" y="22" width="8" height="7" rx="2" fill="#a07040"/>
  <ellipse cx="23" cy="16" rx="12" ry="13" fill="#a07040"/>
  <ellipse cx="23" cy="8" rx="11" ry="8" fill="#1a0808"/>
  ${S.eyeSmall(19, 16, '#1a0808')} ${S.eyeSmall(27, 16, '#1a0808')}
  ${S.frown(20)}
</svg>`,

  // ─── HOLY GHOST (arena 2) ─────────────────────────────────
  holyGhost: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <ellipse cx="23" cy="55" rx="12" ry="6" fill="rgba(200,220,255,0.3)"/>
  <path d="M11 35 Q11 55 23 58 Q35 55 35 35 Q35 18 23 14 Q11 18 11 35Z" fill="rgba(200,230,255,0.55)"/>
  <ellipse cx="23" cy="20" rx="10" ry="11" fill="rgba(220,240,255,0.7)"/>
  ${S.eyeSmall(19, 19, '#4488cc')} ${S.eyeSmall(27, 19, '#4488cc')}
  <path d="M19 24 Q23 27 27 24" stroke="#88aadd" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <ellipse cx="16" cy="32" rx="4" ry="5" fill="rgba(200,230,255,0.5)"/>
  <ellipse cx="30" cy="32" rx="4" ry="5" fill="rgba(200,230,255,0.5)"/>
  <circle cx="23" cy="11" r="4" fill="rgba(255,255,255,0.8)"/>
  <path d="M20 8 Q23 4 26 8" stroke="rgba(180,200,255,0.9)" stroke-width="1.5" fill="none"/>
</svg>`,

  // ─── STRIPLING WARRIOR (arena 2) ─────────────────────────
  striplingWarrior: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7" height="19" rx="2" fill="#5c3a1e"/>
  <rect x="24" y="40" width="7" height="19" rx="2" fill="#5c3a1e"/>
  <rect x="12" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="25" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="13" y="28" width="20" height="14" rx="3" fill="#8b6914"/>
  <polygon points="13,28 12,24 14,22 16,28" fill="#7a5c10"/>
  <polygon points="33,28 34,24 32,22 30,28" fill="#7a5c10"/>
  <rect x="11" y="27" width="24" height="4" rx="1" fill="#c8a020"/>
  <rect x="30" y="30" width="13" height="3" rx="1" fill="#8b8b8b"/>
  <rect x="40" y="22" width="3" height="14" rx="1" fill="#7a6010"/>
  <ellipse cx="23" cy="18" rx="10" ry="11" fill="#d4955a"/>
  <rect x="14" y="10" width="18" height="5" rx="2" fill="#8b6914"/>
  <rect x="12" y="14" width="4" height="8" rx="1" fill="#8b6914"/>
  <rect x="30" y="14" width="4" height="8" rx="1" fill="#8b6914"/>
  ${S.eye(18, 18)} ${S.eye(26, 18)}
  ${S.smile(21)}
</svg>`,

  // ─── CAPTAIN MORONI (arena 3) ────────────────────────────
  captainMoroni: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7" height="19" rx="2" fill="#4a3010"/>
  <rect x="23" y="40" width="7" height="19" rx="2" fill="#4a3010"/>
  <rect x="13" y="58" width="9" height="4" rx="1" fill="#2a1a08"/>
  <rect x="24" y="58" width="9" height="4" rx="1" fill="#2a1a08"/>
  <rect x="12" y="26" width="22" height="16" rx="2" fill="#6b7280"/>
  <rect x="10" y="25" width="26" height="5" rx="1" fill="#9ca3af"/>
  <rect x="10" y="25" width="4" height="16" rx="1" fill="#9ca3af"/>
  <rect x="32" y="25" width="4" height="16" rx="1" fill="#9ca3af"/>
  <rect x="32" y="28" width="14" height="3" rx="1" fill="#8b6914"/>
  <rect x="42" y="10" width="3" height="35" rx="1" fill="#8b6914"/>
  <rect x="38" y="10" width="10" height="7" rx="1" fill="#dc2626"/>
  <path d="M38 12 L40 10 L48 14 L46 17 L38 17Z" fill="#b91c1c"/>
  <text x="39" y="16" font-size="4" fill="white" font-family="serif">T</text>
  <ellipse cx="23" cy="18" rx="10" ry="11" fill="#c8824a"/>
  <rect x="14" y="8" width="18" height="6" rx="2" fill="#6b7280"/>
  <rect x="18" y="6" width="10" height="4" rx="1" fill="#9ca3af"/>
  ${S.eye(18, 18)} ${S.eye(26, 18)}
  ${S.smile(22)}
</svg>`,

  // ─── LIAHONA (arena 3) ───────────────────────────────────
  liahona: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="17" y="42" width="6" height="17" rx="2" fill="#5c3a1e"/>
  <rect x="23" y="42" width="6" height="17" rx="2" fill="#5c3a1e"/>
  <rect x="14" y="58" width="8" height="4" rx="1" fill="#3d2010"/>
  <rect x="24" y="58" width="8" height="4" rx="1" fill="#3d2010"/>
  <circle cx="23" cy="32" r="12" fill="#d4a520" stroke="#b8860b" stroke-width="1.5"/>
  <circle cx="23" cy="32" r="9" fill="#f5c842" stroke="#d4a520" stroke-width="1"/>
  <line x1="23" y1="23" x2="23" y2="41" stroke="#8b6914" stroke-width="1"/>
  <line x1="14" y1="32" x2="32" y2="32" stroke="#8b6914" stroke-width="1"/>
  <polygon points="23,25 25,30 23,27 21,30" fill="#8b6914"/>
  <polygon points="31,32 26,30 29,32 26,34" fill="#8b6914"/>
  <circle cx="23" cy="32" r="2" fill="#8b6914"/>
  <ellipse cx="23" cy="18" rx="9" ry="10" fill="#d4955a"/>
  ${S.eye(19, 17)} ${S.eye(27, 17)}
  ${S.smile(21)}
  <rect x="16" y="42" width="14" height="3" rx="1" fill="#8b6914" opacity="0.5"/>
</svg>`,

  // ─── BROTHER OF JARED (arena 4) ──────────────────────────
  brotherOfJared: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7" height="19" rx="2" fill="#6b4e2a"/>
  <rect x="24" y="40" width="7" height="19" rx="2" fill="#6b4e2a"/>
  <rect x="12" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="25" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="12" y="26" width="22" height="16" rx="3" fill="#8b6040"/>
  <circle cx="16" cy="38" r="4" fill="rgba(200,255,200,0.8)" stroke="#80ff80" stroke-width="1"/>
  <circle cx="30" cy="38" r="4" fill="rgba(200,255,200,0.8)" stroke="#80ff80" stroke-width="1"/>
  <circle cx="16" cy="38" r="2" fill="white" opacity="0.9"/>
  <circle cx="30" cy="38" r="2" fill="white" opacity="0.9"/>
  <rect x="9" y="25" width="6" height="16" rx="2" fill="#7a5030"/>
  <rect x="31" y="25" width="6" height="16" rx="2" fill="#7a5030"/>
  <ellipse cx="23" cy="17" rx="11" ry="12" fill="#c8824a"/>
  <path d="M12 22 Q23 28 34 22" stroke="#8b6040" stroke-width="2" fill="#9a7050"/>
  ${S.eye(18, 16)} ${S.eye(28, 16)}
  ${S.smile(21)}
  <rect x="18" y="6" width="10" height="4" rx="2" fill="#8b6040"/>
</svg>`,

  // ─── AMMON (arena 4) ─────────────────────────────────────
  ammon: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7" height="19" rx="2" fill="#5c3a1e"/>
  <rect x="23" y="40" width="7" height="19" rx="2" fill="#5c3a1e"/>
  <rect x="13" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="24" y="58" width="9" height="4" rx="1" fill="#3d2010"/>
  <rect x="12" y="26" width="22" height="16" rx="2" fill="#7a5030"/>
  <rect x="9" y="25" width="6" height="14" rx="2" fill="#8b6040"/>
  <rect x="31" y="25" width="6" height="14" rx="2" fill="#8b6040"/>
  <rect x="30" y="30" width="11" height="2.5" rx="1" fill="#c8a020"/>
  <rect x="37" y="24" width="2.5" height="12" rx="1" fill="#8b8b8b"/>
  <ellipse cx="6" cy="44" rx="4" ry="2.5" fill="#c8824a" stroke="#8b5020" stroke-width="0.8"/>
  <ellipse cx="40" cy="44" rx="4" ry="2.5" fill="#c8824a" stroke="#8b5020" stroke-width="0.8"/>
  <ellipse cx="23" cy="18" rx="10" ry="11" fill="#c8824a"/>
  <path d="M13 22 Q23 28 33 22" stroke="#5c3a1e" stroke-width="2" fill="#8b6040"/>
  ${S.eye(18, 17)} ${S.eye(28, 17)}
  ${S.smile(21)}
</svg>`,

  // ─── THREE NEPHITES (arena 5) ────────────────────────────
  threeNephites: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="4"  y="40" width="5"  height="18" rx="1.5" fill="#4a5568"/>
  <rect x="37" y="40" width="5"  height="18" rx="1.5" fill="#4a5568"/>
  <rect x="20" y="38" width="6"  height="21" rx="1.5" fill="#4a5568"/>
  <ellipse cx="7"  cy="34" rx="5"  ry="8"  fill="rgba(200,210,255,0.6)"/>
  <ellipse cx="39" cy="34" rx="5"  ry="8"  fill="rgba(200,210,255,0.6)"/>
  <ellipse cx="23" cy="31" rx="6"  ry="9"  fill="rgba(220,230,255,0.7)"/>
  <ellipse cx="7"  cy="26" rx="4.5" ry="5" fill="#d4955a"/>
  <ellipse cx="39" cy="26" rx="4.5" ry="5" fill="#d4955a"/>
  <ellipse cx="23" cy="22" rx="5.5" ry="6" fill="#d4b080"/>
  ${S.eyeSmall(5, 26, '#4a3020')} ${S.eyeSmall(9, 26, '#4a3020')}
  ${S.eyeSmall(37, 26, '#4a3020')} ${S.eyeSmall(41, 26, '#4a3020')}
  ${S.eye(20, 22)} ${S.eye(26, 22)}
  <circle cx="7" cy="20" r="3" fill="rgba(255,255,255,0.7)"/>
  <circle cx="39" cy="20" r="3" fill="rgba(255,255,255,0.7)"/>
  <circle cx="23" cy="15" r="4" fill="rgba(255,255,255,0.8)"/>
</svg>`,

  // ─── SEERS STONE (arena 5) ───────────────────────────────
  seersStone: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="18" y="42" width="5"  height="17" rx="2" fill="#5c3a1e"/>
  <rect x="23" y="42" width="5"  height="17" rx="2" fill="#5c3a1e"/>
  <rect x="15" y="58" width="7"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="24" y="58" width="7"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="12" y="28" width="22" height="15" rx="3" fill="#7a6040"/>
  <rect x="9"  y="27" width="6"  height="16" rx="2" fill="#6b5030"/>
  <rect x="31" y="27" width="6"  height="16" rx="2" fill="#6b5030"/>
  <ellipse cx="23" cy="32" rx="7" ry="6" fill="#8b4513" stroke="#6b3010" stroke-width="1"/>
  <ellipse cx="23" cy="32" rx="5" ry="4" fill="rgba(180,100,255,0.8)"/>
  <ellipse cx="23" cy="32" rx="3" ry="2.5" fill="rgba(220,180,255,0.9)"/>
  <circle cx="23" cy="32" r="1.5" fill="white" opacity="0.9"/>
  <circle cx="21" cy="30" r="0.8" fill="white" opacity="0.7"/>
  <ellipse cx="23" cy="18" rx="9" ry="10" fill="#c8955a"/>
  ${S.eye(18, 17)} ${S.eye(27, 17)}
  ${S.smile(21)}
</svg>`,

  // ─── SAMUEL THE LAMANITE (arena 6) ───────────────────────
  samuelLamanite: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="3"  y="30" width="40" height="7" rx="2" fill="#8b7355"/>
  <rect x="3"  y="35" width="40" height="4" rx="1" fill="#6b5535"/>
  <rect x="15" y="37" width="7"  height="22" rx="2" fill="#6b4820"/>
  <rect x="24" y="37" width="7"  height="22" rx="2" fill="#6b4820"/>
  <rect x="12" y="56" width="9"  height="5"  rx="1" fill="#3d2010"/>
  <rect x="25" y="56" width="9"  height="5"  rx="1" fill="#3d2010"/>
  <rect x="12" y="20" width="22" height="18" rx="2" fill="#8b5a30"/>
  <rect x="9"  y="19" width="6"  height="18" rx="2" fill="#7a4a20"/>
  <rect x="9"  y="20" width="15" height="3"  rx="1" fill="#c8a020"/>
  <rect x="31" y="19" width="6"  height="18" rx="2" fill="#7a4a20"/>
  <ellipse cx="23" cy="13" rx="10" ry="11" fill="#a07040"/>
  <path d="M13 18 Q23 24 33 18" stroke="#6b4820" stroke-width="2" fill="#7a5030"/>
  ${S.eye(18, 12)} ${S.eye(28, 12)}
  ${S.smile(17)}
  <line x1="35" y1="2" x2="8" y2="22" stroke="#5c3a1e" stroke-width="1.5"/>
  <polygon points="35,2 33,6 37,5" fill="#8b8b8b"/>
</svg>`,

  // ─── TITLE OF LIBERTY (arena 6) ──────────────────────────
  titleOfLiberty: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7"  height="19" rx="2" fill="#5c3a1e"/>
  <rect x="23" y="40" width="7"  height="19" rx="2" fill="#5c3a1e"/>
  <rect x="13" y="58" width="9"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="24" y="58" width="9"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="12" y="26" width="22" height="16" rx="2" fill="#6b7280"/>
  <rect x="10" y="25" width="26" height="4"  rx="1" fill="#9ca3af"/>
  <rect x="9"  y="24" width="5"  height="17" rx="1" fill="#9ca3af"/>
  <rect x="32" y="24" width="5"  height="17" rx="1" fill="#9ca3af"/>
  <rect x="32" y="27" width="3"  height="30" rx="1" fill="#6b5030"/>
  <path d="M35 5 L35 22 L44 13 L44 5 Z" fill="#dc2626"/>
  <path d="M35 5 L36 8 L40 6 L40 8 L44 5 Z" fill="#b91c1c"/>
  <text x="36" y="15" font-size="3.5" fill="white" font-family="serif">Faith</text>
  <ellipse cx="23" cy="18" rx="10" ry="11" fill="#c8824a"/>
  <rect x="14" y="8" width="18" height="5"  rx="2" fill="#6b7280"/>
  ${S.eye(18, 17)} ${S.eye(28, 17)}
  ${S.smile(21)}
</svg>`,

  // ─── TEANCUM (arena 7) ───────────────────────────────────
  teancum: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="6"  height="19" rx="2" fill="#1a2535"/>
  <rect x="24" y="40" width="6"  height="19" rx="2" fill="#1a2535"/>
  <rect x="13" y="58" width="8"  height="4"  rx="1" fill="#0d1520"/>
  <rect x="25" y="58" width="8"  height="4"  rx="1" fill="#0d1520"/>
  <rect x="12" y="26" width="22" height="16" rx="2" fill="#1e3a5f"/>
  <rect x="10" y="25" width="26" height="4"  rx="1" fill="#2563eb"/>
  <rect x="9"  y="24" width="5"  height="17" rx="1" fill="#1e3a5f"/>
  <rect x="32" y="24" width="5"  height="17" rx="1" fill="#1e3a5f"/>
  <rect x="34" y="27" width="12" height="2.5" rx="1" fill="#8b7355"/>
  <rect x="43" y="21" width="2.5" height="12" rx="1" fill="#c0c0c0"/>
  <polygon points="43,21 44.5,17 42,17" fill="#c0c0c0"/>
  <ellipse cx="23" cy="18" rx="10" ry="11" fill="#c8824a"/>
  <rect x="14" y="9" width="18" height="3"  rx="1" fill="#1a2535"/>
  <path d="M14 12 L14 16 L12 16 L12 9 L14 9Z" fill="#1a2535"/>
  <path d="M32 12 L32 16 L34 16 L34 9 L32 9Z" fill="#1a2535"/>
  ${S.eye(18, 18, '#1a2535')} ${S.eye(27, 18, '#1a2535')}
  ${S.smirk(21)}
</svg>`,

  // ─── ANTI-NEPHI-LEHI (arena 7) ───────────────────────────
  antiNephiLehi: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7"  height="19" rx="2" fill="#e8e0d0"/>
  <rect x="23" y="40" width="7"  height="19" rx="2" fill="#e8e0d0"/>
  <rect x="13" y="58" width="9"  height="4"  rx="1" fill="#c8c0b0"/>
  <rect x="24" y="58" width="9"  height="4"  rx="1" fill="#c8c0b0"/>
  <rect x="12" y="25" width="22" height="17" rx="4" fill="#f5f0e8"/>
  <rect x="9"  y="24" width="6"  height="18" rx="3" fill="#ece8e0"/>
  <rect x="31" y="24" width="6"  height="18" rx="3" fill="#ece8e0"/>
  <rect x="9"  y="24" width="6"  height="3"  rx="1" fill="#c8a020" opacity="0.5"/>
  <rect x="31" y="24" width="6"  height="3"  rx="1" fill="#c8a020" opacity="0.5"/>
  <ellipse cx="23" cy="17" rx="11" ry="12" fill="#d4a870"/>
  <path d="M12 23 Q23 30 34 23" fill="#e8d8c0"/>
  ${S.eye(18, 16)} ${S.eye(28, 16)}
  <path d="M19 21 Q23 24 27 21" stroke="#c07040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <circle cx="17" cy="31" r="3" fill="white" opacity="0.8"/>
  <circle cx="29" cy="31" r="3" fill="white" opacity="0.8"/>
  <text x="18" y="34" font-size="4" fill="#c8a020">✕</text>
  <text x="27" y="34" font-size="4" fill="#c8a020">✕</text>
</svg>`,

  // ─── JOSEPH SMITH (arena 8) ──────────────────────────────
  josephSmith: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7"  height="19" rx="2" fill="#1a1a2e"/>
  <rect x="23" y="40" width="7"  height="19" rx="2" fill="#1a1a2e"/>
  <rect x="13" y="58" width="9"  height="4"  rx="1" fill="#0d0d1e"/>
  <rect x="24" y="58" width="9"  height="4"  rx="1" fill="#0d0d1e"/>
  <rect x="12" y="25" width="22" height="17" rx="2" fill="#1e3a5f"/>
  <rect x="10" y="24" width="26" height="4"  rx="1" fill="#2a4a7f"/>
  <rect x="9"  y="23" width="5"  height="18" rx="1" fill="#1e3a5f"/>
  <rect x="32" y="23" width="5"  height="18" rx="1" fill="#1e3a5f"/>
  <rect x="21" y="36" width="4"  height="6"  rx="0.5" fill="#c8a020"/>
  <rect x="22" y="37" width="2"  height="4"  rx="0.5" fill="#e8d870"/>
  <rect x="31" y="30" width="10" height="3"  rx="1" fill="#8b7040"/>
  <rect x="9"  y="30" width="10" height="3"  rx="1" fill="#8b7040"/>
  <ellipse cx="23" cy="16" rx="11" ry="12" fill="#c8955a"/>
  ${S.eye(17, 15)} ${S.eye(27, 15)}
  ${S.smile(20)}
  <rect x="15" y="5" width="16" height="5"  rx="2" fill="#1a1a2e"/>
  <rect x="13" y="8" width="20" height="3"  rx="1" fill="#0d0d1e"/>
  <circle cx="23" cy="5" r="3" fill="#f5c842" opacity="0.9"/>
</svg>`,

  // ─── DESTROYING ANGEL (arena 8) ──────────────────────────
  destroyingAngel: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7"  height="19" rx="2" fill="#f8f0e0"/>
  <rect x="23" y="40" width="7"  height="19" rx="2" fill="#f8f0e0"/>
  <rect x="13" y="58" width="9"  height="4"  rx="1" fill="#e0d8c8"/>
  <rect x="24" y="58" width="9"  height="4"  rx="1" fill="#e0d8c8"/>
  <path d="M2 20 Q8 30 12 35 Q8 30 2 28 Z" fill="rgba(255,255,240,0.8)"/>
  <path d="M44 20 Q38 30 34 35 Q38 30 44 28 Z" fill="rgba(255,255,240,0.8)"/>
  <rect x="12" y="24" width="22" height="18" rx="3" fill="#f5f0e8"/>
  <rect x="9"  y="23" width="6"  height="19" rx="2" fill="#ece8e0"/>
  <rect x="31" y="23" width="6"  height="19" rx="2" fill="#ece8e0"/>
  <rect x="32" y="26" width="12" height="3"  rx="1" fill="#8b8b8b"/>
  <rect x="41" y="18" width="3"  height="14" rx="1" fill="#c0c0c0"/>
  <rect x="37" y="24" width="7"  height="2"  rx="1" fill="#ff8c00" opacity="0.9"/>
  <ellipse cx="23" cy="16" rx="11" ry="12" fill="#d4c090"/>
  ${S.eye(18, 15)} ${S.eye(28, 15)}
  <path d="M19 20 Q23 23 27 20" stroke="#c07040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M17 8 Q23 4 29 8 Q25 6 23 8 Q21 6 17 8Z" fill="#f5f0e0" stroke="#c8a020" stroke-width="0.8"/>
  <circle cx="23" cy="6" r="3" fill="#f5c842"/>
  <circle cx="23" cy="6" r="1.5" fill="white"/>
</svg>`,

  // ─── RAMEUMPTOM (enemy arena 2) ──────────────────────────
  rameumptom: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="17" y="43" width="6"  height="16" rx="2" fill="#7a5030"/>
  <rect x="23" y="43" width="6"  height="16" rx="2" fill="#7a5030"/>
  <rect x="14" y="58" width="8"  height="4"  rx="1" fill="#5c3a1e"/>
  <rect x="24" y="58" width="8"  height="4"  rx="1" fill="#5c3a1e"/>
  <rect x="9"  y="35" width="28" height="10" rx="3" fill="#8b6040"/>
  <rect x="7"  y="43" width="32" height="4"  rx="1" fill="#7a5030"/>
  <rect x="12" y="22" width="22" height="15" rx="3" fill="#d4a030"/>
  <rect x="10" y="21" width="26" height="5"  rx="1" fill="#f5c842"/>
  <rect x="8"  y="20" width="8"  height="16" rx="2" fill="#c89020"/>
  <rect x="30" y="20" width="8"  height="16" rx="2" fill="#c89020"/>
  <ellipse cx="23" cy="15" rx="12" ry="13" fill="#e8b878"/>
  <ellipse cx="23" cy="10" rx="10" ry="5"  fill="#f5c842" stroke="#d4a020" stroke-width="1"/>
  ${S.eye(17, 15, '#1a0808')} ${S.eye(28, 15, '#1a0808')}
  <path d="M17 19 Q23 16 29 19" stroke="#8b4020" stroke-width="1.5" fill="none"/>
</svg>`,

  // ─── SHEREM (enemy arena 3) ──────────────────────────────
  sherem: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="7"  height="19" rx="2" fill="#2d1b4e"/>
  <rect x="23" y="40" width="7"  height="19" rx="2" fill="#2d1b4e"/>
  <rect x="13" y="58" width="9"  height="4"  rx="1" fill="#1a0d30"/>
  <rect x="24" y="58" width="9"  height="4"  rx="1" fill="#1a0d30"/>
  <rect x="12" y="25" width="22" height="17" rx="2" fill="#3d2b6e"/>
  <rect x="10" y="24" width="26" height="5"  rx="1" fill="#5d3b9e"/>
  <rect x="9"  y="23" width="5"  height="19" rx="2" fill="#3d2b6e"/>
  <rect x="32" y="23" width="5"  height="19" rx="2" fill="#3d2b6e"/>
  <rect x="9"  y="23" width="5"  height="3"  rx="1" fill="#7c4dce"/>
  <rect x="32" y="23" width="5"  height="3"  rx="1" fill="#7c4dce"/>
  <rect x="30" y="28" width="10" height="2.5" rx="1" fill="#6b5030"/>
  <rect x="6"  y="28" width="10" height="2.5" rx="1" fill="#6b5030"/>
  <ellipse cx="23" cy="17" rx="11" ry="12" fill="#c8a888"/>
  <path d="M13 23 Q23 28 33 23" fill="#3d2b6e" stroke="none"/>
  ${S.eye(17, 16, '#2d1b4e')} ${S.eye(27, 16, '#2d1b4e')}
  ${S.smirk(21)}
  <path d="M18 10 Q23 7 28 10" stroke="#7c4dce" stroke-width="1.5" fill="none"/>
</svg>`,

  // ─── SECRET COMBINATION (enemy arena 4) ──────────────────
  secretCombination: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7"  height="19" rx="2" fill="#0a0a0a"/>
  <rect x="24" y="40" width="7"  height="19" rx="2" fill="#0a0a0a"/>
  <rect x="12" y="58" width="9"  height="4"  rx="1" fill="#050505"/>
  <rect x="25" y="58" width="9"  height="4"  rx="1" fill="#050505"/>
  <path d="M10 22 Q10 42 23 44 Q36 42 36 22 Q36 18 23 16 Q10 18 10 22Z" fill="#1a1a1a"/>
  <rect x="9"  y="21" width="5"  height="20" rx="2" fill="#1a1a1a"/>
  <rect x="32" y="21" width="5"  height="20" rx="2" fill="#1a1a1a"/>
  <ellipse cx="23" cy="15" rx="11" ry="12" fill="#2a2a2a"/>
  <rect x="15" y="20" width="16" height="3"  rx="1" fill="#1a1a1a"/>
  ${S.eyeSmall(17, 14, '#00ff88')} ${S.eyeSmall(27, 14, '#00ff88')}
  <rect x="18" y="18" width="10" height="2" rx="1" fill="#1a1a1a"/>
  <rect x="18" y="32" width="10" height="8"  rx="1" fill="#8b0000" opacity="0.8"/>
  <text x="20" y="38" font-size="4" fill="#ff4444">⚠</text>
</svg>`,

  // ─── KISHKUMEN (enemy arena 5) ───────────────────────────
  kishkumen: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="16" y="40" width="6"  height="19" rx="2" fill="#0f172a"/>
  <rect x="24" y="40" width="6"  height="19" rx="2" fill="#0f172a"/>
  <rect x="13" y="58" width="8"  height="4"  rx="1" fill="#050a14"/>
  <rect x="25" y="58" width="8"  height="4"  rx="1" fill="#050a14"/>
  <rect x="12" y="25" width="22" height="17" rx="2" fill="#0f172a"/>
  <rect x="9"  y="24" width="5"  height="18" rx="2" fill="#0f172a"/>
  <rect x="32" y="24" width="5"  height="18" rx="2" fill="#0f172a"/>
  <rect x="33" y="28" width="9"  height="2"  rx="1" fill="#6b5030"/>
  <rect x="39" y="23" width="2"  height="10" rx="1" fill="#c0c0c0"/>
  <polygon points="39,23 40.5,19 38,19" fill="#e0e0e0"/>
  <rect x="4"  y="28" width="9"  height="2"  rx="1" fill="#6b5030"/>
  <rect x="5"  y="23" width="2"  height="10" rx="1" fill="#c0c0c0"/>
  <polygon points="5,23 6.5,19 4,19" fill="#e0e0e0"/>
  <ellipse cx="23" cy="17" rx="10" ry="11" fill="#1e293b"/>
  <rect x="13" y="20" width="20" height="3"  rx="1" fill="#0f172a"/>
  ${S.eyeSmall(18, 16, '#ef4444')} ${S.eyeSmall(26, 16, '#ef4444')}
  <rect x="13" y="8" width="20" height="4"  rx="2" fill="#0f172a"/>
  <rect x="13" y="11" width="20" height="3"  rx="1" fill="#1e293b"/>
</svg>`,

  // ─── AMLICI (enemy arena 6) ──────────────────────────────
  amlici: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7"  height="19" rx="2" fill="#7a1515"/>
  <rect x="24" y="40" width="7"  height="19" rx="2" fill="#7a1515"/>
  <rect x="12" y="58" width="9"  height="4"  rx="1" fill="#5c0f0f"/>
  <rect x="25" y="58" width="9"  height="4"  rx="1" fill="#5c0f0f"/>
  <rect x="12" y="25" width="22" height="17" rx="2" fill="#9b1c1c"/>
  <rect x="10" y="24" width="26" height="5"  rx="1" fill="#c0392b"/>
  <rect x="8"  y="23" width="6"  height="18" rx="2" fill="#9b1c1c"/>
  <rect x="32" y="23" width="6"  height="18" rx="2" fill="#9b1c1c"/>
  <ellipse cx="23" cy="16" rx="12" ry="13" fill="#e8b878"/>
  <path d="M14 8 L14 14 L18 16 L23 13 L28 16 L32 14 L32 8 Z" fill="#f5c842" stroke="#d4a020" stroke-width="0.8"/>
  <polygon points="16,8 14,4 18,6" fill="#f5c842"/>
  <polygon points="23,7 21,3 25,3" fill="#f5c842"/>
  <polygon points="30,8 28,4 32,6" fill="#f5c842"/>
  ${S.eye(17, 16, '#7a0000')} ${S.eye(27, 16, '#7a0000')}
  ${S.frown(21)}
</svg>`,

  // ─── MORIANTON (enemy arena 7) ───────────────────────────
  morianton: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7"  height="19" rx="2" fill="#5c3a1e"/>
  <rect x="24" y="40" width="7"  height="19" rx="2" fill="#5c3a1e"/>
  <rect x="12" y="58" width="9"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="25" y="58" width="9"  height="4"  rx="1" fill="#3d2010"/>
  <rect x="12" y="26" width="22" height="16" rx="2" fill="#7a4820"/>
  <rect x="9"  y="25" width="6"  height="17" rx="2" fill="#6b3a10"/>
  <rect x="31" y="25" width="6"  height="17" rx="2" fill="#6b3a10"/>
  <rect x="33" y="22" width="4"  height="14" rx="1" fill="#6b5030"/>
  <rect x="33" y="18" width="8"  height="6"  rx="1" fill="#8b8b8b"/>
  <rect x="35" y="15" width="4"  height="5"  rx="0.5" fill="#c0c0c0"/>
  <ellipse cx="23" cy="17" rx="11" ry="12" fill="#a07850"/>
  <path d="M12 23 Q18 28 23 25 Q28 28 34 23" fill="#7a4820" stroke="none"/>
  <path d="M13 17 Q18 20 23 18 Q28 20 33 17" stroke="#5c3a10" stroke-width="2" fill="none"/>
  ${S.eye(17, 16, '#3d2010')} ${S.eye(28, 16, '#3d2010')}
  ${S.frown(21)}
</svg>`,

  // ─── ZERAHEMNAH (enemy arena 8) ──────────────────────────
  zerahemnah: `<svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg">
  ${S.shadow}
  <rect x="15" y="40" width="7"  height="19" rx="2" fill="#3d2010"/>
  <rect x="24" y="40" width="7"  height="19" rx="2" fill="#3d2010"/>
  <rect x="12" y="58" width="9"  height="4"  rx="1" fill="#2a1008"/>
  <rect x="25" y="58" width="9"  height="4"  rx="1" fill="#2a1008"/>
  <rect x="12" y="24" width="22" height="18" rx="2" fill="#5c2a0a"/>
  <rect x="9"  y="23" width="6"  height="19" rx="2" fill="#4a2008"/>
  <rect x="31" y="23" width="6"  height="19" rx="2" fill="#4a2008"/>
  <rect x="33" y="26" width="13" height="3"  rx="1" fill="#6b5030"/>
  <rect x="43" y="18" width="3"  height="16" rx="1" fill="#8b8b8b"/>
  <polygon points="43,18 44.5,13 42,13" fill="#c0c0c0"/>
  <rect x="0"  y="26" width="13" height="3"  rx="1" fill="#6b5030"/>
  <rect x="0"  y="18" width="3"  height="16" rx="1" fill="#8b8b8b"/>
  <polygon points="0,18 1.5,13 -1,13" fill="#c0c0c0"/>
  <ellipse cx="23" cy="15" rx="12" ry="13" fill="#8b5a30"/>
  <path d="M11 20 Q17 28 23 22 Q29 28 35 20" fill="#5c2a0a" stroke="none"/>
  <path d="M14 14 Q18 18 23 15 Q28 18 32 14" stroke="#3d1808" stroke-width="2.5" fill="none"/>
  ${S.eye(16, 13, '#8b0000')} ${S.eye(28, 13, '#8b0000')}
  ${S.frown(19)}
  <path d="M14 21 Q23 26 32 21" stroke="#8b0000" stroke-width="1" fill="none" opacity="0.6"/>
  <circle cx="5" cy="22" r="2.5" fill="#8b5a30" stroke="#3d1808" stroke-width="0.5" opacity="0.7"/>
  <circle cx="41" cy="22" r="2.5" fill="#8b5a30" stroke="#3d1808" stroke-width="0.5" opacity="0.7"/>
</svg>`,
};

// ── Build troop HTML using SVG sprites ──────────────────────
function buildTroopHTML(card, troopId, isMini) {
  const cid = card.id || 'missionary';
  const svg = CHAR_SVGS[cid] || CHAR_SVGS.missionary;

  if (isMini) {
    return `
      <div class="t-sprite t-char-${cid}" style="width:28px;height:36px;overflow:hidden;">
        <svg viewBox="0 0 46 62" xmlns="http://www.w3.org/2000/svg" width="28" height="36">${svg.replace(/<svg[^>]*>/,'').replace('</svg>','')}</svg>
      </div>
      <div class="t-shadow"></div>
      <div class="troop-hp"><div class="troop-hp-fill" id="thp-${troopId}"></div></div>`;
  }

  return `
    <div class="t-sprite t-char-${cid}">
      ${svg}
    </div>
    <div class="t-shadow"></div>
    <div class="troop-hp"><div class="troop-hp-fill" id="thp-${troopId}"></div></div>`;
}
