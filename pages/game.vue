<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'

useHead({ title: '游戏 · Character Memory Game' })

// ─── Build per-lesson vocab (with level + lesson tag) ─────────────────────
const toLessonEntries = (lessons, level) => {
  return (lessons || []).map(l => {
    const seen = new Set()
    const vocab = []
    for (const v of (l.vocab || [])) {
      if (!v?.c || !v?.p || !v?.en) continue
      if (seen.has(v.c)) continue
      seen.add(v.c)
      const en = String(v.en).split(/[·;,/]/)[0].trim()
      if (!en) continue
      vocab.push({ c: v.c, p: v.p, en, level, lesson: l.no })
    }
    return {
      no: l.no,
      han: l.han,
      pinyin: l.pinyin,
      en: l.en,
      level,
      vocab,
    }
  }).filter(l => l.vocab.length > 0)
}

const LESSONS = {
  1: toLessonEntries(HSK1_LESSONS, 1),
  2: toLessonEntries(HSK2_LESSONS, 2),
  3: toLessonEntries(HSK3_LESSONS, 3),
}

const dedupe = (arr) => {
  const seen = new Set(); const out = []
  for (const v of arr) { if (!seen.has(v.c)) { seen.add(v.c); out.push(v) } }
  return out
}

const POOL = {
  1: dedupe(LESSONS[1].flatMap(l => l.vocab)),
  2: dedupe(LESSONS[2].flatMap(l => l.vocab)),
  3: dedupe(LESSONS[3].flatMap(l => l.vocab)),
}

// ─── Settings ──────────────────────────────────────────────────────────────
const mode      = ref('quiz')   // 'quiz' | 'match'
const level     = ref(1)        // 1 | 2 | 3 | 'all'
const lesson    = ref('all')    // 'all' | <lesson no>
const matchSize = ref(8)        // pairs in the memory game

const availableLessons = computed(() => {
  if (level.value === 'all') return []
  return LESSONS[level.value] || []
})

const activePool = computed(() => {
  if (level.value === 'all') return [...POOL[1], ...POOL[2], ...POOL[3]]
  if (lesson.value === 'all') return POOL[level.value] || []
  const found = (LESSONS[level.value] || []).find(l => l.no === lesson.value)
  return found ? found.vocab : []
})

// ─── Helpers ───────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const pickN = (arr, n) => shuffle(arr).slice(0, n)

// ═══════════════════════════════════════════════════════════════════════════
//  QUIZ MODE — show Hanzi, choose meaning from 4 options
// ═══════════════════════════════════════════════════════════════════════════
const quiz = reactive({
  q: null,         // current question
  options: [],     // 4 shuffled options (objects)
  picked: null,    // index user picked
  correctIdx: -1,
  score: 0,
  streak: 0,
  bestStreak: 0,
  asked: 0,
  hint: 'pinyin',  // 'pinyin' | 'meaning' (what to ask for)
})

const QUIZ_BEST_KEY = 'chinese-game-quiz-best'

const newQuizQuestion = () => {
  const pool = activePool.value
  if (pool.length < 4) { quiz.q = null; return }
  const q = pool[Math.floor(Math.random() * pool.length)]
  // pick 3 distractors with different .c
  const distractors = []
  const used = new Set([q.c])
  let guard = 0
  while (distractors.length < 3 && guard < 200) {
    const cand = pool[Math.floor(Math.random() * pool.length)]
    if (!used.has(cand.c)) { distractors.push(cand); used.add(cand.c) }
    guard++
  }
  const options = shuffle([q, ...distractors])
  quiz.q = q
  quiz.options = options
  quiz.correctIdx = options.findIndex(o => o.c === q.c)
  quiz.picked = null
  // alternate what we ask: half pinyin, half meaning
  quiz.hint = Math.random() < 0.5 ? 'meaning' : 'pinyin'
}

const pickQuiz = (i) => {
  if (quiz.picked !== null) return
  quiz.picked = i
  quiz.asked++
  if (i === quiz.correctIdx) {
    quiz.score++
    quiz.streak++
    if (quiz.streak > quiz.bestStreak) {
      quiz.bestStreak = quiz.streak
      if (import.meta.client) localStorage.setItem(QUIZ_BEST_KEY, String(quiz.bestStreak))
    }
  } else {
    quiz.streak = 0
  }
}

const nextQuiz = () => newQuizQuestion()

const resetQuiz = () => {
  quiz.score = 0
  quiz.streak = 0
  quiz.asked = 0
  newQuizQuestion()
}

// ═══════════════════════════════════════════════════════════════════════════
//  MATCH MODE — memory pairs (Hanzi ↔ Pinyin)
// ═══════════════════════════════════════════════════════════════════════════
const match = reactive({
  cards: [],       // [{ id, pairId, kind: 'han'|'pin', text, sub, flipped, done }]
  first: null,     // card index
  second: null,
  lock: false,
  moves: 0,
  matched: 0,
  startedAt: 0,
  elapsed: 0,
  best: null,
})

const MATCH_BEST_KEY = 'chinese-game-match-best'
const MATCH_HOWTO_KEY = 'chinese-game-match-howto'
const showHowTo = ref(true)
const dismissHowTo = () => {
  showHowTo.value = false
  if (import.meta.client) localStorage.setItem(MATCH_HOWTO_KEY, '1')
}

let matchTimer = null
const stopTimer = () => { if (matchTimer) { clearInterval(matchTimer); matchTimer = null } }
const startTimer = () => {
  stopTimer()
  match.startedAt = Date.now()
  match.elapsed = 0
  matchTimer = setInterval(() => {
    match.elapsed = Math.floor((Date.now() - match.startedAt) / 1000)
  }, 250)
}

const newMatchGame = () => {
  stopTimer()
  const pool = activePool.value
  const n = Math.min(matchSize.value, Math.floor(pool.length))
  const picks = pickN(pool, n)
  const cards = []
  picks.forEach((v, idx) => {
    cards.push({ id: idx * 2,     pairId: idx, kind: 'han', text: v.c, sub: '',     flipped: false, done: false, level: v.level })
    cards.push({ id: idx * 2 + 1, pairId: idx, kind: 'pin', text: v.p, sub: v.en,   flipped: false, done: false, level: v.level })
  })
  match.cards = shuffle(cards)
  match.first = null
  match.second = null
  match.lock = false
  match.moves = 0
  match.matched = 0
  startTimer()
}

const flipCard = (i) => {
  if (match.lock) return
  const card = match.cards[i]
  if (!card || card.flipped || card.done) return
  card.flipped = true
  if (match.first === null) {
    match.first = i
    return
  }
  if (match.second !== null) return
  match.second = i
  match.moves++
  const a = match.cards[match.first]
  const b = match.cards[match.second]
  if (a.pairId === b.pairId) {
    a.done = true; b.done = true
    match.matched++
    match.first = null
    match.second = null
    if (match.matched >= matchSize.value) {
      stopTimer()
      const score = { moves: match.moves, time: match.elapsed }
      if (import.meta.client) {
        const key = `${MATCH_BEST_KEY}-${level.value}-${matchSize.value}`
        const prev = JSON.parse(localStorage.getItem(key) || 'null')
        const better = !prev || score.moves < prev.moves || (score.moves === prev.moves && score.time < prev.time)
        if (better) {
          localStorage.setItem(key, JSON.stringify(score))
          match.best = score
        }
      }
    }
  } else {
    match.lock = true
    setTimeout(() => {
      a.flipped = false; b.flipped = false
      match.first = null; match.second = null; match.lock = false
    }, 850)
  }
}

const loadMatchBest = () => {
  if (!import.meta.client) return
  const key = `${MATCH_BEST_KEY}-${level.value}-${matchSize.value}`
  match.best = JSON.parse(localStorage.getItem(key) || 'null')
}

const fmtTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const r = (s % 60).toString().padStart(2, '0')
  return `${m}:${r}`
}

// ─── Mode / settings reactivity ────────────────────────────────────────────
watch(level, () => { lesson.value = 'all' })
watch([mode, level, lesson, matchSize], () => {
  if (mode.value === 'quiz') resetQuiz()
  else { newMatchGame(); loadMatchBest() }
})

onMounted(() => {
  const saved = Number(localStorage.getItem(QUIZ_BEST_KEY) || 0)
  if (Number.isFinite(saved)) quiz.bestStreak = saved
  if (localStorage.getItem(MATCH_HOWTO_KEY) === '1') showHowTo.value = false
  newQuizQuestion()
  loadMatchBest()
})
onBeforeUnmount(() => stopTimer())

// Keyboard: 1-4 to answer, Space/Enter for next
const onKey = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea') return
  if (mode.value !== 'quiz' || !quiz.q) return
  if (['1','2','3','4'].includes(e.key)) {
    pickQuiz(Number(e.key) - 1)
  } else if ((e.key === 'Enter' || e.key === ' ') && quiz.picked !== null) {
    e.preventDefault(); nextQuiz()
  }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

const accuracy = computed(() => quiz.asked === 0 ? 0 : Math.round((quiz.score / quiz.asked) * 100))
</script>

<template>
  <div class="max-w-5xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">

    <!-- Mode + filters -->
    <div class="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
      <div class="inline-flex rounded-2xl border border-ink/15 bg-white shadow-sm overflow-hidden">
        <button v-for="m in [{k:'quiz',h:'测',l:'Quiz'},{k:'match',h:'配',l:'Match'}]" :key="m.k"
                @click="mode = m.k"
                class="px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition flex items-center gap-2"
                :class="mode === m.k ? 'bg-ink text-cream' : 'text-ink/70 hover:bg-ink/5'">
          <span class="han text-base">{{ m.h }}</span> {{ m.l }}
        </button>
      </div>

      <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50 ml-1">Level</span>
      <div class="flex gap-1.5">
        <button v-for="lv in [1,2,3,'all']" :key="lv" @click="level = lv"
                class="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                :class="level === lv
                        ? 'bg-gold-deep text-cream border-gold-deep shadow-chip'
                        : 'bg-white text-ink/70 border-ink/15 hover:border-gold'">
          {{ lv === 'all' ? 'All' : `HSK ${lv}` }}
        </button>
      </div>

      <template v-if="level !== 'all' && availableLessons.length">
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
              L{{ l.no }} · {{ l.han }} ({{ l.en }}) — {{ l.vocab.length }}
            </option>
          </select>
        </div>
      </template>

      <template v-if="mode === 'match'">
        <span class="text-[10px] tracking-[0.3em] uppercase text-ink/50 ml-1">Pairs</span>
        <div class="flex gap-1.5">
          <button v-for="n in [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]" :key="n" @click="matchSize = n"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
                  :class="matchSize === n
                          ? 'bg-ink text-cream border-ink shadow-chip'
                          : 'bg-white text-ink/70 border-ink/15 hover:border-ink/30'">
            {{ n }}
          </button>
        </div>
      </template>
    </div>

    <!-- ═══════════════════════════ QUIZ ═══════════════════════════ -->
    <section v-if="mode === 'quiz'">
      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Total correct answers in this session">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Score</div>
          <div class="text-2xl font-bold text-ink">{{ quiz.score }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">Correct answers</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Correct answers in a row — break it and it resets to 0">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Streak</div>
          <div class="text-2xl font-bold text-gold-deep">🔥 {{ quiz.streak }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">In a row</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Your longest streak ever — saved on this device">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Best</div>
          <div class="text-2xl font-bold text-ink">{{ quiz.bestStreak }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">Longest streak</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Percentage of questions you answered correctly">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Accuracy</div>
          <div class="text-2xl font-bold text-ink">{{ accuracy }}%</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">{{ quiz.score }} / {{ quiz.asked }} correct</div>
        </div>
      </div>

      <!-- Card -->
      <div v-if="quiz.q" :key="quiz.q.c + '-' + quiz.asked"
           class="rounded-3xl bg-white border-2 border-gold/40 shadow-card overflow-hidden animate-fadeUp">
        <div class="px-5 py-2.5 flex items-center justify-between text-xs font-medium tracking-wide bg-ink text-cream">
          <span class="uppercase">What is the {{ quiz.hint === 'pinyin' ? 'pinyin' : 'meaning' }}?</span>
          <span class="font-mono opacity-70">HSK {{ quiz.q.level }}</span>
        </div>

        <div class="px-6 pt-8 pb-6 text-center">
          <div class="han font-bold text-ink leading-none select-none"
               :style="{ fontSize: 'clamp(96px, 22vw, 180px)' }">
            {{ quiz.q.c }}
          </div>
          <div v-if="quiz.picked !== null" class="mt-3 text-sm text-ink/60">
            <span class="font-semibold text-ink">{{ quiz.q.p }}</span> ·
            <span>{{ quiz.q.en }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 px-4 sm:px-6 pb-5">
          <button v-for="(o, i) in quiz.options" :key="o.c + i"
                  @click="pickQuiz(i)" :disabled="quiz.picked !== null"
                  class="group relative text-left rounded-2xl px-4 py-3.5 border-2 transition-all duration-200 flex items-center gap-3"
                  :class="[
                    quiz.picked === null ? 'bg-white border-ink/15 hover:border-gold hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : 'cursor-default',
                    quiz.picked !== null && i === quiz.correctIdx ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300' : '',
                    quiz.picked !== null && quiz.picked === i && i !== quiz.correctIdx ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300' : '',
                    quiz.picked !== null && quiz.picked !== i && i !== quiz.correctIdx ? 'opacity-60' : ''
                  ]">
            <span class="shrink-0 w-7 h-7 rounded-lg bg-ink/5 text-ink/60 flex items-center justify-center text-xs font-bold font-mono">
              {{ i + 1 }}
            </span>
            <span class="flex-1 min-w-0">
              <span class="block text-base sm:text-lg font-semibold text-ink truncate">
                {{ quiz.hint === 'pinyin' ? o.p : o.en }}
              </span>
              <span v-if="quiz.picked !== null" class="block text-[11px] text-ink/50 truncate">
                {{ quiz.hint === 'pinyin' ? o.en : o.p }}
              </span>
            </span>
            <span v-if="quiz.picked !== null && i === quiz.correctIdx" class="text-emerald-600 text-lg">✓</span>
            <span v-else-if="quiz.picked === i" class="text-rose-600 text-lg">✗</span>
          </button>
        </div>

        <div class="px-4 sm:px-6 pb-5 flex items-center justify-between gap-3">
          <button @click="resetQuiz"
                  class="text-xs font-semibold tracking-wide uppercase text-ink/60 hover:text-ink underline-offset-4 hover:underline">
            Reset
          </button>
          <button @click="nextQuiz" :disabled="quiz.picked === null"
                  class="px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-semibold shadow-chip
                         hover:bg-gold-deep transition disabled:opacity-30 disabled:cursor-not-allowed">
            Next →
          </button>
        </div>
      </div>

      <p class="mt-3 text-center text-[11px] text-ink/40">
        Tip: press <kbd class="px-1.5 py-0.5 rounded bg-ink/10 font-mono">1-4</kbd> to answer ·
        <kbd class="px-1.5 py-0.5 rounded bg-ink/10 font-mono">Enter</kbd> for next
      </p>
    </section>

    <!-- ═══════════════════════════ MATCH ═══════════════════════════ -->
    <section v-else>
      <!-- How to play -->
      <div v-if="showHowTo"
           class="mb-4 rounded-2xl bg-gradient-to-br from-cream to-white border-2 border-gold-deep/30 shadow-card overflow-hidden">
        <div class="px-4 sm:px-5 py-3 flex items-center justify-between gap-3 bg-ink/5 border-b border-ink/5">
          <div class="flex items-center gap-2.5">
            <span class="han text-2xl text-gold-deep font-bold">配</span>
            <div>
              <div class="text-[10px] tracking-[0.3em] uppercase text-ink/50 leading-tight">How to play</div>
              <div class="text-sm font-bold text-ink leading-tight">Memory Match · 配对游戏</div>
            </div>
          </div>
          <button @click="dismissHowTo" type="button"
                  class="text-[11px] font-semibold text-ink/50 hover:text-ink underline-offset-2 hover:underline">
            Got it ✕
          </button>
        </div>
        <ol class="px-4 sm:px-5 py-4 space-y-2.5 text-sm text-ink/80 leading-relaxed">
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-gold-deep text-cream font-bold text-xs flex items-center justify-center">1</span>
            <span>All cards start face-down. Click any card to <b>flip it open</b>.</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-gold-deep text-cream font-bold text-xs flex items-center justify-center">2</span>
            <span>Find the matching pair: a <b class="han">汉字</b> card and its <b>pinyin + meaning</b> card belong together.</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-gold-deep text-cream font-bold text-xs flex items-center justify-center">3</span>
            <span>If the two cards match, they stay open <span class="text-emerald-700 font-semibold">(green)</span>. If not, both flip back — try to remember where they were!</span>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-6 h-6 rounded-full bg-gold-deep text-cream font-bold text-xs flex items-center justify-center">4</span>
            <span>Clear the whole board. Try to finish with the <b>fewest moves</b> and the <b>shortest time</b> — your best score is saved.</span>
          </li>
        </ol>
        <div class="px-4 sm:px-5 pb-4 flex flex-wrap items-center gap-2 text-[11px]">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-ink/10 text-ink/70">
            <span class="han text-base text-ink">你</span> Hanzi card
          </span>
          <span class="text-ink/30">↔</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-ink/10 text-ink/70">
            <span class="font-semibold text-ink">nǐ</span> · you
          </span>
          <span class="ml-auto text-ink/40 italic">Tip: choose level & lesson above to focus your practice.</span>
        </div>
      </div>
      <button v-else @click="showHowTo = true" type="button"
              class="mb-4 text-[11px] font-semibold tracking-wide uppercase text-ink/50 hover:text-ink underline-offset-4 hover:underline">
        ❓ How to play
      </button>
      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Pairs you have already matched">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Matched</div>
          <div class="text-2xl font-bold text-ink">{{ match.matched }} / {{ matchSize }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">Pairs found</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="A move = flipping two cards. Fewer moves is better.">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Moves</div>
          <div class="text-2xl font-bold text-ink">{{ match.moves }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">Two flips = 1 move</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Time since you started this game">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Time</div>
          <div class="text-2xl font-bold text-gold-deep font-mono">{{ fmtTime(match.elapsed) }}</div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">mm:ss elapsed</div>
        </div>
        <div class="rounded-2xl bg-white border border-ink/10 p-3 text-center shadow-sm" title="Your best score for this level and pair count">
          <div class="text-[10px] tracking-widest uppercase text-ink/50">Best</div>
          <div class="text-sm font-bold text-ink leading-tight pt-1">
            <template v-if="match.best">
              {{ match.best.moves }} moves<br/>
              <span class="font-mono text-xs text-ink/60">{{ fmtTime(match.best.time) }}</span>
            </template>
            <span v-else class="text-ink/40">—</span>
          </div>
          <div class="text-[10px] text-ink/45 mt-0.5 leading-tight">Try to beat it!</div>
        </div>
      </div>

      <!-- Win banner -->
      <div v-if="match.matched >= matchSize"
           class="mb-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-gold/20 border-2 border-emerald-400 px-5 py-4 flex items-center gap-4 shadow-card animate-fadeUp">
        <div class="han text-3xl text-emerald-700 font-bold">胜</div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-emerald-800">Well done! 太棒了!</div>
          <div class="text-xs text-emerald-700/80">{{ match.moves }} moves in {{ fmtTime(match.elapsed) }}.</div>
        </div>
        <button @click="newMatchGame"
                class="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition">
          Play again
        </button>
      </div>

      <!-- Board -->
      <div class="rounded-3xl bg-white/80 backdrop-blur border border-ink/10 shadow-card p-3 sm:p-5">
        <div class="grid gap-2.5 sm:gap-3"
             :style="{ gridTemplateColumns: `repeat(${matchSize <= 6 ? 4 : 4}, minmax(0,1fr))` }">
          <button v-for="(card, i) in match.cards" :key="card.id"
                  @click="flipCard(i)"
                  class="relative aspect-[3/4] rounded-2xl perspective"
                  :class="card.done ? 'pointer-events-none' : ''">
            <span class="card-inner w-full h-full block transition-transform duration-500"
                  :class="(card.flipped || card.done) ? 'is-flipped' : ''">
              <!-- back -->
              <span class="card-face card-back rounded-2xl bg-gradient-to-br from-ink to-ink/80 border-2 border-gold-deep/60 flex items-center justify-center shadow-chip">
                <span class="han text-2xl sm:text-3xl text-gold font-bold">汉</span>
              </span>
              <!-- front -->
              <span class="card-face card-front rounded-2xl border-2 flex flex-col items-center justify-center text-center px-1.5 shadow-sm"
                    :class="card.done
                            ? 'bg-emerald-50 border-emerald-400'
                            : (card.kind === 'han' ? 'bg-cream border-gold-deep/50' : 'bg-white border-ink/15')">
                <template v-if="card.kind === 'han'">
                  <span class="han font-bold leading-none text-ink"
                        :style="{ fontSize: 'clamp(28px, 8vw, 56px)' }">{{ card.text }}</span>
                </template>
                <template v-else>
                  <span class="text-sm sm:text-base font-bold text-ink leading-tight">{{ card.text }}</span>
                  <span class="mt-1 text-[10px] sm:text-xs text-ink/55 leading-tight line-clamp-2 px-0.5">{{ card.sub }}</span>
                </template>
                <span class="absolute top-1 right-1.5 text-[9px] font-mono opacity-50">{{ card.level }}</span>
              </span>
            </span>
          </button>
        </div>
      </div>

      <div class="mt-4 flex justify-center">
        <button @click="newMatchGame"
                class="px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-semibold shadow-chip hover:bg-gold-deep transition">
          New Game · 重玩
        </button>
      </div>

      <p class="mt-3 text-center text-[11px] text-ink/40">
        Match each <span class="han text-ink/70">汉字</span> with its pinyin & meaning.
      </p>
    </section>
  </div>
</template>

<style scoped>
.perspective { perspective: 800px; }
.card-inner {
  position: relative;
  transform-style: preserve-3d;
}
.card-inner.is-flipped { transform: rotateY(180deg); }
.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.card-back  { transform: rotateY(0deg); }
.card-front { transform: rotateY(180deg); }
kbd { font-size: 10px; }
</style>
