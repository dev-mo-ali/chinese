import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { HSK1_LESSONS } from '../composables/useHSK1.js'
import { HSK2_LESSONS } from '../composables/useHSK2.js'
import { HSK3_LESSONS } from '../composables/useHSK3.js'

const lessons = [HSK1_LESSONS, HSK2_LESSONS, HSK3_LESSONS]
const entries = lessons.flatMap((level, levelIndex) => level.flatMap(lesson =>
  (lesson.vocab || []).map(word => ({ ...word, level: levelIndex + 1 })),
))
const index = {}

for (const word of entries) {
  for (const character of [...word.c]) {
    if (!/\p{Script=Han}/u.test(character)) continue
    index[character] ||= { definition: null, words: [] }
    if (word.c === character && !index[character].definition) {
      index[character].definition = word.en
    }
    if (word.c.length > 1 && !index[character].words.some(item => item.c === word.c)) {
      index[character].words.push({ c: word.c, p: word.p, en: word.en, level: word.level })
    }
  }
}

for (const value of Object.values(index)) {
  value.words = value.words
    .sort((a, b) => a.level - b.level || a.c.length - b.c.length)
    .map(({ level, ...word }) => word)
}

const here = dirname(fileURLToPath(import.meta.url))
await writeFile(
  resolve(here, '../assets/data/hanzi-vocabulary.json'),
  `${JSON.stringify(index, null, 2)}\n`,
)
