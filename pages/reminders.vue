<script setup>
import HanziPractice from '~/components/HanziPractice.vue'
import { favoriteWordKey } from '~/composables/useHskVocabulary.js'
import { HSK_WORDS } from '~/composables/useHskVocabulary.js'
import { selectReminderWords } from '~/utils/reminderWords.js'
import { useFavoritesStore } from '~/stores/favorites.js'
import { useReminderStore } from '~/stores/reminders.js'
import { sendFavoriteReminderTest } from '~/composables/useFavoriteReminderScheduler.js'
useHead({ title: 'Review Reminders' })
const favorites = useFavoritesStore()
const reminders = useReminderStore()
const testStatus = ref('')
const useCustomInterval = ref(false)
const intervalPresets = [5, 15, 30, 60, 120]
const selectedWords = computed(() => selectReminderWords(HSK_WORDS, reminders.settings, word => favorites.isFavorite(word)))
const route = useRoute()
const router = useRouter()
const showSettings = ref(!route.query.word)
const showWriting = ref(false)
const speechStatus = ref('')
const reviewWord = computed(() => {
  const key = route.query.word
  if (typeof key !== 'string') return null
  return HSK_WORDS.find(word => favoriteWordKey(word) === key)
    || HSK_WORDS.find(word => word.c === key) || null
})
const nextWord = computed(() => {
  const words = selectedWords.value
  const index = words.findIndex(word => reviewWord.value && favoriteWordKey(word) === favoriteWordKey(reviewWord.value))
  return words.length ? words[(index + 1) % words.length] : null
})
const openNextWord = () => {
  if (nextWord.value) router.replace({ query: { ...route.query, word: favoriteWordKey(nextWord.value) } })
}
const stopSpeech = () => {
  if (import.meta.client && 'speechSynthesis' in window) window.speechSynthesis.cancel()
}
const playPronunciation = () => {
  if (!reviewWord.value) return
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    speechStatus.value = 'Pronunciation is not available in this browser.'
    return
  }
  stopSpeech()
  const speech = new SpeechSynthesisUtterance(reviewWord.value.c)
  speech.lang = 'zh-CN'
  speech.rate = 0.8
  const voices = window.speechSynthesis.getVoices()
  const voice = voices.find(voice => /^zh[-_]CN$/i.test(voice.lang))
    || voices.find(voice => /^zh([-_]|$)/i.test(voice.lang))
  if (voice) speech.voice = voice
  speech.onstart = () => { speechStatus.value = 'Playing pronunciation…' }
  speech.onend = () => { speechStatus.value = '' }
  speech.onerror = event => {
    if (!['canceled', 'interrupted'].includes(event.error)) speechStatus.value = 'Could not play pronunciation. Check that a Chinese voice is available on your device.'
  }
  window.speechSynthesis.speak(speech)
}
watch(() => route.query.word, () => {
  stopSpeech()
  speechStatus.value = ''
  showWriting.value = false
  showSettings.value = !route.query.word
})
onBeforeUnmount(stopSpeech)
const levels = [1, 2, 3].map(level => ({ level, units: [...new Set(HSK_WORDS.filter(word => word.level === level).map(word => word.lesson))].sort((a, b) => a - b) }))
const unitKey = (level, unit) => `${level}:${unit}`
const hasUnit = (level, unit) => reminders.settings.units.includes(unitKey(level, unit))
const allUnits = group => group.units.every(unit => hasUnit(group.level, unit))
const someUnits = group => group.units.some(unit => hasUnit(group.level, unit))
const toggleUnits = (keys, checked) => {
  const units = new Set(reminders.settings.units)
  keys.forEach(key => checked ? units.add(key) : units.delete(key))
  reminders.setUnits([...units])
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
  if (!selectedWords.value.length) return 'Select units or add favorite words to enable reminders.'
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

  if (!selectedWords.value.length || !reminderWindowValid.value) return
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
    <h1 class="text-3xl font-bold text-ink">Reminders</h1>
    <section v-if="reviewWord" class="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-8" aria-labelledby="review-word-title">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-semibold text-amber-800">Your word to review</p>
        <button type="button" class="min-h-11 px-3 text-sm text-amber-800 underline" :aria-expanded="showSettings" aria-controls="reminder-settings" @click="showSettings = !showSettings">Settings</button>
      </div>
      <div class="py-6 text-center" aria-live="polite">
        <h2 id="review-word-title" lang="zh-CN" class="break-words text-5xl font-bold leading-normal text-ink sm:text-6xl">{{ reviewWord.c }}</h2>
        <p class="mt-3 text-xl text-amber-800">{{ reviewWord.p }}</p>
        <p class="mt-3 text-lg text-ink">{{ reviewWord.en }}</p>
      </div>
      <div class="flex flex-wrap justify-center gap-3">
        <button type="button" class="min-h-11 rounded-lg bg-amber-700 px-4 font-semibold text-white hover:bg-amber-800" @click="playPronunciation">🔊 Play pronunciation</button>
        <button type="button" class="min-h-11 rounded-lg border border-amber-300 bg-white px-4 text-amber-900" :aria-expanded="showWriting" aria-controls="review-writing" @click="showWriting = !showWriting">Practice writing</button>
        <button type="button" class="min-h-11 rounded-lg border border-amber-300 bg-white px-4 text-amber-900" :aria-pressed="favorites.isFavorite(reviewWord)" @click="favorites.toggle(reviewWord)">{{ favorites.isFavorite(reviewWord) ? 'Remove favorite' : 'Add favorite' }}</button>
        <button type="button" class="min-h-11 rounded-lg border border-amber-300 bg-white px-4 text-amber-900 disabled:opacity-45" :disabled="!nextWord || favoriteWordKey(nextWord) === favoriteWordKey(reviewWord)" @click="openNextWord">Next word →</button>
      </div>
      <p class="mt-3 text-center text-sm text-ink-soft" role="status">{{ speechStatus }}</p>
      <p v-if="!selectedWords.length" class="mt-2 text-center text-sm text-ink-soft">Choose words in Settings to continue reviewing.</p>
      <div v-if="showWriting" id="review-writing" class="mt-5 flex flex-wrap justify-center gap-4">
        <HanziPractice v-for="(char, index) in [...reviewWord.c].filter(char => /\p{Script=Han}/u.test(char))" :key="favoriteWordKey(reviewWord) + index" :char="char" :size="160" />
      </div>
    </section>
    <p v-else-if="route.query.word" class="mt-4 text-sm text-ink-soft">This word is no longer available. Choose your reminder words below.</p>
    <div v-show="showSettings || !reviewWord" id="reminder-settings">
    <p class="mt-2 text-sm text-ink-soft">Choose your review words and schedule. Settings stay in this browser.</p>

    <fieldset class="mt-5 rounded-lg border border-amber-200 p-4">
      <legend class="px-2 font-bold text-ink">Words to review</legend>
      <label class="flex min-h-11 items-center gap-3 text-sm font-semibold">
        <input type="checkbox" class="h-5 w-5 accent-amber-700" :checked="reminders.settings.source === 'favorites'" @change="reminders.setSource($event.target.checked ? 'favorites' : 'units')" />
        Only favorites
      </label>
      <p class="mt-1 text-xs text-ink-soft">Uncheck to choose HSK levels and units. Checking a level selects all its units.</p>
      <div v-if="reminders.settings.source === 'units'" class="mt-4 grid gap-4 sm:grid-cols-3">
        <fieldset v-for="group in levels" :key="group.level" class="rounded-lg border border-amber-200 p-3">
          <legend class="px-1">
            <label class="flex min-h-11 items-center gap-2 font-semibold">
              <input type="checkbox" class="h-5 w-5 accent-amber-700" :checked="allUnits(group)" :indeterminate="someUnits(group) && !allUnits(group)" @change="toggleUnits(group.units.map(unit => unitKey(group.level, unit)), $event.target.checked)" />
              HSK {{ group.level }}
            </label>
          </legend>
          <div class="grid grid-cols-2 gap-x-2">
            <label v-for="unit in group.units" :key="unit" class="flex min-h-11 items-center gap-2 text-sm">
              <input type="checkbox" class="h-4 w-4 accent-amber-700" :checked="hasUnit(group.level, unit)" @change="toggleUnits([unitKey(group.level, unit)], $event.target.checked)" />
              Unit {{ unit }}
            </label>
          </div>
        </fieldset>
      </div>
      <p class="mt-3 text-sm font-semibold text-amber-800" aria-live="polite">{{ selectedWords.length }} words selected</p>
      <NuxtLink v-if="reminders.settings.source === 'favorites'" to="/favorites" class="inline-flex min-h-11 items-center text-sm text-amber-800 underline">Manage favorites</NuxtLink>
    </fieldset>
    <section class="mt-5 border-y border-amber-200 bg-amber-50/40 px-3 py-4" aria-labelledby="review-reminders-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-amber-700">Study rhythm</div>
          <h2 id="review-reminders-title" class="mt-1 text-lg font-bold text-ink">Review reminders</h2>
          <p class="mt-2 max-w-2xl text-xs leading-5 text-ink-soft">
            Pick how often to review your selected words and the time window to receive them. Notifications are saved on this browser and sent on a best-effort basis when the app or PWA can run.
          </p>
        </div>
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-45"
          :class="reminders.settings.enabled ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-amber-700 bg-amber-700 text-white hover:bg-amber-800'"
          :disabled="(!selectedWords.length && !reminders.settings.enabled) || (!reminderWindowValid && !reminders.settings.enabled) || (!reminders.notificationsSupported && !reminders.settings.enabled)"
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
          :disabled="!selectedWords.length || reminders.permission !== 'granted'"
          @click="sendTest"
        >
          Send test
        </button>
      </div>
    </section>

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
