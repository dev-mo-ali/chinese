// Shared state + behavior for the HSK course pages (hsk1 / hsk2 / hsk3).
// Encapsulates the active-lesson selector, "reading-practice" reveal toggles
// for text lines and vocab rows, and a smooth-scroll-to-detail helper.
//
// Usage:
//   const page = useHskPage({ scrollTargetId: 'lesson-detail' })
//   const { activeLesson, isRevealed, toggleLine, pickLesson, ... } = page

import { ref, nextTick, onMounted } from 'vue'

export function useHskPage ({ scrollTargetId = 'lesson-detail' } = {}) {
  const route = useRoute()
  const requestedLesson = Number(route.query.lesson)
  const activeLesson = ref(Number.isInteger(requestedLesson) && requestedLesson > 0 ? requestedLesson : 1)
  const showAllVocab = ref(false)

  // Texts: pinyin + English hidden until revealed.
  const revealed = ref(new Set())
  const revealAll = ref(false)
  const lineKey = (ti, i) => `${activeLesson.value}-${ti}-${i}`
  const isRevealed = (ti, i) => revealAll.value || revealed.value.has(lineKey(ti, i))
  const toggleLine = (ti, i) => {
    const k = lineKey(ti, i)
    const s = new Set(revealed.value)
    s.has(k) ? s.delete(k) : s.add(k)
    revealed.value = s
  }
  const resetReveals = () => { revealed.value = new Set() }

  // Vocab: same pattern, keyed per lesson + index.
  const vocabRevealed = ref(new Set())
  const vocabRevealAll = ref(false)
  const vocabKey = (i) => `${activeLesson.value}-${i}`
  const isVocabRevealed = (i) => vocabRevealAll.value || vocabRevealed.value.has(vocabKey(i))
  const toggleVocab = (i) => {
    const k = vocabKey(i)
    const s = new Set(vocabRevealed.value)
    s.has(k) ? s.delete(k) : s.add(k)
    vocabRevealed.value = s
  }
  const resetVocabReveals = () => { vocabRevealed.value = new Set() }

  const search = ref('')

  const pickLesson = (n) => {
    activeLesson.value = n
    showAllVocab.value = false
    revealAll.value = false
    resetReveals()
    vocabRevealAll.value = false
    resetVocabReveals()
    if (import.meta.client) {
      nextTick(() => {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  onMounted(() => {
    if (!route.query.lesson || !route.hash) return
    nextTick(() => document.getElementById(scrollTargetId)?.scrollIntoView({ block: 'start' }))
  })

  return {
    activeLesson,
    showAllVocab,
    revealed,
    revealAll,
    isRevealed,
    toggleLine,
    resetReveals,
    vocabRevealed,
    vocabRevealAll,
    isVocabRevealed,
    toggleVocab,
    resetVocabReveals,
    search,
    pickLesson,
  }
}
