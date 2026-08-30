import { readReminderState, writeReminderState } from './reminderStorage.js'

export const REMINDER_DEFAULTS = Object.freeze({
  enabled: false,
  perDay: 2,
  startTime: '09:00',
  endTime: '21:00',
})

export const localDateKey = (date = new Date()) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
].join('-')

export const timeToMinutes = (time) => {
  const match = /^(\d{2}):(\d{2})$/.exec(String(time || ''))
  if (!match) return Number.NaN

  const hours = Number(match[1])
  const minutes = Number(match[2])
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60
    ? hours * 60 + minutes
    : Number.NaN
}

export const isValidReminderWindow = (startTime, endTime) => {
  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)
  return Number.isFinite(start) && Number.isFinite(end) && start < end
}

export const normalizeReminderSettings = (settings = {}) => {
  const perDay = Math.min(5, Math.max(1, Number(settings.perDay) || REMINDER_DEFAULTS.perDay))
  const startTime = settings.startTime || REMINDER_DEFAULTS.startTime
  const endTime = settings.endTime || REMINDER_DEFAULTS.endTime

  return {
    enabled: Boolean(settings.enabled),
    perDay,
    startTime,
    endTime,
  }
}

export const getDailySlots = (date, settings) => {
  const normalized = normalizeReminderSettings(settings)
  if (!isValidReminderWindow(normalized.startTime, normalized.endTime)) return []

  const start = timeToMinutes(normalized.startTime)
  const end = timeToMinutes(normalized.endTime)
  const span = end - start

  return Array.from({ length: normalized.perDay }, (_, index) => {
    const minute = Math.round(start + span * ((index + 1) / (normalized.perDay + 1)))
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(minute / 60), minute % 60, 0, 0)
  })
}

export const createReminderState = ({ settings, favorites, previous = null }) => ({
  settings: normalizeReminderSettings(settings),
  favorites: Array.isArray(favorites) ? favorites : [],
  rotationIndex: Number.isInteger(previous?.rotationIndex) ? previous.rotationIndex : 0,
  delivery: previous?.delivery || { date: '', slots: [] },
})

const currentDelivery = (state, now) => {
  const date = localDateKey(now)
  return state.delivery?.date === date
    ? state.delivery
    : { date, slots: [] }
}

export const nextDueSlot = (state, now = new Date()) => {
  const delivery = currentDelivery(state, now)
  const slots = getDailySlots(now, state.settings)
  const delivered = new Set(delivery.slots || [])
  const index = slots.findIndex((slot, slotIndex) => slot <= now && !delivered.has(slotIndex))
  return index === -1 ? null : { index, slot: slots[index], delivery }
}

export const nextScheduledSlot = (state, now = new Date()) => {
  const slots = getDailySlots(now, state.settings)
  const upcoming = slots.find(slot => slot > now)
  if (upcoming) return upcoming

  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDailySlots(tomorrow, state.settings)[0] || null
}

const notificationOptions = (word, slotIndex, date) => ({
  body: `${word.c} · ${word.p} — ${word.en}`,
  tag: `chinese-favorite-${date}-${slotIndex}`,
  renotify: false,
  data: { path: 'favorites' },
})

export async function deliverDueFavoriteReminder(registration, now = new Date()) {
  const state = await readReminderState()
  if (!state?.settings?.enabled || !state.favorites?.length || typeof registration?.showNotification !== 'function') return false

  const due = nextDueSlot(state, now)
  if (!due) return false

  const word = state.favorites[state.rotationIndex % state.favorites.length]
  const nextState = {
    ...state,
    rotationIndex: state.rotationIndex + 1,
    delivery: {
      ...due.delivery,
      slots: [...due.delivery.slots, due.index],
    },
  }

  await writeReminderState(nextState)
  await registration.showNotification('Chinese review', notificationOptions(word, due.index, due.delivery.date))
  return true
}

export async function showFavoriteReminderTest(registration) {
  const state = await readReminderState()
  if (!state?.favorites?.length || typeof registration?.showNotification !== 'function') return false

  const word = state.favorites[state.rotationIndex % state.favorites.length]
  await registration.showNotification('Chinese review', {
    ...notificationOptions(word, 'test', 'test'),
    tag: 'chinese-favorite-test',
  })
  return true
}
