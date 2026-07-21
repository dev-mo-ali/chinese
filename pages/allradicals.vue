<script setup>
import { computed, ref } from 'vue'
import HanziPractice from '~/components/HanziPractice.vue'
import { HSK1_LESSON_RADICALS } from '~/composables/useHSK1.js'
import { HSK2_LESSON_RADICALS } from '~/composables/useHSK2.js'
import { HSK3_LESSON_RADICALS } from '~/composables/useHSK3.js'

useHead({ title: 'All HSK Radicals' })

const flattenRadicals = (groups, level) => (groups || []).flatMap(group =>
  group.items.map((radical, index) => ({
    ...radical,
    level,
    lesson: group.lesson,
    sourceIndex: index,
  }))
)

const allRadicals = computed(() => [
  ...flattenRadicals(HSK1_LESSON_RADICALS, 1),
  ...flattenRadicals(HSK2_LESSON_RADICALS, 2),
  ...flattenRadicals(HSK3_LESSON_RADICALS, 3),
])

const search = ref('')
const filteredRadicals = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allRadicals.value

  return allRadicals.value.filter(radical =>
    radical.r.includes(q)
    || radical.name.toLowerCase().includes(q)
    || radical.en.toLowerCase().includes(q)
    || radical.desc.toLowerCase().includes(q)
    || `hsk ${radical.level}`.includes(q)
    || `lesson ${radical.lesson}`.includes(q)
    || radical.examples.some(example =>
      example.c.includes(q)
      || example.p.toLowerCase().includes(q)
      || example.en.toLowerCase().includes(q)
    )
  )
})

const expanded = ref(new Set())
const rowKey = radical => `${radical.level}-${radical.lesson}-${radical.r}-${radical.sourceIndex}`
const toggle = radical => {
  const key = rowKey(radical)
  const next = new Set(expanded.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expanded.value = next
}

const accentFor = level => level === 1 ? '#15803d' : level === 2 ? '#a16207' : '#92400e'
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <h1 class="text-3xl font-bold mb-2 text-center">All HSK Radicals</h1>
    <p class="text-center text-ink-soft mb-6 max-w-3xl mx-auto">
      Browse and search the radicals introduced in HSK 1, HSK 2, and HSK 3.
      Each entry shows its name, meaning, explanation, examples, lesson, and level.
    </p>

    <div class="flex justify-center mb-6">
      <input
        v-model="search"
        type="search"
        autocomplete="off"
        spellcheck="false"
        placeholder="Search by radical, name, meaning, example, lesson, or level..."
        class="border rounded px-3 py-2 w-full max-w-xl shadow focus:outline-none focus:ring"
      />
    </div>

    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full bg-white border">
        <thead class="bg-indigo-50">
          <tr>
            <th class="px-3 py-2 border-b text-left">#</th>
            <th class="px-3 py-2 border-b text-left">Radical</th>
            <th class="px-3 py-2 border-b text-left">Name</th>
            <th class="px-3 py-2 border-b text-left">English</th>
            <th class="px-3 py-2 border-b text-left">Description</th>
            <th class="px-3 py-2 border-b text-left">Examples</th>
            <th class="px-3 py-2 border-b text-left">Lesson</th>
            <th class="px-3 py-2 border-b text-left">Level</th>
            <th class="px-3 py-2 border-b text-left">Write</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(radical, i) in filteredRadicals" :key="rowKey(radical)">
            <tr :class="i % 2 ? 'bg-indigo-50/30' : ''">
              <td class="px-3 py-2 border-b text-xs text-ink-soft">{{ i + 1 }}</td>
              <td class="px-3 py-2 border-b text-2xl han font-bold text-ink">{{ radical.r }}</td>
              <td class="px-3 py-2 border-b text-indigo-700 min-w-36">{{ radical.name }}</td>
              <td class="px-3 py-2 border-b min-w-36">{{ radical.en }}</td>
              <td class="px-3 py-2 border-b text-sm text-ink/70 min-w-64">{{ radical.desc }}</td>
              <td class="px-3 py-2 border-b min-w-52">
                <span v-for="(example, ei) in radical.examples" :key="`${example.c}-${ei}`" class="whitespace-nowrap">
                  <span class="han font-bold">{{ example.c }}</span>
                  <span class="text-xs text-ink-soft"> {{ example.p }} · {{ example.en }}</span><span v-if="ei < radical.examples.length - 1">; </span>
                </span>
              </td>
              <td class="px-3 py-2 border-b text-sm whitespace-nowrap">Lesson {{ radical.lesson }}</td>
              <td class="px-3 py-2 border-b font-semibold">
                <span :class="[
                  radical.level === 1 ? 'text-green-700' : radical.level === 2 ? 'text-yellow-700' : 'text-amber-800',
                  'px-2 py-1 rounded bg-amber-50 text-xs whitespace-nowrap'
                ]">HSK {{ radical.level }}</span>
              </td>
              <td class="px-3 py-2 border-b">
                <button
                  type="button"
                  @click="toggle(radical)"
                  class="text-xs font-semibold px-2 py-1 rounded border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition whitespace-nowrap"
                  :aria-expanded="expanded.has(rowKey(radical))"
                >
                  {{ expanded.has(rowKey(radical)) ? '✕ Close' : '✎ Practice' }}
                </button>
              </td>
            </tr>
            <tr v-if="expanded.has(rowKey(radical))" :class="i % 2 ? 'bg-indigo-50/30' : ''">
              <td colspan="9" class="px-3 py-4 border-b">
                <div class="flex flex-wrap gap-4 justify-center">
                  <div v-for="example in radical.examples" :key="example.c" class="flex flex-col items-center gap-1">
                    <div class="text-xs text-ink-soft">
                      <span class="han font-bold">{{ example.c }}</span> · {{ example.p }} · {{ example.en }}
                    </div>
                    <HanziPractice :char="example.c" :size="160" :accent="accentFor(radical.level)" />
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="!filteredRadicals.length" class="text-center py-8 text-ink-soft">No radicals found.</div>
    </div>

    <p class="mt-8 text-center text-xs text-ink-soft/70 italic">
      Data from the radical sections in the HSK Standard Course datasets. For study and reference only.
    </p>
  </section>
</template>

<style scoped>
th, td { transition: background .2s; }
input { font-size: 1rem; }
</style>
