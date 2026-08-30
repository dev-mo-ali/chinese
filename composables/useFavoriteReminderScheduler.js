import { UNIQUE_HSK_WORDS, favoriteWordKey } from '~/composables/useHskVocabulary.js'
import { useFavoritesStore } from '~/stores/favorites'
import { useReminderStore } from '~/stores/reminders'
import { createReminderState, deliverDueFavoriteReminder, nextScheduledSlot, showFavoriteReminderTest } from '~/utils/favoriteReminder.js'
import { readReminderState, writeReminderState } from '~/utils/reminderStorage.js'

let timerId

const clearSchedule = () => {
  if (timerId) window.clearTimeout(timerId)
  timerId = undefined
}

const reminderWords = favorites => UNIQUE_HSK_WORDS
  .filter(word => favorites.isFavorite(word))
  .map(word => ({ key: favoriteWordKey(word), c: word.c, p: word.p, en: word.en }))

const serviceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null
  const existing = await navigator.serviceWorker.getRegistration()
  if (existing?.active) return existing

  return Promise.race([
    navigator.serviceWorker.ready.catch(() => null),
    new Promise(resolve => window.setTimeout(() => resolve(null), 1500)),
  ])
}

export async function syncFavoriteReminderData() {
  if (!import.meta.client) return

  const favorites = useFavoritesStore()
  const reminders = useReminderStore()
  const previous = await readReminderState()
  await writeReminderState(createReminderState({
    settings: reminders.settings,
    favorites: reminderWords(favorites),
    previous,
  }))
}

export async function refreshBackgroundReminderRegistration() {
  if (!import.meta.client) return

  const reminders = useReminderStore()
  const registration = await serviceWorkerRegistration()
  const periodicSync = registration?.periodicSync
  reminders.backgroundSupported = Boolean(periodicSync)
  if (!periodicSync) return

  try {
    if (reminders.settings.enabled) {
      await periodicSync.register('chinese-favorite-reminder', { minInterval: 60 * 60 * 1000 })
    } else {
      await periodicSync.unregister('chinese-favorite-reminder')
    }
  } catch {
    // Browsers may reject periodic work for quota, battery, or engagement reasons.
  }
}

export async function scheduleFavoriteReminders() {
  if (!import.meta.client) return
  clearSchedule()

  const reminders = useReminderStore()
  if (!reminders.settings.enabled || reminders.permission !== 'granted' || !reminders.hasValidWindow) return

  const state = await readReminderState()
  const next = nextScheduledSlot(state || { settings: reminders.settings }, new Date())
  if (!next) return

  timerId = window.setTimeout(async () => {
    const registration = await serviceWorkerRegistration()
    if (registration) await deliverDueFavoriteReminder(registration)
    await scheduleFavoriteReminders()
  }, Math.max(0, next.getTime() - Date.now()))
}

export async function sendFavoriteReminderTest() {
  await syncFavoriteReminderData()
  const state = await readReminderState()
  const word = state?.favorites?.[state.rotationIndex % state.favorites.length]
  if (!word) return false

  const registration = await serviceWorkerRegistration()
  if (registration) return showFavoriteReminderTest(registration)

  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false
  new Notification('Chinese review', {
    body: `${word.c} · ${word.p} — ${word.en}`,
    tag: 'chinese-favorite-test',
  })
  return true
}

export async function refreshFavoriteReminderSystem() {
  await syncFavoriteReminderData()
  await refreshBackgroundReminderRegistration()
  await scheduleFavoriteReminders()
}
