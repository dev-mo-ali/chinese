---
name: chinese-nuxt
description: Work efficiently in the D:\PROJECTS\chinese Nuxt Chinese-learning app, especially HSK curriculum, topic, radical, PWA, and responsive UI edits. Use for this repo; avoid for unrelated Nuxt projects.
metadata:
  short-description: Efficient Chinese Nuxt project edits
---

# Chinese Nuxt Project

Use this skill for tasks in `D:\PROJECTS\chinese`. The goal is to make precise edits without rereading the whole curriculum or running every check by default.

## Fast Routing

- HSK 1 data lives mainly in `composables/useHSK1.js`; HSK 2 data lives mainly in `composables/useHSK2.js`.
- HSK 3 data is split across `composables/hsk3/lessons-01-05.js`, `lessons-06-10.js`, `lessons-11-15.js`, and `lessons-16-20.js`; `composables/useHSK3.js` only imports, aggregates, and exports the lesson set.
- HSK course pages are `pages/hsk1.vue`, `pages/hsk2.vue`, and `pages/hsk3.vue`.
- Topic registry/content starts in `composables/useTopics.js`; shared topic rendering is in `components/TopicPage.vue`.
- Radical aggregation is in `pages/allradicals.vue`. Use `HSK1_LESSON_RADICALS`, `HSK2_LESSON_RADICALS`, and `HSK3_LESSON_RADICALS`; do not substitute the full Kangxi radical dataset when the request is HSK-only.
- The shared layout and navigation live in `layouts/default.vue`; the top-level shell is `app.vue`.
- PWA and deployment base-path behavior lives in `nuxt.config.js`.

## Token-Saving Defaults

- Start by searching exact filenames, lesson numbers, Chinese strings, slugs, or component names with `rg -n`; avoid opening large HSK files from the top unless needed.
- When editing HSK 3, open only the matching lesson-range file first. Use `composables/useHSK3.js` only to confirm exports or aggregate behavior.
- For UI-only changes, inspect the target Vue file and any directly imported shared component. Do not scan all pages unless the change is explicitly cross-page.
- For data-only changes, preserve the existing object shape and nearby ordering. Do not refactor page layout or shared components unless the user asked for it.
- If the user says "make it md file", create a reusable Markdown artifact in the project rather than only replying in chat.

## Project Invariants

- The app is a Nuxt 4 Chinese-learning site with Tailwind, Pinia, and `@vite-pwa/nuxt`.
- The deployed base path is configured through `baseURL` in `nuxt.config.js`; route restoration/PWA work must preserve path, query, and hash, and must not override an explicit deep link.
- HSK 3 radicals are currently exported as `HSK3_LESSON_RADICALS = []` unless verified source records are added.
- `HanziPractice` is the existing character-practice component; reuse it rather than creating a parallel writer UI.
- Preserve responsive behavior, safe-area placement, hover states, and accessibility labels on layout controls such as the back-to-top button.

## Validation

Choose the smallest useful check:

- HSK 3 curriculum/data edits: run `npm run validate:hsk3`.
- General Nuxt/Vue changes or layout changes: run `npm run build`.
- HSK 3 data plus rendering changes: run both `npm run validate:hsk3` and `npm run build`.
- Local admin seed changes: run `npm run seed:admin` only when the task touches `scripts/seed-admin.mjs` or local SQLite seed behavior.

Known non-blocking output can include Nuxt sourcemap warnings and package export deprecation warnings. Do not call work complete if validation/build was not run; say exactly what was skipped.

## Git

If Git reports dubious ownership in this checkout, use:

```bash
git -c safe.directory=D:/PROJECTS/chinese status
```
