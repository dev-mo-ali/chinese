<script setup>
import { TOPICS } from '~/composables/useTopics.js'

useHead({ title: 'Topics · Thematic vocabulary' })

// Pull a few representative emojis per topic for the card preview row.
const previewEmojis = (t) => {
  const items = t.pairs
    ? t.pairs.flatMap(p => [p.a, p.b])
    : (t.sections || []).flatMap(s => s.words)
  return items.map(w => w.e).filter(Boolean).slice(0, 6)
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">
    <article
      class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card
             grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8
             p-5 sm:p-8 mb-6"
    >
      <div class="ribbon hidden sm:flex items-center justify-center text-gold-soft text-[10px] tracking-[0.4em] uppercase" aria-hidden="true">
        Topics · 主题
      </div>

      <div class="flex items-center justify-center">
        <div class="brush leading-none select-none text-gold-deep"
             aria-hidden="true" lang="zh-CN"
             style="font-size: clamp(110px, 20vw, 200px)">
          题
        </div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">zhǔtí · vocabulary</div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3" lang="zh-CN">主题</h1>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">
          Thematic vocabulary lists — group words by where they live in your day. Tap a card to study a set,
          reveal pinyin and English on demand, and search across all entries.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">
            {{ TOPICS.length }} topics
          </span>
        </div>
      </div>

      <div class="seal hidden sm:flex" aria-hidden="true">
        <span class="han" lang="zh-CN">主</span>
        <span class="han" lang="zh-CN">题</span>
      </div>
    </article>

    <!-- Topic grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <NuxtLink
        v-for="(t, i) in TOPICS" :key="t.slug"
        :to="`/topics/${t.slug}`"
        class="group relative rounded-2xl bg-paper border border-gold-deep/25 shadow-chip
               hover:shadow-card hover:-translate-y-0.5 transition overflow-hidden"
        :style="{ animationDelay: (i * 60) + 'ms', animation: 'fadeUp .5s both' }"
      >
        <div class="absolute top-3 right-4 text-[10px] tracking-[0.3em] uppercase text-gold-soft">
          № {{ String(i + 1).padStart(2, '0') }}
        </div>
        <div class="p-5">
          <div class="mi-grid w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center mx-auto">
            <span class="brush text-5xl sm:text-6xl" :style="{ color: t.accent }" aria-hidden="true" lang="zh-CN">{{ t.icon }}</span>
          </div>
          <div class="text-center">
            <div class="han text-lg font-bold text-ink" lang="zh-CN">{{ t.han }}</div>
            <div class="text-xs text-gold-deep tracking-wider uppercase mt-0.5">{{ t.pinyin }}</div>
            <div class="text-sm font-semibold text-ink mt-1">{{ t.en }}</div>
          </div>
          <p class="mt-3 text-xs text-ink-soft leading-relaxed text-center line-clamp-3">
            {{ t.intro }}
          </p>
          <div class="mt-3 flex flex-wrap justify-center gap-1.5" aria-hidden="true">
            <span
              v-for="(emo, k) in previewEmojis(t)" :key="k"
              class="text-lg leading-none"
            >{{ emo }}</span>
          </div>
          <div class="mt-3 text-center text-[10px] font-mono uppercase tracking-widest text-ink/50">
            {{ t.pairs
                ? `${t.pairs.length} pairs`
                : `${t.sections.reduce((s, sec) => s + sec.words.length, 0)} words · ${t.sections.length} sections` }}
          </div>
        </div>
        <div class="h-1 w-full bg-gradient-to-r from-gold-deep/0 via-gold to-gold-deep/0 opacity-0 group-hover:opacity-100 transition"></div>
      </NuxtLink>
    </div>
  </section>
</template>
