<script setup>
const props = defineProps({ level: { type: Number, required: true } })
const { HSK_LEVELS } = useHSK()
const data = computed(() => HSK_LEVELS[props.level])
useHead(() => ({ title: `${data.value.title} · Chinese Course` }))
</script>

<template>
  <section class="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-10">
    <!-- Hero -->
    <article
      class="relative overflow-hidden rounded-3xl bg-paper border border-gold-deep/30 shadow-card
             grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-8
             p-5 sm:p-8 mb-6 sm:mb-8"
    >
      <div
        class="ribbon hidden sm:flex items-center justify-center text-gold-soft text-[10px] tracking-[0.4em] uppercase"
        aria-hidden="true"
      >HSK · Level {{ level }}</div>

      <div class="flex items-center justify-center">
        <div class="brush text-ink leading-none select-none"
             :style="{ fontSize: 'clamp(110px, 20vw, 200px)', color: data.accent }">
          {{ data.han }}
        </div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">
          {{ data.subtitle }}
        </div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3">
          {{ data.title }}
        </h1>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">
          {{ data.intro }}
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="n in [data.lessons.length + ' lessons', 'Beginner-friendly', 'Pinyin · Chars']"
            :key="n"
            class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider
                   bg-gold/10 border border-gold-deep/30 text-ink-soft"
          >{{ n }}</span>
        </div>
      </div>

      <div class="seal hidden sm:flex" aria-hidden="true">
        <span class="han">HSK</span>
        <span class="han">{{ data.han }}</span>
      </div>
    </article>

    <!-- Lesson grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <article
        v-for="l in data.lessons" :key="l.no"
        class="group relative rounded-2xl bg-paper border border-gold-deep/25 shadow-chip
               hover:shadow-card hover:-translate-y-0.5 transition overflow-hidden"
        style="animation: fadeUp .5s both;"
        :style="{ animationDelay: ((l.no - 1) * 60) + 'ms' }"
      >
        <div class="absolute top-3 right-4 text-[10px] tracking-[0.3em] uppercase text-gold-soft">
          № {{ String(l.no).padStart(2, '0') }}
        </div>
        <div class="p-5">
          <div class="mi-grid w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center mx-auto">
            <span class="brush text-5xl sm:text-6xl text-ink">{{ l.han }}</span>
          </div>
          <div class="text-center">
            <div class="han text-lg font-bold text-ink">{{ l.han }}</div>
            <div class="text-xs text-gold-deep tracking-wider uppercase mt-0.5">{{ l.pinyin }}</div>
            <div class="text-sm font-semibold text-ink mt-1">{{ l.en }}</div>
          </div>
          <p class="mt-3 text-xs text-ink-soft leading-relaxed text-center">
            {{ l.note }}
          </p>
        </div>
        <div class="h-1 w-full bg-gradient-to-r from-gold-deep/0 via-gold to-gold-deep/0
                    opacity-0 group-hover:opacity-100 transition"></div>
      </article>
    </div>

    <p class="mt-8 text-center text-xs text-ink-soft/70 italic">
      Course outline — lessons will expand as the curriculum grows.
    </p>
  </section>
</template>
