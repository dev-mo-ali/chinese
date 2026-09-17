import { defineStore } from 'pinia'

const STORAGE_KEY = 'chinese:studied-units:v1'
const validKey = key => typeof key === 'string' && /^hsk-standard:[1-3]:[1-9]\d*$/.test(key)
const unitKey = (level, lesson) => `hsk-standard:${level}:${lesson}`

export const useUnitCompletionStore = defineStore('unitCompletion', {
  state: () => ({ keys: [], loaded: false }),
  getters: {
    isStudied: state => (level, lesson) => state.keys.includes(unitKey(level, lesson)),
  },
  actions: {
    load() {
      if (!import.meta.client || this.loaded) return
      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
        this.keys = Array.isArray(saved) ? [...new Set(saved.filter(validKey))] : []
      } catch {
        this.keys = []
      }
      this.loaded = true
    },
    toggle(level, lesson) {
      if (!import.meta.client || !this.loaded) return false
      const key = unitKey(level, lesson)
      if (!validKey(key)) return false
      const next = this.keys.includes(key)
        ? this.keys.filter(saved => saved !== key)
        : [...this.keys, key]
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        this.keys = next
        return true
      } catch {
        return false
      }
    },
  },
})
