<script setup>
import { HSK3_LESSONS } from '~/composables/useHSK3.js'

useHead({ title: 'HSK 3 Writing Exam · 书写练习' })

const HAN_RE = /[\u3400-\u9fff]/u
const HAN_GLOBAL_RE = /[\u3400-\u9fff]/gu
const TERMINAL_RE = /[。！？!?]+$/u
const ALL_PUNCT_RE = /[，。！？、；：…,.!?;:\s]/gu
const STORAGE_MISTAKES = 'chinese-hsk3-writing-mistakes-v1'
const STORAGE_DAILY = 'chinese-hsk3-writing-daily-v1'
const STORAGE_DIARY = 'chinese-hsk3-writing-diary-v1'

const cleanAnswer = value => String(value || '').replace(ALL_PUNCT_RE, '')
const chineseCount = value => (String(value || '').match(HAN_GLOBAL_RE) || []).length
const randomItem = list => list[Math.floor(Math.random() * list.length)]
const shuffled = (list) => {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
const sample = (list, count) => shuffled(list).slice(0, Math.min(count, list.length))

const vocab = HSK3_LESSONS.flatMap(lesson =>
  (lesson.vocab || []).map(word => ({ ...word, lessonNo: lesson.no }))
)
const uniqueVocabulary = [...new Map(vocab.filter(word => word.c).map(word => [word.c, word])).values()]
const tokenVocabulary = [...new Set(uniqueVocabulary.map(word => word.c).filter(Boolean))]
  .sort((a, b) => b.length - a.length)

const tokenise = (sentence) => {
  const text = String(sentence || '').replace(TERMINAL_RE, '')
  const result = []
  let index = 0
  while (index < text.length) {
    const char = text[index]
    if (!HAN_RE.test(char)) { index++; continue }
    const word = tokenVocabulary.find(candidate => text.startsWith(candidate, index)) || char
    result.push(word)
    index += word.length
  }
  return result
}

const allSentences = HSK3_LESSONS.flatMap(lesson =>
  (lesson.texts || []).flatMap(text =>
    (text.lines || []).filter(line => line?.c && line?.en).map(line => ({
      c: line.c,
      p: line.p || '',
      en: line.en || '',
      lessonNo: lesson.no,
      lessonHan: lesson.han,
      tokens: tokenise(line.c),
    }))
  )
)

const sentencePool = allSentences.filter(item => {
  const length = chineseCount(item.c)
  const internalPunctuation = item.c.replace(TERMINAL_RE, '').match(/[，、；：…]/u)
  return length >= 5 && length <= 20 && !internalPunctuation && item.tokens.length >= 3 && item.tokens.length <= 10
})

const singleCharacterVocabulary = uniqueVocabulary.filter(word =>
  chineseCount(word.c) === 1 && !/[（）()]/u.test(word.c) && word.p && !/\s/u.test(word.p.trim())
)

const fillPool = []
for (const sentence of sentencePool) {
  for (const word of singleCharacterVocabulary) {
    const tokenIndex = sentence.tokens.findIndex(token => token === word.c)
    if (tokenIndex < 0) continue
    const ending = sentence.c.match(TERMINAL_RE)?.[0] || '。'
    fillPool.push({
      type: 'fill',
      prompt: sentence.tokens.map((token, index) => index === tokenIndex ? `（${word.p}）` : token).join('') + ending,
      answer: word.c,
      pinyin: word.p,
      english: sentence.en,
      lessonNo: sentence.lessonNo,
    })
  }
}
const uniqueFillPool = [...new Map(fillPool.map(item => [`${item.prompt}|${item.answer}`, item])).values()]

const modes = [
  { id: 'exam', icon: '考', label: 'Exam', note: '10 questions · 15 min' },
  { id: 'character', icon: '字', label: 'Missing character', note: 'Pinyin to Hanzi' },
  { id: 'sentence', icon: '句', label: 'Full sentence', note: 'Type the translation' },
  { id: 'memory', icon: '记', label: 'Memory dictation', note: 'Read, hide, write' },
  { id: 'mistakes', icon: '错', label: 'My mistakes', note: 'Review weak points' },
  { id: 'daily', icon: '日', label: 'Daily challenge', note: '10 every day' },
  { id: 'diary', icon: '本', label: 'Mini-diary', note: 'Guided free writing' },
]
const mode = ref('exam')

// Shared mistake notebook ---------------------------------------------------
const mistakes = ref([])
const mistakeKey = item => `${item.type}|${item.prompt}|${item.answer}`
const persistMistakes = () => {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_MISTAKES, JSON.stringify(mistakes.value.slice(0, 100)))
}
const saveMistake = (item) => {
  const saved = {
    type: item.type || 'sentence',
    prompt: item.prompt || item.en || 'Write the correct Chinese',
    answer: item.answer || item.c,
    pinyin: item.pinyin || item.p || '',
    english: item.english || item.en || '',
    addedAt: Date.now(),
  }
  mistakes.value = [saved, ...mistakes.value.filter(old => mistakeKey(old) !== mistakeKey(saved))]
  persistMistakes()
}
const removeMistake = (item) => {
  mistakes.value = mistakes.value.filter(old => mistakeKey(old) !== mistakeKey(item))
  persistMistakes()
}

// Exam mode ----------------------------------------------------------------
const examState = ref('idle')
const examQuestions = ref([])
const examIndex = ref(0)
const examSeconds = ref(15 * 60)
const examScore = ref(0)
let examTimer = null

const makeOrderQuestion = (sentence) => ({
  type: 'order',
  prompt: 'Arrange the words into a correct sentence.',
  answer: cleanAnswer(sentence.c),
  english: sentence.en,
  pinyin: sentence.p,
  lessonNo: sentence.lessonNo,
  pieces: shuffled(sentence.tokens.map((text, index) => ({ id: `${index}-${text}`, text }))),
  chosen: [],
})
const makeFillQuestion = item => ({ ...item, response: '' })
const currentExamQuestion = computed(() => examQuestions.value[examIndex.value] || null)
const examTime = computed(() => `${String(Math.floor(examSeconds.value / 60)).padStart(2, '0')}:${String(examSeconds.value % 60).padStart(2, '0')}`)
const examAnswered = computed(() => examQuestions.value.filter(question =>
  question.type === 'order' ? question.chosen.length === question.pieces.length : question.response.trim()
).length)

const startExam = () => {
  clearInterval(examTimer)
  examQuestions.value = [
    ...sample(sentencePool, 5).map(makeOrderQuestion),
    ...sample(uniqueFillPool, 5).map(makeFillQuestion),
  ]
  examIndex.value = 0
  examSeconds.value = 15 * 60
  examScore.value = 0
  examState.value = 'running'
  examTimer = setInterval(() => {
    examSeconds.value--
    if (examSeconds.value <= 0) finishExam()
  }, 1000)
}
const chooseExamPiece = (piece) => {
  const question = currentExamQuestion.value
  if (!question || question.chosen.includes(piece.id)) return
  question.chosen.push(piece.id)
}
const removeExamPiece = (piece) => {
  const question = currentExamQuestion.value
  if (!question) return
  question.chosen = question.chosen.filter(id => id !== piece.id)
}
const orderedExamPieces = computed(() => {
  const question = currentExamQuestion.value
  if (!question || question.type !== 'order') return []
  return question.chosen.map(id => question.pieces.find(piece => piece.id === id)).filter(Boolean)
})
const examQuestionAnswer = (question) => question.type === 'order'
  ? question.chosen.map(id => question.pieces.find(piece => piece.id === id)?.text || '').join('')
  : question.response
const finishExam = () => {
  clearInterval(examTimer)
  let score = 0
  for (const question of examQuestions.value) {
    const correct = cleanAnswer(examQuestionAnswer(question)) === cleanAnswer(question.answer)
    question.correct = correct
    if (correct) score++
    else saveMistake({
      type: question.type === 'fill' ? 'fill' : 'sentence',
      prompt: question.type === 'fill' ? question.prompt : question.english,
      answer: question.answer,
      pinyin: question.pinyin,
      english: question.english,
    })
  }
  examScore.value = score
  examState.value = 'finished'
}

// Missing-character practice -----------------------------------------------
const characterQuestion = ref(null)
const characterInput = ref('')
const characterResult = ref(null)
const nextCharacter = () => {
  characterQuestion.value = randomItem(uniqueFillPool)
  characterInput.value = ''
  characterResult.value = null
}
const checkCharacter = () => {
  if (!characterInput.value.trim()) return
  characterResult.value = cleanAnswer(characterInput.value) === characterQuestion.value.answer
  if (!characterResult.value) saveMistake(characterQuestion.value)
}

// Full-sentence practice ----------------------------------------------------
const sentenceQuestion = ref(null)
const sentenceInput = ref('')
const sentenceResult = ref(null)
const nextSentence = () => {
  sentenceQuestion.value = randomItem(sentencePool)
  sentenceInput.value = ''
  sentenceResult.value = null
}
const checkSentence = () => {
  if (!sentenceInput.value.trim()) return
  sentenceResult.value = cleanAnswer(sentenceInput.value) === cleanAnswer(sentenceQuestion.value.c)
  if (!sentenceResult.value) saveMistake({
    type: 'sentence', prompt: sentenceQuestion.value.en, answer: sentenceQuestion.value.c,
    pinyin: sentenceQuestion.value.p, english: sentenceQuestion.value.en,
  })
}
const sentenceDiff = computed(() => {
  if (!sentenceQuestion.value || sentenceResult.value !== false) return []
  const answer = [...cleanAnswer(sentenceQuestion.value.c)]
  const given = [...cleanAnswer(sentenceInput.value)]
  return answer.map((char, index) => ({ char, correct: char === given[index] }))
})

// Text-only memory dictation ------------------------------------------------
const memoryQuestion = ref(null)
const memoryInput = ref('')
const memoryPhase = ref('read')
const memoryCountdown = ref(5)
const memoryResult = ref(null)
let memoryTimer = null
const nextMemory = () => {
  clearInterval(memoryTimer)
  memoryQuestion.value = randomItem(sentencePool.filter(item => chineseCount(item.c) <= 15))
  memoryInput.value = ''
  memoryPhase.value = 'read'
  memoryCountdown.value = 5
  memoryResult.value = null
}
const beginMemory = () => {
  memoryCountdown.value = 5
  memoryPhase.value = 'countdown'
  clearInterval(memoryTimer)
  memoryTimer = setInterval(() => {
    memoryCountdown.value--
    if (memoryCountdown.value <= 0) {
      clearInterval(memoryTimer)
      memoryPhase.value = 'write'
    }
  }, 1000)
}
const hideMemoryNow = () => {
  clearInterval(memoryTimer)
  memoryPhase.value = 'write'
}
const checkMemory = () => {
  if (!memoryInput.value.trim()) return
  memoryResult.value = cleanAnswer(memoryInput.value) === cleanAnswer(memoryQuestion.value.c)
  memoryPhase.value = 'result'
  if (!memoryResult.value) saveMistake({
    type: 'memory', prompt: 'Write this sentence from memory', answer: memoryQuestion.value.c,
    pinyin: memoryQuestion.value.p, english: memoryQuestion.value.en,
  })
}

// Mistake review ------------------------------------------------------------
const reviewIndex = ref(0)
const reviewInput = ref('')
const reviewResult = ref(null)
const currentMistake = computed(() => mistakes.value[reviewIndex.value] || null)
const checkReview = () => {
  if (!currentMistake.value || !reviewInput.value.trim()) return
  reviewResult.value = cleanAnswer(reviewInput.value) === cleanAnswer(currentMistake.value.answer)
  if (reviewResult.value) removeMistake(currentMistake.value)
}
const nextReview = () => {
  if (mistakes.value.length) reviewIndex.value %= mistakes.value.length
  else reviewIndex.value = 0
  reviewInput.value = ''
  reviewResult.value = null
}
watch(currentMistake, () => { reviewInput.value = ''; reviewResult.value = null })

// Daily challenge -----------------------------------------------------------
const todayKey = () => new Date().toLocaleDateString('en-CA')
const stringHash = (value) => [...value].reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) >>> 0, 7)
const seededPick = (list, seed, count) => {
  const copy = [...list]
  let state = seed || 1
  for (let i = copy.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) >>> 0
    const j = state % (i + 1); [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}
const dailyQuestions = computed(() => {
  const seed = stringHash(todayKey())
  return shuffled([
    ...seededPick(uniqueFillPool, seed, 5).map(item => ({ ...item, id: `f-${item.prompt}` })),
    ...seededPick(sentencePool, seed + 19, 5).map(item => ({
      type: 'sentence', id: `s-${item.c}`, prompt: item.en, answer: item.c, pinyin: item.p, english: item.en,
    })),
  ])
})
const dailyIndex = ref(0)
const dailyAnswers = ref({})
const dailyResults = ref({})
const dailyCompleted = computed(() => Object.keys(dailyResults.value).length)
const dailyCorrect = computed(() => Object.values(dailyResults.value).filter(Boolean).length)
const currentDaily = computed(() => dailyQuestions.value[dailyIndex.value] || null)
const saveDaily = () => {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_DAILY, JSON.stringify({
    date: todayKey(), answers: dailyAnswers.value, results: dailyResults.value,
  }))
}
const checkDaily = () => {
  const question = currentDaily.value
  const input = dailyAnswers.value[question.id] || ''
  if (!input.trim()) return
  const correct = cleanAnswer(input) === cleanAnswer(question.answer)
  dailyResults.value[question.id] = correct
  if (!correct) saveMistake(question)
  saveDaily()
}

// Guided mini-diary ---------------------------------------------------------
const diaryPrompts = [
  { zh: '我的一天', en: 'Describe your day', starters: ['今天我…', '然后我…', '晚上我…'] },
  { zh: '我的周末', en: 'Write about your weekend plans', starters: ['这个周末我打算…', '我想跟…一起…', '因为…所以…'] },
  { zh: '一次旅行', en: 'Write about a trip', starters: ['去年我去了…', '那里的天气…', '我觉得…'] },
  { zh: '我的朋友', en: 'Describe a friend', starters: ['我的朋友叫…', '他／她不但…而且…', '我们经常一起…'] },
  { zh: '健康生活', en: 'Write about healthy habits', starters: ['为了身体健康…', '我每天…', '虽然…但是…'] },
]
const diaryPromptIndex = ref(0)
const diaryText = ref('')
const diarySaved = ref(false)
const currentDiaryPrompt = computed(() => diaryPrompts[diaryPromptIndex.value])
const diarySentenceCount = computed(() => diaryText.value.split(/[。！？!?\n]+/u).filter(part => chineseCount(part) > 0).length)
const diaryHskWords = computed(() => uniqueVocabulary.filter(word => word.c.length > 1 && diaryText.value.includes(word.c)).slice(0, 12))
const suggestedWords = computed(() => {
  const offset = diaryPromptIndex.value * 6
  return uniqueVocabulary.slice(offset, offset + 6)
})
const saveDiary = () => {
  if (!import.meta.client) return
  const stored = JSON.parse(localStorage.getItem(STORAGE_DIARY) || '{}')
  stored[todayKey()] = { prompt: currentDiaryPrompt.value.zh, text: diaryText.value }
  localStorage.setItem(STORAGE_DIARY, JSON.stringify(stored))
  diarySaved.value = true
  setTimeout(() => { diarySaved.value = false }, 1800)
}
const addStarter = starter => { diaryText.value += `${diaryText.value.trim() ? '\n' : ''}${starter}` }

const initialise = () => {
  nextCharacter(); nextSentence(); nextMemory()
  if (!import.meta.client) return
  try { mistakes.value = JSON.parse(localStorage.getItem(STORAGE_MISTAKES) || '[]') } catch { mistakes.value = [] }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_DAILY) || '{}')
    if (saved.date === todayKey()) {
      dailyAnswers.value = saved.answers || {}
      dailyResults.value = saved.results || {}
    }
  } catch { /* ignore damaged local progress */ }
  try {
    const diaries = JSON.parse(localStorage.getItem(STORAGE_DIARY) || '{}')
    diaryText.value = diaries[todayKey()]?.text || ''
  } catch { /* ignore damaged local drafts */ }
}
onMounted(initialise)
onBeforeUnmount(() => { clearInterval(examTimer); clearInterval(memoryTimer) })
</script>

<template>
  <main class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-12">
    <section class="rounded-3xl bg-ink text-cream p-5 sm:p-8 shadow-card overflow-hidden relative">
      <div class="absolute -right-8 -top-12 han text-[11rem] text-gold/10 select-none" aria-hidden="true">写</div>
      <div class="relative max-w-3xl">
        <div class="text-[10px] tracking-[0.32em] uppercase text-gold mb-2">HSK Level 3 · 书写</div>
        <h1 class="text-2xl sm:text-4xl font-bold leading-tight">Writing Exam & Practice Lab</h1>
        <p class="mt-3 text-sm sm:text-base text-cream/75 leading-relaxed">
          Practise the official question styles, character recall, complete sentences, memory writing, daily challenges, and guided free writing.
        </p>
      </div>
    </section>

    <nav class="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2" aria-label="Writing practice modes">
      <button v-for="item in modes" :key="item.id" type="button" @click="mode = item.id"
              class="rounded-2xl border p-3 text-left transition min-h-[88px]"
              :class="mode === item.id ? 'bg-gold-deep border-gold-deep text-cream shadow-chip' : 'bg-white border-ink/10 text-ink hover:border-gold'">
        <span class="han block text-2xl font-bold" :class="mode === item.id ? 'text-gold-soft' : 'text-gold-deep'">{{ item.icon }}</span>
        <span class="block text-xs font-bold mt-1">{{ item.label }}</span>
        <span class="block text-[10px] mt-0.5" :class="mode === item.id ? 'text-cream/65' : 'text-ink/45'">{{ item.note }}</span>
      </button>
    </nav>

    <!-- 1. Exam mode -->
    <section v-if="mode === 'exam'" class="mt-5">
      <div v-if="examState === 'idle'" class="rounded-3xl bg-white border border-ink/10 shadow-card p-6 sm:p-10 text-center">
        <div class="han text-6xl text-gold-deep">考试</div>
        <h2 class="mt-3 text-2xl font-bold text-ink">HSK 3 Writing Mock Exam</h2>
        <p class="mt-2 text-sm text-ink/60">5 sentence-order questions + 5 pinyin-to-character questions · 15 minutes</p>
        <button type="button" @click="startExam" class="mt-6 px-6 py-3 rounded-full bg-gold-deep text-cream font-bold hover:bg-ink transition shadow-chip">Start exam</button>
      </div>

      <div v-else-if="examState === 'running' && currentExamQuestion" class="rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
        <div class="flex items-center gap-3 mb-5">
          <div class="flex-1">
            <div class="text-[10px] tracking-widest uppercase text-ink/45">Question {{ examIndex + 1 }} of {{ examQuestions.length }}</div>
            <div class="mt-1 h-2 rounded-full bg-ink/10 overflow-hidden"><div class="h-full bg-gold-deep transition-all" :style="{ width: `${((examIndex + 1) / examQuestions.length) * 100}%` }"></div></div>
          </div>
          <div class="font-mono text-xl font-bold px-3 py-2 rounded-xl" :class="examSeconds < 120 ? 'bg-rose-50 text-rose-700' : 'bg-cream text-ink'">{{ examTime }}</div>
        </div>

        <template v-if="currentExamQuestion.type === 'order'">
          <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Part 1 · Word order</div>
          <p class="mt-2 text-sm text-ink/55">{{ currentExamQuestion.prompt }}</p>
          <div class="mt-5 min-h-[88px] rounded-2xl border-2 border-dashed border-gold/40 bg-cream/40 p-4 flex flex-wrap gap-2 items-center">
            <button v-for="piece in orderedExamPieces" :key="piece.id" type="button" @click="removeExamPiece(piece)" class="han text-xl px-3 py-1.5 rounded-xl bg-white border border-ink/15 hover:border-rose-300">{{ piece.text }}</button>
            <span v-if="!orderedExamPieces.length" class="text-sm italic text-ink/35">Build your sentence here…</span>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button v-for="piece in currentExamQuestion.pieces" :key="piece.id" type="button" @click="chooseExamPiece(piece)" :disabled="currentExamQuestion.chosen.includes(piece.id)"
                    class="han text-xl px-3 py-2 rounded-xl border transition disabled:opacity-25 disabled:cursor-not-allowed bg-white border-gold/40 hover:bg-cream">{{ piece.text }}</button>
          </div>
        </template>

        <template v-else>
          <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Part 2 · Write the character</div>
          <p class="mt-2 text-sm text-ink/55">Write the Chinese character represented by the pinyin.</p>
          <div class="han mt-7 text-2xl sm:text-4xl leading-relaxed text-ink">{{ currentExamQuestion.prompt }}</div>
          <input v-model="currentExamQuestion.response" maxlength="2" lang="zh-CN" inputmode="text" autocomplete="off" placeholder="汉字"
                 class="han mt-6 w-28 text-center text-3xl px-3 py-3 rounded-2xl border-2 border-gold/40 bg-cream/30 focus:border-gold-deep focus:ring-2 focus:ring-gold/20 outline-none" />
        </template>

        <div class="mt-8 pt-5 border-t border-ink/10 flex flex-wrap items-center gap-2">
          <button type="button" @click="examIndex = Math.max(0, examIndex - 1)" :disabled="examIndex === 0" class="px-4 py-2 rounded-full border border-ink/15 font-semibold text-sm disabled:opacity-30">← Previous</button>
          <button v-if="examIndex < examQuestions.length - 1" type="button" @click="examIndex++" class="px-5 py-2 rounded-full bg-ink text-cream font-semibold text-sm">Next →</button>
          <button v-else type="button" @click="finishExam" class="px-5 py-2 rounded-full bg-gold-deep text-cream font-semibold text-sm">Submit exam</button>
          <span class="ml-auto text-xs text-ink/45">{{ examAnswered }} / 10 answered</span>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div class="rounded-3xl bg-white border border-ink/10 shadow-card p-6 sm:p-8 text-center">
          <div class="text-xs tracking-widest uppercase text-ink/45">Your result</div>
          <div class="mt-2 text-6xl font-black" :class="examScore >= 6 ? 'text-emerald-700' : 'text-rose-700'">{{ examScore }}<span class="text-2xl text-ink/30">/10</span></div>
          <p class="mt-2 text-sm text-ink/60">Incorrect answers were added to My Mistakes.</p>
          <button type="button" @click="startExam" class="mt-5 px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Try another exam</button>
        </div>
        <div class="grid gap-3">
          <div v-for="(question, index) in examQuestions" :key="index" class="rounded-2xl bg-white border p-4" :class="question.correct ? 'border-emerald-200' : 'border-rose-200'">
            <div class="text-xs font-bold" :class="question.correct ? 'text-emerald-700' : 'text-rose-700'">{{ question.correct ? '✓ Correct' : '✗ Review' }} · Question {{ index + 1 }}</div>
            <div class="han mt-2 text-xl text-ink">{{ question.answer }}</div>
            <div v-if="!question.correct" class="mt-1 text-xs text-ink/45">Your answer: {{ examQuestionAnswer(question) || 'No answer' }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shared single-question layouts -->
    <section v-else-if="mode === 'character' && characterQuestion" class="mt-5 rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
      <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Missing character</div>
      <p class="mt-2 text-sm text-ink/55">Read the pinyin in brackets and enter the correct character.</p>
      <div class="han mt-8 text-2xl sm:text-4xl leading-relaxed">{{ characterQuestion.prompt }}</div>
      <div class="mt-6 flex flex-wrap gap-2"><input v-model="characterInput" @keyup.enter="checkCharacter" maxlength="2" lang="zh-CN" autocomplete="off" class="han w-32 text-center text-3xl px-3 py-3 rounded-2xl border-2 border-gold/40 outline-none focus:border-gold-deep" placeholder="汉字" /><button @click="checkCharacter" class="px-5 rounded-2xl bg-gold-deep text-cream font-bold">Check</button><button @click="nextCharacter" class="px-4 rounded-2xl border border-ink/15 font-semibold">Next →</button></div>
      <div v-if="characterResult !== null" class="mt-5 rounded-2xl p-4" :class="characterResult ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'">
        <b>{{ characterResult ? 'Correct!' : `Answer: ${characterQuestion.answer}` }}</b><span class="block mt-1 text-sm opacity-75">{{ characterQuestion.english }}</span>
      </div>
    </section>

    <section v-else-if="mode === 'sentence' && sentenceQuestion" class="mt-5 rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
      <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Type the complete sentence</div>
      <div class="mt-5 text-xl sm:text-2xl font-semibold text-ink">{{ sentenceQuestion.en }}</div>
      <div class="mt-1 text-sm text-gold-deep italic">{{ sentenceQuestion.p }}</div>
      <textarea v-model="sentenceInput" @keydown.ctrl.enter="checkSentence" lang="zh-CN" rows="3" placeholder="Type the full Chinese sentence…" class="han mt-6 w-full resize-y text-2xl p-4 rounded-2xl border-2 border-gold/30 outline-none focus:border-gold-deep"></textarea>
      <div class="mt-3 flex flex-wrap gap-2"><button @click="checkSentence" class="px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Check sentence</button><button @click="nextSentence" class="px-4 py-2.5 rounded-full border border-ink/15 font-semibold">Next →</button></div>
      <div v-if="sentenceResult !== null" class="mt-5 rounded-2xl p-4" :class="sentenceResult ? 'bg-emerald-50' : 'bg-rose-50'">
        <div class="font-bold" :class="sentenceResult ? 'text-emerald-800' : 'text-rose-800'">{{ sentenceResult ? '✓ Exact match' : 'Compare with the correct answer:' }}</div>
        <div v-if="!sentenceResult" class="han mt-2 text-2xl"><span v-for="(part, i) in sentenceDiff" :key="i" :class="part.correct ? 'text-ink' : 'text-rose-600 bg-rose-100'">{{ part.char }}</span></div>
      </div>
    </section>

    <section v-else-if="mode === 'memory' && memoryQuestion" class="mt-5 rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
      <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Memory dictation · No audio</div>
      <p class="mt-2 text-sm text-ink/55">Read the sentence, hide it, and type it from memory.</p>
      <div v-if="memoryPhase === 'read' || memoryPhase === 'countdown'" class="mt-6 rounded-2xl bg-cream/60 border border-gold/30 p-6 text-center">
        <div class="han text-2xl sm:text-4xl leading-relaxed">{{ memoryQuestion.c }}</div><div class="mt-2 text-sm text-gold-deep italic">{{ memoryQuestion.p }}</div>
        <button v-if="memoryPhase === 'read'" @click="beginMemory" class="mt-5 px-5 py-2.5 rounded-full bg-ink text-cream font-bold">I’m ready · show for 5 seconds</button>
        <button v-else @click="hideMemoryNow" class="mt-5 px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Hide now ({{ memoryCountdown }})</button>
      </div>
      <div v-else>
        <div class="mt-5 text-lg font-semibold">{{ memoryQuestion.en }}</div>
        <textarea v-model="memoryInput" :disabled="memoryPhase === 'result'" lang="zh-CN" rows="3" placeholder="Write the sentence from memory…" class="han mt-4 w-full text-2xl p-4 rounded-2xl border-2 border-gold/30 outline-none focus:border-gold-deep disabled:bg-ink/5"></textarea>
        <div class="mt-3 flex gap-2"><button v-if="memoryPhase === 'write'" @click="checkMemory" class="px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Check</button><button @click="nextMemory" class="px-4 py-2.5 rounded-full border border-ink/15 font-semibold">New sentence</button></div>
        <div v-if="memoryPhase === 'result'" class="mt-5 rounded-2xl p-4" :class="memoryResult ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'"><b>{{ memoryResult ? '✓ Correct' : 'Correct sentence:' }}</b><div v-if="!memoryResult" class="han mt-2 text-2xl">{{ memoryQuestion.c }}</div></div>
      </div>
    </section>

    <section v-else-if="mode === 'mistakes'" class="mt-5">
      <div v-if="!currentMistake" class="rounded-3xl bg-white border border-ink/10 shadow-card p-10 text-center"><div class="han text-6xl text-emerald-700">好</div><h2 class="mt-3 text-xl font-bold">No mistakes to review</h2><p class="mt-2 text-sm text-ink/50">Incorrect answers from the other modes will appear here.</p></div>
      <div v-else class="rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
        <div class="flex justify-between gap-3"><div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Mistake review</div><div class="text-xs text-ink/45">{{ reviewIndex + 1 }} / {{ mistakes.length }}</div></div>
        <div class="mt-5 text-lg sm:text-xl font-semibold">{{ currentMistake.prompt }}</div><div v-if="currentMistake.pinyin" class="mt-1 text-sm italic text-gold-deep">{{ currentMistake.pinyin }}</div>
        <textarea v-model="reviewInput" @keydown.ctrl.enter="checkReview" lang="zh-CN" rows="2" class="han mt-5 w-full text-2xl p-4 rounded-2xl border-2 border-gold/30 outline-none focus:border-gold-deep" placeholder="Try again…"></textarea>
        <div class="mt-3 flex flex-wrap gap-2"><button @click="checkReview" class="px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Check</button><button @click="reviewIndex = (reviewIndex + 1) % mistakes.length; nextReview()" class="px-4 py-2.5 rounded-full border border-ink/15 font-semibold">Skip →</button></div>
        <div v-if="reviewResult !== null" class="mt-5 rounded-2xl p-4" :class="reviewResult ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'"><b>{{ reviewResult ? 'Correct — removed from your mistake list.' : 'Not yet. Correct answer:' }}</b><div v-if="!reviewResult" class="han mt-2 text-2xl">{{ currentMistake.answer }}</div></div>
      </div>
    </section>

    <section v-else-if="mode === 'daily' && currentDaily" class="mt-5 rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
      <div class="flex flex-wrap items-start justify-between gap-3"><div><div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Daily writing challenge</div><div class="mt-1 text-sm text-ink/45">{{ todayKey() }} · A new set appears each day</div></div><div class="flex gap-2 text-center"><div class="rounded-xl bg-cream px-3 py-2"><b class="block text-lg">{{ dailyCompleted }}/10</b><span class="text-[10px] text-ink/45">done</span></div><div class="rounded-xl bg-emerald-50 px-3 py-2"><b class="block text-lg text-emerald-700">{{ dailyCorrect }}</b><span class="text-[10px] text-ink/45">correct</span></div></div></div>
      <div class="mt-6 flex gap-1"> <button v-for="(question, index) in dailyQuestions" :key="question.id" @click="dailyIndex = index" class="h-2 flex-1 rounded-full" :class="dailyResults[question.id] === true ? 'bg-emerald-500' : dailyResults[question.id] === false ? 'bg-rose-400' : index === dailyIndex ? 'bg-gold-deep' : 'bg-ink/10'" :aria-label="`Question ${index + 1}`"></button></div>
      <div class="mt-6 text-[10px] tracking-widest uppercase text-ink/45">Question {{ dailyIndex + 1 }} · {{ currentDaily.type === 'fill' ? 'Missing character' : 'Full sentence' }}</div>
      <div class="han mt-3 text-2xl sm:text-3xl leading-relaxed">{{ currentDaily.prompt }}</div><div v-if="currentDaily.type === 'sentence'" class="mt-1 text-sm italic text-gold-deep">{{ currentDaily.pinyin }}</div>
      <textarea v-model="dailyAnswers[currentDaily.id]" :disabled="dailyResults[currentDaily.id] !== undefined" lang="zh-CN" rows="2" class="han mt-5 w-full text-2xl p-4 rounded-2xl border-2 border-gold/30 outline-none focus:border-gold-deep disabled:bg-ink/5" placeholder="Write your answer…"></textarea>
      <div class="mt-3 flex flex-wrap gap-2"><button @click="checkDaily" :disabled="dailyResults[currentDaily.id] !== undefined" class="px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold disabled:opacity-40">Check</button><button @click="dailyIndex = (dailyIndex + 1) % dailyQuestions.length" class="px-4 py-2.5 rounded-full border border-ink/15 font-semibold">Next →</button></div>
      <div v-if="dailyResults[currentDaily.id] !== undefined" class="mt-4 rounded-2xl p-4" :class="dailyResults[currentDaily.id] ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'"><b>{{ dailyResults[currentDaily.id] ? '✓ Correct' : `Answer: ${currentDaily.answer}` }}</b></div>
    </section>

    <section v-else-if="mode === 'diary'" class="mt-5 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-4">
      <div class="rounded-3xl bg-white border border-ink/10 shadow-card p-5 sm:p-8">
        <div class="text-xs font-bold uppercase tracking-wider text-gold-deep">Guided mini-diary</div><div class="mt-4 flex items-center gap-3"><button @click="diaryPromptIndex = (diaryPromptIndex - 1 + diaryPrompts.length) % diaryPrompts.length" class="w-9 h-9 rounded-full border border-ink/15">←</button><div class="flex-1"><h2 class="han text-3xl font-bold">{{ currentDiaryPrompt.zh }}</h2><p class="text-sm text-ink/50">{{ currentDiaryPrompt.en }}</p></div><button @click="diaryPromptIndex = (diaryPromptIndex + 1) % diaryPrompts.length" class="w-9 h-9 rounded-full border border-ink/15">→</button></div>
        <div class="mt-5 flex flex-wrap gap-2"><button v-for="starter in currentDiaryPrompt.starters" :key="starter" @click="addStarter(starter)" class="han px-3 py-2 rounded-xl bg-cream border border-gold/30 hover:border-gold-deep">+ {{ starter }}</button></div>
        <textarea v-model="diaryText" @input="diarySaved = false" lang="zh-CN" rows="9" class="han mt-5 w-full text-xl sm:text-2xl leading-relaxed p-4 rounded-2xl border-2 border-gold/30 outline-none focus:border-gold-deep" placeholder="Write at least three Chinese sentences…"></textarea>
        <div class="mt-3 flex flex-wrap items-center gap-2"><button @click="saveDiary" class="px-5 py-2.5 rounded-full bg-gold-deep text-cream font-bold">Save today’s diary</button><span v-if="diarySaved" class="text-sm font-semibold text-emerald-700">✓ Saved on this device</span></div>
      </div>
      <aside class="space-y-4">
        <div class="rounded-3xl bg-white border border-ink/10 shadow-card p-5"><div class="text-[10px] tracking-widest uppercase text-ink/45">Writing check</div><div class="mt-4 space-y-3 text-sm"><div class="flex justify-between"><span>Chinese characters</span><b>{{ chineseCount(diaryText) }}</b></div><div class="flex justify-between"><span>Sentences</span><b :class="diarySentenceCount >= 3 ? 'text-emerald-700' : ''">{{ diarySentenceCount }} / 3</b></div><div class="flex justify-between"><span>HSK 3 words used</span><b>{{ diaryHskWords.length }}</b></div></div><div v-if="diaryHskWords.length" class="mt-4 flex flex-wrap gap-1"><span v-for="word in diaryHskWords" :key="word.c" class="han px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800">{{ word.c }}</span></div></div>
        <div class="rounded-3xl bg-cream/80 border border-gold/30 p-5"><div class="text-[10px] tracking-widest uppercase text-ink/45">Try these words</div><button v-for="word in suggestedWords" :key="word.c" @click="diaryText += word.c" class="mt-2 mr-2 han px-2.5 py-1.5 rounded-lg bg-white border border-gold/20 hover:border-gold-deep" :title="word.en">{{ word.c }}</button><p class="mt-3 text-[11px] text-ink/45">Click a word to add it. Hover to see its meaning.</p></div>
      </aside>
    </section>
  </main>
</template>
