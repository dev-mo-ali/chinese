<script setup>
import {
  PINYIN_TONES, PINYIN_INITIALS, PINYIN_FINALS, PINYIN_RULES,
  INITIAL_KEYS, FINAL_KEYS, pinyinSyllable, applyTone,
} from '~/composables/usePinyin.js'

useHead({ title: '拼音 · Pinyin Pronunciation Chart' })

// ---------- explorer state ----------
const selInitial = ref('m')
const selFinal   = ref('a')
const selTone    = ref(1)

const explorerSyl = computed(() => pinyinSyllable(selInitial.value, selFinal.value))
const explorerToned = computed(() => explorerSyl.value ? applyTone(explorerSyl.value, selTone.value) : null)

// ---------- matrix view ----------
// Filter the matrix to only show finals that are valid for *some* initial,
// and only show initials that have at least one valid combo with the
// currently displayed finals (always true for ours, but cleaner code).
const matrixCells = computed(() => {
  return INITIAL_KEYS.map(ini => ({
    ini,
    cells: FINAL_KEYS.map(fin => ({ fin, syl: pinyinSyllable(ini, fin) })),
  }))
})

// ---------- tone-bar demo (the famous "ma" example) ----------
const maRow = [
  { tone: 1, syl: 'mā', char: '妈', en: 'mother' },
  { tone: 2, syl: 'má', char: '麻', en: 'hemp · numb' },
  { tone: 3, syl: 'mǎ', char: '马', en: 'horse' },
  { tone: 4, syl: 'mà', char: '骂', en: 'to scold' },
  { tone: 0, syl: 'ma', char: '吗', en: 'question particle' },
]
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
        Pinyin · 拼音
      </div>

      <div class="flex items-center justify-center">
        <div class="brush leading-none select-none"
             :style="{ fontSize: 'clamp(110px, 20vw, 200px)', color: '#9b2226' }">拼</div>
      </div>

      <div class="min-w-0 col-span-2 sm:col-span-1">
        <div class="text-[11px] tracking-[0.3em] uppercase text-gold-deep mb-1">Hanyu Pinyin · 汉语拼音</div>
        <h1 class="han text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3">Pinyin Pronunciation Chart</h1>
        <p class="text-sm sm:text-base text-ink-soft leading-relaxed">
          Hanyu Pinyin spells Mandarin sounds with the Latin alphabet plus four tone marks.
          Every syllable is built from one <strong>initial</strong> (consonant) and one <strong>final</strong>
          (vowel + optional ending), pronounced on one of <strong>4 tones</strong> (or neutral).
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">21 initials</span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">37 finals</span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">4 tones + neutral</span>
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-gold/10 border border-gold-deep/30 text-ink-soft">~410 syllables</span>
        </div>
      </div>

      <div class="seal hidden sm:flex">
        <span class="han">拼</span>
        <span class="han">音</span>
      </div>
    </article>

    <!-- TONES · the four tones + neutral -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(155,34,38,.22);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#fef2f2,#fff7ed); border-color:rgba(155,34,38,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#9b2226,#dc2626);">声</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#9b2226">The Four Tones · 四声</div>
          <div class="text-base sm:text-lg han font-bold text-ink">妈 · 麻 · 马 · 骂 · 吗</div>
        </div>
      </header>

      <div class="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
           style="background: linear-gradient(180deg,#fffaf6,#ffffff);">

        <!-- Tone glyphs / curves -->
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <li v-for="t in PINYIN_TONES" :key="t.n">
            <div class="tone-card w-full px-3 py-3 rounded-xl bg-white border-2 text-left flex items-center gap-3"
                 style="border-color:rgba(155,34,38,.2);">
              <svg viewBox="0 0 60 50" class="shrink-0 w-12 h-10">
                <path :d="t.curve" stroke="#9b2226" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              </svg>
              <div class="min-w-0">
                <div class="flex items-baseline gap-2">
                  <span class="han text-2xl font-bold text-ink leading-none">{{ t.mark }}</span>
                  <span class="text-[10px] font-mono tracking-widest uppercase text-white px-1.5 py-0.5 rounded"
                        style="background:#9b2226">T{{ t.n || '·' }}</span>
                </div>
                <div class="text-[12px] han font-semibold text-ink mt-0.5">{{ t.name }}</div>
                <div class="text-[11px] text-ink-soft italic leading-snug">{{ t.en }}</div>
              </div>
            </div>
          </li>
        </ul>

        <!-- "ma" demo row -->
        <div class="rounded-xl border-2 p-3.5 sm:p-4"
             style="background:linear-gradient(135deg,#fff7ed,#fef2f2); border-color:rgba(155,34,38,.25);">
          <div class="text-[10px] font-mono uppercase tracking-widest mb-2" style="color:#9b2226">
            Same syllable · five meanings
          </div>
          <ul class="grid grid-cols-5 gap-1.5">
            <li v-for="m in maRow" :key="m.tone">
              <div class="ma-cell w-full flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white border"
                   style="border-color:rgba(155,34,38,.25);"
                   :title="`${m.syl} (${m.en})`">
                <span class="han text-2xl font-bold text-ink leading-none">{{ m.char }}</span>
                <span class="text-[12px] font-semibold tracking-wide" style="color:#9b2226">{{ m.syl }}</span>
                <span class="text-[10px] text-ink-soft italic leading-tight text-center px-1">{{ m.en }}</span>
              </div>
            </li>
          </ul>
          <p class="text-[11px] text-ink-soft mt-3 italic leading-snug">
            Tone changes the word entirely — getting tones wrong is the most common source of confusion.
          </p>
        </div>
      </div>
    </article>

    <!-- INITIALS -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(15,118,110,.22);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#ecfdf5,#f0fdfa); border-color:rgba(15,118,110,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#0f766e,#14b8a6);">声母</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#0f766e">Initials · 声母</div>
          <div class="text-base sm:text-lg han font-bold text-ink">21 consonant beginnings</div>
        </div>
      </header>

      <div class="p-4 sm:p-6 space-y-6"
           style="background: linear-gradient(180deg,#f8fffd,#ffffff);">
        <section v-for="grp in PINYIN_INITIALS" :key="grp.group">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-[10px] font-bold tracking-widest text-white px-2 py-0.5 rounded"
                  :style="{ background: grp.color }">{{ grp.group }}</span>
            <span class="text-[11px] text-ink-soft italic">{{ grp.en }}</span>
            <span class="flex-1 h-px" :style="{ background: `linear-gradient(to right, ${grp.color}66 0%, transparent 100%)` }"></span>
          </div>
          <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            <li v-for="it in grp.items" :key="it.c">
              <div class="phon-card w-full grid grid-cols-[auto_1fr] gap-3 px-3 py-2.5 rounded-xl bg-white border-2 text-left items-center"
                   :style="{ borderColor: grp.color + '33' }">
                <span class="phon-tile flex items-center justify-center w-12 h-12 rounded-lg shrink-0 border han text-2xl font-bold leading-none"
                      :style="{ color: grp.color, background: grp.color + '14', borderColor: grp.color + '55' }">{{ it.c }}</span>
                <div class="min-w-0">
                  <div class="flex items-baseline gap-2">
                    <span class="font-mono text-[11px] font-semibold" :style="{ color: grp.color }">{{ it.ipa }}</span>
                    <span class="han text-[12px] font-semibold text-ink truncate">{{ it.sample }}</span>
                  </div>
                  <div class="text-[11px] text-ink-soft italic leading-snug">{{ it.hint }}</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </article>

    <!-- FINALS -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(67,56,202,.22);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#eef2ff,#f5f3ff); border-color:rgba(67,56,202,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#4338ca,#6366f1);">韵母</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#4338ca">Finals · 韵母</div>
          <div class="text-base sm:text-lg han font-bold text-ink">37 vowel endings</div>
        </div>
      </header>

      <div class="p-4 sm:p-6 space-y-6"
           style="background: linear-gradient(180deg,#fafaff,#ffffff);">
        <section v-for="grp in PINYIN_FINALS" :key="grp.group">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-[10px] font-bold tracking-widest text-white px-2 py-0.5 rounded"
                  :style="{ background: grp.color }">{{ grp.group }}</span>
            <span class="text-[11px] text-ink-soft italic">{{ grp.en }}</span>
            <span class="flex-1 h-px" :style="{ background: `linear-gradient(to right, ${grp.color}66 0%, transparent 100%)` }"></span>
          </div>
          <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            <li v-for="it in grp.items" :key="it.c">
              <div class="phon-card w-full grid grid-cols-[auto_1fr] gap-3 px-3 py-2.5 rounded-xl bg-white border-2 text-left items-center"
                   :style="{ borderColor: grp.color + '33' }">
                <span class="phon-tile flex items-center justify-center w-12 h-12 rounded-lg shrink-0 border han text-xl font-bold leading-none"
                      :style="{ color: grp.color, background: grp.color + '14', borderColor: grp.color + '55' }">{{ it.c }}</span>
                <div class="min-w-0">
                  <div class="text-[12px] han font-semibold text-ink truncate">{{ it.sample }}</div>
                  <div class="text-[11px] text-ink-soft italic leading-snug">{{ it.hint }}</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </article>

    <!-- SYLLABLE EXPLORER -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(124,90,30,.25);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#fffbeb,#fef3c7); border-color:rgba(124,90,30,.2);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#7c5a1e,#b45309);">拼</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#7c5a1e">Syllable Explorer · 音节</div>
          <div class="text-base sm:text-lg han font-bold text-ink">Build any pinyin syllable</div>
        </div>
      </header>

      <div class="p-5 sm:p-7 grid lg:grid-cols-[1fr_auto] gap-6 items-start"
           style="background: linear-gradient(180deg,#fffdf6,#ffffff);">
        <div class="space-y-4">
          <div>
            <div class="text-[10px] font-mono uppercase tracking-widest mb-1.5" style="color:#7c5a1e">Initial</div>
            <div class="flex flex-wrap gap-1.5">
              <button v-for="ini in INITIAL_KEYS" :key="ini || 'none'"
                      type="button"
                      @click="selInitial = ini"
                      class="px-2.5 py-1.5 rounded-md border han font-semibold text-[13px] transition"
                      :class="selInitial === ini
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-white text-ink border-ink/15 hover:border-gold-deep/50'">
                {{ ini || '∅' }}
              </button>
            </div>
          </div>
          <div>
            <div class="text-[10px] font-mono uppercase tracking-widest mb-1.5" style="color:#7c5a1e">Final</div>
            <div class="flex flex-wrap gap-1.5">
              <button v-for="fin in FINAL_KEYS" :key="fin"
                      type="button"
                      @click="selFinal = fin"
                      class="px-2.5 py-1.5 rounded-md border han font-semibold text-[13px] transition"
                      :class="selFinal === fin
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-white text-ink border-ink/15 hover:border-gold-deep/50'">
                {{ fin }}
              </button>
            </div>
          </div>
          <div>
            <div class="text-[10px] font-mono uppercase tracking-widest mb-1.5" style="color:#7c5a1e">Tone</div>
            <div class="flex flex-wrap gap-1.5">
              <button v-for="t in PINYIN_TONES" :key="t.n"
                      type="button"
                      @click="selTone = t.n"
                      class="px-3 py-1.5 rounded-md border font-semibold text-[13px] transition flex items-center gap-1.5"
                      :class="selTone === t.n
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-white text-ink border-ink/15 hover:border-gold-deep/50'">
                <span class="han text-base">{{ t.mark }}</span>
                <span class="font-mono text-[10px]">T{{ t.n || '·' }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border-2 px-6 py-5 min-w-[15rem] text-center"
             :style="{
               background: explorerToned ? 'linear-gradient(135deg,#fffbeb,#fef3c7)' : '#f8f8f5',
               borderColor: explorerToned ? '#7c5a1e' : 'rgba(0,0,0,.1)'
             }">
          <div class="text-[10px] font-mono uppercase tracking-widest mb-2"
               :style="{ color: explorerToned ? '#7c5a1e' : '#888' }">
            {{ explorerToned ? 'Result' : 'Not a valid syllable' }}
          </div>
          <div v-if="explorerToned" class="han font-bold leading-none"
               style="color:#5a3a06; font-size:3.5rem;">{{ explorerToned }}</div>
          <div v-else class="han text-5xl text-ink/20 leading-none">∅</div>
        </div>
      </div>
    </article>

    <!-- FULL MATRIX -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(15,23,42,.18);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#fafaf9,#f5f5f4); border-color:rgba(15,23,42,.15);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-paper shadow-chip"
              style="background: linear-gradient(135deg,#1a1209,#3f3f46);">表</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold text-ink/60">Full Pinyin Table · 拼音音节表</div>
          <div class="text-base sm:text-lg han font-bold text-ink">Initials × Finals</div>
        </div>
      </header>

      <div class="p-2 sm:p-4 overflow-auto" style="max-height: 70vh;">
        <table class="border-collapse text-[11px] font-mono">
          <thead>
            <tr>
              <th scope="col" class="sticky top-0 left-0 z-20 bg-ink text-paper px-2 py-1.5 text-[10px] tracking-widest uppercase font-semibold">∅ / final</th>
              <th scope="col" v-for="fin in FINAL_KEYS" :key="fin"
                  class="sticky top-0 z-10 bg-ink text-paper px-2 py-1.5 han text-[12px] font-bold text-center min-w-[2.5rem]">
                {{ fin }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in matrixCells" :key="row.ini || 'none'">
              <th scope="row" class="sticky left-0 z-10 bg-cream/70 text-ink px-2 py-1.5 han text-[13px] font-bold border-r border-ink/15">
                {{ row.ini || '∅' }}
              </th>
              <td v-for="cell in row.cells" :key="cell.fin"
                  class="border border-ink/8 text-center align-middle p-0">
                <span v-if="cell.syl" class="syl-cell block w-full h-full px-1.5 py-1 han text-[12px] font-semibold text-ink">
                  {{ cell.syl }}
                </span>
                <span v-else class="block px-1.5 py-1 text-ink/15">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- RULES & QUIRKS -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(155,34,38,.22);"
    >
      <header class="flex items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#fef2f2,#fff7ed); border-color:rgba(155,34,38,.18);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#9b2226,#dc2626);">规</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#9b2226">Spelling Rules · 拼写规则</div>
          <div class="text-base sm:text-lg han font-bold text-ink">{{ PINYIN_RULES.length }} things students miss</div>
        </div>
      </header>

      <div class="grid md:grid-cols-2 gap-4 p-5 sm:p-6"
           style="background: linear-gradient(180deg,#fffaf6,#ffffff);">
        <article v-for="(r, i) in PINYIN_RULES" :key="i"
                 class="relative rounded-xl bg-white shadow-chip overflow-hidden border"
                 style="border-color:rgba(155,34,38,.2);"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1.5"
               style="background: linear-gradient(180deg,#9b2226,#dc2626);"></div>
          <div class="pl-5 pr-4 py-4">
            <div class="flex items-baseline gap-2 mb-2">
              <span class="font-mono text-[10px] font-bold tracking-widest text-white px-1.5 py-0.5 rounded"
                    style="background:#9b2226">№ {{ String(i + 1).padStart(2, '0') }}</span>
              <h4 class="text-sm font-bold leading-snug" style="color:#7f1d1d">{{ r.title }}</h4>
            </div>
            <p class="text-[12.5px] text-ink-soft leading-relaxed">{{ r.body }}</p>
          </div>
        </article>
      </div>
    </article>

    <!-- INTERACTIVE PINYIN CHART (DigMandarin embed) -->
    <article class="rounded-3xl shadow-card overflow-hidden border mb-8"
             style="background:#fff; border-color:rgba(124,90,30,.25);"
    >
      <header class="flex flex-wrap items-center gap-3 px-5 sm:px-7 py-4 border-b"
              style="background: linear-gradient(135deg,#fffbeb,#fef3c7); border-color:rgba(124,90,30,.2);"
      >
        <span class="flex items-center justify-center w-10 h-10 rounded-lg han text-xl font-bold text-white shadow-chip"
              style="background: linear-gradient(135deg,#7c5a1e,#b45309);">音</span>
        <div>
          <div class="text-[10px] tracking-widest uppercase font-semibold" style="color:#7c5a1e">Interactive Chart · 发音表</div>
          <div class="text-base sm:text-lg han font-bold text-ink">Click any syllable to hear it</div>
        </div>
        <a href="https://www.digmandarin.com/tools/pinyin.html"
           target="_blank" rel="noopener"
           class="ml-auto text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded text-white hover:opacity-90"
           style="background:#7c5a1e;">DigMandarin ↗</a>
      </header>

      <div class="p-3 sm:p-5"
           style="background: linear-gradient(180deg,#fffdf6,#ffffff);">
        <div class="rounded-xl overflow-hidden border bg-white"
             style="border-color:rgba(124,90,30,.2);">
          <iframe
            src="https://www.digmandarin.com/tools/pinyin.html"
            title="DigMandarin interactive pinyin chart"
            loading="lazy"
            class="block w-full"
            style="height: 540px; border: 0;"
            allow="autoplay"
          ></iframe>
        </div>
        
      </div>
    </article>

   

  </section>
</template>

<style scoped>
.tone-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
.tone-card:hover {
  transform: translateY(-2px);
  border-color: #9b2226 !important;
  box-shadow: 0 10px 24px -10px rgba(155, 34, 38, .35);
}
.ma-cell { transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease, border-color .2s ease; }
.ma-cell:hover {
  transform: translateY(-1px);
  background: #fff7ed;
  border-color: #9b2226 !important;
  box-shadow: 0 6px 14px -6px rgba(155, 34, 38, .35);
}

.phon-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background-color .25s ease; }
.phon-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px -10px rgba(15, 23, 42, .25);
}
.phon-tile { transition: transform .25s ease, box-shadow .25s ease; }
.phon-card:hover .phon-tile {
  transform: rotate(-2deg) scale(1.05);
  box-shadow: 0 6px 14px -6px rgba(15, 23, 42, .35);
}

.syl-cell { transition: background-color .15s ease, color .15s ease; }
.syl-cell:hover {
  background: #fff8e0;
  color: #9b2226;
}
</style>
