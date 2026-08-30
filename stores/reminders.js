import { defineStore } from 'pinia'
import { REMINDER_DEFAULTS, normalizeReminderSettings } from '~/utils/favoriteReminder.js'

const STORAGE_KEY = 'chinese:favorite-reminders:v1'

const notifyChange = () => {
  if (import.meta.client) window.dispatchEvent(new Event('chinese:reminders-changed'))
}

export const useReminderStore = defineStore('reminders', {
  state: () => ({
    settings: { ...REMINDER_DEFAULTS },
    loaded: false,
    permission: 'default',
    notificationsSupported: false,
    backgroundSupported: false,
  }),

  getters: {
    hasValidWindow: state => state.settings.startTime < state.settings.endTime,
  },

  actions: {
    load() {
      if (!import.meta.client || this.loaded) return

      try {
        this.settings = normalizeReminderSettings(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'))
      } catch {
        this.settings = { ...REMINDER_DEFAULTS }
      }

      this.refreshCapabilities()
      this.loaded = true
    },

    refreshCapabilities() {
      if (!import.meta.client) return
      this.notificationsSupported = 'Notification' in window && 'serviceWorker' in navigator
      this.permission = this.notificationsSupported ? Notification.permission : 'unsupported'
    },

    persist() {
      if (!import.meta.client) return
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
      } catch {
        // Settings stay active for the current session when browser storage is unavailable.
      }
      notifyChange()
    },

    setDailyCount(value) {
      this.settings.perDay = Math.min(5, Math.max(1, Number(value) || 1))
      this.persist()
    },

    setTime(key, value) {
      if (!['startTime', 'endTime'].includes(key)) return
      this.settings[key] = value
      this.persist()
    },

    async enable() {
      this.refreshCapabilities()
      if (!this.notificationsSupported) return false

      if (this.permission !== 'granted') this.permission = await Notification.requestPermission()
      if (this.permission !== 'granted') return false

      this.settings.enabled = true
      this.persist()
      return true
    },

    disable() {
      this.settings.enabled = false
      this.persist()
    },
  },
})
