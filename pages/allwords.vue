<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'
import { ref, computed } from 'vue'
import HanziPractice from '~/components/HanziPractice.vue'

const allWords = computed(() => {
  const addLevel = (vocab, level, lesson) => vocab.map((v, sourceIndex) => ({
    ...v,
    level,
    lesson,
    sourceIndex,
  }))
  return [
    ...HSK1_LESSONS.flatMap(l => addLevel(l.vocab, 1, l.no)),
    ...HSK2_LESSONS.flatMap(l => addLevel(l.vocab, 2, l.no)),
    ...HSK3_LESSONS.flatMap(l => addLevel(l.vocab, 3, l.no)),
  ]
})

const search = ref('')
const filterLevel = ref('all')
const filterLesson = ref('all')
const filterPos = ref('all')
const sortBy = ref('course')
const sortDirection = ref('asc')

const lessonOptions = computed(() => {
  const rows = filterLevel.value === 'all'
    ? allWords.value
    : allWords.value.filter(word => word.level === Number(filterLevel.value))
  return [...new Set(rows.map(word => word.lesson))].sort((a, b) => a - b)
})

const posOptions = computed(() =>
  [...new Set(allWords.value.map(word => word.pos).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b))
)

const filteredWords = computed(() => {
  const q = search.value.trim().toLowerCase()
  const rows = allWords.value.filter(word => {
    const matchesSearch = !q
      || word.c.includes(q)
      || word.p.toLowerCase().includes(q)
      || word.en.toLowerCase().includes(q)
    const matchesLevel = filterLevel.value === 'all' || word.level === Number(filterLevel.value)
    const matchesLesson = filterLesson.value === 'all' || word.lesson === Number(filterLesson.value)
    const matchesPos = filterPos.value === 'all' || word.pos === filterPos.value
    return matchesSearch && matchesLevel && matchesLesson && matchesPos
  })

  const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })
  const compare = {
    course: (a, b) => a.level - b.level || a.lesson - b.lesson || a.sourceIndex - b.sourceIndex,
    character: (a, b) => a.c.localeCompare(b.c, 'zh-CN'),
    pinyin: (a, b) => collator.compare(a.p, b.p),
    english: (a, b) => collator.compare(a.en, b.en),
    pos: (a, b) => collator.compare(a.pos || '', b.pos || ''),
  }[sortBy.value]
  const direction = sortDirection.value === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => direction * compare(a, b))
})

// Track which rows are expanded for writing practice
const HAN_RE = /[\u4e00-\u9fff]/
const expanded = ref(new Set())
const rowKey = w => `${w.level}-${w.lesson}-${w.sourceIndex}-${w.c}`
const toggle = (key) => {
  const s = new Set(expanded.value)
  if (s.has(key)) s.delete(key); else s.add(key)
  expanded.value = s
}
const charsOf = (str) => [...String(str || '')].filter(ch => HAN_RE.test(ch))
const accentFor = (level) => level === 1 ? '#15803d' : level === 2 ? '#a16207' : '#92400e'
const hasActiveFilters = computed(() =>
  search.value || filterLevel.value !== 'all' || filterLesson.value !== 'all' || filterPos.value !== 'all'
)
const resetFilters = () => {
  search.value = ''
  filterLevel.value = 'all'
  filterLesson.value = 'all'
  filterPos.value = 'all'
  sortBy.value = 'course'
  sortDirection.value = 'asc'
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <h1 class="text-3xl font-bold mb-2 text-center">All HSK Words</h1>
    <p class="text-center text-ink-soft mb-6">Browse and search all vocabulary from HSK 1, 2, and 3. Each entry shows the character, pinyin, English meaning, part of speech, and level.</p>
    <div class="mb-6 border-y border-indigo-100 bg-indigo-50/40 px-3 py-4">
      <div class="grid sm:grid-cols-2 lg:grid-cols-[minmax(15rem,2fr)_repeat(5,minmax(7rem,1fr))] gap-3 items-end">
        <label class="block">
          <span class="control-label">Search</span>
          <input v-model="search" type="search" placeholder="Character, pinyin, or English..."
                 class="control-field w-full" />
        </label>
        <label class="block">
          <span class="control-label">HSK level</span>
          <select v-model="filterLevel" class="control-field w-full" @change="filterLesson = 'all'">
            <option value="all">All levels</option>
            <option value="1">HSK 1</option>
            <option value="2">HSK 2</option>
            <option value="3">HSK 3</option>
          </select>
        </label>
        <label class="block">
          <span class="control-label">Lesson</span>
          <select v-model="filterLesson" class="control-field w-full">
            <option value="all">All lessons</option>
            <option v-for="lesson in lessonOptions" :key="lesson" :value="String(lesson)">Lesson {{ lesson }}</option>
          </select>
        </label>
        <label class="block">
          <span class="control-label">Part of speech</span>
          <select v-model="filterPos" class="control-field w-full">
            <option value="all">All types</option>
            <option v-for="pos in posOptions" :key="pos" :value="pos">{{ pos }}</option>
          </select>
        </label>
        <label class="block">
          <span class="control-label">Sort by</span>
          <select v-model="sortBy" class="control-field w-full">
            <option value="course">Course order</option>
            <option value="character">Chinese</option>
            <option value="pinyin">Pinyin</option>
            <option value="english">English</option>
            <option value="pos">Part of speech</option>
          </select>
        </label>
        <label class="block">
          <span class="control-label">Direction</span>
          <select v-model="sortDirection" class="control-field w-full">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div class="mt-3 flex items-center justify-between gap-3">
        <span class="text-xs font-semibold text-indigo-950">
          {{ filteredWords.length }} of {{ allWords.length }} words
        </span>
        <button v-if="hasActiveFilters" type="button" @click="resetFilters"
                class="text-xs font-semibold text-indigo-700 hover:text-indigo-950">
          Reset filters
        </button>
      </div>
    </div>
    <!-- Mobile cards keep every field readable without a sideways table scroll. -->
    <div class="sm:hidden space-y-3" aria-label="Vocabulary results">
      <article
        v-for="(word, i) in filteredWords"
        :key="`mobile-${rowKey(word)}`"
        class="rounded-xl border border-indigo-100 bg-white p-4 shadow-chip"
      >
        <div class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span class="han text-2xl font-bold text-ink">{{ word.c }}</span>
              <span class="font-medium text-indigo-700">{{ word.p }}</span>
            </div>
            <p class="mt-1 text-sm leading-relaxed text-ink">{{ word.en }}</p>
          </div>
          <span :class="[
            word.level === 1 ? 'text-green-700' : word.level === 2 ? 'text-yellow-700' : 'text-amber-800',
            'shrink-0 rounded bg-amber-50 px-2 py-1 text-xs font-semibold'
          ]">HSK {{ word.level }}</span>
        </div>
        <div class="mt-3 flex items-center justify-between gap-3 border-t border-indigo-100 pt-3">
          <div class="text-xs text-ink-soft">
            <span v-if="word.pos">{{ word.pos }} · </span>Lesson {{ word.lesson }} · #{{ i + 1 }}
          </div>
          <button
            type="button"
            @click="toggle(rowKey(word))"
            :disabled="!charsOf(word.c).length"
            class="min-h-11 shrink-0 rounded-lg border border-indigo-300 px-3 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
            :aria-expanded="expanded.has(rowKey(word))"
          >{{ expanded.has(rowKey(word)) ? 'Close' : 'Practice' }}</button>
        </div>
        <div v-if="expanded.has(rowKey(word))" class="mt-4 flex flex-wrap justify-center gap-4 border-t border-indigo-100 pt-4">
          <HanziPractice
            v-for="(ch, ci) in charsOf(word.c)"
            :key="ci"
            :char="ch"
            :size="160"
            :accent="accentFor(word.level)"
          />
        </div>
      </article>
      <div v-if="!filteredWords.length" class="rounded-xl bg-white py-8 text-center text-ink-soft">No words found.</div>
    </div>

    <div class="hidden sm:block overflow-x-auto rounded shadow">
      <table class="min-w-full bg-white border">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-3 py-2 border-b text-left">#</th>
            <th class="px-3 py-2 border-b text-left">Character</th>
            <th class="px-3 py-2 border-b text-left">Pinyin</th>
            <th class="px-3 py-2 border-b text-left">English</th>
            <th class="px-3 py-2 border-b text-left">Part of Speech</th>
            <th class="px-3 py-2 border-b text-left">Lesson</th>
            <th class="px-3 py-2 border-b text-left">Level</th>
            <th class="px-3 py-2 border-b text-left">Write</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(word, i) in filteredWords" :key="rowKey(word, i)">
          <tr :class="i % 2 ? 'bg-indigo-50/30' : ''">
            <td class="px-3 py-2 border-b text-xs text-ink-soft">{{ i + 1 }}</td>
            <td class="px-3 py-2 border-b text-lg font-bold text-ink">{{ word.c }}</td>
            <td class="px-3 py-2 border-b text-indigo-700">{{ word.p }}</td>
            <td class="px-3 py-2 border-b">{{ word.en }}</td>
            <td class="px-3 py-2 border-b text-xs text-ink-soft">{{ word.pos }}</td>
            <td class="px-3 py-2 border-b text-sm whitespace-nowrap">Lesson {{ word.lesson }}</td>
            <td class="px-3 py-2 border-b font-semibold">
              <span :class="[
                word.level === 1 ? 'text-green-700' : word.level === 2 ? 'text-yellow-700' : 'text-amber-800',
                'px-2 py-1 rounded bg-amber-50 text-xs'
              ]">
                HSK {{ word.level }}
              </span>
            </td>
            <td class="px-3 py-2 border-b">
              <button
                type="button"
                @click="toggle(rowKey(word))"
                :disabled="!charsOf(word.c).length"
                class="text-xs font-semibold px-2 py-1 rounded border border-indigo-300 text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {{ expanded.has(rowKey(word)) ? 'Close' : 'Practice' }}
              </button>
            </td>
          </tr>
          <tr v-if="expanded.has(rowKey(word))" :class="i % 2 ? 'bg-indigo-50/30' : ''">
            <td colspan="8" class="px-3 py-4 border-b">
              <div class="flex flex-wrap gap-4 justify-center">
                <div v-for="(ch, ci) in charsOf(word.c)" :key="ci" class="flex flex-col items-center gap-1">
                  <HanziPractice :char="ch" :size="160" :accent="accentFor(word.level)" />
                </div>
              </div>
            </td>
          </tr>
          </template>
        </tbody>
      </table>
      <div v-if="!filteredWords.length" class="text-center py-8 text-ink-soft">No words found.</div>
    </div>
    <p class="mt-8 text-center text-xs text-ink-soft/70 italic">
      Data from HSK Standard Course textbooks 1-3. <br> For study and reference only.
    </p>
  </section>
</template>

<style scoped>
th, td { transition: background .2s; }
.control-label {
  display: block;
  margin-bottom: .3rem;
  color: #4338ca;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.control-field {
  min-height: 2.5rem;
  border: 1px solid rgba(67, 56, 202, .25);
  border-radius: .5rem;
  background: #fff;
  padding: .5rem .65rem;
  color: #1f2937;
  font-size: .875rem;
}
.control-field:focus {
  border-color: #4f46e5;
  outline: 2px solid rgba(99, 102, 241, .2);
  outline-offset: 1px;
}
</style>
