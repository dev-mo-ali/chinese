<script setup>
import { pinyin } from 'pinyin-pro'

useHead({ title: '拼音转换 · Pinyin Converter' })

const examples = [
  '我喜欢学习汉语。',
  '今天的天气很好。',
  '请问，地铁站在哪里？',
  'HSK3: 我会说一点儿中文。',
]

const input = ref(examples[0])
const copied = ref(false)

const converted = computed(() => {
  const value = input.value.trim()
  return value ? pinyin(value) : ''
})

const setExample = (example) => {
  input.value = example
  copied.value = false
}

const clearInput = () => {
  input.value = ''
  copied.value = false
}

const copyPinyin = async () => {
  if (!converted.value || !import.meta.client) return
  await navigator.clipboard.writeText(converted.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <article class="rounded-3xl bg-paper border border-gold-deep/30 shadow-card overflow-hidden">
      <header class="grid gap-5 sm:grid-cols-[auto_1fr] items-center p-5 sm:p-8 border-b border-gold-deep/20 bg-gold/5">
        <div class="flex items-center justify-center">
          <div
            class="brush leading-none select-none text-gold-deep"
            :style="{ fontSize: 'clamp(88px, 18vw, 160px)' }"
            aria-hidden="true"
            lang="zh-CN"
          >
            转
          </div>
        </div>
        <div class="min-w-0">
          <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">
            Pinyin Converter · 拼音转换
          </div>
          <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight">
            Chinese sentence to pinyin
          </h1>
          <p class="mt-2 text-sm sm:text-base text-ink-soft leading-relaxed">
            Type a Chinese sentence and read the pinyin with tone marks instantly.
          </p>
        </div>
      </header>

      <div class="p-5 sm:p-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section class="rounded-2xl border border-gold-deep/20 bg-white/70 p-4 sm:p-5">
          <label for="sentence-input" class="block text-xs font-bold uppercase tracking-widest text-ink/60 mb-2">
            Chinese sentence
          </label>
          <textarea
            id="sentence-input"
            v-model="input"
            rows="1"
            class="han w-full resize-none rounded-xl border border-gold-deep/35 bg-white px-4 py-3 text-xl sm:text-2xl leading-relaxed text-ink outline-none focus:border-gold-deep focus:ring-2 focus:ring-gold/25"
            placeholder="我喜欢学习汉语。"
            @input="copied = false"
          ></textarea>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="example in examples"
              :key="example"
              type="button"
              class="han min-h-10 rounded-lg border border-gold-deep/25 bg-cream/70 px-3 py-2 text-sm font-semibold text-ink transition hover:border-gold-deep hover:bg-gold/10"
              @click="setExample(example)"
            >
              {{ example }}
            </button>
          </div>

          <div class="mt-4 flex justify-end">
            <button
              type="button"
              class="min-h-11 rounded-lg border border-ink/15 bg-white px-4 text-sm font-bold text-ink transition hover:border-gold-deep hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!input"
              @click="clearInput"
            >
              Clear
            </button>
          </div>
        </section>

        <section class="rounded-2xl border border-gold-deep/20 bg-cream/60 p-4 sm:p-5">
          <div class="mb-2 flex items-center justify-between gap-3">
            <h2 class="text-xs font-bold uppercase tracking-widest text-ink/60">
              Pinyin output
            </h2>
            <button
              type="button"
              class="min-h-10 rounded-lg bg-ink px-4 text-sm font-bold text-cream transition hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="!converted"
              @click="copyPinyin"
            >
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>

          <div
            class="min-h-52 rounded-xl border border-gold-deep/20 bg-white px-4 py-4 text-xl sm:text-2xl leading-loose text-ink shadow-chip"
            aria-live="polite"
          >
            <p v-if="converted" class="break-words">
              {{ converted }}
            </p>
            <p v-else class="text-base text-ink-soft">
              Pinyin will appear here.
            </p>
          </div>
        </section>
      </div>
    </article>
  </section>
</template>
