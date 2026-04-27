# 部首 · Chinese Radicals & Strokes

A Nuxt 3 (JavaScript only) app for learning Chinese characters:
- **Radicals** — interactive mind-map of the 100 most common Kangxi radicals.
- **Strokes** — calligraphy specimen book of the 5 stroke families and their 36 variations.

## Stack
- [Nuxt 3](https://nuxt.com) — JavaScript only, no TypeScript
- [Tailwind CSS](https://tailwindcss.com) via `@nuxtjs/tailwindcss`
- Vue 3 SFCs + composables (data lives in `composables/`)
- Google Fonts: Inter, Noto Serif SC, Ma Shan Zheng

## Project structure
```
app.vue               # entry, mounts the default layout + pages
layouts/default.vue   # shared header (tabs) + footer (created by / supervisor)
pages/
  index.vue           # Radicals mind map
  strokes.vue         # Strokes specimen book
composables/
  useRadicals.js      # radicals data + categories + polar helper
  useStrokes.js       # stroke groups data
assets/css/main.css   # Tailwind directives + custom CSS (paper-bg, mi-grid, seal…)
tailwind.config.js    # custom theme (colors, fonts, animations, shadows)
nuxt.config.js        # modules, head, css
```

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build       # SSR build
npm run generate    # static site (suitable for any static host)
npm run preview
```

## Credits
- Created by: **Moh**
- Supervisor: —
- Sources: Mango Languages · Hacking Chinese · Kangxi Dictionary · Dig Mandarin
