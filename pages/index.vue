<script setup>
useHead({ title: '欢迎 · Welcome to Chinese' })

const sections = [
  { to: '/pinyin',   han: '拼音', label: 'Pinyin',   desc: 'Initials, finals, and tones with audio.' },
  { to: '/strokes',  han: '笔画', label: 'Strokes',  desc: 'The 5 stroke groups and their 36 variations.' },
  { to: '/radicals', han: '部首', label: 'Radicals', desc: 'The 214 Kangxi building blocks of Hanzi.' },
  { to: '/hsk1',     han: 'HSK 一', label: 'HSK 1',  desc: 'Beginner vocabulary and grammar.' },
  { to: '/hsk2',     han: 'HSK 二', label: 'HSK 2',  desc: 'Elementary vocabulary and grammar.' },
  { to: '/hsk3',     han: 'HSK 三', label: 'HSK 3',  desc: 'Intermediate vocabulary and grammar.' },
  { to: '/game',     han: '游戏',   label: 'Game',   desc: 'Memory & quiz games to remember characters.' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-10">

    <!-- Hero -->
    <section class="text-center mb-10 sm:mb-14">
      <div class="han text-6xl sm:text-8xl font-bold text-ink leading-none mb-4 select-none">
        欢迎
      </div>
      <div class="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold-deep font-semibold mb-3">
        Huān · Yíng
      </div>
      <h1 class="text-2xl sm:text-4xl font-bold text-ink mb-3">
        Welcome to your Chinese journey
      </h1>
      <p class="text-sm sm:text-base text-ink/70 max-w-2xl mx-auto leading-relaxed">
        A small companion for learning Mandarin — sounds, strokes, radicals, and the first three
        HSK levels. Pick a path below and take it one character at a time.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-2 text-[11px] font-semibold">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-ink/10 text-ink/70">
          <span class="han">学</span> Study
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-ink/10 text-ink/70">
          <span class="han">练</span> Practice
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-ink/10 text-ink/70">
          <span class="han">进步</span> Progress
        </span>
      </div>
    </section>

    <!-- Section grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <NuxtLink
        v-for="s in sections" :key="s.to" :to="s.to"
        class="group relative rounded-2xl bg-white border border-ink/10 shadow-card p-5 sm:p-6
               hover:shadow-lg hover:-translate-y-0.5 hover:border-gold transition flex flex-col"
      >
        <div class="han text-3xl sm:text-4xl font-bold text-ink leading-none mb-3 group-hover:text-gold-deep transition">
          {{ s.han }}
        </div>
        <div class="text-sm font-semibold tracking-wide uppercase text-ink/80">
          {{ s.label }}
        </div>
        <p class="mt-1.5 text-xs sm:text-sm text-ink/60 leading-relaxed flex-1">
          {{ s.desc }}
        </p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep">
          Explore <span aria-hidden="true">→</span>
        </div>
      </NuxtLink>
    </section>

    <!-- Quote -->
    <section class="mt-10 sm:mt-14 text-center">
      <div class="han text-xl sm:text-2xl text-ink/80 leading-relaxed">
        千里之行，始于足下。
      </div>
      <div class="mt-2 text-xs sm:text-sm text-ink/50 italic">
        “A journey of a thousand miles begins with a single step.” — 老子
      </div>
    </section>

  </div>
</template>
