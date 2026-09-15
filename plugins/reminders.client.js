import { useFavoritesStore } from '~/stores/favorites'
import { useReminderStore } from '~/stores/reminders'
import { refreshFavoriteReminderSystem } from '~/composables/useFavoriteReminderScheduler'

export default defineNuxtPlugin((nuxtApp) => {
  const favorites = useFavoritesStore()
  const reminders = useReminderStore()

  nuxtApp.hook('app:mounted', () => {
    favorites.load()
    reminders.load()

    const refresh = () => { refreshFavoriteReminderSystem() }
    window.addEventListener('chinese:favorites-changed', refresh)
    window.addEventListener('chinese:reminders-changed', refresh)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refresh()
    })

    refresh()
  })
})
