<script setup>
import { HSK3_META, HSK3_LESSONS } from '~/composables/useHSK3.js'
import { useHskPage } from '~/composables/useHskPage.js'
import { posColor } from '~/composables/useHSK.js'

useHead({ title: 'HSK 3 · Standard Course · 20 Lessons' })

const {
  activeLesson, showAllVocab,
  revealed, revealAll, isRevealed, toggleLine,
  vocabRevealed, vocabRevealAll, isVocabRevealed, toggleVocab,
  search, pickLesson,
} = useHskPage({ scrollTargetId: 'lesson-detail' })

const open = reactive({ lessons: true, detail: true, lessonTexts: true, lessonVocab: true, lessonNotes: true, vocab: false })
const toggle = (k) => { open[k] = !open[k] }

const current = computed(() => HSK3_LESSONS.find(l => l.no === activeLesson.value))

const totalVocab = computed(() => HSK3_LESSONS.reduce((s, l) => s + l.vocab.length, 0))

const allVocab = computed(() =>
  HSK3_LESSONS.flatMap(l => l.vocab.map(v => ({ ...v, lesson: l.no })))
)

const filteredVocab = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allVocab.value
  return allVocab.value.filter(v =>
    v.c.includes(q) ||
    v.p.toLowerCase().includes(q) ||
    v.en.toLowerCase().includes(q)
  )
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">

    <!-- HERO -->
    <article
      class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card
             grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8
             p-5 sm:p-8 mb-6"
    >
      <div class="ribbon hidden sm:flex items-center justify-center text-gold-soft text-[10px] tracking-[0.4em] uppercase">
        HSK · Level 3
      </div>

      <div class="flex items-center justify-center">
        <div class="brush leading-none select-none"
             :style="{ fontSize: 'clamp(110px, 20vw, 200px)', color: HSK3_META.accent }">
          {{ HSK3_META.han }}
        </div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">{{ HSK3_META.subtitle }}</div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3">{{ HSK3_META.title }}</h1>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">{{ HSK3_META.intro }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ HSK3_LESSONS.length }} lessons
          </span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ totalVocab }} new words
          </span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            <span lang="zh-CN">把 · 被 · 越…越 · 着</span>
          </span>
        </div>
      </div>

      <div class="seal hidden sm:flex">
        <span class="han">HSK</span>
        <span class="han">{{ HSK3_META.han }}</span>
      </div>
    </article>

    <!-- LESSON GRID · foldable -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-6"
             style="background:#fff; border-color:rgba(124,90,30,.22);"
    >
      <header @click="toggle('lessons')"
              :aria-expanded="open.lessons"
              class="fold-head flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b cursor-pointer select-none"
              style="background: linear-gradient(135deg,#fdfaf2,#fff8e0); border-color:rgba(124,90,30,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#7c5a1e,#b45309);">课</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#7c5a1e">
            Lessons · 课程
          </div>
          <div class="text-base sm:text-lg han font-bold text-ink">{{ HSK3_LESSONS.length }} lessons</div>
        </div>
        <span class="ml-auto flex items-center gap-2">
          <span class="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded text-white"
                style="background:#7c5a1e;">L{{ String(activeLesson).padStart(2,'0') }} · 当前</span>
          <span class="fold-caret text-lg leading-none" style="color:#7c5a1e;" :class="{ 'is-open': open.lessons }">▸</span>
        </span>
      </header>

      <div v-show="open.lessons" class="p-3 sm:p-5"
           style="background: linear-gradient(180deg,#fffdf6,#ffffff);">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <button
            v-for="l in HSK3_LESSONS" :key="l.no"
            @click="pickLesson(l.no)"
            class="group relative rounded-xl border-2 bg-paper text-left
                   transition hover:-translate-y-0.5 hover:shadow-card overflow-hidden"
            :class="activeLesson === l.no ? 'border-ink shadow-card' : 'border-gold-deep/25'"
            :style="{ animationDelay: ((l.no - 1) * 35) + 'ms', animation: 'fadeUp .4s both' }"
          >
            <div class="absolute top-1.5 right-2 text-[9px] font-mono tracking-widest text-gold-soft">
              № {{ String(l.no).padStart(2, '0') }}
            </div>
            <div class="p-3 sm:p-4 pt-5 sm:pt-6">
              <div class="han text-lg sm:text-xl font-bold leading-tight text-ink line-clamp-2">{{ l.han }}</div>
              <div class="text-[10px] sm:text-[11px] tracking-wide text-gold-deep mt-0.5 truncate">{{ l.pinyin }}</div>
              <div class="text-xs text-ink-soft mt-1.5 line-clamp-2">{{ l.en }}</div>
            </div>
            <div class="h-0.5 w-full transition"
                 :class="activeLesson === l.no ? 'bg-ink' : 'bg-transparent group-hover:bg-gold/60'"></div>
          </button>
        </div>
      </div>
    </article>

    <!-- LESSON DETAIL -->
    <article id="lesson-detail" v-if="current"
      class="rounded-3xl border-2 border-ink/15 bg-paper shadow-card overflow-hidden mb-8 animate-fadeUp"
      :key="current.no"
    >
      <header @click="toggle('detail')"
              :aria-expanded="open.detail"
              class="fold-head border-b border-ink/10 flex items-center gap-4 sm:gap-6 cursor-pointer select-none transition-all"
              :class="open.detail ? 'px-5 sm:px-7 py-5 sm:py-6 items-start' : 'px-4 sm:px-5 py-2.5'"
              :style="{ background: 'linear-gradient(135deg,#fdfaf2,#fff8e0)' }">
        <div class="shrink-0 text-center">
          <div v-if="open.detail" class="text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-1">Lesson</div>
          <div class="font-mono font-bold text-ink transition-all"
               :class="open.detail ? 'text-3xl sm:text-4xl' : 'text-lg'">{{ String(current.no).padStart(2, '0') }}</div>
        </div>
        <div v-if="open.detail" class="min-w-0 flex-1">
          <div class="han text-2xl sm:text-3xl font-bold text-ink leading-tight mb-1">{{ current.han }}</div>
          <div class="text-sm tracking-wider text-gold-deep mb-1">{{ current.pinyin }}</div>
          <div class="text-base sm:text-lg font-semibold text-ink-soft mb-2">{{ current.en }}</div>
          <div class="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink/60">
            <span class="w-2 h-2 rounded-full bg-gold-deep"></span>
            <span>{{ current.focus }}</span>
          </div>
        </div>
        <span v-else class="text-[10px] tracking-[0.3em] uppercase text-gold-deep">Lesson</span>
        <span class="fold-caret text-xl leading-none text-gold-deep ml-auto" :class="{ 'is-open': open.detail, 'self-center': open.detail }">▸</span>
      </header>

      <div v-show="open.detail">
      <div class="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">

        <!-- TEXTS · teal writing style -->
        <section class="p-5 sm:p-7">
          <div class="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <button type="button" @click="toggle('lessonTexts')"
                    :aria-expanded="open.lessonTexts"
                    class="flex items-baseline gap-2 cursor-pointer select-none group bg-transparent border-0 p-0">
              <span class="fold-caret text-ink/50 text-sm leading-none" :class="{ 'is-open': open.lessonTexts }">▸</span>
              <div class="text-[10px] font-semibold tracking-widest uppercase text-ink/50 group-hover:text-ink transition">
                Texts · 课文
              </div>
              <span class="text-[10px] font-mono text-ink/40">{{ current.texts.length }}</span>
            </button>
            <div v-show="open.lessonTexts" class="flex items-center gap-2">
              <button
                type="button"
                @click="revealAll = !revealAll"
                class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border transition"
                :class="revealAll
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink/70 border-ink/20 hover:border-gold-deep/50 hover:text-ink'"
                :title="revealAll ? 'Hide pinyin & English' : 'Show pinyin & English'"
              >
                {{ revealAll ? 'Hide all' : 'Show all' }}
              </button>
              <button
                v-if="!revealAll && revealed.size"
                type="button"
                @click="resetReveals"
                class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-ink/20 bg-white text-ink/60 hover:text-ink hover:border-gold-deep/50 transition"
                title="Hide all revealed lines"
              >
                Reset
              </button>
            </div>
          </div>
          <p v-show="open.lessonTexts" class="text-[11px] text-ink/50 italic mb-4 -mt-2">
            Read the Chinese first — tap a bubble to reveal pinyin &amp; English.
          </p>

          <div v-show="open.lessonTexts" class="space-y-8">
            <div v-for="(text, ti) in current.texts" :key="ti" class="relative">
              <div class="flex items-center gap-3 mb-4">
                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-ink to-ink/70 text-paper font-mono text-[11px] font-bold shrink-0 shadow-chip">
                  {{ String(ti + 1).padStart(2, '0') }}
                </span>
                <div class="min-w-0">
                  <div class="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-deep/70">Dialogue</div>
                  <h4 class="text-sm font-semibold text-ink tracking-wide leading-tight">{{ text.title }}</h4>
                </div>
                <span class="flex-1 h-px bg-gradient-to-r from-gold-deep/40 to-transparent"></span>
              </div>

              <ul class="space-y-3">
                <li v-for="(line, i) in text.lines" :key="i"
                    class="dialogue-row flex gap-2.5"
                    :class="line.s === 'A' ? 'justify-start' : 'justify-end flex-row-reverse'"
                >
                  <span class="speaker-chip flex items-center justify-center w-9 h-9 rounded-full font-mono text-xs font-bold text-white shadow-chip shrink-0 mt-1"
                        :class="line.s === 'A' ? 'chip-a' : 'chip-b'"
                  >{{ line.s }}</span>

                  <button
                    type="button"
                    @click="toggleLine(ti, i)"
                    class="dialogue-bubble relative flex-1 rounded-2xl border px-4 py-3 text-left cursor-pointer w-full"
                    :class="[line.s === 'A' ? 'bubble-a' : 'bubble-b', isRevealed(ti, i) ? 'is-revealed' : 'is-hidden']"
                    :aria-expanded="isRevealed(ti, i)"
                    :title="isRevealed(ti, i) ? 'Click to hide pinyin & English' : 'Click to reveal pinyin & English'"
                  >
                    <div class="han text-base font-semibold text-ink leading-snug">{{ line.c }}</div>

                    <template v-if="isRevealed(ti, i)">
                      <div class="bubble-pinyin text-[11px] tracking-wide font-medium mt-1">{{ line.p }}</div>
                      <div class="mt-2 pt-2 border-t border-dashed bubble-divider">
                        <div class="text-[11.5px] text-ink-soft italic leading-snug">{{ line.en }}</div>
                      </div>
                    </template>
                    <div v-else class="reveal-hint mt-1.5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest opacity-60">
                      <span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>Tap to reveal</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- VOCAB -->
        <section class="p-5 sm:p-7">
          <div class="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <button type="button" @click="toggle('lessonVocab')"
                    :aria-expanded="open.lessonVocab"
                    class="flex items-baseline gap-2 cursor-pointer select-none group bg-transparent border-0 p-0">
              <span class="fold-caret text-ink/50 text-sm leading-none" :class="{ 'is-open': open.lessonVocab }">▸</span>
              <div class="text-[10px] font-semibold tracking-widest uppercase text-ink/50 group-hover:text-ink transition">
                New words · 生词 · {{ current.vocab.length }}
              </div>
            </button>
            <div v-show="open.lessonVocab" class="flex items-center gap-2">
              <button
                type="button"
                @click="vocabRevealAll = !vocabRevealAll"
                class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border transition"
                :class="vocabRevealAll
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-white text-ink/70 border-ink/20 hover:border-gold-deep/50 hover:text-ink'"
                :title="vocabRevealAll ? 'Hide pinyin & English' : 'Show pinyin & English'"
              >
                {{ vocabRevealAll ? 'Hide all' : 'Show all' }}
              </button>
              <button
                v-if="!vocabRevealAll && vocabRevealed.size"
                type="button"
                @click="resetVocabReveals"
                class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-ink/20 bg-white text-ink/60 hover:text-ink hover:border-gold-deep/50 transition"
                title="Hide all revealed words"
              >
                Reset
              </button>
            </div>
          </div>
          <p v-show="open.lessonVocab" class="text-[11px] text-ink/50 italic mb-3">
            Read the Chinese first — tap a word to reveal pinyin &amp; English.
          </p>
          <ul v-show="open.lessonVocab" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <li v-for="(v, i) in current.vocab" :key="i" class="flex flex-col gap-2">
              <button
                type="button"
                @click="toggleVocab(i)"
                class="vocab-card group w-full text-left flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white border-2 transition cursor-pointer min-h-[4.75rem]"
                :class="isVocabRevealed(i)
                  ? 'vocab-revealed'
                  : 'vocab-hidden border-dashed border-ink/15 hover:border-gold-deep/45 hover:-translate-y-0.5'"
                :aria-expanded="isVocabRevealed(i)"
                :title="isVocabRevealed(i) ? 'Click to hide pinyin & English' : 'Click to reveal pinyin & English'"
              >
                <span class="vocab-tile flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 border"
                      :class="isVocabRevealed(i) ? 'vocab-tile-on' : 'vocab-tile-off'"
                >
                  <span class="han font-bold leading-none text-center break-keep"
                        :style="{
                          fontSize: v.c.length <= 1 ? '2.4rem'
                                  : v.c.length === 2 ? '1.9rem'
                                  : v.c.length === 3 ? '1.45rem'
                                  : '1.2rem'
                        }">{{ v.c }}</span>
                </span>

                <div class="min-w-0 flex-1">
                  <template v-if="isVocabRevealed(i)">
                    <div class="flex items-baseline gap-2 mb-0.5">
                      <span class="text-[13px] tracking-wide font-semibold text-gold-deep truncate">{{ v.p }}</span>
                      <span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0"
                            :style="{ color: posColor(v.pos), background: posColor(v.pos) + '14' }">
                        {{ v.pos }}
                      </span>
                    </div>
                    <div class="text-[13px] text-ink-soft leading-snug truncate">{{ v.en }}</div>
                  </template>
                  <div v-else class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-ink/35 group-hover:text-gold-deep transition">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>Tap to reveal</span>
                  </div>
                </div>
              </button>

              <div class="w-full flex flex-wrap items-start justify-center gap-3 p-2.5 rounded-lg border"
                   style="background:#fffdf6; border-color:rgba(124,90,30,.2);"
              >
                <HanziPractice v-for="(ch, ci) in [...v.c]" :key="ci"
                               :char="ch"
                               :size="130"
                               accent="#b45309"
                               outline="#fde68a"
                               highlight="#7c5a1e"
                />
              </div>
            </li>
          </ul>
        </section>
      </div>

      <!-- NOTES · crimson manuscript style -->
      <section v-if="current.notes && current.notes.length"
               class="px-5 sm:px-7 py-6 sm:py-8 border-t"
               style="background: linear-gradient(180deg,#fef2f2,#fff7ed); border-color:rgba(155,34,38,.18);"
      >
        <div @click="toggle('lessonNotes')" :aria-expanded="open.lessonNotes"
             class="fold-head flex items-center gap-3 mb-5 cursor-pointer select-none">
          <span class="flex items-center justify-center w-9 h-9 rounded-lg han text-lg font-bold text-white shadow-chip"
                style="background: linear-gradient(135deg,#9b2226,#dc2626);">语</span>
          <div>
            <div class="text-[10px] font-semibold tracking-widest uppercase" style="color:#9b2226">Grammar Notes</div>
            <div class="text-sm font-bold text-ink han">语法 · {{ current.notes.length }} 条</div>
          </div>
          <span class="flex-1 h-px" style="background: linear-gradient(to right,#dc2626 0%, transparent 100%);"></span>
          <span class="fold-caret text-lg leading-none" style="color:#9b2226;" :class="{ 'is-open': open.lessonNotes }">▸</span>
        </div>

        <div v-show="open.lessonNotes" class="grid md:grid-cols-2 gap-4">
          <article v-for="(note, ni) in current.notes" :key="ni"
                   class="relative rounded-xl bg-white shadow-chip overflow-hidden border"
                   style="border-color:rgba(155,34,38,.2);"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1.5"
                 style="background: linear-gradient(180deg,#9b2226,#dc2626);"></div>
            <div class="pl-5 pr-4 py-4">
              <div class="flex items-baseline gap-2 mb-2">
                <span class="font-mono text-[10px] font-bold tracking-widest text-white px-1.5 py-0.5 rounded"
                      style="background:#9b2226">№ {{ String(ni + 1).padStart(2, '0') }}</span>
                <h4 class="text-sm font-bold leading-snug" style="color:#7f1d1d">{{ note.title }}</h4>
              </div>
              <p class="text-[12.5px] text-ink-soft leading-relaxed mb-3">{{ note.summary }}</p>
              <div v-if="note.examples && note.examples.length">
                <div class="text-[9px] font-mono uppercase tracking-widest mb-1.5" style="color:#dc2626">↳ examples</div>
                <ul class="space-y-2">
                  <li v-for="(ex, ei) in note.examples" :key="ei"
                      class="grid grid-cols-[auto_1fr] gap-x-3 items-baseline border-l-2 pl-3 py-1"
                      style="border-color:#dc2626;"
                  >
                    <span class="han text-base font-semibold text-ink leading-snug">{{ ex.c }}</span>
                    <span class="text-[11px] tracking-wide" style="color:#9b2226">{{ ex.p }}</span>
                    <span></span>
                    <span class="text-[11px] text-ink-soft italic">{{ ex.en }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      </div>

      <footer class="px-5 sm:px-7 py-3 border-t border-ink/10 flex items-center justify-between bg-cream/40">
        <button
          class="text-xs font-semibold text-ink-soft hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="current.no === 1"
          @click="pickLesson(current.no - 1)"
        >← Previous</button>
        <span class="text-[10px] tracking-widest uppercase text-ink/40 font-mono">
          {{ current.no }} / {{ HSK3_LESSONS.length }}
        </span>
        <button
          class="text-xs font-semibold text-ink-soft hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="current.no === HSK3_LESSONS.length"
          @click="pickLesson(current.no + 1)"
        >Next →</button>
      </footer>
    </article>

    <!-- ALL VOCAB · indigo dictionary -->
    <article class="rounded-3xl shadow-card overflow-hidden border"
             style="background:#fff; border-color:rgba(67,56,202,.2);"
    >
      <header @click="toggle('vocab')"
              :aria-expanded="open.vocab"
              class="fold-head flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b cursor-pointer select-none"
              style="background: linear-gradient(135deg,#eef2ff,#f5f3ff); border-color:rgba(67,56,202,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#4338ca,#6366f1);">词</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#4338ca">Glossary · 词汇表</div>
          <div class="text-base sm:text-lg han font-bold text-ink">All {{ totalVocab }} words</div>
        </div>
        <div class="ml-auto flex items-center gap-2" @click.stop>
          <input
            v-model="search"
            type="search"
            placeholder="Search 拼音 / chars / English…"
            class="px-3 py-1.5 text-sm rounded-lg bg-white focus:outline-none w-44 sm:w-64 border"
            style="border-color:rgba(67,56,202,.3);"
            @focus="open.vocab = true"
          />
          <span class="text-[11px] font-mono px-2 py-0.5 rounded font-bold text-white"
                style="background:#4338ca">{{ filteredVocab.length }}</span>
          <span class="fold-caret text-lg leading-none cursor-pointer" style="color:#4338ca;" :class="{ 'is-open': open.vocab }" @click="toggle('vocab')">▸</span>
        </div>
      </header>

      <div v-show="open.vocab" class="p-3 sm:p-5" style="background: linear-gradient(180deg,#fafaff,#fff);">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <li v-for="(v, i) in filteredVocab" :key="i"
              class="glossary-card group relative grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3.5 py-2.5
                     rounded-lg bg-white border"
              style="border-color:rgba(99,102,241,.18);"
          >
            <div class="glossary-tile flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] px-2 py-1
                        rounded-md border shrink-0"
                 style="background: linear-gradient(135deg,#eef2ff,#e0e7ff); border-color:rgba(99,102,241,.3);"
            >
              <span class="han font-bold leading-tight text-center break-keep"
                    :style="{
                      color:'#312e81',
                      fontSize: v.c.length <= 1 ? '1.75rem'
                              : v.c.length === 2 ? '1.5rem'
                              : v.c.length === 3 ? '1.15rem'
                              : '0.95rem'
                    }">{{ v.c }}</span>
            </div>

            <div class="min-w-0">
              <div class="flex items-baseline gap-2">
                <span class="glossary-pinyin text-[12px] tracking-wide font-semibold truncate" style="color:#4338ca">{{ v.p }}</span>
                <span class="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0"
                      :style="{ color: posColor(v.pos), background: posColor(v.pos) + '14' }">
                  {{ v.pos }}
                </span>
              </div>
              <div class="text-[12px] text-ink-soft leading-snug truncate">{{ v.en }}</div>
            </div>

            <button
              @click="pickLesson(v.lesson)"
              :title="`Go to lesson ${v.lesson}`"
              class="glossary-chip shrink-0 font-mono text-[10px] font-bold tracking-wider px-2 py-1 rounded"
              style="background:#e0e7ff;color:#3730a3;"
            >L{{ String(v.lesson).padStart(2,'0') }}</button>
          </li>
        </ul>
        <div v-if="!filteredVocab.length" class="text-center py-8 text-sm text-ink/40">
          No words match your search.
        </div>
      </div>
    </article>

    <p class="mt-6 text-center text-xs text-ink-soft/70 italic">
      Curriculum based on <span class="font-semibold">HSK 标准教程 3</span> · 20 lessons · Confucius Institute Headquarters
    </p>

  </section>
</template>

<style scoped>
/* Foldable section headers */
.fold-head { transition: background-color .2s ease; }
.fold-head:hover { filter: brightness(0.98); }
.fold-caret { display: inline-block; transition: transform .2s ease; }
.fold-caret.is-open { transform: rotate(90deg); }

.glossary-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background-color .25s ease; }
.glossary-card:hover {
  transform: translateY(-2px);
  border-color: #4338ca !important;
  background-color: #fafaff;
  box-shadow: 0 10px 24px -10px rgba(67, 56, 202, .35),
              0 2px 6px -2px rgba(67, 56, 202, .25);
}
.glossary-tile { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease; }
.glossary-card:hover .glossary-tile {
  transform: scale(1.04) rotate(-1deg);
  border-color: rgba(67, 56, 202, .55) !important;
  background: linear-gradient(135deg, #c7d2fe, #a5b4fc) !important;
  box-shadow: 0 6px 14px -6px rgba(67, 56, 202, .55);
}
.glossary-pinyin { transition: color .2s ease, letter-spacing .2s ease; }
.glossary-card:hover .glossary-pinyin { color: #312e81 !important; letter-spacing: .04em; }
.glossary-chip { transition: background .2s ease, color .2s ease, transform .2s ease; }
.glossary-card:hover .glossary-chip { background: #4338ca !important; color: #fff !important; }
.glossary-chip:hover { transform: scale(1.08); background: #312e81 !important; color: #fff !important; }

/* Vocab cards · bigger, with character tile */
.vocab-card {
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background-color .25s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
}
.vocab-tile {
  transition: transform .25s ease, background .25s ease, border-color .25s ease, color .25s ease, box-shadow .25s ease;
  color: #1f1d1a;
}
.vocab-tile-off {
  background: linear-gradient(135deg, #fdfaf2, #fff8e0);
  border-color: rgba(124, 90, 30, .25);
}
.vocab-card:hover .vocab-tile-off {
  transform: rotate(-2deg) scale(1.04);
  background: linear-gradient(135deg, #fff8e0, #fde9a8);
  border-color: rgba(124, 90, 30, .55);
  box-shadow: 0 6px 14px -6px rgba(124, 90, 30, .45);
}
.vocab-revealed {
  background: linear-gradient(135deg, #fffdf6 0%, #fff8e0 100%);
  border-color: rgba(124, 90, 30, .45);
  box-shadow: 0 8px 18px -10px rgba(124, 90, 30, .35);
}
.vocab-tile-on {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-color: rgba(124, 90, 30, .55);
  color: #1f1d1a;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .6), 0 4px 10px -4px rgba(124, 90, 30, .4);
}

/* Dialogue · chat-bubble layout with distinct A/B styling */
.dialogue-bubble {
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
}
.dialogue-bubble:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -10px rgba(15, 23, 42, .2);
}
.dialogue-bubble.is-hidden { border-style: dashed; }
.dialogue-bubble.is-hidden:hover { border-style: solid; }
.bubble-a .reveal-hint { color: #0f766e; }
.bubble-b .reveal-hint { color: #be123c; }

/* Speaker A · teal, left-aligned */
.chip-a { background: linear-gradient(135deg, #14b8a6, #0d9488); box-shadow: 0 4px 10px -4px rgba(13, 148, 136, .55); }
.bubble-a {
  background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%);
  border-color: rgba(20, 184, 166, .35);
  border-top-left-radius: 6px;
}
.bubble-a .bubble-pinyin { color: #0f766e; }
.bubble-a .bubble-divider { border-color: rgba(20, 184, 166, .35); }
.bubble-a:hover { border-color: #14b8a6; }
.bubble-a::before {
  content: '';
  position: absolute;
  left: -7px; top: 14px;
  width: 12px; height: 12px;
  background: #f0fdfa;
  border-left: 1px solid rgba(20, 184, 166, .35);
  border-bottom: 1px solid rgba(20, 184, 166, .35);
  transform: rotate(45deg);
  border-bottom-left-radius: 3px;
}

/* Speaker B · rose, right-aligned */
.chip-b { background: linear-gradient(135deg, #e11d48, #be123c); box-shadow: 0 4px 10px -4px rgba(190, 18, 60, .55); }
.bubble-b {
  background: linear-gradient(135deg, #fff1f2 0%, #fef3c7 100%);
  border-color: rgba(225, 29, 72, .3);
  border-top-right-radius: 6px;
}
.bubble-b .bubble-pinyin { color: #be123c; }
.bubble-b .bubble-divider { border-color: rgba(225, 29, 72, .3); }
.bubble-b:hover { border-color: #e11d48; }
.bubble-b::before {
  content: '';
  position: absolute;
  right: -7px; top: 14px;
  width: 12px; height: 12px;
  background: #fff1f2;
  border-right: 1px solid rgba(225, 29, 72, .3);
  border-top: 1px solid rgba(225, 29, 72, .3);
  transform: rotate(45deg);
  border-top-right-radius: 3px;
}
</style>
