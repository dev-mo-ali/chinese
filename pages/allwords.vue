<script setup>
import { HSK1_LESSONS } from '~/composables/useHSK1.js'
import { HSK2_LESSONS } from '~/composables/useHSK2.js'
import { HSK3_LESSONS } from '~/composables/useHSK3.js'
import { ref, computed } from 'vue'

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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, i) in filteredWords" :key="word.c + word.p + word.level" :class="i % 2 ? 'bg-indigo-50/30' : ''">
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
          </tr>
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
