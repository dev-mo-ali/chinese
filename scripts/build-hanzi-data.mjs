import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HSK1_LESSONS } from '../composables/useHSK1.js'
import { HSK2_LESSONS } from '../composables/useHSK2.js'
import { HSK3_LESSONS } from '../composables/useHSK3.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const inputPath = resolve(root, 'tmp/makemeahanzi-dictionary.txt')
const outputPath = resolve(root, 'assets/data/hanzi-breakdowns.json')
const sourceUrl = 'https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt'
const hanziPattern = /\p{Script=Han}/u

const lessons = [...HSK1_LESSONS, ...HSK2_LESSONS, ...HSK3_LESSONS]
const wanted = new Set(
  lessons
    .flatMap(lesson => lesson.vocab)
    .flatMap(word => [...word.c])
    .filter(character => hanziPattern.test(character)),
)

let source
try {
  source = await readFile(inputPath, 'utf8')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
  const response = await fetch(sourceUrl)
  if (!response.ok) {
    throw new Error(`Could not download Make Me a Hanzi data (${response.status})`)
  }
  source = await response.text()
}
const records = new Map()

for (const line of source.split(/\r?\n/)) {
  if (!line.trim()) continue
  const entry = JSON.parse(line)
  if (!wanted.has(entry.character)) continue

  const decomposition = entry.decomposition?.includes('？')
    ? null
    : entry.decomposition || null
  const etymology = entry.etymology
    ? {
        type: entry.etymology.type || null,
        hint: entry.etymology.hint || null,
        semantic: entry.etymology.semantic || null,
        phonetic: entry.etymology.phonetic || null,
      }
    : null

  records.set(entry.character, {
    pinyin: entry.pinyin || [],
    radical: entry.radical || null,
    decomposition,
    etymology,
  })
}

const output = Object.fromEntries(
  [...records.entries()].sort(([a], [b]) => a.localeCompare(b, 'zh-CN')),
)

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

console.log(
  `Wrote ${records.size}/${wanted.size} HSK characters to ${outputPath}`,
)
