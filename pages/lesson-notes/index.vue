<script setup>
import { LESSON_NOTES, lessonNoteSearchText } from '~/composables/useLessonNotes.js'

useHead({ title: 'Lesson Notes · Chinese study library' })
useSeoMeta({
  description: 'Browse concise, manually curated notes about Chinese characters, language, and culture.',
})

const search = ref('')
const selectedNote = ref('')
const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase())
const filteredNotes = computed(() => {
  if (!normalizedSearch.value) return LESSON_NOTES
  return LESSON_NOTES.filter(note => lessonNoteSearchText(note).includes(normalizedSearch.value))
})

const openSelectedNote = () => {
  if (selectedNote.value) navigateTo(`/lesson-notes/${selectedNote.value}`)
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-5 sm:pt-8 pb-12">
    <article class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card p-5 sm:p-8">
      <div class="grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-8 items-center">
        <div class="mi-grid flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center mx-auto">
          <span class="brush text-6xl sm:text-8xl text-gold-deep" aria-hidden="true" lang="zh-CN">记</span>
        </div>
        <div>
          <div class="text-[10px] tracking-[.3em] uppercase text-gold-deep mb-1">Study library · 学习笔记</div>
          <h1 class="han text-3xl sm:text-4xl font-bold text-ink">Lesson Notes</h1>
          <p class="mt-2 max-w-2xl text-sm sm:text-base text-ink-soft/80 leading-relaxed">
            A growing collection of focused notes about Chinese characters, language, and culture.
            Search the library, then open a note for the complete explanation.
          </p>
          <div class="mt-4 inline-flex rounded-full border border-gold-deep/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold-deep">
            {{ LESSON_NOTES.length }} {{ LESSON_NOTES.length === 1 ? 'note' : 'notes' }}
          </div>
        </div>
      </div>
    </article>

    <div class="mt-6 grid max-w-4xl mx-auto gap-4 sm:grid-cols-2">
      <label>
        <span class="block mb-2 text-[10px] font-bold tracking-[.18em] uppercase text-ink/55">
          Select a lesson note
        </span>
        <span class="group relative block">
          <select
            v-model="selectedNote"
            class="min-h-11 w-full appearance-none rounded-xl border border-gold-deep/30 bg-white/85 py-3 pl-4 pr-12 text-sm text-ink shadow-chip outline-none transition hover:border-gold-deep/50 focus:border-gold-deep focus:ring-2 focus:ring-gold/20"
            @change="openSelectedNote"
          >
            <option value="" disabled>Choose a note…</option>
            <option v-for="note in LESSON_NOTES" :key="note.slug" :value="note.slug">
              {{ note.hero ? `${note.hero} · ` : '' }}{{ note.title }}
            </option>
          </select>
          <span
            class="pointer-events-none absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold-deep/20 bg-gold/10 text-gold-deep transition group-hover:border-gold-deep/35 group-hover:bg-gold/20 group-focus-within:rotate-180"
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </span>
      </label>

      <label for="note-search" class="block mb-2 text-[10px] font-bold tracking-[.18em] uppercase text-ink/55">
        <span class="block mb-2">Search lesson notes</span>
        <span class="relative block">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" aria-hidden="true">⌕</span>
          <input
            id="note-search"
            v-model="search"
            type="search"
            autocomplete="off"
            class="min-h-11 w-full rounded-xl border border-gold-deep/30 bg-white/85 py-3 pl-10 pr-4 text-sm font-normal normal-case tracking-normal text-ink shadow-chip outline-none transition placeholder:text-ink/35 focus:border-gold-deep focus:ring-2 focus:ring-gold/20"
            placeholder="Search characters, pinyin, or a topic…"
          />
        </span>
      </label>
    </div>

    <div v-if="filteredNotes.length" class="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <NuxtLink
        v-for="(note, index) in filteredNotes"
        :key="note.slug"
        :to="`/lesson-notes/${note.slug}`"
        class="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-gold-deep/25 bg-paper shadow-chip transition hover:-translate-y-0.5 hover:border-gold-deep/45 hover:shadow-card"
        :style="{ animation: 'fadeUp .4s both', animationDelay: `${index * 55}ms` }"
      >
        <div class="flex items-start gap-4 p-5">
          <div v-if="note.hero" class="mi-grid flex h-20 w-20 shrink-0 items-center justify-center">
            <span class="brush text-5xl text-gold-deep" lang="zh-CN">{{ note.hero }}</span>
          </div>
          <div class="min-w-0 pt-1">
            <div v-if="note.pinyin" class="text-[10px] font-semibold tracking-[.2em] uppercase text-gold-deep">{{ note.pinyin }}</div>
            <h2 class="mt-1 text-lg font-bold leading-snug text-ink group-hover:text-gold-deep transition">{{ note.title }}</h2>
          </div>
        </div>
        <p class="px-5 text-sm leading-relaxed text-ink-soft/70 flex-1">{{ note.summary }}</p>
        <div class="flex flex-wrap gap-1.5 px-5 pt-4" aria-label="Keywords">
          <span
            v-for="keyword in note.keywords.slice(0, 4)"
            :key="keyword"
            class="rounded-full border border-gold-deep/20 bg-gold/10 px-2 py-1 text-[10px] text-ink/55"
          >{{ keyword }}</span>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-gold-deep/15 px-5 py-3 text-xs font-semibold text-gold-deep">
          <span>{{ note.sections.length }} sections</span>
          <span>Read note <span aria-hidden="true">→</span></span>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="mt-8 rounded-2xl border border-dashed border-gold-deep/30 bg-paper/70 px-5 py-12 text-center">
      <div class="han text-4xl text-gold-deep/50" aria-hidden="true">无</div>
      <h2 class="mt-2 font-bold text-ink">No notes found</h2>
      <p class="mt-1 text-sm text-ink/55">Try another character, pinyin spelling, or topic.</p>
      <button type="button" class="mt-4 text-xs font-bold text-gold-deep underline" @click="search = ''">Clear search</button>
    </div>
  </section>
</template>
