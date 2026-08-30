import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'

export const favoriteWordKey = word => JSON.stringify([
  String(word?.c || '').trim(),
  String(word?.p || '').trim(),
  String(word?.en || '').trim(),
])

const normalizeLessons = (lessons, level) => lessons.flatMap(lesson =>
  lesson.vocab.map((word, sourceIndex) => ({
    ...word,
    level,
    lesson: lesson.no,
    sourceIndex,
  })),
)

export const HSK_WORDS = [
  ...normalizeLessons(HSK1_LESSONS, 1),
  ...normalizeLessons(HSK2_LESSONS, 2),
  ...normalizeLessons(HSK3_LESSONS, 3),
]

const uniqueWords = new Map()
for (const word of HSK_WORDS) {
  const key = favoriteWordKey(word)
  if (!uniqueWords.has(key)) uniqueWords.set(key, word)
}

export const UNIQUE_HSK_WORDS = [...uniqueWords.values()]
