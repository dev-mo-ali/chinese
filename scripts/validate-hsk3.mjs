import { HSK3_LESSONS } from '../composables/useHSK3.js'

const EXPECTED_TITLES = [
  '周末你有什么打算',
  '他什么时候回来',
  '桌子上放着很多饮料',
  '她总是笑着跟客人说话',
  '我最近越来越胖了',
  '怎么突然找不到了',
  '我跟她都认识五年了',
  '你去哪儿我就去哪儿',
  '她的汉语说得跟中国人一样好',
  '数学比历史难多了',
  '别忘了把空调关了',
  '把重要的东西放在我这儿吧',
  '我是走回来的',
  '你把水果拿过来',
  '其他都没什么问题',
  '我现在累得下了班就想睡觉',
  '谁都有办法看好你的“病”',
  '我相信他们会同意的',
  '你没看出来吗',
  '我被他影响了',
]

const EXPECTED_BOOK_PAGES = [
  1, 11, 20, 29, 37,
  46, 55, 64, 72, 81,
  90, 98, 107, 116, 125,
  135, 143, 151, 159, 168,
]

const EXPECTED_VOCAB_COUNTS = [
  15, 18, 17, 16, 13,
  15, 12, 17, 13, 15,
  19, 14, 15, 17, 21,
  16, 16, 17, 14, 14,
]

const EXPECTED_NOTE_COUNTS = [
  3, 3, 3, 2, 2,
  3, 3, 2, 2, 2,
  2, 2, 2, 2, 3,
  3, 2, 2, 2, 2,
]

const EXPECTED_SUPPLEMENTARY = new Map([
  [2, ['太太', '秘书']],
  [6, ['眼镜', '睡着']],
  [8, ['可乐']],
  [10, ['中介']],
  [13, ['生活']],
  [15, ['举行', '各']],
  [16, ['词语']],
  [17, ['情况']],
  [18, ['特点']],
  [20, ['真正']],
])

const errors = []
const assert = (condition, message) => {
  if (!condition) errors.push(message)
}
const present = value => typeof value === 'string' && value.trim().length > 0

assert(HSK3_LESSONS.length === 20, `expected 20 lessons, found ${HSK3_LESSONS.length}`)

for (const [index, lesson] of HSK3_LESSONS.entries()) {
  const label = `L${String(index + 1).padStart(2, '0')}`

  assert(lesson.no === index + 1, `${label}: lesson number is ${lesson.no}`)
  assert(lesson.han === EXPECTED_TITLES[index], `${label}: title does not match the contents page`)
  assert(lesson.bookPage === EXPECTED_BOOK_PAGES[index], `${label}: wrong source-book page`)
  assert(lesson.pdfPage === EXPECTED_BOOK_PAGES[index] + 16, `${label}: wrong PDF page`)
  assert(present(lesson.pinyin), `${label}: missing title pinyin`)
  assert(present(lesson.en), `${label}: missing English title`)
  assert(present(lesson.focus), `${label}: missing grammar focus`)
  assert(lesson.texts?.length === 4, `${label}: expected 4 source texts, found ${lesson.texts?.length ?? 0}`)
  assert(lesson.vocab?.length === EXPECTED_VOCAB_COUNTS[index], `${label}: expected ${EXPECTED_VOCAB_COUNTS[index]} vocabulary entries, found ${lesson.vocab?.length ?? 0}`)
  assert(lesson.notes?.length === EXPECTED_NOTE_COUNTS[index], `${label}: expected ${EXPECTED_NOTE_COUNTS[index]} notes, found ${lesson.notes?.length ?? 0}`)

  for (const [textIndex, text] of (lesson.texts ?? []).entries()) {
    const textLabel = `${label} text ${textIndex + 1}`
    assert(present(text.title), `${textLabel}: missing title`)
    assert(Array.isArray(text.lines) && text.lines.length > 0, `${textLabel}: missing lines`)
    for (const [lineIndex, line] of (text.lines ?? []).entries()) {
      const lineLabel = `${textLabel}, line ${lineIndex + 1}`
      assert(['A', 'B', 'N'].includes(line.s), `${lineLabel}: unsupported speaker code ${line.s}`)
      assert(present(line.c), `${lineLabel}: missing Chinese`)
      assert(present(line.p), `${lineLabel}: missing pinyin`)
      assert(present(line.en), `${lineLabel}: missing English`)
    }
  }

  for (const [wordIndex, word] of (lesson.vocab ?? []).entries()) {
    const wordLabel = `${label} vocabulary ${wordIndex + 1}`
    assert(present(word.c), `${wordLabel}: missing Chinese`)
    assert(present(word.p), `${wordLabel}: missing pinyin`)
    assert(typeof word.pos === 'string', `${wordLabel}: missing part-of-speech field`)
    assert(present(word.en), `${wordLabel}: missing English`)
  }

  const actualSupplementary = (lesson.vocab ?? [])
    .filter(word => word.supplementary)
    .map(word => word.c)
  const expectedSupplementary = EXPECTED_SUPPLEMENTARY.get(lesson.no) ?? []
  assert(
    JSON.stringify(actualSupplementary) === JSON.stringify(expectedSupplementary),
    `${label}: supplementary vocabulary should be [${expectedSupplementary.join(', ')}], found [${actualSupplementary.join(', ')}]`,
  )

  for (const [noteIndex, note] of (lesson.notes ?? []).entries()) {
    const noteLabel = `${label} note ${noteIndex + 1}`
    assert(note && typeof note === 'object' && !Array.isArray(note), `${noteLabel}: note is not an object`)
    assert(present(note?.title), `${noteLabel}: missing title`)
    assert(present(note?.summary), `${noteLabel}: missing summary`)
    assert(Array.isArray(note?.examples) && note.examples.length > 0, `${noteLabel}: missing examples`)
    for (const [exampleIndex, example] of (note?.examples ?? []).entries()) {
      const exampleLabel = `${noteLabel}, example ${exampleIndex + 1}`
      assert(present(example.c), `${exampleLabel}: missing Chinese`)
      assert(present(example.p), `${exampleLabel}: missing pinyin`)
      assert(present(example.en), `${exampleLabel}: missing English`)
    }
  }
}

const vocabulary = HSK3_LESSONS.flatMap(lesson => lesson.vocab)
const totals = {
  lessons: HSK3_LESSONS.length,
  texts: HSK3_LESSONS.reduce((sum, lesson) => sum + lesson.texts.length, 0),
  lines: HSK3_LESSONS.reduce(
    (sum, lesson) => sum + lesson.texts.reduce((textSum, text) => textSum + text.lines.length, 0),
    0,
  ),
  vocabulary: vocabulary.length,
  coreVocabulary: vocabulary.filter(word => !word.supplementary).length,
  supplementaryVocabulary: vocabulary.filter(word => word.supplementary).length,
  notes: HSK3_LESSONS.reduce((sum, lesson) => sum + lesson.notes.length, 0),
}

assert(totals.texts === 80, `expected 80 texts, found ${totals.texts}`)
assert(totals.vocabulary === 314, `expected 314 numbered vocabulary entries, found ${totals.vocabulary}`)
assert(totals.coreVocabulary === 301, `expected 301 core entries, found ${totals.coreVocabulary}`)
assert(totals.supplementaryVocabulary === 13, `expected 13 starred entries, found ${totals.supplementaryVocabulary}`)
assert(totals.notes === 47, `expected 47 grammar notes, found ${totals.notes}`)

if (errors.length) {
  console.error(`HSK 3 validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`HSK 3 validation passed: ${JSON.stringify(totals)}`)
