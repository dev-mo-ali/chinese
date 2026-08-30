import { useFavoritesStore } from '~/stores/favorites'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    // localStorage is intentionally read after Vue has hydrated the SSR markup.
    useFavoritesStore().load()
  })
})
