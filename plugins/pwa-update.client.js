export default defineNuxtPlugin(() => {
  if (!("serviceWorker" in navigator)) return

  let refreshing = false
  let hadController = Boolean(navigator.serviceWorker.controller)

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) {
      hadController = true
      return
    }

    if (refreshing) return
    refreshing = true
    window.location.reload()
  })

  const checkForUpdate = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      await registration?.update()
    } catch {
      // Browsers can reject update checks while offline or during startup.
    }
  }

  window.addEventListener("load", () => setTimeout(checkForUpdate, 1000), { once: true })
  window.addEventListener("online", checkForUpdate)
  window.setInterval(checkForUpdate, 60 * 60 * 1000)

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdate()
  })
})
