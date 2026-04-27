<script setup>
const route = useRoute()

const tabs = [
  { to: '/strokes', han: '笔', label: 'Strokes'  },
  { to: '/',        han: '部', label: 'Radicals' },
  { to: '/hsk1',    han: '一', label: 'HSK 1'    },
  { to: '/hsk2',    han: '二', label: 'HSK 2'    },
  { to: '/hsk3',    han: '三', label: 'HSK 3'    },
]

const isStrokes = computed(() => route.path.startsWith('/strokes'))
const hskMatch  = computed(() => route.path.match(/^\/hsk([123])/))

const headerData = computed(() => {
  if (hskMatch.value) {
    const lvl = hskMatch.value[1]
    return {
      icon: '汉语',
      eyebrow: `HSK Level ${lvl}`,
      title: `Course · Vocabulary & grammar`,
      sourceHref: 'https://www.chinesetest.cn/'
    }
  }
  if (isStrokes.value) {
    return { icon: '笔画', eyebrow: 'Chinese Strokes', title: '5 groups · 36 variations',
             sourceHref: 'https://www.digmandarin.com/' }
  }
  return { icon: '部首', eyebrow: 'Chinese Radicals', title: 'Top 40 · Top 100 · All 214',
           sourceHref: 'https://www.hackingchinese.com/the-100-most-common-radicals-in-chinese/' }
})

const bgClass = computed(() => (isStrokes.value || hskMatch.value) ? 'paper-bg-warm' : 'paper-bg')
</script>

<template>
  <div class="min-h-screen text-ink antialiased" :class="bgClass">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-ink text-cream border-b-2 border-gold-deep/70 shadow-lg">
      <div class="max-w-6xl mx-auto px-4 pt-3 sm:pt-4 flex items-center gap-3">
        <div class="han text-2xl sm:text-3xl font-bold text-cream leading-none select-none">
          {{ headerData.icon }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-gold leading-tight">
            {{ headerData.eyebrow }}
          </div>
          <div class="text-sm sm:text-base font-semibold text-cream leading-tight truncate">
            {{ headerData.title }}
          </div>
        </div>
        <a :href="headerData.sourceHref" target="_blank" rel="noopener"
           class="hidden sm:inline-block text-[11px] text-gold-soft hover:text-gold transition">
          Source ↗
        </a>
      </div>
      <nav class="max-w-6xl mx-auto px-4 mt-2 flex gap-1 overflow-x-auto nice-scroll" aria-label="View">
        <NuxtLink
          v-for="t in tabs" :key="t.to" :to="t.to"
          class="relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition whitespace-nowrap"
          :class="route.path === t.to ? 'text-cream' : 'text-gold-soft hover:text-cream'"
        >
          <span class="flex items-center gap-1.5">
            <span class="han text-base">{{ t.han }}</span> {{ t.label }}
          </span>
          <span v-if="route.path === t.to"
            class="absolute left-2 right-2 bottom-0 h-[3px] rounded-t bg-gold"></span>
        </NuxtLink>
      </nav>
    </header>

    <main class="safe-bottom">
      <slot />

      <!-- Footer -->
      <footer class="max-w-6xl mx-auto px-3 sm:px-6 mt-8 sm:mt-12 mb-4">
        <div class="max-w-3xl mx-auto rounded-3xl bg-ink text-cream shadow-card overflow-hidden">
          <div class="px-5 sm:px-8 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="flex items-start gap-3">
              <div class="shrink-0 w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold han font-bold">作</div>
              <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft">Created by</div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate">Moh</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="shrink-0 w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold han font-bold">师</div>
              <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft">Supervisor</div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate">Wen</div>
              </div>
            </div>
          </div>
          <div class="px-5 sm:px-8 py-3 border-t border-gold-deep/40 text-[10px] sm:text-xs text-gold-soft tracking-widest uppercase text-center">
            CCC · China Culture Center · Kuala Lumpur, Malaysia
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>
