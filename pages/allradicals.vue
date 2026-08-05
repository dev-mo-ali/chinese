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
const filterLevel = ref('all')
const filterLesson = ref('all')
const sortBy = ref('course')
const sortDirection = ref('asc')

const lessonOptions = computed(() => {
  const rows = filterLevel.value === 'all'
    ? allRadicals.value
    : allRadicals.value.filter(radical => radical.level === Number(filterLevel.value))
  return [...new Set(rows.map(radical => radical.lesson))].sort((a, b) => a - b)
})

const filteredRadicals = computed(() => {
  const q = search.value.trim().toLowerCase()
  const rows = allRadicals.value.filter(radical => {
    const matchesSearch = !q
      || radical.r.includes(q)
      || radical.name.toLowerCase().includes(q)
      || radical.cn?.includes(q)
      || radical.en.toLowerCase().includes(q)
      || radical.desc.toLowerCase().includes(q)
      || `hsk ${radical.level}`.includes(q)
      || `lesson ${radical.lesson}`.includes(q)
      || radical.examples.some(example =>
        example.c.includes(q)
        || example.p.toLowerCase().includes(q)
        || example.en.toLowerCase().includes(q)
      )
    const matchesLevel = filterLevel.value === 'all' || radical.level === Number(filterLevel.value)
    const matchesLesson = filterLesson.value === 'all' || radical.lesson === Number(filterLesson.value)
    return matchesSearch && matchesLevel && matchesLesson
  })

  const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })
  const compare = {
    course: (a, b) => a.level - b.level || a.lesson - b.lesson || a.sourceIndex - b.sourceIndex,
    radical: (a, b) => a.r.localeCompare(b.r, 'zh-CN'),
    name: (a, b) => collator.compare(a.name, b.name),
    chineseName: (a, b) => (a.cn || '').localeCompare(b.cn || '', 'zh-CN'),
    english: (a, b) => collator.compare(a.en, b.en),
  }[sortBy.value]
  const direction = sortDirection.value === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => direction * compare(a, b))
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
const radicalTileStyle = level => {
  if (level === 1) return { color: '#14532d', background: '#dcfce7', borderColor: '#86efac' }
  if (level === 2) return { color: '#713f12', background: '#fef3c7', borderColor: '#fcd34d' }
  return { color: '#7c2d12', background: '#ffedd5', borderColor: '#fdba74' }
}
const hasActiveFilters = computed(() =>
  search.value || filterLevel.value !== 'all' || filterLesson.value !== 'all'
)
const resetFilters = () => {
  search.value = ''
  filterLevel.value = 'all'
  filterLesson.value = 'all'
  sortBy.value = 'course'
  sortDirection.value = 'asc'
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <div class="mb-6 border-b border-ink/10 pb-5">
      <div class="flex items-center justify-center gap-3 mb-2">
        <span class="han flex items-center justify-center w-11 h-11 rounded-lg text-2xl font-bold text-white"
              style="background:#312e81;">部</span>
        <h1 class="text-2xl sm:text-3xl font-bold text-ink">All HSK Radicals</h1>
      </div>
      <p class="text-center text-ink-soft max-w-3xl mx-auto">
      Browse and search the radicals introduced in HSK 1, HSK 2, and HSK 3.
      Each entry shows its name, meaning, explanation, examples, lesson, and level.
      </p>
    </div>

    <div class="mb-6 border-y border-indigo-100 bg-indigo-50/40 px-3 py-4">
      <div class="grid sm:grid-cols-2 lg:grid-cols-[minmax(16rem,2fr)_repeat(4,minmax(8rem,1fr))] gap-3 items-end">
        <label class="block">
          <span class="control-label">Search</span>
          <input
            v-model="search"
            type="search"
            autocomplete="off"
            spellcheck="false"
            placeholder="Radical, name, meaning, or example..."
            class="control-field w-full"
          />
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
          <span class="control-label">Sort by</span>
          <select v-model="sortBy" class="control-field w-full">
            <option value="course">Course order</option>
            <option value="radical">Radical</option>
            <option value="name">Pinyin name</option>
            <option value="chineseName">Chinese name</option>
            <option value="english">English</option>
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
          {{ filteredRadicals.length }} of {{ allRadicals.length }} radicals
        </span>
        <button v-if="hasActiveFilters" type="button" @click="resetFilters"
                class="text-xs font-semibold text-indigo-700 hover:text-indigo-950">
          Reset filters
        </button>
      </div>
    </div>

    <!-- Mobile cards avoid a nine-column table on a narrow viewport. -->
    <div class="sm:hidden space-y-3" aria-label="Radical results">
      <article
        v-for="(radical, i) in filteredRadicals"
        :key="`mobile-${rowKey(radical)}`"
        class="rounded-xl border border-indigo-100 bg-white p-4 shadow-chip"
      >
        <div class="flex items-start gap-3">
          <div class="radical-glyph han flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-2 text-4xl font-bold"
               :style="radicalTileStyle(radical.level)">{{ radical.r }}</div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div class="font-semibold text-indigo-700">{{ radical.name }}</div>
                <div v-if="radical.cn" class="han text-sm font-bold text-ink">{{ radical.cn }}</div>
              </div>
              <span class="shrink-0 rounded bg-amber-50 px-2 py-1 text-xs font-semibold"
                    :class="radical.level === 1 ? 'text-green-700' : radical.level === 2 ? 'text-yellow-700' : 'text-amber-800'">
                HSK {{ radical.level }}
              </span>
            </div>
            <div class="mt-1 text-sm font-semibold text-indigo-950">{{ radical.en }}</div>
          </div>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-ink/70">{{ radical.desc }}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-for="(example, ei) in radical.examples" :key="`${example.c}-${ei}`"
                class="inline-flex items-baseline gap-1 rounded-lg border border-indigo-100 bg-indigo-50/50 px-2 py-1.5">
            <span class="han font-bold text-ink">{{ example.c }}</span>
            <span class="text-xs font-medium text-indigo-700">{{ example.p }}</span>
            <span class="text-xs text-ink-soft">· {{ example.en }}</span>
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between gap-3 border-t border-indigo-100 pt-3">
          <span class="text-xs text-ink-soft">Lesson {{ radical.lesson }} · #{{ i + 1 }}</span>
          <button
            type="button"
            @click="toggle(radical)"
            class="min-h-11 shrink-0 rounded-lg border border-indigo-300 px-3 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50"
            :aria-expanded="expanded.has(rowKey(radical))"
          >{{ expanded.has(rowKey(radical)) ? 'Close' : 'Practice' }}</button>
        </div>
        <div v-if="expanded.has(rowKey(radical))" class="mt-4 flex flex-wrap justify-center gap-4 border-t border-indigo-100 pt-4">
          <div v-for="example in radical.examples" :key="example.c" class="flex flex-col items-center gap-1">
            <div class="text-xs text-ink-soft"><span class="han font-bold">{{ example.c }}</span> · {{ example.p }} · {{ example.en }}</div>
            <HanziPractice :char="example.c" :size="160" :accent="accentFor(radical.level)" />
          </div>
        </div>
      </article>
      <div v-if="!filteredRadicals.length" class="rounded-xl bg-white py-8 text-center text-ink-soft">No radicals found.</div>
    </div>

    <div class="hidden sm:block overflow-x-auto rounded-xl border bg-white shadow-card"
         style="border-color:rgba(49,46,129,.18);">
      <table class="min-w-full bg-white">
        <thead>
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
            <tr class="radical-row" :class="i % 2 ? 'bg-indigo-50/30' : ''">
              <td class="px-3 py-2 border-b text-xs text-ink-soft">{{ i + 1 }}</td>
              <td class="px-3 py-2 border-b">
                <div class="radical-glyph han flex items-center justify-center w-14 h-14 rounded-lg border-2 text-4xl font-bold"
                     :style="radicalTileStyle(radical.level)">
                  {{ radical.r }}
                </div>
              </td>
              <td class="px-3 py-2 border-b text-indigo-700 min-w-36">
                <div class="font-semibold">{{ radical.name }}</div>
                <div v-if="radical.cn" class="han mt-0.5 text-sm font-bold text-ink">{{ radical.cn }}</div>
              </td>
              <td class="px-3 py-2 border-b min-w-36">
                <span class="inline-block rounded-md px-2 py-1 text-sm font-semibold bg-indigo-50 text-indigo-950">
                  {{ radical.en }}
                </span>
              </td>
              <td class="px-3 py-2 border-b text-sm text-ink/70 min-w-64">{{ radical.desc }}</td>
              <td class="px-3 py-2 border-b min-w-52">
                <div class="flex flex-col gap-1">
                  <span v-for="(example, ei) in radical.examples" :key="`${example.c}-${ei}`"
                        class="inline-flex items-baseline gap-1.5 whitespace-nowrap">
                    <span class="han inline-flex items-center justify-center min-w-7 h-7 px-1 rounded border bg-white font-bold text-ink"
                          style="border-color:rgba(49,46,129,.2);">{{ example.c }}</span>
                    <span class="text-xs text-indigo-700 font-medium">{{ example.p }}</span>
                    <span class="text-xs text-ink-soft">· {{ example.en }}</span>
                  </span>
                </div>
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
                  class="text-xs font-semibold px-2.5 py-1.5 rounded-md border border-indigo-300 text-indigo-700
                         hover:bg-indigo-50 hover:border-indigo-500 transition whitespace-nowrap"
                  :aria-expanded="expanded.has(rowKey(radical))"
                >
                  {{ expanded.has(rowKey(radical)) ? 'Close' : 'Practice' }}
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
thead {
  color: #312e81;
  background: linear-gradient(180deg, #eef2ff, #e0e7ff);
}
th {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
}
th, td {
  border-color: rgba(49, 46, 129, .12);
}
.radical-row {
  transition: background-color .18s ease;
}
.radical-row:hover {
  background: #f8fafc;
}
.radical-glyph {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .75), 0 2px 8px rgba(49, 46, 129, .1);
}
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
