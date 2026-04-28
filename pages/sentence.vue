<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'

useHead({ title: '造句 · Sentence Builder' })

// ─── Build sentence pool from lesson texts ────────────────────────────────
const HAN_RE  = /[\u4e00-\u9fff]/
const PUNCT   = '，。！？、；：…'

const buildSentences = (lessons, level) => {
  const out = []
  for (const l of lessons || []) {
    const vocab = (l.vocab || []).map(v => v.c).filter(Boolean)
    // longest-match first for greedy tokenisation
    const sortedVocab = [...new Set(vocab)].sort((a, b) => b.length - a.length)
    for (const t of (l.texts || [])) {
      for (const ln of (t.lines || [])) {
        if (!ln?.c) continue
        const tokens = tokenize(ln.c, sortedVocab)
        // need at least 3 tokens to make ordering interesting
        if (tokens.filter(tk => tk.kind === 'word').length < 3) continue
        out.push({
          level, lessonNo: l.no, lessonHan: l.han,
          c: ln.c, p: ln.p || '', en: ln.en || '',
          tokens,
        })
      }
    }
  }
  return out
}

// Greedy longest-match tokeniser. Returns [{ kind: 'word'|'punct', text }]
const tokenize = (sentence, vocab) => {
  const result = []
  let i = 0
  while (i < sentence.length) {
    const ch = sentence[i]
    if (PUNCT.includes(ch)) {
      result.push({ kind: 'punct', text: ch }); i++
      continue
    }
    if (!HAN_RE.test(ch)) {
      // skip whitespace and other latin punctuation silently
      i++
      continue
    }
    let matched = ''
    for (const w of vocab) {
      if (w && sentence.startsWith(w, i)) { matched = w; break }
    }
    if (matched) { result.push({ kind: 'word', text: matched }); i += matched.length }
    else { result.push({ kind: 'word', text: ch }); i++ }
  }
  return result
}

const POOL = {
  1: buildSentences(HSK1_LESSONS, 1),
  2: buildSentences(HSK2_LESSONS, 2),
  3: buildSentences(HSK3_LESSONS, 3),
}

// ─── State ────────────────────────────────────────────────────────────────
const level   = ref(1)
const lesson  = ref('all')
const showPinyin = ref(true)
const showEnglish = ref(true)

const stats = reactive({ correct: 0, attempts: 0, streak: 0, best: 0 })

const idx = ref(0)
const checked = ref(false)            // user submitted
const isCorrect = ref(false)

// available[] = pieces still in the bank
// chosen[]    = pieces currently in the answer area (in chosen order)
const available = ref([])
const chosen    = ref([])

const availableLessons = computed(() => {
  const lessons = level.value === 1 ? HSK1_LESSONS
                : level.value === 2 ? HSK2_LESSONS
                : HSK3_LESSONS
  // only lessons that produced at least one sentence
  const haveSentences = new Set((POOL[level.value] || []).map(s => s.lessonNo))
  return (lessons || []).filter(l => haveSentences.has(l.no)).map(l => ({ no: l.no, han: l.han, en: l.en }))
})

const sentences = computed(() => {
  const all = POOL[level.value] || []
  if (lesson.value === 'all') return all
  return all.filter(s => s.lessonNo === lesson.value)
})

const current = computed(() => sentences.value[idx.value] || null)

// Best score from localStorage
onMounted(() => {
  try {
    const v = Number(localStorage.getItem('chinese-sentence-best') || 0)
    if (!Number.isNaN(v)) stats.best = v
  } catch { /* noop */ }
})

const persistBest = () => {
  try { localStorage.setItem('chinese-sentence-best', String(stats.best)) } catch { /* noop */ }
}

// ─── Round setup ──────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const setupRound = () => {
  checked.value = false
  isCorrect.value = false
  if (!current.value) { available.value = []; chosen.value = []; return }
  // word tokens become draggable pieces; punctuation is auto-placed at the end
  const wordPieces = current.value.tokens
    .filter(t => t.kind === 'word')
    .map((t, i) => ({ id: `${current.value.c}-${i}`, text: t.text, orig: i }))
  // ensure shuffled order is different from the original (when possible)
  let shuffled = shuffle(wordPieces)
  if (wordPieces.length > 1 &&
      shuffled.every((p, i) => p.id === wordPieces[i].id)) {
    shuffled = shuffle(wordPieces)
  }
  available.value = shuffled
  chosen.value = []
}

watch([current], setupRound, { immediate: true })
watch(level, () => { lesson.value = 'all'; idx.value = 0 })
watch(lesson, () => { idx.value = 0 })

// ─── Interactions ─────────────────────────────────────────────────────────
const pickFromBank = (piece) => {
  if (checked.value && isCorrect.value) return
  available.value = available.value.filter(p => p.id !== piece.id)
  chosen.value.push(piece)
  if (checked.value && !isCorrect.value) checked.value = false
}

const removeFromAnswer = (piece) => {
  if (checked.value && isCorrect.value) return
  chosen.value = chosen.value.filter(p => p.id !== piece.id)
  available.value.push(piece)
  if (checked.value && !isCorrect.value) checked.value = false
}

const reset = () => setupRound()

const checkAnswer = () => {
  if (!current.value || chosen.value.length === 0) return
  const expected = current.value.tokens.filter(t => t.kind === 'word').map(t => t.text)
  const got = chosen.value.map(p => p.text)
  const ok = expected.length === got.length && expected.every((w, i) => w === got[i])
  isCorrect.value = ok
  checked.value = true
  stats.attempts++
  if (ok) {
    stats.correct++
    stats.streak++
    if (stats.streak > stats.best) { stats.best = stats.streak; persistBest() }
  } else {
    stats.streak = 0
  }
}

const reveal = () => {
  if (!current.value) return
  // Move pieces into the chosen area in the correct order
  const expected = current.value.tokens.filter(t => t.kind === 'word').map(t => t.text)
  const all = [...available.value, ...chosen.value]
  const sorted = []
  const remaining = [...all]
  for (const w of expected) {
    const i = remaining.findIndex(p => p.text === w)
    if (i >= 0) sorted.push(remaining.splice(i, 1)[0])
  }
  chosen.value = sorted
  available.value = remaining
  checked.value = true
  isCorrect.value = false
  stats.streak = 0
}

const next = () => {
  if (!sentences.value.length) return
  idx.value = (idx.value + 1) % sentences.value.length
}
const prev = () => {
  if (!sentences.value.length) return
  idx.value = (idx.value - 1 + sentences.value.length) % sentences.value.length
}
const random = () => {
  if (!sentences.value.length) return
  idx.value = Math.floor(Math.random() * sentences.value.length)
}

// Punctuation suffix to display after the chosen area (auto-placed)
const trailingPunct = computed(() => {
  if (!current.value) return ''
  const last = [...current.value.tokens].reverse().find(Boolean)
  return last && last.kind === 'punct' ? last.text : ''
})

// Display sentence with chosen pieces inline (for "correct" state)
const displaySentence = computed(() => {
  if (!current.value) return ''
  return current.value.tokens.map(t => t.text).join('')
})

const accuracy = computed(() => stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0)

// Keyboard
const onKey = (e) => {
  const tag = (e.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return
  if (e.key === 'Enter')      checked.value && isCorrect.value ? next() : checkAnswer()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft')  prev()
  else if (e.key.toLowerCase() === 'r') reset()
  else if (e.key.toLowerCase() === 'h') reveal()
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
      <select v-model="lesson"
              class="px-3 py-1.5 rounded-full text-xs font-semibold border border-ink/15 bg-white text-ink/80
                     hover:border-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition max-w-[260px] truncate">
        <option value="all">All lessons</option>
        <option v-for="l in availableLessons" :key="l.no" :value="l.no">
          L{{ l.no }} · {{ l.han }} ({{ l.en }})
        </option>
      </select>

      <span class="ml-auto text-[11px] font-mono text-ink/50">
        {{ sentences.length ? `${idx + 1} / ${sentences.length}` : '—' }}
      </span>
    </div>

    <!-- Stats -->
    <div class="mb-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      <div class="rounded-2xl bg-white border border-ink/10 px-3 py-2 text-center">
        <div class="text-[10px] tracking-widest uppercase text-ink/50">Correct</div>
        <div class="text-xl font-bold text-ink">{{ stats.correct }}</div>
        <div class="text-[10px] text-ink/40">sentences solved</div>
      </div>
      <div class="rounded-2xl bg-white border border-ink/10 px-3 py-2 text-center">
        <div class="text-[10px] tracking-widest uppercase text-ink/50">Streak</div>
        <div class="text-xl font-bold text-gold-deep">{{ stats.streak }}</div>
        <div class="text-[10px] text-ink/40">in a row</div>
      </div>
      <div class="rounded-2xl bg-white border border-ink/10 px-3 py-2 text-center">
        <div class="text-[10px] tracking-widest uppercase text-ink/50">Best</div>
        <div class="text-xl font-bold text-ink">{{ stats.best }}</div>
        <div class="text-[10px] text-ink/40">longest streak</div>
      </div>
      <div class="rounded-2xl bg-white border border-ink/10 px-3 py-2 text-center">
        <div class="text-[10px] tracking-widest uppercase text-ink/50">Accuracy</div>
        <div class="text-xl font-bold text-ink">{{ accuracy }}%</div>
        <div class="text-[10px] text-ink/40">{{ stats.correct }} / {{ stats.attempts }}</div>
      </div>
    </div>

    <!-- How to play -->
    <details class="mb-4 rounded-2xl bg-cream/60 border border-gold-deep/20 px-4 py-3 text-sm text-ink/80">
      <summary class="cursor-pointer font-semibold tracking-wide uppercase text-[11px] text-ink/60 hover:text-ink select-none">
        ❓ How to play
      </summary>
      <ol class="mt-3 space-y-2 leading-relaxed">
        <li><b>1.</b> Read the English (and pinyin, if shown) for the target sentence.</li>
        <li><b>2.</b> Click the Chinese word chips below in the correct order.</li>
        <li><b>3.</b> Click <b>Check</b> (or press <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">Enter</kbd>) to verify.</li>
        <li><b>4.</b> Press <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">R</kbd> to reset, <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">H</kbd> to reveal, <kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">←</kbd>/<kbd class="px-1 bg-ink/10 rounded font-mono text-[11px]">→</kbd> to switch.</li>
      </ol>
    </details>

    <!-- Empty -->
    <div v-if="!current" class="rounded-3xl bg-white border border-ink/10 p-10 text-center text-ink/50 shadow-card">
      <div class="text-5xl mb-3">∅</div>
      <p>No sentences in this selection.</p>
    </div>

    <!-- Game card -->
    <div v-else class="rounded-3xl bg-white border-2 border-gold/40 shadow-card p-5 sm:p-7">

      <!-- Prompt -->
      <div class="mb-4">
        <div class="text-[10px] tracking-[0.3em] uppercase text-ink/50 mb-1">Translate to Chinese</div>
        <div v-if="showEnglish" class="text-lg sm:text-xl text-ink font-semibold leading-snug">
          {{ current.en }}
        </div>
        <div v-if="showPinyin" class="text-sm sm:text-base text-gold-deep mt-1 italic">
          {{ current.p }}
        </div>
        <div class="mt-2 text-[11px] text-ink/40">
          HSK {{ current.level }} · Lesson {{ current.lessonNo }} · {{ current.lessonHan }}
        </div>
      </div>

      <!-- Toggles -->
      <div class="mb-4 flex flex-wrap gap-3 text-[11px] text-ink/60">
        <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="showEnglish" class="accent-gold-deep" /> English
        </label>
        <label class="inline-flex items-center gap-1.5 cursor-pointer select-none">
          <input type="checkbox" v-model="showPinyin" class="accent-gold-deep" /> Pinyin
        </label>
      </div>

      <!-- Answer slot -->
      <div class="rounded-2xl border-2 border-dashed p-4 min-h-[88px] flex flex-wrap gap-2 items-center transition"
           :class="checked
                   ? (isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-300')
                   : 'bg-cream/40 border-ink/20'">
        <button v-for="p in chosen" :key="p.id"
                @click="removeFromAnswer(p)"
                :disabled="checked && isCorrect"
                class="han text-xl sm:text-2xl font-semibold px-3 py-1.5 rounded-xl bg-white border-2 border-ink/15
                       text-ink shadow-chip hover:border-rose-300 hover:text-rose-600 transition disabled:opacity-70 disabled:cursor-default disabled:hover:border-ink/15 disabled:hover:text-ink">
          {{ p.text }}
        </button>
        <span v-if="chosen.length && trailingPunct"
              class="han text-xl sm:text-2xl text-ink/60 font-semibold ml-1">{{ trailingPunct }}</span>
        <span v-if="!chosen.length" class="text-xs text-ink/40 italic">
          Click word chips below to build the sentence…
        </span>
      </div>

      <!-- Feedback -->
      <div v-if="checked" class="mt-3 text-sm font-semibold tracking-wide"
           :class="isCorrect ? 'text-emerald-700' : 'text-rose-600'">
        <template v-if="isCorrect">✓ Correct! 太好了！</template>
        <template v-else>
          ✗ Not quite. Correct answer:
          <span class="han text-base text-ink ml-1">{{ displaySentence }}</span>
        </template>
      </div>

      <!-- Word bank -->
      <div class="mt-5">
        <div class="text-[10px] tracking-widest uppercase text-ink/50 mb-2">Word bank</div>
        <div class="flex flex-wrap gap-2">
          <button v-for="p in available" :key="p.id" @click="pickFromBank(p)"
                  class="han text-xl sm:text-2xl font-semibold px-3 py-1.5 rounded-xl bg-cream border-2 border-gold-deep/30
                         text-ink hover:border-gold-deep hover:bg-white hover:-translate-y-0.5 transition shadow-chip">
            {{ p.text }}
          </button>
          <span v-if="!available.length" class="text-xs text-ink/40 italic self-center">
            All chips placed — click <b>Check</b>!
          </span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="mt-6 flex flex-wrap gap-2">
        <button @click="checkAnswer" :disabled="!chosen.length || (checked && isCorrect)"
                class="px-4 py-2 rounded-full bg-gold-deep text-cream text-sm font-semibold hover:bg-ink transition shadow-chip disabled:opacity-50 disabled:cursor-not-allowed">
          ✓ Check
        </button>
        <button @click="reset"
                class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-ink/30 transition">
          ↺ Reset
        </button>
        <button @click="reveal"
                class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-rose-300 hover:text-rose-600 transition">
          👁 Reveal
        </button>
        <div class="ml-auto flex gap-2">
          <button @click="prev"
                  class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-ink/30 transition">
            ←
          </button>
          <button @click="random"
                  class="px-4 py-2 rounded-full bg-white border border-ink/15 text-sm font-semibold text-ink hover:border-ink/30 transition">
            🎲
          </button>
          <button @click="next"
                  class="px-4 py-2 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-gold-deep transition shadow-chip">
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
