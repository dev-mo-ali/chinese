// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = "/chinese/";

export default defineNuxtConfig({
  compatibilityDate: "2025-04-26",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],

  css: ["~/assets/css/main.css"],

  app: {
    baseURL: "/chinese/", // ← GitHub Pages repo name
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "UTF-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        },
        { name: "theme-color", content: "#1a1209" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: `${baseURL}favicon.svg` },
        {
          rel: "shortcut icon",
          type: "image/svg+xml",
          href: `${baseURL}favicon.svg`,
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: `${baseURL}apple-touch-icon-180x180.png`,
        },
        { rel: "mask-icon", href: `${baseURL}favicon.svg`, color: "#1a1209" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Long+Cang&family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@400;500;700;900&family=ZCOOL+XiaoWei&display=swap",
        },
      ],
    },
  },

  pwa: {
    base: baseURL,
    scope: baseURL,
    registerType: "autoUpdate",
    includeAssets: ["favicon.svg", "robots.txt"],
    manifest: {
      id: baseURL,
      name: "Chinese Learning Companion",
      short_name: "Chinese",
      description:
        "Learn Mandarin Chinese through pinyin, strokes, radicals, HSK lessons, writing practice, and games.",
      lang: "en",
      start_url: baseURL,
      scope: baseURL,
      display: "standalone",
      theme_color: "#1a1209",
      background_color: "#fdfaf2",
      icons: [
        {
          src: `${baseURL}pwa-192x192.png`,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: `${baseURL}pwa-512x512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: `${baseURL}maskable-icon-512x512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,json,ico,png,svg,webmanifest,txt}"],
      navigateFallback: `${baseURL}200.html`,
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
    },
  },

  nitro: {
    prerender: {
      ignore: [`${baseURL}data/licenses/makemeahanzi/COPYING`],
    },
  },
});
