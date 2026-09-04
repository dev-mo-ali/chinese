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

console.log('Reminder validation passed.')
