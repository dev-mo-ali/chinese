<script setup>
import { STROKE_GROUPS } from '~/composables/useStrokes.js'

useHead({ title: '笔画 · Chinese Stroke Specimen Book' })

const groupIdx = ref(0)
const group    = computed(() => STROKE_GROUPS[groupIdx.value])

const pickGroup = (i) => {
  groupIdx.value = i
  if (import.meta.client) {
    const header = document.querySelector('header')
    globalThis.window.scrollTo({ top: header ? header.offsetHeight : 0, behavior: 'smooth' })
  }
}

const onKey = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea') return
  if (e.key === '[' || e.key === 'ArrowLeft') {
    groupIdx.value = (groupIdx.value - 1 + STROKE_GROUPS.length) % STROKE_GROUPS.length
  } else if (e.key === ']' || e.key === 'ArrowRight') {
    groupIdx.value = (groupIdx.value + 1) % STROKE_GROUPS.length
  }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

const pad2 = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div>
    <!-- Group selector (sticky strip) -->
    <div class="sticky top-[88px] sm:top-[96px] z-20 bg-rice/85 backdrop-blur border-b border-gold-deep/20 shadow-sm">
      <div class="max-w-6xl mx-auto px-3 sm:px-6 py-3">
        <div class="flex gap-2 overflow-x-auto nice-scroll -mx-3 px-3 sm:mx-0 sm:px-0">
          <button v-for="(g, i) in STROKE_GROUPS" :key="g.key" @click="pickGroup(i)"
                  class="shrink-0 inline-flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200"
                  :class="i === groupIdx
                          ? 'shadow-chip text-white border-transparent scale-[1.02]'
                          : 'bg-white/80 text-ink/70 border-ink/10 hover:border-ink/25 hover:bg-white'"
                  :style="i === groupIdx ? `background:${g.color};` : ''">
            <span class="han w-7 h-7 flex items-center justify-center rounded-xl text-lg font-bold"
                  :style="i === groupIdx
                          ? `background:rgba(255,255,255,0.18);color:#fff;`
                          : `background:${g.bg};color:${g.color};`">
              {{ g.main }}
            </span>
            <span class="flex flex-col items-start leading-tight">
              <span class="han">{{ g.mainName }}</span>
              <span class="text-[9px] font-mono opacity-70 tracking-wider">{{ g.mainPinyin }} · {{ g.items.length }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-6 sm:pt-10">
      <article :key="group.key" class="relative animate-fadeIn rounded-[2rem] overflow-hidden border shadow-card"
               :style="{ background: `linear-gradient(135deg, ${group.bg} 0%, #fff 70%)`, borderColor: group.light }">
        <div class="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-8 p-5 sm:p-10 items-center">

          <!-- Vertical scroll-style index ribbon -->
          <div class="ribbon flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-widest text-white px-2 py-3 rounded-lg shadow-ink"
               :style="{ background: group.color }">
            № {{ pad2(groupIdx + 1) }} / {{ pad2(STROKE_GROUPS.length) }}
          </div>

          <!-- Centerpiece glyph + intro -->
          <div class="min-w-0 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            <div class="relative ink-wash p-2 sm:p-4 -m-2 sm:-m-4">
              <div class="brush leading-none select-none"
                   :style="{
                     fontSize: 'clamp(120px, 22vw, 220px)',
                     color: group.color,
                     textShadow: `0 4px 20px ${group.color}33`
                   }">
                {{ group.main }}
              </div>
            </div>
            <div class="min-w-0">
              <div class="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold mb-1"
                   :style="{ color: group.color, opacity: .75 }">
                Main Stroke · {{ group.mainEn }}
              </div>
              <h1 class="han text-4xl sm:text-5xl font-bold mb-2 leading-none" :style="{ color: group.text }">
                {{ group.mainName }}
                <span class="ml-2 text-2xl sm:text-3xl font-mono font-medium"
                      :style="{ color: group.color, opacity: .7 }">{{ group.mainPinyin }}</span>
              </h1>
              <p class="text-sm sm:text-base max-w-md leading-relaxed"
                 :style="{ color: group.text, opacity: .8 }">{{ group.intro }}</p>
              <div class="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border"
                      :style="{ borderColor: group.light, color: group.text }">
                  <span class="w-1.5 h-1.5 rounded-full" :style="{ background: group.color }"></span>
                  {{ group.items.length }} variation{{ group.items.length === 1 ? '' : 's' }}
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border"
                      :style="{ borderColor: group.light, color: group.text }">
                  <span class="font-mono opacity-70">key:</span> {{ group.key }}
                </span>
              </div>
            </div>
          </div>

          <!-- Red seal stamp (desktop only) -->
          <div class="hidden sm:flex flex-col items-center justify-center self-stretch">
            <div class="seal w-16 h-16 flex flex-col items-center justify-center han text-center leading-none">
              <div class="text-[10px] tracking-widest opacity-80">{{ group.mainPinyin.toUpperCase() }}</div>
              <div class="text-2xl font-bold mt-0.5">{{ group.mainName }}</div>
            </div>
            <div class="mt-2 text-[9px] tracking-widest text-ink/40 uppercase">Seal · 印</div>
          </div>
        </div>
      </article>
    </section>

    <!-- Variations specimen wall -->
    <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8 pb-2">
      <div class="flex items-center gap-3 mb-4 sm:mb-6">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/40 to-transparent"></div>
        <h2 class="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-ink/50 font-semibold">变 体 · Variations</h2>
        <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/40 to-transparent"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <article v-for="(it, i) in group.items" :key="`${group.key}-${i}`"
                 class="group relative animate-slideUp rounded-2xl bg-white border shadow-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition"
                 :style="{ borderColor: group.light, animationDelay: `${Math.min(i * 30, 300)}ms` }">
          <div class="absolute top-2 right-3 text-[10px] font-mono font-bold tracking-wider opacity-50"
               :style="{ color: group.color }">{{ pad2(i + 1) }}</div>

          <div class="p-4 sm:p-5 flex gap-4 sm:gap-5">
            <div class="shrink-0 mi-grid w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center">
              <span class="brush leading-none" :style="{ fontSize: '64px', color: group.color }">{{ it.glyph }}</span>
            </div>

            <div class="min-w-0 flex-1 flex flex-col">
              <div class="flex items-baseline gap-2 flex-wrap">
                <span class="han text-xl sm:text-2xl font-bold leading-none" :style="{ color: group.text }">{{ it.name }}</span>
                <span class="text-xs sm:text-sm font-semibold tracking-wide" :style="{ color: group.color }">{{ it.pinyin }}</span>
              </div>
              <div class="text-xs text-ink/60 mt-1 leading-snug">{{ it.en }}</div>

              <div class="mt-auto pt-3">
                <div class="text-[9px] tracking-[0.25em] uppercase font-semibold mb-1.5 text-ink/40">Found in</div>
                <div class="flex flex-wrap gap-1">
                  <span v-for="(c, ci) in it.ex" :key="ci"
                        class="han inline-flex items-center justify-center w-8 h-8 rounded-md text-base font-bold border bg-white"
                        :style="{ color: group.text, borderColor: group.light }">{{ c }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="h-1" :style="{ background: `linear-gradient(to right, ${group.color}, ${group.light})` }"></div>
        </article>
      </div>
    </section>
  </div>
</template>
