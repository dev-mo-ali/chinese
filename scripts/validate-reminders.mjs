import assert from 'node:assert/strict'
import {
  getDailySlots,
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
assert.equal(settings.perDay, 2)
assert.equal(slots.length, 2)
assert.equal(slots[0].getHours(), 13)
assert.equal(slots[1].getHours(), 17)

const due = nextDueSlot({ settings, delivery: { date: '2026-08-30', slots: [0] } }, new Date(2026, 7, 30, 18, 0, 0))
assert.equal(due.index, 1)

console.log('Reminder validation passed.')
