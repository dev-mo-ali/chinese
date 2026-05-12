<script setup>
const route = useRoute()

const tabs = [
  { to: '/',         han: '家', label: 'Home'     },
  { to: '/pinyin',   han: '拼', label: 'Pinyin'   },
  { to: '/strokes',  han: '笔', label: 'Strokes'  },
  { to: '/radicals', han: '部', label: 'Radicals' },
  { to: '/hsk1',     han: '一', label: 'HSK 1'    },
  { to: '/hsk2',     han: '二', label: 'HSK 2'    },
  { to: '/hsk3',     han: '三', label: 'HSK 3'    },
  { to: '/allwords', han: '词', label: 'All Words'},
  { to: '/write',    han: '写', label: 'Write'    },
  { to: '/sentence', han: '句', label: 'Sentence' },
  { to: '/game',     han: '游', label: 'Game'     },
]

const isHome     = computed(() => route.path === '/')
const isStrokes  = computed(() => route.path.startsWith('/strokes'))
const isPinyin   = computed(() => route.path.startsWith('/pinyin'))
const isRadicals = computed(() => route.path.startsWith('/radicals'))
const isWrite    = computed(() => route.path.startsWith('/write'))
const isSentence = computed(() => route.path.startsWith('/sentence'))
const isGame     = computed(() => route.path.startsWith('/game'))
const hskMatch   = computed(() => route.path.match(/^\/hsk([123])/))

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
  if (isRadicals.value) {
    return { icon: '部首', eyebrow: 'Chinese Radicals', title: 'Top 40 · Top 100 · All 214',
             sourceHref: 'https://www.hackingchinese.com/the-100-most-common-radicals-in-chinese/' }
  }
  if (isWrite.value) {
    return { icon: '书写', eyebrow: 'Practice Writing', title: 'Stroke order · Animate · Quiz',
             sourceHref: 'https://hanziwriter.org/' }
  }
  if (isSentence.value) {
    return { icon: '造句', eyebrow: 'Sentence Builder', title: 'Order the words · Build a sentence',
             sourceHref: '' }
  }
  if (isGame.value) {
    return { icon: '游戏', eyebrow: 'Memory Game', title: 'Quiz · Match · Remember Hanzi',
             sourceHref: '' }
  }
  return { icon: '汉语', eyebrow: 'Welcome · 欢迎', title: 'Learn Chinese · Step by step',
           sourceHref: '' }
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

// Accessibility: user-controlled font-size (A− / A / A+).
const { stepIndex, steps, increase, decrease, reset, canIncrease, canDecrease, currentPx } = useFontSize()

// Mobile menu (hamburger → slide-down panel).
const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu  = () => { menuOpen.value = false }
watch(() => route.path, closeMenu)
const onKeydown = (e) => { if (e.key === 'Escape') closeMenu() }
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// Visitors counter (counterapi.dev) — increments once per browser session.
const visitors = ref(null)
onMounted(async () => {
  try {
    const sessionKey = 'chinese-visit-counted'
    const counted = sessionStorage.getItem(sessionKey)
    const endpoint = counted
      ? 'https://api.counterapi.dev/v1/dev-mo-ali/chinese-learn/'
      : 'https://api.counterapi.dev/v1/dev-mo-ali/chinese-learn/up'
    const res = await fetch(endpoint)
    if (res.ok) {
      const data = await res.json()
      visitors.value = data.count
      if (!counted) sessionStorage.setItem(sessionKey, '1')
    }
  } catch {
    // Silent fail — counter is non-essential.
  }
})
const formattedVisitors = computed(() =>
  visitors.value == null ? '…' : visitors.value.toLocaleString()
)
</script>

<template>
  <div class="min-h-screen text-ink antialiased" :class="bgClass">
    <!-- Mobile menu backdrop -->
    <Transition enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div
        v-if="menuOpen"
        class="sm:hidden fixed inset-0 bg-ink/40 z-20"
        aria-hidden="true"
        @click="closeMenu"
      ></div>
    </Transition>

    <!-- Header -->
    <header class="sticky top-0 z-30 bg-ink text-cream border-b-2 border-gold-deep/70 shadow-lg">
      <div class="max-w-6xl mx-auto px-4 pt-3 sm:pt-4 flex items-center gap-3">
        <!-- Mobile hamburger -->
        <button
          type="button"
          @click="toggleMenu"
          class="sm:hidden shrink-0 w-10 h-10 -ml-2 flex items-center justify-center rounded-md text-cream hover:bg-gold-deep/30 hover:text-gold transition"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        >
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true">
            <line x1="4" y1="6"  x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true">
            <line x1="6" y1="6"  x2="18" y2="18"/>
            <line x1="18" y1="6" x2="6"  y2="18"/>
          </svg>
        </button>

        <div class="han text-2xl sm:text-3xl font-bold text-cream leading-none select-none"
             aria-hidden="true" lang="zh-CN">
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
        <!-- Font-size control (A− / A / A+) -->
        <div
          class="shrink-0 flex items-center bg-ink/60 text-cream border border-gold-deep/60 rounded-full overflow-hidden"
          role="group"
          aria-label="Text size"
        >
          <button
            type="button"
            @click="decrease"
            :disabled="!canDecrease()"
            :aria-label="`Decrease text size (currently ${currentPx()}px)`"
            class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[14px] font-semibold tracking-tight transition hover:bg-gold-deep/30 hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cream"
          >
            A<span class="text-[10px] -ml-px" aria-hidden="true">−</span>
          </button>
          <button
            type="button"
            @click="reset"
            :aria-label="`Reset text size (currently ${currentPx()}px)`"
            class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[15px] font-semibold transition hover:bg-gold-deep/30 hover:text-gold border-x border-gold-deep/40"
          >
            A
          </button>
          <button
            type="button"
            @click="increase"
            :disabled="!canIncrease()"
            :aria-label="`Increase text size (currently ${currentPx()}px)`"
            class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[15px] font-semibold tracking-tight transition hover:bg-gold-deep/30 hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cream"
          >
            A<span class="text-[11px] -ml-px" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
      <div class="nav-fade max-w-6xl mx-auto px-4 mt-2 relative hidden sm:block">
        <nav class="flex gap-1 overflow-x-auto nice-scroll pb-1" aria-label="View">
          <NuxtLink
            v-for="t in tabs" :key="t.to" :to="t.to"
            class="relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition whitespace-nowrap"
            :class="route.path === t.to ? 'text-cream' : 'text-gold-soft hover:text-cream'"
          >
            <span class="flex items-center gap-1.5">
              <span class="han text-base" aria-hidden="true" lang="zh-CN">{{ t.han }}</span> {{ t.label }}
            </span>
            <span v-if="route.path === t.to"
              class="absolute left-2 right-2 bottom-0 h-[3px] rounded-t bg-gold"></span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Mobile slide-down nav panel -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-if="menuOpen"
          id="mobile-nav-panel"
          aria-label="Site"
          class="sm:hidden mt-2 px-2 pb-2 max-h-[calc(100vh-7rem)] overflow-y-auto nice-scroll"
        >
          <ul class="grid grid-cols-2 gap-1.5">
            <li v-for="t in tabs" :key="t.to">
              <NuxtLink
                :to="t.to"
                @click="closeMenu"
                class="flex items-center gap-2 px-3 py-3 rounded-lg border transition"
                :class="route.path === t.to
                  ? 'bg-gold/15 border-gold text-cream'
                  : 'bg-ink/40 border-gold-deep/40 text-gold-soft hover:bg-gold-deep/30 hover:text-cream'"
              >
                <span class="han text-xl shrink-0" aria-hidden="true" lang="zh-CN">{{ t.han }}</span>
                <span class="text-sm font-semibold tracking-wide uppercase">{{ t.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Transition>
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
               <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft"> </div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate"> </div>
              </div>
            </div>
            <div class="flex items-start gap-3">
                <div class="min-w-0">
                <div class="text-[10px] tracking-[0.25em] uppercase text-gold-soft"> </div>
                <div class="text-sm sm:text-base font-semibold text-cream truncate"> </div>
              </div>
            </div>
          </div>
          <div class="px-5 sm:px-8 py-3 border-t border-gold-deep/40 text-[10px] sm:text-xs text-gold-soft tracking-widest uppercase text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>Kuala Lumpur, Malaysia</span>
            <span aria-hidden="true" class="opacity-50">·</span>
            <span>
              <span class="han mr-1" aria-hidden="true" lang="zh-CN">访</span>
              Visitors:
              <span class="text-cream font-semibold normal-case tracking-normal ml-1">{{ formattedVisitors }}</span>
            </span>
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
        class="fab-fixed fab-right z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink text-cream border-2 border-gold-deep/70 shadow-lg hover:bg-gold-deep/30 hover:text-gold transition flex items-center justify-center"
      >
        <span class="han text-lg leading-none" aria-hidden="true">↑</span>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
/* Floating back-to-top — respect iOS safe area so the home-indicator
   doesn't overlap the button. */
.fab-fixed {
  position: fixed;
  bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
}
.fab-right { right: calc(1.25rem + env(safe-area-inset-right, 0px)); }
@media (min-width: 640px) {
  .fab-fixed { bottom: calc(2rem + env(safe-area-inset-bottom, 0px)); }
  .fab-right { right: calc(2rem + env(safe-area-inset-right, 0px)); }
}

/* Edge-fade hint for the horizontally-scrollable nav (mobile) */
.nav-fade::before,
.nav-fade::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 22px;
  pointer-events: none;
  z-index: 1;
}
.nav-fade::before {
  left: 0;
  background: linear-gradient(to right, rgba(26, 18, 9, 0.9), rgba(26, 18, 9, 0));
}
.nav-fade::after {
  right: 0;
  background: linear-gradient(to left, rgba(26, 18, 9, 0.9), rgba(26, 18, 9, 0));
}

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
