import assert from 'node:assert/strict'
import {
  getDailySlots,
  getIntervalSlots,
  getReminderSlots,
  isValidReminderWindow,
  localDateKey,
  nextDueSlot,
  normalizeReminderSettings,
} from '../utils/favoriteReminder.js'

const date = new Date(2026, 7, 30, 12, 0, 0)
const settings = normalizeReminderSettings({ perDay: 2, startTime: '09:00', endTime: '21:00' })
const slots = getDailySlots(date, settings)

assert.equal(localDateKey(date), '2026-08-30')
assert.equal(isValidReminderWindow('09:00', '21:00'), true)
assert.equal(isValidReminderWindow('21:00', '09:00'), false)
assert.equal(settings.mode, 'daily')
assert.equal(settings.perDay, 2)
assert.equal(slots.length, 2)
assert.equal(slots[0].getHours(), 13)
assert.equal(slots[1].getHours(), 17)

const uncappedSettings = normalizeReminderSettings({ perDay: 8, startTime: '09:00', endTime: '21:00' })
assert.equal(uncappedSettings.perDay, 8)
assert.equal(getDailySlots(date, uncappedSettings).length, 8)

const fiveMinuteSlots = getIntervalSlots(date, normalizeReminderSettings({ mode: 'interval', intervalMinutes: 5, startTime: '09:00', endTime: '09:15' }))
assert.equal(fiveMinuteSlots.length, 4)
assert.equal(fiveMinuteSlots[0].getHours(), 9)
assert.equal(fiveMinuteSlots[0].getMinutes(), 0)
assert.equal(fiveMinuteSlots[3].getHours(), 9)
assert.equal(fiveMinuteSlots[3].getMinutes(), 15)

const hourlySettings = normalizeReminderSettings({ mode: 'interval', intervalMinutes: 60, startTime: '09:00', endTime: '12:00' })
const hourlySlots = getReminderSlots(date, hourlySettings)
assert.equal(hourlySlots.length, 4)
assert.equal(hourlySlots[1].getHours(), 10)
assert.equal(hourlySlots[3].getHours(), 12)

const fallbackInterval = normalizeReminderSettings({ mode: 'interval', intervalMinutes: 'oops' })
assert.equal(fallbackInterval.intervalMinutes, 60)

const due = nextDueSlot({ settings, delivery: { date: '2026-08-30', slots: [0] } }, new Date(2026, 7, 30, 18, 0, 0))
assert.equal(due.index, 1)

const intervalDue = nextDueSlot({ settings: hourlySettings, delivery: { date: '2026-08-30', slots: [0, 1] } }, new Date(2026, 7, 30, 11, 30, 0))
assert.equal(intervalDue.index, 2)

const { selectReminderWords } = await import('../utils/reminderWords.js')
const words = [
  { c: '你', p: 'ni', en: 'you', level: 1, lesson: 1 },
  { c: '你', p: 'ni', en: 'you', level: 2, lesson: 2 },
  { c: '好', p: 'hao', en: 'good', level: 2, lesson: 1 },
]
assert.equal(normalizeReminderSettings({}).source, 'favorites')
assert.deepEqual(normalizeReminderSettings({ units: ['1:1', '1:1', null, '4:1'] }).units, ['1:1'])
assert.deepEqual(selectReminderWords(words, { source: 'units', units: ['2:2'] }, () => false), [words[1]])
assert.equal(selectReminderWords(words, { source: 'units', units: ['1:1', '2:2'] }, () => false).length, 1)
assert.deepEqual(selectReminderWords(words, { source: 'units', units: [] }, () => true), [])
assert.deepEqual(selectReminderWords(words, { source: 'favorites', units: ['1:1'] }, word => word.c === '好'), [words[2]])
console.log('Reminder validation passed.')

const { notificationOptions } = await import('../utils/favoriteReminder.js')
const { readFileSync } = await import('node:fs')
const { runInNewContext } = await import('node:vm')
const wordKey = JSON.stringify(['学习', 'xué xí', 'to study'])
const payload = notificationOptions({ key: wordKey, c: '学习', p: 'xué xí', en: 'to study' }, 0, 'today', 'https://example.com/chinese/')
assert.equal(payload.data.word, wordKey)
const worker = readFileSync(new URL('../service-worker/sw.js', import.meta.url), 'utf8')
const handlerCode = worker.slice(worker.indexOf("self.addEventListener('notificationclick'"))
for (const alreadyOpen of [true, false]) {
  for (const key of [wordKey, undefined]) {
    let handler
    let pending
    const calls = []
    const existing = {
      url: 'https://example.com/chinese/favorites',
      navigate: async url => calls.push(['navigate', url]),
      focus: async () => calls.push(['focus']),
    }
    runInNewContext(handlerCode, { URL, self: {
      registration: { scope: 'https://example.com/chinese/' },
      addEventListener: (_, callback) => { handler = callback },
      clients: {
        matchAll: async () => alreadyOpen ? [existing] : [],
        openWindow: async url => calls.push(['open', url]),
      },
    } })
    handler({
      notification: { data: key ? { word: key } : {}, close: () => calls.push(['close']) },
      waitUntil: promise => { pending = promise },
    })
    await pending
    assert.equal(calls[0][0], 'close')
    assert.equal(calls[1][0], alreadyOpen ? 'navigate' : 'open')
    const target = new URL(calls[1][1])
    assert.equal(target.pathname, '/chinese/reminders')
    assert.equal(target.searchParams.get('word'), key || null)
    if (alreadyOpen) assert.equal(calls[2][0], 'focus')
  }
}
console.log('Notification click validation passed.')

// A notification click mounts the app again; only refresh the schedule.
const plugin = readFileSync(new URL('../plugins/reminders.client.js', import.meta.url), 'utf8')
const pluginCode = plugin.replace(/^import .*$/gm, '').replace('export default ', '')
for (const path of ['/chinese/', '/chinese/reminders', `/chinese/reminders?word=${encodeURIComponent(wordKey)}`]) {
  let mounted
  let refreshes = 0
  let deliveries = 0
  const windowListeners = {}
  const documentListeners = {}
  runInNewContext(pluginCode, {
    defineNuxtPlugin: setup => setup({ hook: (name, callback) => { mounted = callback } }),
    useFavoritesStore: () => ({ load() {} }),
    useReminderStore: () => ({ load() {} }),
    refreshFavoriteReminderSystem: async () => { refreshes++ },
    deliverDueFavoriteReminder: async () => { deliveries++ },
    navigator: { serviceWorker: { ready: Promise.resolve({}) } },
    window: { location: new URL(path, 'https://example.com'), addEventListener: (name, callback) => { windowListeners[name] = callback } },
    document: { visibilityState: 'visible', addEventListener: (name, callback) => { documentListeners[name] = callback } },
  })
  mounted()
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(refreshes, 1)
  assert.equal(deliveries, 0, `Mounting ${path} must not send a reminder`)
  windowListeners.focus()
  documentListeners.visibilitychange()
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(refreshes, 3)
  assert.equal(deliveries, 0, 'Returning to review must not send a reminder')
}
console.log('Reminder app-open regression validation passed.')
// Both notification images must resolve inside the deployment scope.
for (const base of ['https://example.com/', 'https://example.com/chinese/']) {
  const options = notificationOptions({ key: wordKey, c: '中' }, 0, 'today', base)
  for (const [field, filename, size] of [
    ['icon', 'pwa-192x192.png', 192],
    ['badge', 'pwa-64x64.png', 64],
  ]) {
    assert.equal(options[field], new URL(filename, base).href)
    const png = readFileSync(new URL(`../public/${filename}`, import.meta.url))
    assert.equal(png.subarray(1, 4).toString(), 'PNG')
    assert.equal(png.readUInt32BE(16), size)
    assert.equal(png.readUInt32BE(20), size)
  }
}
console.log('Notification icon and badge validation passed.')
