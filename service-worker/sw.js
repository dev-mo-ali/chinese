import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, createHandlerBoundToURL, getCacheKeyForURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { deliverDueFavoriteReminder } from '../utils/favoriteReminder.js'

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
const navigationFallbackUrl = new URL('200.html', self.registration.scope).href
if (getCacheKeyForURL(navigationFallbackUrl)) {
  registerRoute(new NavigationRoute(createHandlerBoundToURL(navigationFallbackUrl)))
}

self.addEventListener('periodicsync', event => {
  if (event.tag === 'chinese-favorite-reminder') {
    event.waitUntil(deliverDueFavoriteReminder(self.registration))
  }
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil((async () => {
    const target = new URL('favorites', self.registration.scope).href
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const existing = clients.find(client => client.url.startsWith(self.registration.scope))

    if (existing) {
      if ('navigate' in existing) await existing.navigate(target)
      return existing.focus()
    }

    return self.clients.openWindow(target)
  })())
})
