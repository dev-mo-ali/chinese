<script setup>
const route = useRoute()

const tabs = [
  { to: '/pinyin',  han: '拼', label: 'Pinyin'   },
  { to: '/strokes', han: '笔', label: 'Strokes'  },
  { to: '/',        han: '部', label: 'Radicals' },
  { to: '/hsk1',    han: '一', label: 'HSK 1'    },
  { to: '/hsk2',    han: '二', label: 'HSK 2'    },
  { to: '/hsk3',    han: '三', label: 'HSK 3'    },
]

const isStrokes = computed(() => route.path.startsWith('/strokes'))
const isPinyin  = computed(() => route.path.startsWith('/pinyin'))
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
  if (isPinyin.value) {
    return { icon: '拼音', eyebrow: 'Hanyu Pinyin', title: 'Initials · Finals · Tones · Audio',
             sourceHref: 'https://www.digmandarin.com/chinese-pinyin-chart' }
  }
  return { icon: '部首', eyebrow: 'Chinese Radicals', title: 'Top 40 · Top 100 · All 214',
           sourceHref: 'https://www.hackingchinese.com/the-100-most-common-radicals-in-chinese/' }
})

const bgClass = computed(() => (isStrokes.value || hskMatch.value) ? 'paper-bg-warm' : 'paper-bg')

const showTop = ref(false)
const scrollProgress = ref(0)
const onScroll = () => {
  showTop.value = window.scrollY > 400
  const h = document.documentElement
  const max = (h.scrollHeight - h.clientHeight) || 1
  scrollProgress.value = Math.min(100, Math.max(0, (window.scrollY / max) * 100))
}
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
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
      <div class="h-1 bg-cream/10 overflow-hidden" aria-hidden="true">
        <div class="progress-bar h-full transition-[width] duration-75 ease-out" :style="{ width: scrollProgress + '%' }"></div>
      </div>
    </header>

    <main class="safe-bottom">
      <slot />

      <!-- Footer -->
      <footer class="max-w-6xl mx-auto px-3 sm:px-6 mt-8 sm:mt-12 mb-4">
        <div class="max-w-3xl mx-auto rounded-3xl bg-ink text-cream shadow-card overflow-hidden">
          <div class="px-5 sm:px-8 py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="flex items-start gap-3">
              <div class="shrink-0 w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold han font-bold">师</div>
              <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft">Supervisor</div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate">Teacher: Wen</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="shrink-0 w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold han font-bold">作</div>
              <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft">Created by</div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate">Eng: Moh</div>
              </div>
            </div>
          </div>
          <div class="px-5 sm:px-8 py-3 border-t border-gold-deep/40 text-[10px] sm:text-xs text-gold-soft tracking-widest uppercase text-center">
            CCC · China Culture Center · Kuala Lumpur, Malaysia
          </div>
        </div>
      </footer>
    </main>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <button
        v-if="showTop"
        @click="scrollTop"
        type="button"
        aria-label="Back to top"
        class="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink text-cream border-2 border-gold-deep/70 shadow-lg hover:bg-gold-deep/30 hover:text-gold transition flex items-center justify-center"
      >
        <span class="han text-lg leading-none" aria-hidden="true">↑</span>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  background: linear-gradient(90deg, #bbf7d0 0%, #86efac 35%, #4ade80 65%, #86efac 100%);
  background-size: 200% 100%;
  box-shadow:
    0 0 6px rgba(134, 239, 172, .85),
    0 0 14px rgba(74, 222, 128, .55),
    0 0 22px rgba(134, 239, 172, .35);
  animation: progress-flow 3s linear infinite;
}
.progress-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 0%,
    transparent 35%,
    rgba(255, 255, 255, .85) 50%,
    transparent 65%,
    transparent 100%
  );
  background-size: 250% 100%;
  animation: progress-sheen 2.4s linear infinite;
  pointer-events: none;
}
@keyframes progress-flow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes progress-sheen {
  0%   { background-position: 200% 0; }
  100% { background-position: -50% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .progress-bar,
  .progress-bar::after { animation: none; }
}
</style>
