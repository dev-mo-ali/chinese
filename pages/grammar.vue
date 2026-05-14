<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'

useHead({ title: 'Grammar · HSK 1 · 2 · 3' })

// ─── Level palette ─────────────────────────────────────────────────────────
const LEVELS = [
  {
    id: 1,
    han: '一',
    label: 'HSK 1',
    lessons: HSK1_LESSONS,
    accent: '#b45309',
    accentSoft: '#fef3c7',
    accentBg: 'linear-gradient(135deg,#fffbeb,#fef3c7)',
    accentBorder: 'rgba(180,83,9,.35)',
    chipBg: 'linear-gradient(135deg,#7c5a1e,#b45309)',
    panelBg: 'linear-gradient(180deg,#fffdf6,#ffffff)',
  },
  {
    id: 2,
    han: '二',
    label: 'HSK 2',
    lessons: HSK2_LESSONS,
    accent: '#9b2226',
    accentSoft: '#fee2e2',
    accentBg: 'linear-gradient(135deg,#fff7ed,#fee2e2)',
    accentBorder: 'rgba(155,34,38,.3)',
    chipBg: 'linear-gradient(135deg,#9b2226,#dc2626)',
    panelBg: 'linear-gradient(180deg,#fff7f5,#ffffff)',
  },
  {
    id: 3,
    han: '三',
    label: 'HSK 3',
    lessons: HSK3_LESSONS,
    accent: '#1d4ed8',
    accentSoft: '#dbeafe',
    accentBg: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
    accentBorder: 'rgba(29,78,216,.3)',
    chipBg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
    panelBg: 'linear-gradient(180deg,#f5f9ff,#ffffff)',
  },
]

// ─── Flatten all notes with level + lesson context ─────────────────────────
const allEntries = computed(() => {
  const out = []
  for (const lvl of LEVELS) {
    for (const lesson of lvl.lessons) {
      if (!lesson.notes || !lesson.notes.length) continue
      for (const note of lesson.notes) {
        out.push({
          level: lvl,
          lesson,
          note,
          key: `${lvl.id}-${lesson.no}-${note.title}`,
        })
      }
    }
  }
  return out
})

// ─── Filtering ─────────────────────────────────────────────────────────────
const activeLevels = reactive({ 1: true, 2: true, 3: true })
const toggleLevel = (id) => { activeLevels[id] = !activeLevels[id] }

const search = ref('')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return allEntries.value.filter(e => {
    if (!activeLevels[e.level.id]) return false
    if (!q) return true
    const hay = [
      e.note.title,
      e.note.summary,
      ...(e.note.examples || []).flatMap(x => [x.c, x.p, x.en]),
      e.lesson.han, e.lesson.pinyin, e.lesson.en,
    ].join(' ').toLowerCase()
    return hay.includes(q)
  })
})

// Group filtered entries by level → lessons
const grouped = computed(() => {
  const map = new Map()
  for (const e of filtered.value) {
    if (!map.has(e.level.id)) map.set(e.level.id, { level: e.level, lessons: new Map() })
    const g = map.get(e.level.id)
    if (!g.lessons.has(e.lesson.no)) g.lessons.set(e.lesson.no, { lesson: e.lesson, notes: [] })
    g.lessons.get(e.lesson.no).notes.push(e.note)
  }
  return [...map.values()].map(g => ({
    ...g,
    lessons: [...g.lessons.values()],
  }))
})

// Counts
const counts = computed(() => {
  const c = { 1: 0, 2: 0, 3: 0 }
  for (const e of allEntries.value) c[e.level.id]++
  return c
})
const totalNotes = computed(() => allEntries.value.length)
const visibleCount = computed(() => filtered.value.length)

// Per-level fold state
const openLevels = reactive({ 1: true, 2: true, 3: true })
const toggleOpen = (id) => { openLevels[id] = !openLevels[id] }
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">

    <!-- HERO -->
    <article
      class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card
             grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8
             p-5 sm:p-8 mb-6"
    >
      <div class="ribbon hidden sm:flex items-center justify-center text-gold-soft text-[10px] tracking-[0.4em] uppercase">
        Grammar · 语法
      </div>

      <div class="flex items-center justify-center">
        <div class="brush leading-none select-none"
             style="font-size: clamp(110px, 20vw, 200px); color:#7c5a1e;" lang="zh-CN">
          语
        </div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">Grammar Compendium</div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3">All Grammar Notes · HSK 1 · 2 · 3</h1>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">
          Every grammar point from the HSK Standard Course series, gathered in one place.
          Filter by level, search by character, pinyin, or English, and follow the link back to
          the original lesson for context, dialogues and vocabulary.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ totalNotes }} grammar notes
          </span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            HSK 1 · {{ counts[1] }}
          </span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            HSK 2 · {{ counts[2] }}
          </span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            HSK 3 · {{ counts[3] }}
          </span>
        </div>
      </div>

      <div class="seal hidden sm:flex">
        <span class="han">语</span>
        <span class="han">法</span>
      </div>
    </article>

    <!-- CONTROLS -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-6"
             style="background:#fff; border-color:rgba(124,90,30,.22);"
    >
      <div class="px-5 sm:px-7 py-4 flex flex-wrap items-center gap-3"
           style="background: linear-gradient(135deg,#fdfaf2,#fff8e0);">
        <div class="flex items-center gap-2">
          <button
            v-for="lvl in LEVELS" :key="lvl.id"
            type="button"
            @click="toggleLevel(lvl.id)"
            class="level-chip"
            :class="{ 'is-on': activeLevels[lvl.id] }"
            :style="activeLevels[lvl.id]
              ? { background: lvl.chipBg, borderColor: lvl.accent, color:'#fff' }
              : { background:'#fff', borderColor: lvl.accentBorder, color: lvl.accent }"
          >
            <span class="han text-base leading-none" lang="zh-CN">{{ lvl.han }}</span>
            <span>{{ lvl.label }}</span>
            <span class="ml-1 text-[10px] opacity-80 font-mono">{{ counts[lvl.id] }}</span>
          </button>
        </div>

        <div class="ml-auto flex items-center gap-2 w-full sm:w-auto">
          <label class="relative flex-1 sm:w-72">
            <span class="sr-only">Search grammar</span>
            <input
              v-model="search"
              type="search"
              placeholder="Search · 比 · particle · complement…"
              class="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-gold-deep/30 bg-white/80
                     focus:outline-none focus:ring-2 focus:ring-gold-deep/40"
            />
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 text-sm" aria-hidden="true">🔍</span>
          </label>
          <span class="text-[11px] text-ink/60 font-mono whitespace-nowrap">
            {{ visibleCount }} / {{ totalNotes }}
          </span>
        </div>
      </div>
    </article>

    <!-- LEVEL SECTIONS -->
    <article v-for="group in grouped" :key="group.level.id"
             class="rounded-3xl shadow-card overflow-hidden border mb-8"
             :style="{ background:'#fff', borderColor: group.level.accentBorder }"
    >
      <header @click="toggleOpen(group.level.id)"
              :aria-expanded="openLevels[group.level.id]"
              class="fold-head flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b cursor-pointer select-none"
              :style="{ background: group.level.accentBg, borderColor: group.level.accentBorder }"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              :style="{ background: group.level.chipBg }" lang="zh-CN">{{ group.level.han }}</span>
        <div>
          <div class="text-[10px] tracking-[0.3em] uppercase font-semibold" :style="{ color: group.level.accent }">
            {{ group.level.label }} · Grammar
          </div>
          <div class="text-sm sm:text-base font-bold text-ink">
            {{ group.lessons.reduce((s,l) => s + l.notes.length, 0) }} notes · {{ group.lessons.length }} lessons
          </div>
        </div>
        <span class="fold-caret text-xl leading-none ml-auto"
              :style="{ color: group.level.accent }"
              :class="{ 'is-open': openLevels[group.level.id] }">▸</span>
      </header>

      <div v-show="openLevels[group.level.id]" class="p-4 sm:p-6 space-y-6"
           :style="{ background: group.level.panelBg }"
      >
        <section v-for="ls in group.lessons" :key="ls.lesson.no">
          <!-- Lesson header -->
          <div class="flex items-center gap-3 mb-3">
            <span class="inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-md
                         text-xs font-bold font-mono"
                  :style="{ background:'#fff', border:`1px solid ${group.level.accentBorder}`, color: group.level.accent }">
              L{{ ls.lesson.no }}
            </span>
            <div class="min-w-0">
              <div class="han text-base sm:text-lg font-bold text-ink truncate" lang="zh-CN">{{ ls.lesson.han }}</div>
              <div class="text-[11px] text-ink/60 italic truncate">{{ ls.lesson.pinyin }} · {{ ls.lesson.en }}</div>
            </div>
            <NuxtLink
              :to="`/hsk${group.level.id}`"
              class="ml-auto text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded
                     hover:underline"
              :style="{ color: group.level.accent }"
            >Open lesson →</NuxtLink>
          </div>

          <!-- Notes grid -->
          <div class="grid md:grid-cols-2 gap-4">
            <article v-for="(note, ni) in ls.notes" :key="ni"
                     class="note-card rounded-2xl border p-4 sm:p-5"
                     :style="{ background:'#fff', borderColor: group.level.accentBorder }"
            >
              <div class="flex items-start gap-2 mb-2">
                <span class="shrink-0 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      :style="{ background: group.level.accentSoft, color: group.level.accent }">
                  {{ group.level.label }} · L{{ ls.lesson.no }}
                </span>
              </div>
              <h3 class="han text-base sm:text-lg font-bold text-ink leading-snug mb-1.5" lang="zh-CN">
                {{ note.title }}
              </h3>
              <p v-if="note.summary" class="text-sm text-ink-soft leading-relaxed mb-3">
                {{ note.summary }}
              </p>
              <ul v-if="note.examples && note.examples.length"
                  class="space-y-2 pt-2 border-t"
                  :style="{ borderColor: group.level.accentBorder }"
              >
                <li v-for="(ex, ei) in note.examples" :key="ei"
                    class="text-sm leading-snug"
                >
                  <div class="han text-ink font-semibold" lang="zh-CN">{{ ex.c }}</div>
                  <div class="text-[12px] italic" :style="{ color: group.level.accent }">{{ ex.p }}</div>
                  <div class="text-[12px] text-ink-soft">{{ ex.en }}</div>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <p v-if="!group.lessons.length"
           class="text-center text-sm text-ink/40 italic py-6">
          No grammar notes match the current filter.
        </p>
      </div>
    </article>

    <p v-if="!grouped.length" class="text-center py-10 text-sm text-ink/50 italic">
      No grammar notes match your search.
    </p>

    <p class="mt-6 text-center text-xs text-ink-soft/70 italic">
      Compiled from <span class="font-semibold">HSK 标准教程</span> Books 1 – 3 · Confucius Institute Headquarters
    </p>

  </section>
</template>

<style scoped>
.fold-head { transition: background-color .2s ease; }
.fold-head:hover { filter: brightness(0.98); }
.fold-caret { display: inline-block; transition: transform .2s ease; }
.fold-caret.is-open { transform: rotate(90deg); }

.level-chip {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .35rem .85rem;
  border-radius: 9999px;
  border: 1.5px solid;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
  cursor: pointer;
}
.level-chip:hover { transform: translateY(-1px); }
.level-chip.is-on { box-shadow: 0 6px 14px -6px rgba(0,0,0,.25); }

.note-card {
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
}
.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(15, 23, 42, .25);
}
</style>
