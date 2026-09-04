<script setup>
import { UNIQUE_HSK_WORDS } from '~/composables/useHskVocabulary.js'
import { useFavoritesStore } from '~/stores/favorites.js'
import { useReminderStore } from '~/stores/reminders.js'
import { sendFavoriteReminderTest } from '~/composables/useFavoriteReminderScheduler.js'
import HanziPractice from '~/components/HanziPractice.vue'

useHead({ title: 'Favorite HSK Words' })

const favorites = useFavoritesStore()
const reminders = useReminderStore()
const search = ref('')
const filterLevel = ref('all')
const testStatus = ref('')
const useCustomInterval = ref(false)
const intervalPresets = [5, 15, 30, 60, 120]

const favoriteWords = computed(() =>
  UNIQUE_HSK_WORDS.filter(word => favorites.isFavorite(word)),
)

const filteredWords = computed(() => {
  const query = search.value.trim().toLowerCase()

  return favoriteWords.value.filter(word => {
    const matchesSearch = !query
      || word.c.includes(query)
      || word.p.toLowerCase().includes(query)
      || word.en.toLowerCase().includes(query)
    const matchesLevel = filterLevel.value === 'all' || word.level === Number(filterLevel.value)
    return matchesSearch && matchesLevel
  })
})

const hasFilters = computed(() => search.value || filterLevel.value !== 'all')
const resetFilters = () => {
  search.value = ''
  filterLevel.value = 'all'
}

const HAN_RE = /[\u4e00-\u9fff]/
const expanded = ref(new Set())
const rowKey = word => `${word.level}-${word.lesson}-${word.sourceIndex}-${word.c}`
const togglePractice = (key) => {
  const next = new Set(expanded.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expanded.value = next
}
const charsOf = value => [...String(value || '')].filter(char => HAN_RE.test(char))
const accentFor = level => level === 1 ? '#15803d' : level === 2 ? '#a16207' : '#92400e'

const clearFavorites = () => {
  if (window.confirm(`Remove all ${favorites.count} favorite words?`)) favorites.clear()
}

const reminderWindowValid = computed(() => reminders.hasValidWindow)
const intervalPresetValue = computed(() => {
  const minutes = Number(reminders.settings.intervalMinutes)
  return useCustomInterval.value || !intervalPresets.includes(minutes) ? 'custom' : String(minutes)
})

const formatInterval = (minutes) => {
  const value = Math.max(1, Math.floor(Number(minutes) || 1))
  if (value % 60 === 0) {
    const hours = value / 60
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }
  return `${value} minute${value === 1 ? '' : 's'}`
}

const scheduleSummary = computed(() => reminders.settings.mode === 'interval'
  ? `Every ${formatInterval(reminders.settings.intervalMinutes)} between ${reminders.settings.startTime} and ${reminders.settings.endTime}.`
  : `${reminders.settings.perDay} reminder${reminders.settings.perDay === 1 ? '' : 's'} between ${reminders.settings.startTime} and ${reminders.settings.endTime}.`)

const reminderStatus = computed(() => {
  if (!favoriteWords.value.length) return 'Add a favorite word to enable reminders.'
  if (!reminders.notificationsSupported) return 'Notifications are not available in this browser.'
  if (reminders.permission === 'denied') return 'Notifications are blocked by this browser.'
  if (!reminderWindowValid.value) return 'Choose an end time after the start time.'
  if (reminders.settings.enabled && reminders.backgroundSupported) return `${scheduleSummary.value} Background delivery is best effort on this device.`
  if (reminders.settings.enabled) return `${scheduleSummary.value} Reminders run while the PWA is open.`
  return `${scheduleSummary.value} Reminders are off.`
})

const setIntervalPreset = (value) => {
  if (value === 'custom') {
    useCustomInterval.value = true
    return
  }

  useCustomInterval.value = false
  reminders.setIntervalMinutes(value)
}
const toggleReminders = async () => {
  if (reminders.settings.enabled) {
    reminders.disable()
    return
  }

  if (!favoriteWords.value.length || !reminderWindowValid.value) return
  await reminders.enable()
}

const sendTest = async () => {
  if (reminders.permission !== 'granted') return
  const sent = await sendFavoriteReminderTest()
  testStatus.value = sent ? 'Test notification sent.' : 'Could not send a test notification. Check browser notification permissions.'
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-3 pb-10 pt-6 sm:px-6">
    <div class="flex flex-col gap-4 border-b border-amber-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div class="text-[10px] font-semibold uppercase tracking-widest text-amber-700">Saved vocabulary</div>
        <h1 class="mt-1 text-3xl font-bold text-ink">Favorite Words</h1>
        <p class="mt-2 max-w-2xl text-sm text-ink-soft">
          Your saved HSK vocabulary stays in this browser.
        </p>
      </div>
      <button
        v-if="favorites.count"
        type="button"
        class="min-h-11 self-start rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 sm:self-auto"
        @click="clearFavorites"
      >
        Clear all
      </button>
    </div>

    <section class="mt-5 border-y border-amber-200 bg-amber-50/40 px-3 py-4" aria-labelledby="review-reminders-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-amber-700">Study rhythm</div>
          <h2 id="review-reminders-title" class="mt-1 text-lg font-bold text-ink">Review reminders</h2>
          <p class="mt-2 max-w-2xl text-xs leading-5 text-ink-soft">
            Pick how often to review favorite words and the time window to receive them. Notifications are saved on this browser and sent on a best-effort basis when the app or PWA can run.
          </p>
        </div>
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-45"
          :class="reminders.settings.enabled ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-amber-700 bg-amber-700 text-white hover:bg-amber-800'"
          :disabled="!favoriteWords.length || (!reminderWindowValid && !reminders.settings.enabled) || (!reminders.notificationsSupported && !reminders.settings.enabled)"
          @click="toggleReminders"
        >
          {{ reminders.settings.enabled ? 'Disable reminders' : 'Enable reminders' }}
        </button>
      </div>

      <div class="mt-4 grid gap-3 md:grid-cols-4">
        <div>
          <span class="control-label">Reminder style</span>
          <div class="grid min-h-11 grid-cols-2 overflow-hidden rounded-lg border border-amber-300 bg-white text-xs font-semibold">
            <button
              type="button"
              class="px-2 transition"
              :class="reminders.settings.mode === 'daily' ? 'bg-amber-700 text-white' : 'text-amber-800 hover:bg-amber-50'"
              @click="reminders.setMode('daily')"
            >
              Daily count
            </button>
            <button
              type="button"
              class="border-l border-amber-200 px-2 transition"
              :class="reminders.settings.mode === 'interval' ? 'bg-amber-700 text-white' : 'text-amber-800 hover:bg-amber-50'"
              @click="reminders.setMode('interval')"
            >
              Interval
            </button>
          </div>
        </div>
        <label v-if="reminders.settings.mode === 'daily'">
          <span class="control-label">Daily reminders</span>
          <input
            :value="reminders.settings.perDay"
            type="number"
            min="1"
            step="1"
            class="control-field w-full"
            @change="reminders.setDailyCount($event.target.value)"
          />
        </label>
        <label v-else>
          <span class="control-label">Every</span>
          <select :value="intervalPresetValue" class="control-field w-full" @change="setIntervalPreset($event.target.value)">
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <label v-if="reminders.settings.mode === 'interval' && intervalPresetValue === 'custom'">
          <span class="control-label">Custom minutes</span>
          <input
            :value="reminders.settings.intervalMinutes"
            type="number"
            min="1"
            step="1"
            class="control-field w-full"
            @change="reminders.setIntervalMinutes($event.target.value)"
          />
        </label>
        <label>
          <span class="control-label">Start time</span>
          <input :value="reminders.settings.startTime" type="time" class="control-field w-full" @change="reminders.setTime('startTime', $event.target.value)" />
        </label>
        <label>
          <span class="control-label">End time</span>
          <input :value="reminders.settings.endTime" type="time" class="control-field w-full" @change="reminders.setTime('endTime', $event.target.value)" />
        </label>
      </div>
      <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p class="text-xs text-ink-soft" aria-live="polite">
          {{ reminderStatus }}
          <span v-if="testStatus" class="mt-1 block">{{ testStatus }}</span>
        </p>
        <button
          type="button"
          class="min-h-11 rounded-lg border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-800 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-45"
          :disabled="!favoriteWords.length || reminders.permission !== 'granted'"
          @click="sendTest"
        >
          Send test
        </button>
      </div>
    </section>

    <div v-if="favoriteWords.length" class="my-5 grid gap-3 rounded-lg border border-amber-200 bg-amber-50/40 p-3 sm:grid-cols-[minmax(15rem,2fr)_minmax(9rem,1fr)_auto] sm:items-end">
      <label>
        <span class="control-label">Search favorites</span>
        <input v-model="search" type="search" class="control-field w-full" placeholder="Character, pinyin, or English..." />
      </label>
      <label>
        <span class="control-label">HSK level</span>
        <select v-model="filterLevel" class="control-field w-full">
          <option value="all">All levels</option>
          <option value="1">HSK 1</option>
          <option value="2">HSK 2</option>
          <option value="3">HSK 3</option>
        </select>
      </label>
      <button
        v-if="hasFilters"
        type="button"
        class="min-h-11 px-2 text-xs font-semibold text-amber-800 hover:text-ink"
        @click="resetFilters"
      >
        Reset filters
      </button>
      <div v-else class="min-h-11 px-2 text-right text-xs font-semibold leading-[2.75rem] text-amber-800">
        {{ favoriteWords.length }} saved
      </div>
    </div>

    <div v-if="filteredWords.length" class="space-y-3 sm:hidden" aria-label="Favorite vocabulary">
      <article v-for="word in filteredWords" :key="rowKey(word)" class="rounded-lg border border-amber-200 bg-white p-4 shadow-chip">
        <div class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span class="han text-2xl font-bold text-ink">{{ word.c }}</span>
              <span class="font-medium text-amber-800">{{ word.p }}</span>
            </div>
            <p class="mt-1 text-sm leading-relaxed text-ink">{{ word.en }}</p>
          </div>
          <FavoriteWordButton :word="word" />
        </div>
        <div class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-amber-100 pt-3 text-xs text-ink-soft">
          <span><span v-if="word.pos">{{ word.pos }} · </span>Lesson {{ word.lesson }}</span>
          <div class="flex flex-wrap items-center justify-end gap-2">
            <span class="rounded bg-amber-50 px-2 py-1 font-semibold text-amber-800">HSK {{ word.level }}</span>
            <button
              type="button"
              class="min-h-10 rounded-lg border border-amber-300 px-3 text-xs font-semibold text-amber-800 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!charsOf(word.c).length"
              :aria-expanded="expanded.has(rowKey(word))"
              @click="togglePractice(rowKey(word))"
            >
              {{ expanded.has(rowKey(word)) ? 'Close' : 'Practice' }}
            </button>
          </div>
        </div>
        <div v-if="expanded.has(rowKey(word))" class="mt-4 flex flex-wrap justify-center gap-4 border-t border-amber-100 pt-4">
          <HanziPractice
            v-for="(char, charIndex) in charsOf(word.c)"
            :key="charIndex"
            :char="char"
            :size="160"
            :accent="accentFor(word.level)"
          />
        </div>
      </article>
    </div>

    <div v-if="filteredWords.length" class="hidden overflow-x-auto rounded-lg border border-amber-200 shadow-sm sm:block">
      <table class="min-w-full bg-white">
        <thead class="bg-amber-50 text-left text-xs text-amber-950">
          <tr>
            <th class="px-3 py-3">Character</th>
            <th class="px-3 py-3">Pinyin</th>
            <th class="px-3 py-3">English</th>
            <th class="px-3 py-3">Part of Speech</th>
            <th class="px-3 py-3">Lesson</th>
            <th class="px-3 py-3">Level</th>
            <th class="px-3 py-3 text-center">Practice</th>
            <th class="px-3 py-3 text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(word, index) in filteredWords" :key="rowKey(word)">
          <tr :class="index % 2 ? 'bg-amber-50/30' : ''">
            <td class="border-t border-amber-100 px-3 py-2 text-lg font-bold text-ink">{{ word.c }}</td>
            <td class="border-t border-amber-100 px-3 py-2 text-amber-800">{{ word.p }}</td>
            <td class="border-t border-amber-100 px-3 py-2 text-sm">{{ word.en }}</td>
            <td class="border-t border-amber-100 px-3 py-2 text-xs text-ink-soft">{{ word.pos }}</td>
            <td class="whitespace-nowrap border-t border-amber-100 px-3 py-2 text-sm">Lesson {{ word.lesson }}</td>
            <td class="border-t border-amber-100 px-3 py-2 text-xs font-semibold text-amber-800">HSK {{ word.level }}</td>
            <td class="border-t border-amber-100 px-3 py-2 text-center">
              <button
                type="button"
                class="min-h-10 rounded-lg border border-amber-300 px-3 text-xs font-semibold text-amber-800 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="!charsOf(word.c).length"
                :aria-expanded="expanded.has(rowKey(word))"
                @click="togglePractice(rowKey(word))"
              >
                {{ expanded.has(rowKey(word)) ? 'Close' : 'Practice' }}
              </button>
            </td>
            <td class="border-t border-amber-100 px-3 py-2"><FavoriteWordButton :word="word" class="mx-auto" /></td>
          </tr>
          <tr v-if="expanded.has(rowKey(word))" :class="index % 2 ? 'bg-amber-50/30' : ''">
            <td colspan="8" class="border-t border-amber-100 px-3 py-4">
              <div class="flex flex-wrap justify-center gap-4">
                <HanziPractice
                  v-for="(char, charIndex) in charsOf(word.c)"
                  :key="charIndex"
                  :char="char"
                  :size="160"
                  :accent="accentFor(word.level)"
                />
              </div>
            </td>
          </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-if="!favoriteWords.length" class="py-16 text-center">
      <div class="han text-5xl text-amber-500" aria-hidden="true">☆</div>
      <h2 class="mt-4 text-xl font-bold text-ink">No favorite words yet</h2>
      <p class="mx-auto mt-2 max-w-md text-sm text-ink-soft">Star words while studying a lesson or browsing the complete vocabulary list.</p>
      <NuxtLink to="/allwords" class="mt-5 inline-flex min-h-11 items-center rounded-lg bg-amber-700 px-4 text-sm font-semibold text-white transition hover:bg-amber-800">
        Browse all words
      </NuxtLink>
    </div>

    <div v-else-if="!filteredWords.length" class="py-12 text-center">
      <h2 class="text-lg font-bold text-ink">No favorites match these filters</h2>
      <button type="button" class="mt-3 min-h-11 px-3 text-sm font-semibold text-amber-800" @click="resetFilters">Reset filters</button>
    </div>
  </section>
</template>

<style scoped>
.control-label {
  display: block;
  margin-bottom: .3rem;
  color: #92400e;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.control-field {
  min-height: 2.75rem;
  border: 1px solid rgba(180, 83, 9, .3);
  border-radius: .5rem;
  background: #fff;
  padding: .5rem .65rem;
  color: #1f2937;
  font-size: .875rem;
}
.control-field:focus {
  border-color: #b45309;
  outline: 2px solid rgba(217, 119, 6, .2);
  outline-offset: 1px;
}
</style>
