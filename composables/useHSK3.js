import { HSK3_LESSONS_01_05 } from './hsk3/lessons-01-05.js'
import { HSK3_LESSONS_06_10 } from './hsk3/lessons-06-10.js'
import { HSK3_LESSONS_11_15 } from './hsk3/lessons-11-15.js'
import { HSK3_LESSONS_16_20 } from './hsk3/lessons-16-20.js'

export const HSK3_META = {
  han: '三',
  title: 'HSK 3',
  subtitle: 'Intermediate · about 300 target words · 20 lessons',
  intro:
    'Source-aligned study data for HSK Standard Course 3 (BLCU Press): all four texts from every lesson, the numbered New Words in textbook order, starred supplementary vocabulary, and the complete sequence of grammar topics.',
  accent: '#7c5a1e',
}

const BOOK_START_PAGES = [
  1, 11, 20, 29, 37,
  46, 55, 64, 72, 81,
  90, 98, 107, 116, 125,
  135, 143, 151, 159, 168,
]

const lessons = [
  ...HSK3_LESSONS_01_05,
  ...HSK3_LESSONS_06_10,
  ...HSK3_LESSONS_11_15,
  ...HSK3_LESSONS_16_20,
]

export const HSK3_LESSONS = lessons.map((lesson, index) => ({
  ...lesson,
  bookPage: BOOK_START_PAGES[index],
  pdfPage: BOOK_START_PAGES[index] + 16,
  texts: lesson.texts.map((text, textIndex) => {
    if (lesson.no < 11 || textIndex !== 3) return text
    return {
      ...text,
      lines: text.lines.map(line => ({ ...line, s: 'N', speaker: line.speaker || '旁白' })),
    }
  }),
}))

// HSK Standard Course 3 does not include a dedicated lesson-radical directory
// in the current source data. Keep the shared export available so aggregate
// views can consume all HSK levels through the same interface.
export const HSK3_LESSON_RADICALS = []
