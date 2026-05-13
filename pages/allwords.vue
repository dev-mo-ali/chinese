<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'
import { ref, computed } from 'vue'
import HanziPractice from '~/components/HanziPractice.vue'

const allWords = computed(() => {
  const addLevel = (vocab, level) => vocab.map(v => ({ ...v, level }))
  return [
    ...HSK1_LESSONS.flatMap(l => addLevel(l.vocab, 1)),
    ...HSK2_LESSONS.flatMap(l => addLevel(l.vocab, 2)),
    ...HSK3_LESSONS.flatMap(l => addLevel(l.vocab, 3)),
  ]
})

const search = ref('')
const filteredWords = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allWords.value
  return allWords.value.filter(v =>
    v.c.includes(q) ||
    v.p.toLowerCase().includes(q) ||
    v.en.toLowerCase().includes(q)
  )
})

// Track which rows are expanded for writing practice
const HAN_RE = /[\u4e00-\u9fff]/
const expanded = ref(new Set())
const rowKey = (w, i) => `${w.level}-${w.c}-${w.p}-${i}`
const toggle = (key) => {
  const s = new Set(expanded.value)
  if (s.has(key)) s.delete(key); else s.add(key)
  expanded.value = s
}
const charsOf = (str) => [...String(str || '')].filter(ch => HAN_RE.test(ch))
const accentFor = (level) => level === 1 ? '#15803d' : level === 2 ? '#a16207' : '#92400e'
</script>

<template>
  <section class="max-w-5xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <h1 class="text-3xl font-bold mb-2 text-center">All HSK Words</h1>
    <p class="text-center text-ink-soft mb-6">Browse and search all vocabulary from HSK 1, 2, and 3. Each entry shows the character, pinyin, English meaning, part of speech, and level.</p>
    <div class="flex justify-center mb-6">
      <input v-model="search" type="text" placeholder="Search by character, pinyin, or English..." class="border rounded px-3 py-2 w-full max-w-md shadow focus:outline-none focus:ring" />
    </div>
    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full bg-white border">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-3 py-2 border-b text-left">#</th>
            <th class="px-3 py-2 border-b text-left">Character</th>
            <th class="px-3 py-2 border-b text-left">Pinyin</th>
            <th class="px-3 py-2 border-b text-left">English</th>
            <th class="px-3 py-2 border-b text-left">Part of Speech</th>
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
                @click="toggle(rowKey(word, i))"
                :disabled="!charsOf(word.c).length"
                class="text-xs font-semibold px-2 py-1 rounded border border-indigo-300 text-indigo-700 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {{ expanded.has(rowKey(word, i)) ? '✕ Close' : '✎ Practice' }}
              </button>
            </td>
          </tr>
          <tr v-if="expanded.has(rowKey(word, i))" :class="i % 2 ? 'bg-indigo-50/30' : ''">
            <td colspan="7" class="px-3 py-4 border-b">
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
input { font-size: 1rem; }
</style>
