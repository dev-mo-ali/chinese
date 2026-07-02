<script setup>
import { useHskPage } from '~/composables/useHskPage.js'

const props = defineProps({
  topic: { type: Object, required: true },
})

useHead({ title: `${props.topic.en} · ${props.topic.han} · Topics` })

// Reuse the reading-practice toggle logic.
// "ti" is the section index, "i" is the item index within the section.
const {
  revealAll, isRevealed, toggleLine,
  vocabRevealAll, isVocabRevealed, toggleVocab,
  search,
} = useHskPage({ scrollTargetId: 'topic-detail' })

// Flat list across all sections, used for the search filter.
const allWords = computed(() => {
  if (props.topic.pairs) {
    return props.topic.pairs.flatMap((p, i) => [
      { ...p.a, _kind: 'pair', _idx: i, _side: 'a' },
      { ...p.b, _kind: 'pair', _idx: i, _side: 'b' },
    ])
  }
  return (props.topic.sections || []).flatMap((sec, si) =>
    sec.words.map((w, wi) => ({ ...w, _section: sec.title, _si: si, _wi: wi }))
  )
})

const totalWords = computed(() => allWords.value.length)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allWords.value
  return allWords.value.filter(w =>
    (w.c && w.c.includes(q)) ||
    (w.p && w.p.toLowerCase().includes(q)) ||
    (w.en && w.en.toLowerCase().includes(q))
  )
})

// Optional interactive scene illustration (SVG with hotspots).
import { sceneFor } from '~/composables/useTopicScenes.js'
const scene = computed(() => sceneFor(props.topic.slug))
const hasScene = computed(() => !!scene.value)

// View mode for sectioned topics: 'scene' | 'gallery' | 'list'.
// Persisted across the session via useState. First visit to a topic that has
// a scene auto-selects 'scene'; once the user picks something we remember it.
const viewMode = useState('topic-view-mode', () => 'gallery')
onMounted(() => {
  if (hasScene.value && !sessionStorage.getItem('topic-view-mode-touched')) {
    viewMode.value = 'scene'
  }
})
const setView = (m) => {
  viewMode.value = m
  if (import.meta.client) sessionStorage.setItem('topic-view-mode-touched', '1')
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">

    <!-- HERO -->
    <article
      class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card
             grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8
             p-5 sm:p-8 mb-6"
    >
      <div
        class="ribbon hidden sm:flex items-center justify-center text-gold-soft text-[10px] tracking-[0.4em] uppercase"
        aria-hidden="true"
      >Topic · 主题</div>

      <div class="flex items-center justify-center">
        <div class="brush leading-none select-none"
             aria-hidden="true" lang="zh-CN"
             :style="{ fontSize: 'clamp(110px, 20vw, 200px)', color: topic.accent }">
          {{ topic.icon }}
        </div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">
          {{ topic.pinyin }}
        </div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-1" lang="zh-CN">
          {{ topic.han }}
        </h1>
        <div class="text-base sm:text-lg font-semibold text-ink-soft mb-3">{{ topic.en }}</div>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">{{ topic.intro }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ totalWords }} {{ topic.pairs ? 'pair-words' : 'words' }}
          </span>
          <span v-if="topic.sections" class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ topic.sections.length }} sections
          </span>
          <span v-if="topic.pairs" class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ topic.pairs.length }} pairs
          </span>
        </div>
      </div>

      <div class="seal hidden sm:flex" aria-hidden="true">
        <span class="han" lang="zh-CN">主题</span>
      </div>
    </article>

    <!-- TOOLBAR -->
    <div id="topic-detail" class="flex items-center justify-between flex-wrap gap-3 mb-4">
      <div class="text-[10px] font-semibold tracking-widest uppercase text-ink/60">
        {{ topic.pairs ? 'Pairs · 反义词' : 'Vocabulary · 词汇' }}
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <input
          v-model="search"
          type="search"
          :placeholder="`Search ${topic.en.toLowerCase()}…`"
          class="px-3 py-1.5 rounded-md border border-gold-deep/40 bg-paper text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold w-44 sm:w-56"
        />
        <!-- View mode toggle (only for sectioned topics) -->
        <div v-if="!topic.pairs" class="inline-flex rounded-md border border-gold-deep/40 overflow-hidden" role="group" aria-label="View mode">
          <button
            v-if="hasScene"
            type="button"
            @click="setView('scene')"
            class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition"
            :class="viewMode === 'scene' ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-gold/10'"
            :aria-pressed="viewMode === 'scene'"
          >Scene</button>
          <button
            type="button"
            @click="setView('gallery')"
            class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition"
            :class="[viewMode === 'gallery' ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-gold/10', hasScene ? 'border-l border-gold-deep/40' : '']"
            :aria-pressed="viewMode === 'gallery'"
          >Gallery</button>
          <button
            type="button"
            @click="setView('list')"
            class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition border-l border-gold-deep/40"
            :class="viewMode === 'list' ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-gold/10'"
            :aria-pressed="viewMode === 'list'"
          >List</button>
        </div>
        <button
          v-if="!topic.pairs"
          type="button"
          @click="vocabRevealAll = !vocabRevealAll"
          class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border transition"
          :class="vocabRevealAll ? 'bg-ink text-paper border-ink' : 'bg-paper text-ink border-gold-deep/40 hover:border-ink'"
        >{{ vocabRevealAll ? 'Hide all' : 'Reveal all' }}</button>
        <button
          v-if="topic.pairs"
          type="button"
          @click="revealAll = !revealAll"
          class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border transition"
          :class="revealAll ? 'bg-ink text-paper border-ink' : 'bg-paper text-ink border-gold-deep/40 hover:border-ink'"
        >{{ revealAll ? 'Hide all' : 'Reveal all' }}</button>
      </div>
    </div>

    <!-- PAIRS LAYOUT (opposites) -->
    <div v-if="topic.pairs" class="grid sm:grid-cols-2 gap-3">
      <button
        v-for="(pair, i) in topic.pairs" :key="i"
        type="button"
        @click="toggleLine(0, i)"
        class="group rounded-2xl bg-paper border border-gold-deep/25 shadow-chip hover:shadow-card hover:-translate-y-0.5 transition text-left p-4 sm:p-5"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0 flex items-center gap-3">
            <div class="visual-circle shrink-0" aria-hidden="true">
              <img v-if="pair.a.img" :src="pair.a.img" alt="" class="w-full h-full object-cover" loading="lazy" />
              <span v-else-if="pair.a.e" class="text-2xl sm:text-3xl leading-none">{{ pair.a.e }}</span>
            </div>
            <div class="min-w-0">
              <div class="han text-2xl sm:text-3xl font-bold text-ink leading-none mb-1" lang="zh-CN">{{ pair.a.c }}</div>
              <div class="text-xs tracking-wide text-gold-deep" :class="{ 'opacity-0 group-hover:opacity-100 transition': !isRevealed(0, i) }">
                {{ pair.a.p }}
              </div>
              <div class="text-sm text-ink-soft mt-0.5" :class="{ 'opacity-0 group-hover:opacity-100 transition': !isRevealed(0, i) }">
                {{ pair.a.en }}
              </div>
            </div>
          </div>

          <div class="shrink-0 text-2xl sm:text-3xl font-light text-gold-deep px-1" aria-hidden="true">⇄</div>

          <div class="flex-1 min-w-0 flex items-center gap-3 justify-end text-right">
            <div class="min-w-0">
              <div class="han text-2xl sm:text-3xl font-bold text-ink leading-none mb-1" lang="zh-CN">{{ pair.b.c }}</div>
              <div class="text-xs tracking-wide text-gold-deep" :class="{ 'opacity-0 group-hover:opacity-100 transition': !isRevealed(0, i) }">
                {{ pair.b.p }}
              </div>
              <div class="text-sm text-ink-soft mt-0.5" :class="{ 'opacity-0 group-hover:opacity-100 transition': !isRevealed(0, i) }">
                {{ pair.b.en }}
              </div>
            </div>
            <div class="visual-circle shrink-0" aria-hidden="true">
              <img v-if="pair.b.img" :src="pair.b.img" alt="" class="w-full h-full object-cover" loading="lazy" />
              <span v-else-if="pair.b.e" class="text-2xl sm:text-3xl leading-none">{{ pair.b.e }}</span>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- SCENE LAYOUT (interactive SVG illustration) -->
    <TopicScene
      v-else-if="hasScene && viewMode === 'scene'"
      :scene="scene"
      :accent="topic.accent"
    />

    <!-- SECTIONED LAYOUT -->
    <div v-else class="space-y-6">
      <section
        v-for="(sec, si) in topic.sections" :key="si"
        class="rounded-2xl bg-paper border border-gold-deep/25 shadow-chip overflow-hidden"
      >
        <header class="px-5 py-3 border-b border-gold-deep/20 bg-gold/5 flex items-center justify-between gap-3">
          <h2 class="han text-base sm:text-lg font-bold text-ink" lang="zh-CN">{{ sec.title }}</h2>
          <span class="text-[10px] font-mono text-ink/40">{{ sec.words.length }}</span>
        </header>

        <!-- GALLERY MODE: tap-to-reveal flashcards with image/emoji visual -->
        <div v-if="viewMode === 'gallery'" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          <button
            v-for="(w, wi) in sec.words" :key="wi"
            type="button"
            @click="toggleVocab(`${si}-${wi}`)"
            class="group relative rounded-xl border border-gold-deep/25 bg-cream/60 hover:border-ink/40 hover:shadow-card transition text-left overflow-hidden flex flex-col"
            :aria-pressed="isVocabRevealed(`${si}-${wi}`) || vocabRevealAll"
          >
            <div class="aspect-square w-full flex items-center justify-center bg-paper border-b border-gold-deep/15">
              <img v-if="w.img" :src="w.img" :alt="w.en" class="w-full h-full object-cover" loading="lazy" />
              <span v-else-if="w.e" class="text-5xl sm:text-6xl leading-none select-none" aria-hidden="true">{{ w.e }}</span>
              <span v-else class="han text-5xl sm:text-6xl text-gold-deep/40 font-bold" aria-hidden="true" lang="zh-CN">{{ w.c }}</span>
            </div>
            <div class="p-2.5 text-center">
              <div class="han text-xl sm:text-2xl font-bold text-ink leading-tight" lang="zh-CN">{{ w.c }}</div>
              <div
                class="text-[11px] tracking-wide text-gold-deep mt-0.5 transition"
                :class="{ 'opacity-0': !isVocabRevealed(`${si}-${wi}`) && !vocabRevealAll }"
              >{{ w.p }}</div>
              <div
                class="text-xs text-ink-soft leading-snug mt-0.5 transition"
                :class="{ 'opacity-0': !isVocabRevealed(`${si}-${wi}`) && !vocabRevealAll }"
              >{{ w.en }}</div>
            </div>
          </button>
        </div>

        <!-- LIST MODE: dense rows with leading visual -->
        <ul v-else class="divide-y divide-gold-deep/10">
          <li
            v-for="(w, wi) in sec.words" :key="wi"
            class="grid grid-cols-[44px_1fr_auto] sm:grid-cols-[44px_140px_1fr_1fr_auto] items-center gap-3 px-4 sm:px-5 py-3 hover:bg-gold/5 transition"
          >
            <div class="visual-circle visual-circle--sm" aria-hidden="true">
              <img v-if="w.img" :src="w.img" alt="" class="w-full h-full object-cover" loading="lazy" />
              <span v-else-if="w.e" class="text-xl leading-none">{{ w.e }}</span>
            </div>

            <div class="han text-xl sm:text-2xl font-bold text-ink leading-none" lang="zh-CN">{{ w.c }}</div>

            <div
              class="text-sm tracking-wide text-gold-deep order-4 sm:order-none col-span-3 sm:col-span-1"
              :class="{ 'opacity-0': !isVocabRevealed(`${si}-${wi}`) && !vocabRevealAll }"
            >{{ w.p }}</div>

            <div
              class="text-sm text-ink-soft order-5 sm:order-none col-span-3 sm:col-span-1"
              :class="{ 'opacity-0': !isVocabRevealed(`${si}-${wi}`) && !vocabRevealAll }"
            >{{ w.en }}</div>

            <button
              type="button"
              @click.stop="toggleVocab(`${si}-${wi}`)"
              class="justify-self-end text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border border-gold-deep/30 text-ink/60 hover:border-ink hover:text-ink transition"
              :aria-pressed="isVocabRevealed(`${si}-${wi}`) || vocabRevealAll"
            >{{ (isVocabRevealed(`${si}-${wi}`) || vocabRevealAll) ? 'Hide' : 'Show' }}</button>
          </li>
        </ul>
      </section>
    </div>

    <!-- SEARCH RESULTS (only when actively searching) -->
    <section v-if="search.trim()" class="mt-8 rounded-2xl bg-paper border border-gold-deep/25 shadow-chip overflow-hidden">
      <header class="px-5 py-3 border-b border-gold-deep/20 bg-gold/5">
        <h2 class="text-sm font-semibold text-ink">Search results · {{ filtered.length }}</h2>
      </header>
      <ul class="divide-y divide-gold-deep/10">
        <li v-for="(w, i) in filtered" :key="i" class="px-4 sm:px-5 py-3 grid grid-cols-[36px_auto_1fr_1fr] gap-3 items-center">
          <div class="visual-circle visual-circle--sm" aria-hidden="true">
            <img v-if="w.img" :src="w.img" alt="" class="w-full h-full object-cover" loading="lazy" />
            <span v-else-if="w.e" class="text-lg leading-none">{{ w.e }}</span>
          </div>
          <div class="han text-lg font-bold text-ink" lang="zh-CN">{{ w.c }}</div>
          <div class="text-sm text-gold-deep">{{ w.p }}</div>
          <div class="text-sm text-ink-soft">{{ w.en }}</div>
        </li>
        <li v-if="!filtered.length" class="px-4 py-6 text-center text-sm text-ink/50">No matches.</li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
/* Visual circles used as a fallback when no real image is present.
   They render an emoji centered on the cream background. */
.visual-circle {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: rgb(var(--cream-rgb, 250 244 230) / 0.7);
  border: 1px solid rgb(0 0 0 / 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.visual-circle--sm { width: 36px; height: 36px; }
.visual-circle img { display: block; }
</style>
