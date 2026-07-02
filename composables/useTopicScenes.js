// Interactive SVG scenes per topic. Each scene has:
//   viewBox  – SVG viewBox string
//   svg      – inline SVG markup (string) used as the illustration backdrop.
//              All scenes use a shared cream / ink / gold palette so they feel
//              consistent with the rest of the app.
//   hotspots – array of { x, y, r, c, p, en, e?, lx?, ly? } in viewBox coords.
//              c/p/en match the vocabulary entry; e is an optional emoji
//              shown inside the hotspot bubble. lx/ly override the auto label
//              position used by "Label all" mode.
//
// Add a new scene by exporting another entry keyed by the topic slug.

// Shared palette
const C = {
  paper:  '#fdf6e3',   // background
  cream:  '#faf0d4',
  ink:    '#1c1917',
  inkSoft:'#3a2f24',
  gold:   '#b8860b',
  goldL:  '#e9c46a',
  rose:   '#9b2226',
  sage:   '#6b8e6e',
  sageL:  '#a7c4a0',
  wood:   '#8b5a2b',
  woodL:  '#c69c6d',
  sky:    '#cfe3ee',
  skyD:   '#7aa9c2',
}

export const SCENES = {
  // ──────────────────── Body ────────────────────
  body: {
    viewBox: '0 0 420 620',
    svg: `
      <defs>
        <linearGradient id="bodySkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.cream}"/>
          <stop offset="100%" stop-color="${C.goldL}"/>
        </linearGradient>
        <radialGradient id="bodyBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%"  stop-color="${C.paper}"/>
          <stop offset="100%" stop-color="#f1e6c8"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="420" height="620" fill="url(#bodyBg)"/>

      <!-- Soft shadow under figure -->
      <ellipse cx="210" cy="585" rx="120" ry="10" fill="${C.ink}" opacity="0.10"/>

      <!-- Hair (top) -->
      <path d="M158 70 Q210 22 262 70 Q272 96 258 110 Q210 80 162 110 Q148 96 158 70 Z"
            fill="${C.ink}"/>

      <!-- Head -->
      <ellipse cx="210" cy="100" rx="52" ry="58" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Ears -->
      <ellipse cx="158" cy="105" rx="9" ry="14" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <ellipse cx="262" cy="105" rx="9" ry="14" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Face details -->
      <ellipse cx="190" cy="100" rx="3.5" ry="4" fill="${C.ink}"/>
      <ellipse cx="230" cy="100" rx="3.5" ry="4" fill="${C.ink}"/>
      <path d="M205 118 Q210 122 215 118" stroke="${C.inkSoft}" stroke-width="1.5" fill="none"/>
      <path d="M196 134 Q210 142 224 134" stroke="${C.rose}" stroke-width="2" fill="none" stroke-linecap="round"/>

      <!-- Neck -->
      <path d="M192 152 L228 152 L232 175 L188 175 Z" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Shirt / torso -->
      <path d="M150 178 Q210 168 270 178 L286 350 Q210 366 134 350 Z"
            fill="${C.sage}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <!-- Collar -->
      <path d="M188 175 L210 200 L232 175" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Arms (sleeves) -->
      <path d="M150 180 Q108 230 100 320 L124 326 Q138 240 168 200 Z"
            fill="${C.sage}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <path d="M270 180 Q312 230 320 320 L296 326 Q282 240 252 200 Z"
            fill="${C.sage}" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Forearms (skin) -->
      <path d="M100 320 Q98 360 108 392 L130 388 Q126 354 124 326 Z"
            fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <path d="M320 320 Q322 360 312 392 L290 388 Q294 354 296 326 Z"
            fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Hands -->
      <ellipse cx="115" cy="404" rx="16" ry="18" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <ellipse cx="305" cy="404" rx="16" ry="18" fill="url(#bodySkin)" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Pants / legs -->
      <path d="M148 348 L160 540 L200 540 L210 358 Z" fill="${C.ink}" opacity="0.85" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <path d="M272 348 L260 540 L220 540 L210 358 Z" fill="${C.ink}" opacity="0.85" stroke="${C.inkSoft}" stroke-width="1.5"/>

      <!-- Knees (subtle) -->
      <ellipse cx="180" cy="455" rx="14" ry="6" fill="${C.ink}" opacity="0.15"/>
      <ellipse cx="240" cy="455" rx="14" ry="6" fill="${C.ink}" opacity="0.15"/>

      <!-- Shoes -->
      <path d="M148 540 Q146 562 178 562 L208 562 L210 540 Z" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <path d="M272 540 Q274 562 242 562 L212 562 L210 540 Z" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="1.5"/>
    `,
    hotspots: [
      { x: 210, y: 100, r: 13, c: '头',     p: 'tóu',         en: 'head',     e: '🗣️', lx: 320, ly: 60  },
      { x: 175, y: 50,  r: 11, c: '头发',   p: 'tóufa',       en: 'hair',     e: '💇', lx: 90,  ly: 40  },
      { x: 210, y: 118, r: 11, c: '脸',     p: 'liǎn',        en: 'face',     e: '😊', lx: 330, ly: 110 },
      { x: 190, y: 100, r: 9,  c: '眼睛',   p: 'yǎnjing',     en: 'eye',      e: '👁️', lx: 90,  ly: 95  },
      { x: 210, y: 110, r: 9,  c: '鼻子',   p: 'bízi',        en: 'nose',     e: '👃', lx: 320, ly: 130 },
      { x: 210, y: 134, r: 9,  c: '嘴',     p: 'zuǐ',         en: 'mouth',    e: '👄', lx: 332, ly: 152 },
      { x: 158, y: 105, r: 10, c: '耳朵',   p: 'ěrduo',       en: 'ear',      e: '👂', lx: 80,  ly: 130 },
      { x: 210, y: 165, r: 11, c: '脖子',   p: 'bózi',        en: 'neck',     e: '🧣', lx: 340, ly: 175 },
      { x: 158, y: 195, r: 12, c: '肩膀',   p: 'jiānbǎng',    en: 'shoulder', e: '🤷', lx: 60,  ly: 195 },
      { x: 138, y: 280, r: 12, c: '胳膊',   p: 'gēbo',        en: 'arm',      e: '💪', lx: 60,  ly: 280 },
      { x: 115, y: 404, r: 14, c: '手',     p: 'shǒu',        en: 'hand',     e: '✋', lx: 50,  ly: 410 },
      { x: 210, y: 230, r: 13, c: '胸',     p: 'xiōng',       en: 'chest',    e: '🫁', lx: 350, ly: 220 },
      { x: 210, y: 290, r: 12, c: '心脏',   p: 'xīnzàng',     en: 'heart',    e: '❤️', lx: 360, ly: 290 },
      { x: 210, y: 335, r: 13, c: '肚子',   p: 'dùzi',        en: 'belly',    e: '🫃', lx: 360, ly: 345 },
      { x: 180, y: 460, r: 12, c: '膝盖',   p: 'xīgài',       en: 'knee',     e: '🧎', lx: 80,  ly: 460 },
      { x: 240, y: 480, r: 13, c: '腿',     p: 'tuǐ',         en: 'leg',      e: '🦵', lx: 358, ly: 480 },
      { x: 195, y: 555, r: 12, c: '脚',     p: 'jiǎo',        en: 'foot',     e: '🦶', lx: 90,  ly: 580 },
    ],
  },

  // ──────────────────── Directions ────────────────────
  directions: {
    viewBox: '0 0 420 420',
    svg: `
      <defs>
        <radialGradient id="dirBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stop-color="${C.paper}"/>
          <stop offset="100%" stop-color="#ead8a8"/>
        </radialGradient>
        <linearGradient id="needleN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.rose}"/>
          <stop offset="100%" stop-color="#5a1314"/>
        </linearGradient>
        <linearGradient id="needleS" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.cream}"/>
          <stop offset="100%" stop-color="${C.goldL}"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="420" fill="url(#dirBg)"/>

      <!-- Outer compass plate -->
      <circle cx="210" cy="210" r="190" fill="${C.paper}" stroke="${C.gold}" stroke-width="2"/>
      <circle cx="210" cy="210" r="178" fill="none" stroke="${C.inkSoft}" stroke-width="1" opacity="0.4"/>
      <circle cx="210" cy="210" r="150" fill="none" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="3 5"/>

      <!-- Tick marks every 15° -->
      <g stroke="${C.inkSoft}" stroke-width="1">
        ${Array.from({length:24}, (_,i) => {
          const a = (i * 15 - 90) * Math.PI / 180
          const x1 = 210 + Math.cos(a) * 178
          const y1 = 210 + Math.sin(a) * 178
          const long = i % 6 === 0
          const r2 = long ? 165 : 172
          const x2 = 210 + Math.cos(a) * r2
          const y2 = 210 + Math.sin(a) * r2
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${long?1.6:0.8}"/>`
        }).join('')}
      </g>

      <!-- Compass rose (8-point star) -->
      <g transform="translate(210 210)">
        <polygon points="0,-130 18,-18 0,0 -18,-18" fill="${C.rose}" opacity="0.92"/>
        <polygon points="0,130 -18,18 0,0 18,18"   fill="${C.ink}"  opacity="0.85"/>
        <polygon points="-130,0 -18,-18 0,0 -18,18" fill="${C.gold}" opacity="0.75"/>
        <polygon points="130,0 18,18 0,0 18,-18"   fill="${C.gold}" opacity="0.75"/>
        <!-- Diagonals -->
        <polygon points="-92,-92 -14,-22 0,0 -22,-14" fill="${C.sage}" opacity="0.7"/>
        <polygon points="92,-92 22,-14 0,0 14,-22"   fill="${C.sage}" opacity="0.7"/>
        <polygon points="-92,92 -22,14 0,0 -14,22"   fill="${C.sage}" opacity="0.7"/>
        <polygon points="92,92 14,22 0,0 22,14"     fill="${C.sage}" opacity="0.7"/>
        <!-- Centre cap -->
        <circle r="10" fill="${C.cream}" stroke="${C.ink}" stroke-width="1.5"/>
        <circle r="3"  fill="${C.ink}"/>
      </g>

      <!-- Cardinal letter labels (subtle, in pinyin) -->
      <g font-family="serif" font-size="14" fill="${C.inkSoft}" opacity="0.55" text-anchor="middle">
        <text x="210" y="58">N</text>
        <text x="210" y="372">S</text>
        <text x="48"  y="215">W</text>
        <text x="372" y="215">E</text>
      </g>
    `,
    hotspots: [
      { x: 210, y: 32,  r: 16, c: '北',   p: 'běi',        en: 'north',  e: '⬆️' },
      { x: 210, y: 388, r: 16, c: '南',   p: 'nán',        en: 'south',  e: '⬇️' },
      { x: 32,  y: 210, r: 16, c: '西',   p: 'xī',         en: 'west',   e: '⬅️' },
      { x: 388, y: 210, r: 16, c: '东',   p: 'dōng',       en: 'east',   e: '➡️' },
      { x: 80,  y: 80,  r: 14, c: '西北', p: 'xīběi',      en: 'NW',     e: '↖️' },
      { x: 340, y: 80,  r: 14, c: '东北', p: 'dōngběi',    en: 'NE',     e: '↗️' },
      { x: 80,  y: 340, r: 14, c: '西南', p: 'xīnán',      en: 'SW',     e: '↙️' },
      { x: 340, y: 340, r: 14, c: '东南', p: 'dōngnán',    en: 'SE',     e: '↘️' },
      { x: 210, y: 210, r: 14, c: '中间', p: 'zhōngjiān',  en: 'middle', e: '🎯' },
    ],
  },

  // ──────────────────── Bedroom ────────────────────
  bedroom: {
    viewBox: '0 0 520 380',
    svg: `
      <defs>
        <linearGradient id="bdWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#f3e7c8"/>
          <stop offset="100%" stop-color="#e6d4a8"/>
        </linearGradient>
        <linearGradient id="bdFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.woodL}"/>
          <stop offset="100%" stop-color="${C.wood}"/>
        </linearGradient>
        <linearGradient id="bdSheet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#f4e4ea"/>
          <stop offset="100%" stop-color="#e0c3cb"/>
        </linearGradient>
      </defs>

      <!-- Wall + floor -->
      <rect x="0" y="0"   width="520" height="260" fill="url(#bdWall)"/>
      <rect x="0" y="260" width="520" height="120" fill="url(#bdFloor)"/>
      <!-- Wall/floor seam shadow -->
      <rect x="0" y="258" width="520" height="6" fill="${C.ink}" opacity="0.12"/>
      <!-- Floor planks -->
      <g stroke="${C.ink}" stroke-width="0.5" opacity="0.25">
        <line x1="0" y1="290" x2="520" y2="290"/>
        <line x1="0" y1="320" x2="520" y2="320"/>
        <line x1="0" y1="350" x2="520" y2="350"/>
      </g>

      <!-- Window -->
      <rect x="40" y="50" width="140" height="120" fill="${C.sky}" stroke="${C.wood}" stroke-width="3"/>
      <rect x="40" y="50" width="140" height="120" fill="none" stroke="${C.inkSoft}" stroke-width="1" opacity="0.4"/>
      <line x1="110" y1="50"  x2="110" y2="170" stroke="${C.wood}" stroke-width="3"/>
      <line x1="40"  y1="110" x2="180" y2="110" stroke="${C.wood}" stroke-width="3"/>
      <!-- Sun + clouds -->
      <circle cx="155" cy="80" r="12" fill="${C.goldL}"/>
      <ellipse cx="70" cy="85" rx="14" ry="5" fill="#fff" opacity="0.75"/>
      <ellipse cx="90" cy="135" rx="18" ry="5" fill="#fff" opacity="0.75"/>
      <!-- Sill -->
      <rect x="32" y="170" width="156" height="8" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="1"/>

      <!-- Mirror on wall -->
      <ellipse cx="260" cy="100" rx="32" ry="46" fill="${C.skyD}" opacity="0.35" stroke="${C.gold}" stroke-width="3"/>
      <path d="M242 70 Q255 90 248 130" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>

      <!-- Wardrobe -->
      <rect x="400" y="100" width="100" height="220" fill="${C.woodL}" stroke="${C.inkSoft}" stroke-width="2"/>
      <rect x="400" y="100" width="100" height="220" fill="none" stroke="${C.wood}" stroke-width="1" opacity="0.6"/>
      <line x1="450" y1="105" x2="450" y2="315" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <circle cx="445" cy="210" r="2.5" fill="${C.gold}"/>
      <circle cx="455" cy="210" r="2.5" fill="${C.gold}"/>
      <!-- Wardrobe panels -->
      <rect x="408" y="110" width="34" height="200" fill="none" stroke="${C.wood}" stroke-width="0.8" opacity="0.6"/>
      <rect x="458" y="110" width="34" height="200" fill="none" stroke="${C.wood}" stroke-width="0.8" opacity="0.6"/>

      <!-- Rug -->
      <ellipse cx="240" cy="360" rx="200" ry="14" fill="${C.rose}" opacity="0.35"/>
      <ellipse cx="240" cy="360" rx="180" ry="10" fill="none" stroke="${C.gold}" stroke-width="0.8" opacity="0.5"/>

      <!-- Bed frame (wood) -->
      <rect x="40" y="290" width="280" height="40" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="2"/>
      <!-- Mattress / sheet -->
      <rect x="46"  y="244" width="268" height="50" fill="url(#bdSheet)" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <!-- Headboard -->
      <rect x="40"  y="200" width="60"  height="90" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="2" rx="4"/>
      <rect x="48"  y="208" width="44"  height="74" fill="none" stroke="${C.cream}" stroke-width="1" opacity="0.6"/>
      <!-- Pillow -->
      <rect x="60"  y="222" width="46"  height="22" rx="6" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <!-- Quilt fold -->
      <path d="M150 270 Q170 240 320 250 L320 294 L150 294 Z" fill="${C.rose}" opacity="0.85" stroke="${C.inkSoft}" stroke-width="1.2"/>
      <path d="M180 260 L300 257" stroke="${C.cream}" stroke-width="1" opacity="0.6"/>
      <!-- Bed legs -->
      <rect x="40"  y="328" width="8" height="16" fill="${C.inkSoft}"/>
      <rect x="312" y="328" width="8" height="16" fill="${C.inkSoft}"/>

      <!-- Nightstand -->
      <rect x="330" y="270" width="62" height="60" fill="${C.woodL}" stroke="${C.inkSoft}" stroke-width="2" rx="2"/>
      <line x1="330" y1="296" x2="392" y2="296" stroke="${C.inkSoft}" stroke-width="1"/>
      <circle cx="361" cy="312" r="2" fill="${C.gold}"/>
      <!-- Lamp -->
      <polygon points="346,270 376,270 382,238 340,238" fill="${C.goldL}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <line x1="361" y1="238" x2="361" y2="265" stroke="${C.inkSoft}" stroke-width="2"/>
      <ellipse cx="361" cy="270" rx="22" ry="3" fill="${C.ink}" opacity="0.2"/>
      <!-- Lamp glow -->
      <ellipse cx="361" cy="280" rx="60" ry="14" fill="${C.goldL}" opacity="0.18"/>
    `,
    hotspots: [
      { x: 180, y: 270, r: 18, c: '床',     p: 'chuáng',       en: 'bed',         e: '🛏️' },
      { x: 83,  y: 233, r: 12, c: '枕头',   p: 'zhěntou',      en: 'pillow',      e: '🛌' },
      { x: 235, y: 268, r: 13, c: '被子',   p: 'bèizi',        en: 'quilt',       e: '🛏️' },
      { x: 361, y: 300, r: 15, c: '床头柜', p: 'chuángtóuguì', en: 'nightstand',  e: '🗄️' },
      { x: 361, y: 252, r: 14, c: '台灯',   p: 'táidēng',      en: 'desk lamp',   e: '🪔' },
      { x: 450, y: 210, r: 18, c: '衣柜',   p: 'yīguì',        en: 'wardrobe',    e: '🚪' },
      { x: 260, y: 100, r: 16, c: '镜子',   p: 'jìngzi',       en: 'mirror',      e: '🪞' },
      { x: 110, y: 110, r: 16, c: '窗户',   p: 'chuānghu',     en: 'window',      e: '🪟' },
      { x: 240, y: 360, r: 13, c: '地毯',   p: 'dìtǎn',        en: 'rug',         e: '🟫' },
    ],
  },

  // ──────────────────── Kitchen ────────────────────
  kitchen: {
    viewBox: '0 0 520 380',
    svg: `
      <defs>
        <linearGradient id="kWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#fbe9c8"/>
          <stop offset="100%" stop-color="#f0d59d"/>
        </linearGradient>
        <linearGradient id="kFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#a36a3a"/>
          <stop offset="100%" stop-color="#7c4a26"/>
        </linearGradient>
        <linearGradient id="kCounter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.cream}"/>
          <stop offset="100%" stop-color="#dec684"/>
        </linearGradient>
        <linearGradient id="kCab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="${C.sageL}"/>
          <stop offset="100%" stop-color="${C.sage}"/>
        </linearGradient>
      </defs>

      <!-- Wall + floor -->
      <rect x="0" y="0"   width="520" height="260" fill="url(#kWall)"/>
      <rect x="0" y="260" width="520" height="120" fill="url(#kFloor)"/>
      <rect x="0" y="258" width="520" height="6"   fill="${C.ink}" opacity="0.18"/>
      <!-- Tile lines on wall -->
      <g stroke="${C.ink}" stroke-width="0.5" opacity="0.10">
        <line x1="0" y1="60"  x2="520" y2="60"/>
        <line x1="0" y1="110" x2="520" y2="110"/>
        <line x1="0" y1="160" x2="520" y2="160"/>
        <line x1="0" y1="210" x2="520" y2="210"/>
      </g>
      <!-- Floor seams -->
      <g stroke="${C.ink}" stroke-width="0.4" opacity="0.25">
        <line x1="0" y1="300" x2="520" y2="300"/>
        <line x1="0" y1="340" x2="520" y2="340"/>
      </g>

      <!-- Counter -->
      <rect x="0" y="218" width="520" height="22" fill="url(#kCounter)" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <!-- Cabinets under counter -->
      <rect x="0" y="240" width="520" height="40" fill="url(#kCab)" stroke="${C.inkSoft}" stroke-width="1"/>
      <g stroke="${C.inkSoft}" stroke-width="1" opacity="0.55">
        <line x1="130" y1="240" x2="130" y2="280"/>
        <line x1="270" y1="240" x2="270" y2="280"/>
        <line x1="410" y1="240" x2="410" y2="280"/>
      </g>
      <g fill="${C.gold}">
        <circle cx="65"  cy="260" r="2"/>
        <circle cx="200" cy="260" r="2"/>
        <circle cx="340" cy="260" r="2"/>
        <circle cx="465" cy="260" r="2"/>
      </g>

      <!-- Fridge -->
      <rect x="20" y="50" width="100" height="218" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="2" rx="6"/>
      <rect x="20" y="50" width="100" height="218" fill="none" stroke="${C.gold}" stroke-width="0.8" opacity="0.6" rx="6"/>
      <line x1="20" y1="124" x2="120" y2="124" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <rect x="105" y="80"  width="6" height="20" rx="2" fill="${C.inkSoft}"/>
      <rect x="105" y="160" width="6" height="20" rx="2" fill="${C.inkSoft}"/>
      <!-- Fridge magnet -->
      <rect x="36" y="68" width="18" height="14" rx="2" fill="${C.rose}" opacity="0.7"/>

      <!-- Stove -->
      <rect x="150" y="170" width="120" height="50" fill="${C.ink}" stroke="${C.inkSoft}" stroke-width="2" rx="4"/>
      <circle cx="178" cy="195" r="11" fill="none" stroke="${C.gold}" stroke-width="2"/>
      <circle cx="178" cy="195" r="6"  fill="${C.rose}"/>
      <circle cx="210" cy="195" r="11" fill="none" stroke="${C.gold}" stroke-width="2"/>
      <circle cx="242" cy="195" r="11" fill="none" stroke="${C.gold}" stroke-width="2"/>
      <!-- Knobs -->
      <g fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="0.8">
        <circle cx="158" cy="215" r="3"/>
        <circle cx="178" cy="215" r="3"/>
        <circle cx="198" cy="215" r="3"/>
        <circle cx="218" cy="215" r="3"/>
      </g>
      <!-- Pot on stove -->
      <ellipse cx="178" cy="170" rx="32" ry="6" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <rect x="146" y="148" width="64" height="22" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="1.5" rx="2"/>
      <ellipse cx="178" cy="148" rx="32" ry="5" fill="${C.gold}" opacity="0.5"/>
      <line x1="138" y1="152" x2="146" y2="156" stroke="${C.inkSoft}" stroke-width="3"/>
      <line x1="218" y1="156" x2="210" y2="152" stroke="${C.inkSoft}" stroke-width="3"/>
      <!-- Steam -->
      <path d="M170 142 Q165 130 172 122 Q179 114 174 104" stroke="${C.skyD}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M186 142 Q191 130 184 122 Q177 114 182 104" stroke="${C.skyD}" stroke-width="1.5" fill="none" opacity="0.6"/>

      <!-- Microwave above stove -->
      <rect x="150" y="60"  width="120" height="70" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="2" rx="4"/>
      <rect x="160" y="70"  width="80"  height="50" fill="${C.ink}" rx="2"/>
      <circle cx="248" cy="80" r="2.5" fill="${C.rose}"/>
      <circle cx="248" cy="92" r="2.5" fill="${C.gold}"/>
      <text x="200" y="103" text-anchor="middle" font-family="monospace" font-size="13" fill="${C.gold}">12:30</text>

      <!-- Sink -->
      <rect x="290" y="170" width="120" height="50" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="2" rx="4"/>
      <rect x="300" y="180" width="100" height="35" fill="#a8b6c0" stroke="${C.inkSoft}" stroke-width="1.5" rx="3"/>
      <ellipse cx="350" cy="198" rx="38" ry="10" fill="${C.skyD}" opacity="0.5"/>
      <!-- Drain -->
      <circle cx="350" cy="198" r="4" fill="${C.ink}"/>
      <!-- Faucet -->
      <path d="M350 170 L350 138 L378 138 L378 158" fill="none" stroke="${C.inkSoft}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="378" cy="160" r="3" fill="${C.skyD}"/>
      <!-- Water drip -->
      <path d="M378 165 Q376 175 378 184" stroke="${C.skyD}" stroke-width="1.5" fill="none" opacity="0.7"/>

      <!-- Cutting board on counter (right) -->
      <rect x="430" y="208" width="80" height="14" fill="${C.woodL}" stroke="${C.inkSoft}" stroke-width="1.5" rx="2"/>
      <line x1="436" y1="215" x2="500" y2="215" stroke="${C.wood}" stroke-width="0.8" opacity="0.7"/>
      <!-- Knife on board -->
      <rect x="438" y="200" width="44" height="6" fill="#cdd5dc" stroke="${C.inkSoft}" stroke-width="1" rx="1"/>
      <rect x="478" y="198" width="14" height="10" fill="${C.wood}" stroke="${C.inkSoft}" stroke-width="1" rx="1"/>
      <!-- Bowl in front of board -->
      <ellipse cx="450" cy="232" rx="22" ry="6" fill="${C.cream}" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <path d="M428 232 Q450 252 472 232" fill="${C.rose}" opacity="0.4" stroke="${C.inkSoft}" stroke-width="1.5"/>
      <!-- Chopsticks across bowl -->
      <line x1="425" y1="240" x2="478" y2="225" stroke="${C.wood}" stroke-width="2" stroke-linecap="round"/>
      <line x1="425" y1="244" x2="478" y2="229" stroke="${C.wood}" stroke-width="2" stroke-linecap="round"/>
    `,
    hotspots: [
      { x: 70,  y: 160, r: 18, c: '冰箱',   p: 'bīngxiāng',   en: 'refrigerator',  e: '🧊' },
      { x: 200, y: 95,  r: 16, c: '微波炉', p: 'wēibōlú',     en: 'microwave',     e: '📡' },
      { x: 210, y: 195, r: 14, c: '炉子',   p: 'lúzi',        en: 'stove',         e: '🔥' },
      { x: 178, y: 158, r: 13, c: '锅',     p: 'guō',         en: 'pot',           e: '🍳' },
      { x: 350, y: 200, r: 16, c: '水槽',   p: 'shuǐcáo',     en: 'sink',          e: '🚰' },
      { x: 364, y: 138, r: 12, c: '水龙头', p: 'shuǐlóngtou', en: 'faucet',        e: '🚿' },
      { x: 460, y: 203, r: 12, c: '刀',     p: 'dāo',         en: 'knife',         e: '🔪' },
      { x: 470, y: 215, r: 11, c: '砧板',   p: 'zhēnbǎn',     en: 'cutting board', e: '🪵' },
      { x: 450, y: 234, r: 12, c: '碗',     p: 'wǎn',         en: 'bowl',          e: '🥣' },
      { x: 452, y: 232, r: 9,  c: '筷子',   p: 'kuàizi',      en: 'chopsticks',    e: '🥢', lx: 510, ly: 270 },
    ],
  },
}

export const sceneFor = (slug) => SCENES[slug] || null
