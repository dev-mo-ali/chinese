<script setup>
import { CATEGORIES, CAT_COLORS, TIERS, radicalsByTier, polarXY } from '~/composables/useRadicals.js'

useHead({ title: '部首 · Chinese Radical Mind Map' })

const search    = ref('')
const activeCat = ref('all')
const tier      = ref('basic') // 'basic' | 'top100' | 'all'
const activeIdx = ref(0)
const hovEx     = ref(null)
const cardEl    = ref(null)

const tieredRadicals = computed(() => radicalsByTier(tier.value))

const matchesSearch = (r, q) => {
  if (!q) return true
  return r.char.includes(q)
    || r.pinyin.toLowerCase().includes(q)
    || r.meaning.toLowerCase().includes(q)
    || (r.form && r.form.includes(q))
    || r.ex.some(e => e.char.includes(q) || e.pinyin.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q))
}

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  return tieredRadicals.value.filter(r => (activeCat.value === 'all' || r.cat === activeCat.value) && matchesSearch(r, q))
})

const radical = computed(() => filtered.value[activeIdx.value] || filtered.value[0] || null)

const counts = computed(() => {
  const q = search.value.toLowerCase().trim()
  const c = { all: 0, nature: 0, body: 0, objects: 0, actions: 0 }
  for (const r of tieredRadicals.value) {
    if (matchesSearch(r, q)) { c.all++; c[r.cat]++ }
  }
  return c
})

const catItems = computed(() => [
  { key: 'all', emoji: null, label: 'All', color: '#1a1209' },
  ...Object.entries(CATEGORIES).map(([k, v]) => ({ key: k, emoji: v.emoji, label: v.label, color: v.color })),
])

const angles = [-150, -30]

const exNodes = computed(() => {
  if (!radical.value) return []
  return radical.value.ex.map((ex, i) => {
    const { x, y } = polarXY(angles[i], 150)
    return { ex, i, x, y, hov: hovEx.value === i }
  })
})

const pickRadical = (i) => {
  activeIdx.value = i
  hovEx.value = null
  if (import.meta.client && globalThis.window?.innerWidth < 1024) {
    cardEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const pickCat = (k) => { activeCat.value = k; activeIdx.value = 0; hovEx.value = null }
const pickTier = (t) => { tier.value = t; activeIdx.value = 0; hovEx.value = null }

const clearSearch = () => { search.value = '' }

watch(search, () => { activeIdx.value = 0; hovEx.value = null })

// Keyboard navigation
const onKey = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea') return
  const f = filtered.value
  if (!f.length) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    activeIdx.value = (activeIdx.value + 1) % f.length; hovEx.value = null
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    activeIdx.value = (activeIdx.value - 1 + f.length) % f.length; hovEx.value = null
  }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
    <!-- Tier selector -->
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50 mr-1">Set</span>
      <button v-for="(meta, key) in TIERS" :key="key" type="button" @click="pickTier(key)"
              class="group relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition"
              :class="tier === key
                ? 'bg-ink text-cream border-ink shadow-chip'
                : 'bg-white text-ink/70 border-ink/15 hover:border-gold hover:text-ink'">
        <span>{{ meta.label }}</span>
        <span class="ml-1 text-[10px] font-mono opacity-70">
          {{ key === 'basic' ? 40 : key === 'top100' ? 100 : 214 }}
        </span>
      </button>
      <span class="hidden sm:inline text-[11px] text-ink/50 ml-1 italic">{{ TIERS[tier].desc }}</span>
    </div>

    <!-- Search + filters -->
    <div class="mb-4 sm:mb-6 space-y-3">
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input v-model="search" type="search" autocomplete="off" spellcheck="false"
               placeholder="Search radical, pinyin, or meaning…"
               class="w-full pl-11 pr-10 py-3 text-sm sm:text-base bg-white/90 backdrop-blur
                      border border-ink/10 rounded-2xl shadow-sm
                      placeholder:text-ink/40 text-ink
                      focus:border-gold focus:ring-4 focus:ring-gold/20 focus:bg-white outline-none transition" />
        <button v-if="search" type="button" @click="clearSearch"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full
                       bg-ink/5 hover:bg-ink/10 text-ink/60 text-sm leading-none">×</button>
      </div>

      <div class="flex gap-2 overflow-x-auto nice-scroll -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
        <button v-for="c in catItems" :key="c.key" @click="pickCat(c.key)"
                class="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200"
                :class="activeCat === c.key ? 'text-white shadow-chip border-transparent' : 'bg-white text-ink/70 border-ink/10 hover:border-ink/25'"
                :style="activeCat === c.key ? `background:${c.color};` : ''">
          <span v-if="c.key !== 'all'" class="inline-block w-2 h-2 rounded-full" :style="{ background: c.color }"></span>
          <span v-if="c.emoji">{{ c.emoji }}</span>
          <span>{{ c.label }}</span>
          <span class="text-[10px] font-mono" :class="activeCat === c.key ? 'text-white/80' : 'text-ink/40'">
            {{ counts[c.key] || 0 }}
          </span>
        </button>
      </div>
    </div>

    <!-- Two-column on lg, stacked on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-4 sm:gap-6">

      <section class="order-2 lg:order-1">
        <div class="bg-white/80 backdrop-blur border border-ink/10 rounded-2xl shadow-card overflow-hidden">
          <div class="px-4 py-3 border-b border-ink/5 flex items-center justify-between">
            <h2 class="text-xs sm:text-sm font-semibold tracking-wide uppercase text-ink/70">All Radicals</h2>
            <span class="text-[10px] sm:text-xs text-ink/40">tap to view</span>
          </div>
          <div class="nice-scroll grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2.5 sm:gap-3 p-3 sm:p-4
                      max-h-[42vh] lg:max-h-[68vh] overflow-y-auto">
            <template v-if="filtered.length">
              <button v-for="(r, i) in filtered" :key="r.kangxi + '-' + i"
                      :title="`${r.char} — ${r.pinyin} — ${r.meaning}`"
                      @click="pickRadical(i)"
                      class="group relative aspect-square flex flex-col items-center justify-center rounded-2xl
                             border-2 shadow-sm transition-all duration-200 active:scale-95
                             hover:shadow-md hover:-translate-y-0.5"
                      :class="radical && r.kangxi === radical.kangxi && i === activeIdx
                              ? 'shadow-chip ring-2 scale-[1.06] z-10'
                              : ''"
                      :style="(() => {
                        const isActive = radical && r.kangxi === radical.kangxi && i === activeIdx
                        const p = CAT_COLORS[r.cat]
                        return `background:${isActive ? p.accent : p.bg};
                                color:${isActive ? '#fff' : p.accent};
                                border-color:${isActive ? p.accent : p.light};
                                ${isActive ? `--tw-ring-color:${p.accent}66;` : ''}`
                      })()">
                <span class="han text-3xl sm:text-[34px] font-bold leading-none drop-shadow-sm">{{ r.char }}</span>
                <span class="text-[10px] sm:text-[11px] mt-1.5 font-mono opacity-70 tracking-wider">#{{ r.kangxi }}</span>
              </button>
            </template>
            <div v-else class="col-span-full py-10 text-center text-ink/50 text-sm">
              <div class="text-3xl mb-2">🔍</div>
              No radicals match your search.
            </div>
          </div>
        </div>
      </section>

      <section class="order-1 lg:order-2">
        <div ref="cardEl" class="bg-white border-2 rounded-3xl shadow-card overflow-hidden animate-fadeUp"
             :style="{ borderColor: radical ? CAT_COLORS[radical.cat].light : '#e5e7eb' }"
             :key="radical ? radical.kangxi : 'empty'">
          <div v-if="!radical" class="p-10 text-center text-ink/40">
            <div class="text-5xl mb-3">∅</div>
            <p class="text-sm">Pick a radical to begin.</p>
          </div>

          <template v-else>
            <div class="px-5 py-2.5 flex items-center justify-between text-xs font-medium tracking-wide"
                 :style="{ background: CAT_COLORS[radical.cat].bg, color: CAT_COLORS[radical.cat].accent }">
              <span class="flex items-center gap-2">
                <span>{{ CATEGORIES[radical.cat].emoji }}</span>
                <span class="uppercase">{{ CATEGORIES[radical.cat].label }}</span>
              </span>
              <span class="font-mono opacity-70">Kangxi #{{ radical.kangxi }}</span>
            </div>

            <!-- Mind map SVG -->
            <div class="px-3 sm:px-6 pt-4 sm:pt-6 pb-2">
              <svg viewBox="-220 -200 440 360" width="100%"
                   style="overflow:visible;display:block;max-width:520px;margin:0 auto;">
                <defs>
                  <radialGradient :id="`centerGlow-${radical.kangxi}`" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   :stop-color="CAT_COLORS[radical.cat].accent" stop-opacity="0.25" />
                    <stop offset="100%" :stop-color="CAT_COLORS[radical.cat].accent" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <line v-for="n in exNodes" :key="'ln-' + n.i" class="mm-line"
                      x1="0" y1="0" :x2="n.x" :y2="n.y"
                      :stroke="n.hov ? CAT_COLORS[radical.cat].accent : CAT_COLORS[radical.cat].light"
                      :stroke-width="n.hov ? 3 : 2" stroke-linecap="round"
                      :stroke-dasharray="n.hov ? 'none' : '5,5'" />

                <circle cx="0" cy="0" r="80" :fill="`url(#centerGlow-${radical.kangxi})`" />
                <circle cx="0" cy="0" r="46" :fill="CAT_COLORS[radical.cat].bg"
                        :stroke="CAT_COLORS[radical.cat].accent" stroke-width="2.5" />
                <text x="0" y="14" text-anchor="middle" font-size="44"
                      font-family="Noto Serif SC, serif" font-weight="700"
                      :fill="CAT_COLORS[radical.cat].accent">{{ radical.char }}</text>
                <text x="0" y="-58" text-anchor="middle" font-size="11"
                      font-family="Inter, sans-serif" font-weight="600" letter-spacing="2"
                      :fill="CAT_COLORS[radical.cat].accent">
                  {{ radical.pinyin.toUpperCase() }}
                </text>

                <g v-if="radical.form && radical.form !== radical.char" transform="translate(0, 60)">
                  <rect x="-40" y="0" width="80" height="22" rx="11"
                        :fill="CAT_COLORS[radical.cat].accent" opacity="0.12" />
                  <text x="0" y="15" text-anchor="middle" font-size="11"
                        :fill="CAT_COLORS[radical.cat].accent"
                        font-family="Inter, sans-serif" font-weight="500">{{ radical.form }}</text>
                </g>

                <g v-for="n in exNodes" :key="'ex-' + n.i" class="mm-ex"
                   :transform="`translate(${n.x},${n.y})`"
                   @mouseenter="hovEx = n.i"
                   @mouseleave="hovEx = null"
                   @click="hovEx = (hovEx === n.i ? null : n.i)">
                  <circle cx="3" cy="4" r="40" :fill="CAT_COLORS[radical.cat].accent" :opacity="n.hov ? 0.18 : 0.06" />
                  <circle cx="0" cy="0" r="40"
                          :fill="n.hov ? CAT_COLORS[radical.cat].accent : '#fff'"
                          :stroke="CAT_COLORS[radical.cat].accent"
                          :stroke-width="n.hov ? 0 : 2.5" />
                  <text x="0" y="-22" text-anchor="middle" font-size="10"
                        :fill="n.hov ? '#fff' : CAT_COLORS[radical.cat].accent"
                        font-family="Inter, sans-serif" font-weight="600" letter-spacing="0.5">{{ n.ex.pinyin }}</text>
                  <text x="0" y="13" text-anchor="middle" font-size="32"
                        font-family="Noto Serif SC, serif" font-weight="700"
                        :fill="n.hov ? '#fff' : '#1a1a1a'">{{ n.ex.char }}</text>
                  <text x="0" y="50" text-anchor="middle" font-size="10"
                        :fill="n.hov ? CAT_COLORS[radical.cat].light : CAT_COLORS[radical.cat].text"
                        font-family="Inter, sans-serif" opacity="0.85">{{ n.ex.meaning }}</text>
                </g>
              </svg>
            </div>

            <!-- Detail panel -->
            <div class="mx-3 sm:mx-6 mb-4 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 border"
                 :style="{ background: CAT_COLORS[radical.cat].bg, borderColor: CAT_COLORS[radical.cat].light }">
              <div class="text-center shrink-0">
                <div class="han font-bold leading-none"
                     :style="{ fontSize: '56px', color: CAT_COLORS[radical.cat].accent }">{{ radical.char }}</div>
                <div v-if="radical.form && radical.form !== radical.char"
                     class="han mt-1 text-lg"
                     :style="{ color: CAT_COLORS[radical.cat].accent, opacity: .65 }">{{ radical.form }}</div>
                <div class="mt-1 text-xs font-semibold tracking-wider"
                     :style="{ color: CAT_COLORS[radical.cat].accent }">{{ radical.pinyin }}</div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-base sm:text-lg font-bold mb-2"
                     :style="{ color: CAT_COLORS[radical.cat].text }">{{ radical.meaning }}</div>
                <div v-if="radical.form && radical.form !== radical.char"
                     class="text-xs sm:text-sm mb-1"
                     :style="{ color: CAT_COLORS[radical.cat].text, opacity: .85 }">
                  <span class="opacity-60">Component form: </span>
                  <span class="han font-semibold">{{ radical.form }}</span>
                </div>
                <div v-if="radical.colloquial" class="text-xs sm:text-sm"
                     :style="{ color: CAT_COLORS[radical.cat].text, opacity: .7 }">
                  <span class="opacity-70">名称: </span>{{ radical.colloquial }}
                </div>
              </div>
            </div>

            <div v-if="radical.comment" class="mx-3 sm:mx-6 mb-4 rounded-2xl px-4 py-3 border border-dashed flex gap-3"
                 :style="{ borderColor: CAT_COLORS[radical.cat].light, background: '#fffdf7' }">
              <span class="han text-xl leading-none shrink-0 select-none"
                    :style="{ color: CAT_COLORS[radical.cat].accent, opacity: .55 }">”</span>
              <p class="text-xs sm:text-sm leading-relaxed italic"
                 :style="{ color: CAT_COLORS[radical.cat].text }">
                {{ radical.comment }}
              </p>
            </div>

            <div class="px-3 sm:px-6 pb-5">
              <div class="text-[10px] font-semibold tracking-widest uppercase mb-2 text-ink/50">
                Example characters
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div v-for="(ex, i) in radical.ex" :key="i"
                     class="rounded-xl p-3 sm:p-4 text-center border transition hover:shadow-chip"
                     :style="{ background: CAT_COLORS[radical.cat].bg, borderColor: CAT_COLORS[radical.cat].light }">
                  <div class="han text-3xl sm:text-4xl font-bold text-ink leading-none mb-2">{{ ex.char }}</div>
                  <div class="text-xs font-semibold" :style="{ color: CAT_COLORS[radical.cat].accent }">{{ ex.pinyin }}</div>
                  <div class="text-xs mt-0.5" :style="{ color: CAT_COLORS[radical.cat].text, opacity: .7 }">{{ ex.meaning }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

    </div>
  </div>
</template>
