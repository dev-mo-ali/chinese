<script setup>
/**
 * Interactive scene renderer for a topic.
 * Renders an SVG illustration with tappable/hoverable hotspots.
 * Hover (desktop) or tap (touch) reveals a label bubble with hanzi/pinyin/English.
 */

const props = defineProps({
  scene:  { type: Object, required: true },
  accent: { type: String, default: '#9b2226' },
})

const active = ref(null)            // index of currently selected hotspot (sticky on tap)
const hover  = ref(null)            // index hovered (desktop)
const showAllLabels = ref(false)    // toggle to label everything at once

const currentIdx = computed(() => hover.value ?? active.value)
const current = computed(() => currentIdx.value == null ? null : props.scene.hotspots[currentIdx.value])

const onSpotClick = (i) => { active.value = active.value === i ? null : i }
const onSpotEnter = (i) => { hover.value = i }
const onSpotLeave = () => { hover.value = null }

// Compute where each "Label all" chip should sit. If the hotspot defines lx/ly
// we honour it; otherwise we push the label radially outward from the center.
const viewBoxParts = computed(() => props.scene.viewBox.split(/\s+/).map(Number))
const cx = computed(() => viewBoxParts.value[2] / 2)
const cy = computed(() => viewBoxParts.value[3] / 2)
const labelPos = (h) => {
  if (h.lx != null && h.ly != null) return { x: h.lx, y: h.ly }
  const dx = h.x - cx.value
  const dy = h.y - cy.value
  const len = Math.max(1, Math.hypot(dx, dy))
  const push = 38
  return { x: h.x + (dx / len) * push, y: h.y + (dy / len) * push }
}
</script>

<template>
  <div class="topic-scene rounded-2xl bg-paper border border-gold-deep/25 shadow-chip overflow-hidden">
    <header class="px-5 py-3 border-b border-gold-deep/20 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent flex items-center justify-between gap-3 flex-wrap">
      <div class="flex items-center gap-2 text-sm text-ink">
        <svg viewBox="0 0 24 24" class="w-4 h-4 text-gold-deep" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>
        </svg>
        <span class="font-semibold">Hover or tap a dot</span>
        <span class="hidden sm:inline text-ink/50">· 点一下圆点</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="showAllLabels = !showAllLabels"
          class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border transition"
          :class="showAllLabels ? 'bg-ink text-paper border-ink' : 'bg-paper text-ink border-gold-deep/40 hover:border-ink'"
          :aria-pressed="showAllLabels"
        >{{ showAllLabels ? 'Hide labels' : 'Label all' }}</button>
        <button
          type="button"
          @click="active = null; hover = null"
          class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-gold-deep/40 text-ink hover:border-ink transition"
        >Reset</button>
      </div>
    </header>

    <div class="relative">
      <!-- Soft paper backdrop tint so every scene feels at home in the theme -->
      <div class="absolute inset-0 bg-cream/50 pointer-events-none"
           style="background-image: radial-gradient(circle at 20% 10%, rgba(212,175,55,0.10), transparent 55%), radial-gradient(circle at 85% 90%, rgba(155,34,38,0.06), transparent 60%);"></div>

      <svg
        :viewBox="scene.viewBox"
        xmlns="http://www.w3.org/2000/svg"
        class="relative block w-full h-auto select-none"
        role="img"
        aria-label="Interactive topic scene"
      >
        <defs>
          <filter id="ts-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/>
            <feOffset dx="0" dy="1.5" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.30"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ts-dot" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.6"/>
            <feOffset dx="0" dy="1.8" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.40"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Static illustration backdrop -->
        <g v-html="scene.svg" filter="url(#ts-soft)" />

        <!-- Connector lines for "Label all" mode (drawn under dots) -->
        <g v-if="showAllLabels" stroke="#3a2f24" stroke-width="0.8" opacity="0.5" stroke-linecap="round">
          <line v-for="(h, i) in scene.hotspots" :key="'ln'+i"
                :x1="h.x" :y1="h.y"
                :x2="labelPos(h).x" :y2="labelPos(h).y" />
        </g>

        <!-- Hotspots -->
        <g>
          <g
            v-for="(h, i) in scene.hotspots" :key="i"
            class="hotspot"
            :class="{ 'hotspot--active': hover === i || active === i }"
            @click="onSpotClick(i)"
            @mouseenter="onSpotEnter(i)"
            @mouseleave="onSpotLeave"
            tabindex="0"
            @focus="onSpotEnter(i)"
            @blur="onSpotLeave"
            @keydown.enter.prevent="onSpotClick(i)"
            @keydown.space.prevent="onSpotClick(i)"
            role="button"
            :aria-label="`${h.c} ${h.p} — ${h.en}`"
          >
            <!-- Pulse halo -->
            <circle :cx="h.x" :cy="h.y" :r="(h.r || 10) + 6" class="halo" :style="{ fill: accent }" />
            <!-- Cream ring (paper) for contrast against any backdrop -->
            <circle :cx="h.x" :cy="h.y" :r="(h.r || 10) + 1.6" fill="#fdf6e3" opacity="0.95" filter="url(#ts-dot)"/>
            <!-- Visible accent dot -->
            <circle :cx="h.x" :cy="h.y" :r="h.r || 10" :style="{ fill: accent }" />
            <!-- Number -->
            <text :x="h.x" :y="h.y + (h.r ? h.r * 0.36 : 3.6)"
                  text-anchor="middle"
                  :font-size="(h.r || 10) * 1.05" font-weight="800" fill="#fff8e1"
                  pointer-events="none">{{ i + 1 }}</text>

            <!-- Permanent labels when "Label all" is on -->
            <g v-if="showAllLabels" pointer-events="none">
              <g :transform="`translate(${labelPos(h).x}, ${labelPos(h).y})`">
                <rect
                  :x="-(h.c.length * 7 + 8)" y="-11"
                  :width="h.c.length * 14 + 16" height="22" rx="6"
                  fill="#1c1917" opacity="0.92"
                />
                <text x="0" y="5"
                      text-anchor="middle" font-size="13" font-weight="700"
                      fill="#fef3c7" class="han"
                      lang="zh-CN">{{ h.c }}</text>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <!-- Floating info card (desktop hover / mobile select) -->
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="current"
          class="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4
                 bg-ink/95 backdrop-blur-sm text-cream rounded-xl shadow-card
                 px-5 py-3 max-w-[92%] text-center border border-gold-deep/40"
        >
          <div class="flex items-center justify-center gap-3 mb-1">
            <span v-if="current.e" class="text-2xl leading-none" aria-hidden="true">{{ current.e }}</span>
            <span class="han text-3xl font-bold leading-none" lang="zh-CN">{{ current.c }}</span>
          </div>
          <div class="text-[11px] tracking-[0.25em] uppercase text-gold mt-1">{{ current.p }}</div>
          <div class="text-sm text-cream/90 mt-0.5">{{ current.en }}</div>
        </div>
      </Transition>
    </div>

    <!-- Legend list under scene (mobile-friendly tap targets, doubles as alt UI) -->
    <ol class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-3 text-sm bg-paper border-t border-gold-deep/15">
      <li
        v-for="(h, i) in scene.hotspots" :key="i"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition"
        :class="(hover === i || active === i) ? 'bg-gold/20 ring-1 ring-gold-deep/50' : 'hover:bg-gold/10'"
        @mouseenter="onSpotEnter(i)"
        @mouseleave="onSpotLeave"
        @click="onSpotClick(i)"
      >
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-paper shrink-0 ring-1 ring-paper"
          :style="{ background: accent }"
        >{{ i + 1 }}</span>
        <span class="han font-bold text-ink truncate" lang="zh-CN">{{ h.c }}</span>
        <span class="text-xs text-gold-deep/80 truncate ml-auto font-mono">{{ h.p }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.topic-scene { isolation: isolate; }

.hotspot { cursor: pointer; outline: none; transition: transform 0.15s ease; transform-origin: center; transform-box: fill-box; }
.hotspot:hover, .hotspot--active { transform: scale(1.12); }
.hotspot:focus-visible > circle:nth-of-type(2) {
  stroke: #fde68a;
  stroke-width: 2.5;
}

.halo {
  opacity: 0.35;
  transform-origin: center;
  transform-box: fill-box;
  animation: pulse 2.6s ease-out infinite;
}
.hotspot--active .halo {
  opacity: 0.55;
  animation-duration: 1.3s;
}

@keyframes pulse {
  0%   { transform: scale(0.55); opacity: 0.55; }
  70%  { transform: scale(1.7);  opacity: 0;    }
  100% { transform: scale(1.7);  opacity: 0;    }
}

@media (prefers-reduced-motion: reduce) {
  .halo { animation: none; opacity: 0.25; }
  .hotspot { transition: none; }
}
</style>
