import { defineStore } from "pinia";

const STORAGE_KEY = "chinese:last-route:v1";

function isValidInternalRoute(route) {
  if (typeof route !== "string") return false;
  if (!route.startsWith("/") || route.startsWith("//")) return false;

  try {
    const parsed = new URL(route, window.location.origin);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

export const useLastRouteStore = defineStore("lastRoute", {
  state: () => ({
    lastRoute: "",
  }),

  actions: {
    load() {
      if (!import.meta.client) return "";

      try {
        const route = window.localStorage.getItem(STORAGE_KEY) || "";
        this.lastRoute = isValidInternalRoute(route) ? route : "";
      } catch {
        this.lastRoute = "";
      }

      return this.lastRoute;
    },

    save(route) {
      if (!import.meta.client || !isValidInternalRoute(route)) return;

      this.lastRoute = route;

      try {
        window.localStorage.setItem(STORAGE_KEY, route);
      } catch {
        // Storage can be unavailable in private browsing or restricted contexts.
      }
    },
  },
});
