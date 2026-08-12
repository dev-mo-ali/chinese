<script setup>
import { lessonNoteBySlug } from '~/composables/useLessonNotes.js'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const note = lessonNoteBySlug(slug)

if (!note) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Lesson note not found',
  })
}

useHead({ title: `${note.title} · Lesson Notes` })
useSeoMeta({ description: note.summary })
</script>

<template>
  <section class="max-w-4xl mx-auto px-3 sm:px-6 pt-5 sm:pt-8 pb-12">
    <NuxtLink
      to="/lesson-notes"
      class="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep hover:text-ink transition"
    >
      <span aria-hidden="true">←</span> All lesson notes
    </NuxtLink>

    <article class="overflow-hidden rounded-3xl border border-gold-deep/30 bg-paper shadow-card">
      <header class="relative overflow-hidden border-b border-gold-deep/20 bg-gradient-to-br from-gold/10 via-paper to-red-50 p-5 sm:p-8">
        <div class="absolute -right-8 -top-12 han text-[13rem] leading-none text-gold-deep/[.045] select-none" aria-hidden="true">
          {{ note.hero || '记' }}
        </div>
        <div class="relative grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-7 items-center">
          <div v-if="note.hero" class="mi-grid flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center mx-auto">
            <span class="brush text-7xl sm:text-8xl text-gold-deep" lang="zh-CN">{{ note.hero }}</span>
          </div>
          <div>
            <div class="text-[10px] font-semibold tracking-[.25em] uppercase text-gold-deep">
              Lesson note <span v-if="note.pinyin">· {{ note.pinyin }}</span>
            </div>
            <h1 class="mt-2 text-2xl sm:text-4xl font-bold leading-tight text-ink">{{ note.title }}</h1>
            <p v-if="note.subtitle" class="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft/70">{{ note.subtitle }}</p>
            <div class="mt-4 flex flex-wrap gap-1.5" aria-label="Keywords">
              <span
                v-for="keyword in note.keywords"
                :key="keyword"
                class="rounded-full border border-gold-deep/20 bg-white/55 px-2.5 py-1 text-[10px] text-ink/55"
              >{{ keyword }}</span>
            </div>
          </div>
        </div>
      </header>

      <div class="p-4 sm:p-7">
        <LessonNoteRenderer :note="note" />
      </div>
    </article>
  </section>
</template>
