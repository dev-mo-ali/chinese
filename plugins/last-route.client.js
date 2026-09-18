import { useLastRouteStore } from "~/stores/lastRoute";

function isPlainHome(route) {
  return route.path === "/" && Object.keys(route.query || {}).length === 0 && !route.hash;
}

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const store = useLastRouteStore();

  // Restore after hydration so startup navigation cannot overwrite the saved route.
  nuxtApp.hook("app:mounted", async () => {
    await router.isReady();

    const savedRoute = store.load();
    const currentRoute = router.currentRoute.value;

    if (isPlainHome(currentRoute) && savedRoute && savedRoute !== "/") {
      try {
        await router.replace(savedRoute);
      } catch {
        store.save("/");
      }
    } else if (!isPlainHome(currentRoute)) {
      store.save(currentRoute.fullPath);
    }

    router.afterEach((to, from, failure) => {
      if (!failure) store.save(to.fullPath);
    });
  });
});
