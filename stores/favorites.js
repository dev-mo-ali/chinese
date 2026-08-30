import { defineStore } from 'pinia'
import { favoriteWordKey, UNIQUE_HSK_WORDS } from '~/composables/useHskVocabulary.js'

const STORAGE_KEY = 'chinese:favorite-words:v1'
const VALID_KEYS = new Set(UNIQUE_HSK_WORDS.map(favoriteWordKey))

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    keys: [],
    loaded: false,
  }),

  getters: {
    count: state => state.keys.length,
    isFavorite: state => word => state.keys.includes(favoriteWordKey(word)),
  },

  actions: {
    load() {
      if (!import.meta.client || this.loaded) return

      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
        this.keys = Array.isArray(saved)
          ? [...new Set(saved.filter(key => typeof key === 'string' && VALID_KEYS.has(key)))]
          : []
      } catch {
        this.keys = []
      }

      this.loaded = true
    },

    persist() {
      if (!import.meta.client) return

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.keys))
      } catch {
        // Favorites remain usable for this session when storage is unavailable.
      }
    },

    toggle(word) {
      const key = favoriteWordKey(word)
      const index = this.keys.indexOf(key)

      if (index === -1) this.keys = [...this.keys, key]
      else this.keys = this.keys.filter(savedKey => savedKey !== key)

      this.persist()
    },

    remove(word) {
      const key = favoriteWordKey(word)
      if (!this.keys.includes(key)) return

      this.keys = this.keys.filter(savedKey => savedKey !== key)
      this.persist()
    },

    clear() {
      this.keys = []
      this.persist()
    },
  },
})
