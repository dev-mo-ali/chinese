import { useFavoritesStore } from '~/stores/favorites'

export default defineNuxtPlugin(() => {
  useFavoritesStore().load()
})
