// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-26',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
       baseURL: '/chinese/', // ← add this, replace with your actual repo name
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
        { name: 'theme-color', content: '#1a1209' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Long+Cang&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500;700;900&family=ZCOOL+XiaoWei&display=swap',
        },
      ],
    },
  },
})
