<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'
import { allRadicals, CAT_COLORS } from '~/composables/useRadicals.js'
import { STROKE_GROUPS } from '~/composables/useStrokes.js'

useHead({
  title: '书写 · Practice Writing Chinese',
  script: [
    { src: 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7/dist/hanzi-writer.min.js', defer: true }
  ],
})

// ─── Build per-lesson character pool ──────────────────────────────────────
// Hanzi Writer ships data for individual characters, so we split multi-char
// vocab entries into their constituent characters.
const HAN_RE = /[\u4e00-\u9fff]/

const buildLessons = (lessons, level) => (lessons || []).map(l => {
  const seen = new Set()
  const chars = []
  for (const v of (l.vocab || [])) {
    if (!v?.c) continue
    for (const ch of [...v.c]) {
      if (!HAN_RE.test(ch)) continue
      if (seen.has(ch)) continue
      seen.add(ch)
      chars.push({
        c: ch,
        word: v.c,
        p: v.p || '',
        en: String(v.en || '').split(/[·;,/]/)[0].trim(),
      })
    }
  }
  return { no: l.no, han: l.han, en: l.en, level, chars }
}).filter(l => l.chars.length > 0)

const LESSONS = {
  1: buildLessons(HSK1_LESSONS, 1),
  2: buildLessons(HSK2_LESSONS, 2),
  3: buildLessons(HSK3_LESSONS, 3),
}

const dedupeChars = (arr) => {
  const seen = new Set(); const out = []
  for (const x of arr) { if (!seen.has(x.c)) { seen.add(x.c); out.push(x) } }
  return out
}

const POOL = {
  1: dedupeChars(LESSONS[1].flatMap(l => l.chars)),
  2: dedupeChars(LESSONS[2].flatMap(l => l.chars)),
  3: dedupeChars(LESSONS[3].flatMap(l => l.chars)),
}

// ─── State ────────────────────────────────────────────────────────────────
const level   = ref(1)         // 1 | 2 | 3
const lesson  = ref('all')     // 'all' | <lesson no>
const idx     = ref(0)
const showOutline   = ref(true)
const showCharacter = ref(false)  // hides the gray reference glyph
const quizFeedback  = ref(null)   // { ok, msg }
const quizStats     = reactive({ mistakes: 0, hint: 0, done: false })

const availableLessons = computed(() => LESSONS[level.value] || [])

const chars = computed(() => {
  const pool = POOL[level.value] || []
  if (lesson.value === 'all') return pool
  const found = (LESSONS[level.value] || []).find(l => l.no === lesson.value)
  return found ? found.chars : []
})

const current = computed(() => chars.value[idx.value] || null)

// ─── Radical lookup ───────────────────────────────────────────────────────
// 1) If the character IS a radical (or its variant form) → use it directly.
// 2) Otherwise, look for it in any radical's example list.
const radicalFor = (ch) => {
  if (!ch) return null
  const direct = allRadicals.find(r => r.char === ch || r.form === ch)
  if (direct) return { rad: direct, role: 'is-radical' }
  const containing = allRadicals.find(r => (r.ex || []).some(e => e.char === ch))
  if (containing) return { rad: containing, role: 'contains' }
  return null
}

const radicalInfo = computed(() => current.value ? radicalFor(current.value.c) : null)

// ─── Stroke lookup ────────────────────────────────────────────────────────
// Find which canonical Chinese strokes appear in this character (via the
// STROKE_GROUPS example lists), and capture the total stroke count from the
// Hanzi Writer data file.
const strokeCount = ref(0)

const strokeMatches = computed(() => {
  if (!current.value) return []
  const ch = current.value.c
  const out = []
  for (const g of STROKE_GROUPS) {
    for (const it of g.items) {
      if ((it.ex || []).includes(ch)) {
        out.push({ group: g, item: it })
      }
    }
  }
  return out
})

const STROKE_RULES = [
  { zh: '先横后竖', en: 'Horizontal before vertical' },
  { zh: '先撇后捺', en: 'Left-falling before right-falling' },
  { zh: '从上到下', en: 'Top to bottom' },
  { zh: '从左到右', en: 'Left to right' },
  { zh: '先外后内', en: 'Outside before inside' },
  { zh: '先里头后封口', en: 'Inside before closing the box' },
  { zh: '先中间后两边', en: 'Middle before the two sides' },
]

// ─── Hanzi Writer integration ─────────────────────────────────────────────
const targetEl = ref(null)
let writer = null

const SIZE = 280

const ensureWriter = () => new Promise((resolve, reject) => {
  if (typeof window === 'undefined') return reject(new Error('SSR'))
  if (window.HanziWriter) return resolve(window.HanziWriter)
  let n = 0
  const t = setInterval(() => {
    if (window.HanziWriter) { clearInterval(t); resolve(window.HanziWriter) }
    else if (++n > 50) { clearInterval(t); reject(new Error('HanziWriter failed to load')) }
  }, 100)
})

const buildWriter = async () => {
  if (!current.value || !targetEl.value) return
  try {
    const HW = await ensureWriter()
    targetEl.value.innerHTML = ''
    quizFeedback.value = null
    quizStats.mistakes = 0
    quizStats.hint = 0
    quizStats.done = false
    writer = HW.create(targetEl.value, current.value.c, {
      width: SIZE,
      height: SIZE,
      padding: 8,
      showOutline: showOutline.value,
      showCharacter: showCharacter.value,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 120,
      strokeColor: '#1a1209',
      outlineColor: '#cbb676',
      radicalColor: '#9b2226',
      drawingColor: '#1a1209',
      drawingWidth: 28,
      charDataLoader: (charToLoad, onComplete, onErr) => {
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(charToLoad)}.json`)
          .then(r => { if (!r.ok) throw new Error('No data'); return r.json() })
          .then(data => { strokeCount.value = data?.strokes?.length || 0; onComplete(data) })
          .catch((e) => onErr ? onErr(e) : onComplete(null))
      },
    })
  } catch (e) {
    console.warn('HanziWriter error:', e)
  }
}

const animate = () => writer && writer.animateCharacter()
const showAll = () => writer && writer.showCharacter()
const hideAll = () => writer && writer.hideCharacter()

const startQuiz = () => {
  if (!writer) return
  quizFeedback.value = null
  quizStats.mistakes = 0
  quizStats.hint = 0
  quizStats.done = false
  writer.hideCharacter()
  writer.quiz({
    onMistake: (info) => {
      quizStats.mistakes = info.totalMistakes
      quizFeedback.value = { ok: false, msg: `Try again — stroke ${info.strokeNum + 1}` }
    },
    onCorrectStroke: () => {
      quizFeedback.value = { ok: true, msg: 'Good!' }
    },
    onComplete: (info) => {
      quizStats.done = true
      quizStats.mistakes = info.totalMistakes
      quizFeedback.value = { ok: true, msg: `Done! ${info.totalMistakes} mistake${info.totalMistakes === 1 ? '' : 's'}.` }
    },
  })
}

const giveHint = () => {
  if (writer && writer.highlightStroke) {
    quizStats.hint++
    // highlight up to current expected stroke count
    writer.highlightStroke(quizStats.mistakes >= 0 ? quizStats.hint : 0, { strokeColor: '#c8a84b' })
  }
}

const next = () => { if (chars.value.length) idx.value = (idx.value + 1) % chars.value.length }
const prev = () => { if (chars.value.length) idx.value = (idx.value - 1 + chars.value.length) % chars.value.length }
const random = () => { if (chars.value.length) idx.value = Math.floor(Math.random() * chars.value.length) }

// ─── Reactivity ───────────────────────────────────────────────────────────
watch(level, () => { lesson.value = 'all'; idx.value = 0 })
watch(lesson, () => { idx.value = 0 })
watch([current, showOutline, showCharacter], () => buildWriter(), { flush: 'post' })

onMounted(() => buildWriter())
onBeforeUnmount(() => { if (targetEl.value) targetEl.value.innerHTML = '' })

// Keyboard
const onKey = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key.toLowerCase() === 'a') animate()
  else if (e.key.toLowerCase() === 'q') startQuiz()
  else if (e.key.toLowerCase() === 'r') random()
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">

    <!-- Filters -->
    <div class="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
      <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50 mr-1">Level</span>
      <div class="flex gap-1.5">
        <button v-for="lv in [1,2,3]" :key="lv" @click="level = lv"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                :class="level === lv
                        ? 'bg-gold-deep text-cream border-gold-deep shadow-chip'
                        : 'bg-white text-ink/70 border-ink/15 hover:border-gold'">
          HSK {{ lv }}
        </button>
      </div>

      <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50 ml-1">Lesson</span>
      <div class="flex items-center gap-1.5 flex-wrap">
        <button @click="lesson = 'all'"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                :class="lesson === 'all'
                        ? 'bg-ink text-cream border-ink shadow-chip'
                        : 'bg-white text-ink/70 border-ink/15 hover:border-ink/30'">
          All
        </button>
        <select v-model="lesson"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border border-ink/15 bg-white text-ink/80
                       hover:border-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition max-w-[260px] truncate">
          <option value="all">— Pick a lesson —</option>
          <option v-for="l in availableLessons" :key="l.no" :value="l.no">
            L{{ l.no }} · {{ l.han }} ({{ l.en }}) — {{ l.chars.length }}
          </option>
        </select>
      </div>

      <span class="ml-auto text-[11px] font-mono text-ink/50">
        {{ chars.length ? `${idx + 1} / ${chars.length}` : '—' }}
      </span>
    </div>

    <!-- How to play -->
    <details class="mb-4 rounded-2xl bg-cream/60 border border-gold-deep/20 px-4 py-3 text-sm text-ink/80">
      <summary class="cursor-pointer font-semibold tracking-wide uppercase text-[11px] text-ink/60 hover:text-ink select-none">
        ❓ How to use this page
      </summary>
      <ol class="mt-3 space-y-2 leading-relaxed">
        <li><b>1.</b> Pick a level and a lesson above to focus on its characters.</li>
        <li><b>2.</b> Click <b>Animate</b> (or press <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">A</kbd>) to watch the stroke order.</li>
        <li><b>3.</b> Click <b>Practice</b> (or <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">Q</kbd>) and draw the strokes in order — wrong strokes flash red.</li>
        <li><b>4.</b> Use <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">←</kbd> / <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">→</kbd> to switch characters, <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">R</kbd> for random.</li>
      </ol>
    </details>

    <!-- Empty state -->
    <div v-if="!current" class="rounded-3xl bg-white border border-ink/10 p-10 text-center text-ink/50 shadow-card">
      <div class="text-5xl mb-3">∅</div>
      <p>No characters in this selection.</p>
    </div>

    <!-- Practice card -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-5 sm:gap-7">

      <!-- Canvas -->
      <div class="rounded-3xl bg-white border-2 border-gold/40 shadow-card p-4 sm:p-6 flex flex-col items-center">
        <div class="rounded-2xl mi-grid-strong p-2 sm:p-3"
             :style="{ width: `${SIZE + 24}px`, height: `${SIZE + 24}px` }">
          <div ref="targetEl" :style="{ width: `${SIZE}px`, height: `${SIZE}px` }"></div>
        </div>

        <!-- Quiz feedback -->
        <div v-if="quizFeedback" class="mt-3 text-xs sm:text-sm font-semibold tracking-wide"
             :class="quizFeedback.ok ? 'text-emerald-700' : 'text-rose-600'">
          {{ quizFeedback.msg }}
        </div>
        <div v-if="quizStats.mistakes || quizStats.hint" class="mt-1 text-[11px] text-ink/50 font-mono">
          Mistakes: {{ quizStats.mistakes }} · Hints: {{ quizStats.hint }}
        </div>

        <!-- Action buttons -->
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button @click="animate"
                  class="px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-ink text-cream hover:bg-gold-deep transition shadow-chip">
            ▶ Animate
          </button>
          <button @click="startQuiz"
                  class="px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gold-deep text-cream hover:bg-ink transition shadow-chip">
            ✎ Practice
          </button>
          <button @click="showAll"
                  class="px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-ink border border-ink/15 hover:border-ink/30 transition">
            Reveal
          </button>
          <button @click="hideAll"
                  class="px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-ink border border-ink/15 hover:border-ink/30 transition">
            Hide
          </button>
        </div>

        <!-- Toggles -->
        <div class="mt-3 flex flex-wrap justify-center gap-3 text-[11px] text-ink/60">
          <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input type="checkbox" v-model="showOutline" class="accent-gold-deep" />
            Show outline
          </label>
          <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <input type="checkbox" v-model="showCharacter" class="accent-gold-deep" />
            Show character
          </label>
        </div>
      </div>

      <!-- Info panel -->
      <div class="rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-7 flex flex-col">
        <div class="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-1">Character</div>
        <div class="flex items-baseline gap-3 flex-wrap">
          <div class="han text-6xl sm:text-7xl font-bold text-ink leading-none">{{ current.c }}</div>
          <div class="text-2xl sm:text-3xl font-semibold text-gold-deep">{{ current.p }}</div>
        </div>
        <div class="mt-2 text-base sm:text-lg text-ink/80">{{ current.en }}</div>

        <div v-if="current.word !== current.c" class="mt-4 text-sm text-ink/60">
          <span class="text-[10px] tracking-widest uppercase text-ink/40 mr-1">In word:</span>
          <span class="han text-xl text-ink font-semibold">{{ current.word }}</span>
        </div>

        <div class="my-5 h-px bg-ink/10"></div>

        <!-- Navigation -->
        <div class="flex flex-wrap gap-2">
          <button @click="prev"
                  class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-ink/30 transition">
            ← Prev
          </button>
          <button @click="next"
                  class="px-4 py-2 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-gold-deep transition shadow-chip">
            Next →
          </button>
          <button @click="random"
                  class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-ink/30 transition">
            🎲 Random
          </button>
        </div>

        <p class="mt-auto pt-5 text-[11px] text-ink/40 italic">
          Stroke data from
          <a href="https://github.com/chanind/hanzi-writer-data" target="_blank" rel="noopener" class="underline hover:text-ink">hanzi-writer-data</a>.
        </p>
      </div>
    </div>

    <!-- Radical tip ───────────────────────────────────────────────────── -->
    <div v-if="current && radicalInfo"
         class="mt-5 sm:mt-7 rounded-3xl bg-cream/70 border border-gold-deep/25 shadow-card p-5 sm:p-6">
      <div class="flex items-start gap-4 sm:gap-5">
        <!-- Radical glyph -->
        <div class="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 flex items-center justify-center"
             :style="{ borderColor: (CAT_COLORS[radicalInfo.rad.cat] || '#9b2226') }">
          <span class="han text-5xl sm:text-6xl font-bold"
                :style="{ color: (CAT_COLORS[radicalInfo.rad.cat] || '#9b2226') }">
            {{ radicalInfo.rad.form || radicalInfo.rad.char }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50">Radical Tip</span>
            <span v-if="radicalInfo.role === 'is-radical'"
                  class="text-[10px] px-2 py-0.5 rounded-full bg-gold-deep text-cream font-semibold tracking-wide">
              This character IS a radical
            </span>
            <span v-else
                  class="text-[10px] px-2 py-0.5 rounded-full bg-ink/10 text-ink/70 font-semibold tracking-wide">
              Contains this radical
            </span>
          </div>

          <div class="mt-1 flex items-baseline flex-wrap gap-x-3 gap-y-0.5">
            <span class="han text-2xl sm:text-3xl font-bold text-ink">
              {{ radicalInfo.rad.char }}<span v-if="radicalInfo.rad.form" class="text-ink/50"> / {{ radicalInfo.rad.form }}</span>
            </span>
            <span class="text-base sm:text-lg font-semibold text-gold-deep">{{ radicalInfo.rad.pinyin }}</span>
            <span class="text-sm sm:text-base text-ink/80">“{{ radicalInfo.rad.meaning }}”</span>
            <span v-if="radicalInfo.rad.colloquial" class="han text-xs sm:text-sm text-ink/50">({{ radicalInfo.rad.colloquial }})</span>
          </div>

          <p class="mt-2 text-sm text-ink/75 leading-relaxed">
            {{ radicalInfo.rad.comment }}
          </p>

          <div v-if="radicalInfo.rad.ex?.length" class="mt-3 flex flex-wrap items-center gap-2">
            <span class="text-[10px] tracking-widest uppercase text-ink/40">Also in:</span>
            <span v-for="e in radicalInfo.rad.ex" :key="e.char"
                  class="inline-flex items-baseline gap-1 px-2 py-0.5 rounded-full bg-white border border-ink/10">
              <span class="han text-base text-ink font-semibold">{{ e.char }}</span>
              <span class="text-[11px] text-ink/50">{{ e.pinyin }}</span>
            </span>
          </div>

          <NuxtLink to="/radicals" class="inline-block mt-3 text-[11px] text-ink/50 hover:text-gold-deep underline">
            → Explore all 214 radicals
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Stroke tips ───────────────────────────────────────────────────── -->
    <div v-if="current"
         class="mt-5 sm:mt-7 rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-6">
      <div class="flex items-center flex-wrap gap-2 mb-3">
        <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50">Stroke Tips</span>
        <span v-if="strokeCount"
              class="text-[10px] px-2 py-0.5 rounded-full bg-ink text-cream font-semibold tracking-wide">
          {{ strokeCount }} stroke{{ strokeCount === 1 ? '' : 's' }}
        </span>
      </div>

      <!-- Strokes featured in this character -->
      <div v-if="strokeMatches.length" class="mb-4">
        <div class="text-[11px] tracking-widest uppercase text-ink/50 mb-2">Featured strokes</div>
        <div class="flex flex-wrap gap-2">
          <div v-for="m in strokeMatches" :key="m.group.key + '-' + m.item.name"
               class="flex items-center gap-2 rounded-2xl border px-3 py-2"
               :style="{ borderColor: m.group.light, backgroundColor: m.group.bg }">
            <span class="han text-2xl font-bold" :style="{ color: m.group.color }">{{ m.item.glyph }}</span>
            <div class="min-w-0">
              <div class="flex items-baseline gap-1.5">
                <span class="han text-sm font-semibold" :style="{ color: m.group.text }">{{ m.item.name }}</span>
                <span class="text-[11px] text-ink/60">{{ m.item.pinyin }}</span>
              </div>
              <div class="text-[11px] text-ink/60 leading-tight">{{ m.item.en }}</div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-ink/50 italic mb-4">
        No specific stroke matches in our catalogue — follow the universal rules below.
      </p>

      <!-- Universal stroke-order rules -->
      <div>
        <div class="text-[11px] tracking-widest uppercase text-ink/50 mb-2">Stroke order rules</div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 text-sm">
          <li v-for="r in STROKE_RULES" :key="r.en" class="flex items-baseline gap-2">
            <span class="han text-ink font-semibold whitespace-nowrap">{{ r.zh }}</span>
            <span class="text-ink/60 text-xs">{{ r.en }}</span>
          </li>
        </ul>
      </div>

      <NuxtLink to="/strokes" class="inline-block mt-3 text-[11px] text-ink/50 hover:text-gold-deep underline">
        → See the full stroke catalogue
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Faint mi-zi-ge (米字格) practice grid */
.mi-grid-strong {
  background-color: #fffdf7;
  background-image:
    linear-gradient(to right,  rgba(155, 34, 38, 0.18) 0 1px, transparent 1px),
    linear-gradient(to bottom, rgba(155, 34, 38, 0.18) 0 1px, transparent 1px),
    linear-gradient(45deg,
      transparent calc(50% - 0.5px),
      rgba(155, 34, 38, 0.12) calc(50% - 0.5px),
      rgba(155, 34, 38, 0.12) calc(50% + 0.5px),
      transparent calc(50% + 0.5px)),
    linear-gradient(-45deg,
      transparent calc(50% - 0.5px),
      rgba(155, 34, 38, 0.12) calc(50% - 0.5px),
      rgba(155, 34, 38, 0.12) calc(50% + 0.5px),
      transparent calc(50% + 0.5px));
  background-size: 50% 50%, 50% 50%, 100% 100%, 100% 100%;
  background-position: center, center, center, center;
  background-repeat: no-repeat;
  border: 2px solid rgba(155, 34, 38, 0.35);
  border-radius: 12px;
}
</style>
