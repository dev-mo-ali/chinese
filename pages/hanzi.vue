<script setup>
import hanziBreakdowns from '~/assets/data/hanzi-breakdowns.json'
import HanziPractice from '~/components/HanziPractice.vue'

useHead({ title: '拆字 · Hanzi Breakdown & Writing Practice' })

const input = ref('妈')
const query = ref('妈')
const examples = ['妈', '你好', '老师', '学生', '汉语', '谢谢', '想喝']
const characters = computed(() => [...query.value])

const chooseCharacter = (value = input.value) => {
  const next = [...String(value)]
    .filter(char => /\p{Script=Han}/u.test(char))
    .slice(0, 8)
    .join('')
  if (!next) return
  query.value = next
  input.value = next
}
</script>

<template>
  <section class="max-w-4xl mx-auto px-3 sm:px-6 pt-6 pb-10">
    <article class="rounded-3xl bg-paper border border-gold-deep/30 shadow-card overflow-hidden">
      <header class="grid sm:grid-cols-[auto_1fr] gap-5 items-center p-5 sm:p-8 border-b border-gold-deep/20 bg-gold/5">
        <div class="brush text-7xl sm:text-8xl leading-none text-gold-deep" aria-hidden="true">
          {{ query }}
        </div>
        <div>
          <div class="text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-1">
            Character explorer · 拆字
          </div>
          <h1 class="han text-3xl sm:text-4xl font-bold text-ink">
            Hanzi breakdown
          </h1>
          <p class="mt-2 text-sm sm:text-base text-ink-soft leading-relaxed">
            Explore how a character is built, identify its meaning and sound components,
            then practise writing it stroke by stroke.
          </p>
        </div>
      </header>

      <div class="p-5 sm:p-8">
        <form class="max-w-xl mx-auto" @submit.prevent="chooseCharacter()">
          <label for="hanzi-search" class="block text-xs font-bold uppercase tracking-widest text-ink/60 mb-2">
            Enter a Chinese character or word
          </label>
          <div class="flex gap-2">
            <input
              id="hanzi-search"
              v-model="input"
              type="text"
              inputmode="text"
              autocomplete="off"
              class="min-w-0 flex-1 rounded-xl border border-gold-deep/35 bg-white px-4 py-3 han text-2xl text-ink focus:border-gold-deep focus:ring-2 focus:ring-gold/25 outline-none"
              placeholder="老师"
              aria-describedby="hanzi-help"
            />
            <button
              type="submit"
              class="rounded-xl bg-ink text-cream px-5 py-3 text-sm font-bold hover:bg-gold-deep transition"
            >
              Explore
            </button>
          </div>
          <p id="hanzi-help" class="mt-2 text-xs text-ink-soft">
            Enter up to eight Chinese characters. Detailed breakdowns cover
            all {{ Object.keys(hanziBreakdowns).length }} characters used in HSK 1–3 here.
          </p>
        </form>

        <div class="mt-4 flex flex-wrap justify-center gap-2" aria-label="Example characters">
          <button
            v-for="example in examples"
            :key="example"
            type="button"
            class="han w-10 h-10 rounded-full border text-xl font-bold transition"
            :class="query === example
              ? 'bg-gold-deep text-cream border-gold-deep'
              : 'bg-white text-ink border-gold-deep/25 hover:border-gold-deep'"
            @click="chooseCharacter(example)"
          >
            {{ example }}
          </button>
        </div>

        <div class="mt-8 rounded-2xl border border-gold-deep/20 bg-cream/50 p-5 sm:p-7">
          <div class="flex flex-wrap items-start justify-center gap-5">
            <article
              v-for="(character, index) in characters"
              :key="`${query}-${index}-${character}`"
              class="w-full sm:w-[17rem] rounded-xl border border-gold-deep/20 bg-white/60 p-4"
            >
              <div class="mb-3 text-center">
                <span class="han text-4xl font-bold text-ink">{{ character }}</span>
                <span class="ml-2 text-[10px] font-bold uppercase tracking-widest text-ink/45">
                  {{ index + 1 }} / {{ characters.length }}
                </span>
              </div>
              <HanziPractice
                :char="character"
                :size="220"
                accent="#9b2226"
                outline="#eadfbd"
                highlight="#7c5a1e"
              />
              <p
                v-if="!hanziBreakdowns[character]"
                class="mt-4 text-center text-xs text-amber-800"
              >
                Writing practice may still be available, but detailed breakdown data is
                not included for this character yet.
              </p>
            </article>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
