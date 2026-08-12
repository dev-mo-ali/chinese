<script setup>
import { computed, ref, onBeforeUnmount, watch, nextTick } from 'vue'
import hanziBreakdowns from '~/assets/data/hanzi-breakdowns.json'
import hanziVocabulary from '~/assets/data/hanzi-vocabulary.json'
import { allRadicals } from '~/composables/useRadicals.js'

const props = defineProps({
  char: { type: String, required: true },
  size: { type: Number, default: 140 },
  accent: { type: String, default: '#7c3aed' },
  outline: { type: String, default: '#ddd6fe' },
  highlight: { type: String, default: '#5b21b6' },
})

const root = ref(null)
const writer = ref(null)
const mode = ref('idle') // idle | animating | quizzing
const status = ref('') // mistake/complete feedback
const ready = ref(false)
const error = ref(false)
const strokeCount = ref(null)
const strokeCountLoading = ref(false)
const showAllWords = ref(false)
const wordSort = ref('level')
const breakdown = computed(() => hanziBreakdowns[props.char] || null)
const characterInfo = computed(() => hanziVocabulary[props.char] || null)
const commonWords = computed(() => characterInfo.value?.words || [])
const sortedCommonWords = computed(() => [...commonWords.value].sort((a, b) => {
  if (wordSort.value === 'frequency') {
    return b.frequency - a.frequency || a.level - b.level || a.c.length - b.c.length
  }
  return a.level - b.level || b.frequency - a.frequency || a.c.length - b.c.length
}))
const visibleCommonWords = computed(() =>
  showAllWords.value ? sortedCommonWords.value : sortedCommonWords.value.slice(0, 5)
)
const hiddenWordCount = computed(() => Math.max(0, commonWords.value.length - visibleCommonWords.value.length))
const definitionText = computed(() =>
  characterInfo.value?.definition || breakdown.value?.etymology?.hint || null
)
const definitionLabel = computed(() =>
  characterInfo.value?.definition ? 'Definition' : 'Origin clue'
)

const radicalAliases = {
  '丷': { pinyin: 'bā', meaning: 'eight' },
  '⺌': { pinyin: 'xiǎo', meaning: 'small' },
  '⺀': { pinyin: 'bīng', meaning: 'ice' },
  '母': { pinyin: 'mǔ', meaning: 'mother' },
  '氺': { pinyin: 'shuǐ', meaning: 'water' },
  '西': { pinyin: 'xī', meaning: 'west' },
}

const radicalInfo = computed(() => {
  const radical = breakdown.value?.radical
  if (!radical) return null

  if (radicalAliases[radical]) return radicalAliases[radical]

  let match
  if (radical === '阝') {
    const isLeftSide = breakdown.value?.decomposition?.startsWith('⿰阝')
    match = allRadicals.find(item => item.kangxi === (isLeftSide ? 170 : 163))
  } else {
    match = allRadicals.find(item =>
      item.char === radical || item.form?.includes(radical)
    )
  }

  return match
    ? { pinyin: match.pinyin, meaning: match.meaning.toLocaleLowerCase('en') }
    : null
})

const formationNames = {
  pictographic: 'Pictograph',
  ideographic: 'Meaning compound',
  pictophonetic: 'Meaning + sound',
}

const structureNames = {
  '⿰': 'left–right',
  '⿱': 'top–bottom',
  '⿲': 'left–middle–right',
  '⿳': 'top–middle–bottom',
  '⿴': 'enclosed',
  '⿵': 'open at the bottom',
  '⿶': 'open at the top',
  '⿷': 'open on the right',
  '⿸': 'upper-left surround',
  '⿹': 'upper-right surround',
  '⿺': 'lower-left surround',
  '⿻': 'overlaid',
}

const formationName = computed(() =>
  formationNames[breakdown.value?.etymology?.type] || null
)
const structureName = computed(() =>
  structureNames[breakdown.value?.decomposition?.[0]] || null
)
const componentPositionNames = {
  '⿰': ['left', 'right'],
  '⿱': ['top', 'bottom'],
  '⿲': ['left', 'middle', 'right'],
  '⿳': ['top', 'middle', 'bottom'],
  '⿴': ['outside', 'inside'],
  '⿵': ['outside', 'inside'],
  '⿶': ['outside', 'inside'],
  '⿷': ['outside', 'inside'],
  '⿸': ['outside', 'inside'],
  '⿹': ['outside', 'inside'],
  '⿺': ['outside', 'inside'],
  '⿻': ['base', 'overlaid'],
}
const componentCharacters = computed(() => {
  const decomposition = breakdown.value?.decomposition
  if (!decomposition) return []

  return [...new Set(
    [...decomposition]
      .filter(part => /\p{Script=Han}/u.test(part))
      .filter(part => part !== props.char),
  )]
})
const analysisSummary = computed(() => {
  const data = breakdown.value
  if (!data) return null

  const semantic = data.etymology?.semantic
  const phonetic = data.etymology?.phonetic
  const hint = data.etymology?.hint

  if (data.etymology?.type === 'pictophonetic' && semantic && phonetic) {
    return `${props.char} is a meaning-sound compound. ${semantic} gives the meaning clue`
      + `${hint ? ` (${hint})` : ''}, while ${phonetic} gives a clue to its pronunciation.`
  }
  if (data.etymology?.type === 'ideographic') {
    return `${props.char} is a meaning compound: its parts are combined to express an idea.`
  }
  if (data.etymology?.type === 'pictographic') {
    return `${props.char} developed from a stylized picture of the thing or idea it represents.`
  }
  if (structureName.value && componentCharacters.value.length) {
    return `${props.char} uses a ${structureName.value} arrangement built from ${componentCharacters.value.join(' and ')}.`
  }
  return `This record identifies the written structure and dictionary radical of ${props.char}.`
})
const breakdownPreview = computed(() => {
  const data = breakdown.value
  if (!data) return ''

  return [
    data.pinyin?.[0],
    structureName.value,
    formationName.value,
  ].filter(Boolean).join(' / ')
})
const componentVisuals = computed(() => componentCharacters.value.map(character => {
  const etymology = breakdown.value?.etymology
  const partBreakdown = hanziBreakdowns[character]
  const radical = allRadicals.find(item =>
    item.char === character || item.form?.includes(character)
  )
  const label = character === etymology?.semantic
    ? 'Meaning'
    : character === etymology?.phonetic ? 'Sound' : 'Part'
  const index = componentCharacters.value.indexOf(character)
  const position = componentPositionNames[breakdown.value?.decomposition?.[0]]?.[index] || `part ${index + 1}`

  return {
    character,
    label,
    position,
    pinyin: partBreakdown?.pinyin?.[0] || radical?.pinyin || '',
    meaning: radical?.meaning?.toLocaleLowerCase('en')
      || partBreakdown?.etymology?.hint
      || 'component',
  }
}))
const readingEntries = computed(() => {
  if (characterInfo.value?.readings?.length) return characterInfo.value.readings
  return (breakdown.value?.pinyin || []).map(pinyin => ({ p: pinyin, en: definitionText.value }))
})
const phoneticFamily = computed(() => {
  const phonetic = breakdown.value?.etymology?.phonetic
  if (!phonetic) return []

  return Object.entries(hanziBreakdowns)
    .filter(([character, data]) => character !== props.char && data.etymology?.phonetic === phonetic)
    .map(([character, data]) => ({
      character,
      pinyin: data.pinyin?.[0] || '',
      meaning: hanziVocabulary[character]?.definition
        || hanziVocabulary[character]?.readings?.[0]?.en
        || data.etymology?.hint
        || '',
    }))
    .slice(0, 12)
})
const hasBreakdownDetails = computed(() => {
  const data = breakdown.value
  return Boolean(
    data?.radical
    || data?.decomposition
    || data?.etymology?.hint
    || data?.etymology?.semantic
    || data?.etymology?.phonetic
  )
})

let HanziWriter = null

async function ensureLib () {
  if (HanziWriter) return HanziWriter
  const mod = await import('hanzi-writer')
  HanziWriter = mod.default || mod
  return HanziWriter
}

async function build () {
  if (!root.value) return
  ready.value = false
  error.value = false
  status.value = ''
  mode.value = 'idle'
  // wipe previous instance + svg
  root.value.innerHTML = ''
  writer.value = null
  try {
    const HW = await ensureLib()
    writer.value = HW.create(root.value, props.char, {
      width: props.size,
      height: props.size,
      padding: 5,
      showOutline: true,
      showCharacter: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 120,
      strokeColor: '#1f1d1a',
      outlineColor: props.outline,
      radicalColor: props.accent,
      highlightColor: props.highlight,
      drawingColor: props.accent,
      drawingWidth: 28,
      charDataLoader: (charToLoad, onComplete, onErr) => {
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${charToLoad}.json`)
          .then(r => {
            if (!r.ok) throw new Error('not found')
            return r.json()
          })
          .then(onComplete)
          .catch(onErr)
      },
      onLoadCharDataError: () => { error.value = true },
    })
    ready.value = true
    // auto-enter practice mode so students can draw immediately
    quiz()
  } catch (e) {
    error.value = true
  }
}

function animate () {
  if (!writer.value) return
  writer.value.cancelQuiz?.()
  mode.value = 'animating'
  status.value = ''
  writer.value.animateCharacter({
    onComplete: () => { mode.value = 'idle' },
  })
}

function quiz () {
  if (!writer.value) return
  mode.value = 'quizzing'
  status.value = '✎ Draw stroke 1'
  writer.value.quiz({
    showHintAfterMisses: 3,
    onMistake: (info) => {
      status.value = `✗ Try again · stroke ${info.strokeNum + 1}`
    },
    onCorrectStroke: (info) => {
      const next = info.strokeNum + 2
      status.value = info.strokesRemaining > 0
        ? `✓ Stroke ${info.strokeNum + 1} · next ${next}`
        : ''
    },
    onComplete: (summary) => {
      mode.value = 'idle'
      status.value = summary.totalMistakes === 0
        ? '★ Perfect!'
        : `✓ Done · ${summary.totalMistakes} mistakes`
    },
  })
}

function reset () {
  if (!writer.value) return
  writer.value.cancelQuiz?.()
  mode.value = 'idle'
  status.value = ''
  build()
}

async function loadStrokeCount (event) {
  if (!event.currentTarget.open || strokeCount.value || strokeCountLoading.value) return
  strokeCountLoading.value = true
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${props.char}.json`)
    if (!response.ok) return
    const data = await response.json()
    strokeCount.value = data.strokes?.length || null
  } catch {
    strokeCount.value = null
  } finally {
    strokeCountLoading.value = false
  }
}

const started = ref(false)
async function start () {
  started.value = true
  await nextTick()
  await build()
}
function stop () {
  started.value = false
  if (writer.value) writer.value.cancelQuiz?.()
  if (root.value) root.value.innerHTML = ''
  writer.value = null
  ready.value = false
  status.value = ''
  mode.value = 'idle'
}

onBeforeUnmount(() => { writer.value = null })
watch(() => props.char, () => {
  strokeCount.value = null
  showAllWords.value = false
  wordSort.value = 'level'
  if (started.value) build()
})
</script>

<template>
  <div class="hanzi-practice flex flex-col items-center gap-2 w-full">
    <button v-if="!started"
            type="button"
            @click="start"
            class="start-btn"
            :style="{ borderColor: accent, color: accent }"
            :title="`Practice writing ${char}`"
    >
      <span class="han text-lg leading-none">{{ char }}</span>
      <span>✎ Start writing</span>
    </button>

    <template v-else>
    <div class="hanzi-grid relative rounded-lg border-2 border-dashed bg-white max-w-full"
         :style="{ width: size + 'px', height: size + 'px', borderColor: accent + '55' }"
    >
      <!-- 米字格 grid lines -->
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" :style="{ background: accent + '33' }"></div>
        <div class="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" :style="{ background: accent + '33' }"></div>
        <div class="absolute inset-0" :style="{ background: `linear-gradient(45deg, transparent calc(50% - 0.5px), ${accent}22 50%, transparent calc(50% + 0.5px))` }"></div>
        <div class="absolute inset-0" :style="{ background: `linear-gradient(-45deg, transparent calc(50% - 0.5px), ${accent}22 50%, transparent calc(50% + 0.5px))` }"></div>
      </div>
      <div ref="root" class="relative z-10 w-full h-full flex items-center justify-center"></div>
      <div v-if="!ready && !error" class="absolute inset-0 flex items-center justify-center text-[10px] text-ink/40">
        loading…
      </div>
      <div v-if="error" class="absolute inset-0 flex items-center justify-center text-center text-[10px] text-rose-600 px-2">
        Stroke data unavailable
      </div>
    </div>

    <div class="flex items-center gap-1.5 flex-wrap justify-center">
      <button type="button"
              :disabled="!ready || mode === 'animating'"
              @click="animate"
              class="practice-btn"
              :style="{ borderColor: accent + '66', color: accent }"
      >▶ Animate</button>
      <button type="button"
              :disabled="!ready"
              @click="quiz"
              class="practice-btn"
              :style="{ background: accent, borderColor: accent, color: '#fff' }"
      >✎ Practice</button>
      <button type="button"
              :disabled="!ready"
              @click="reset"
              class="practice-btn"
              :style="{ borderColor: accent + '44', color: accent }"
              title="Reset"
      >↺</button>
      <button type="button"
              @click="stop"
              class="practice-btn"
              :style="{ borderColor: accent + '44', color: accent }"
              title="Hide practice"
      >✕</button>
    </div>

    <div v-if="status" class="text-[10.5px] font-mono tracking-wide" :style="{ color: accent }">
      {{ status }}
    </div>
    </template>

    <details
      v-if="hasBreakdownDetails"
      class="breakdown-card"
      :style="{ '--breakdown-accent': accent, borderColor: accent + '44' }"
      @toggle="loadStrokeCount"
    >
      <summary>
        <span class="breakdown-mark han" aria-hidden="true">拆</span>
        <span class="breakdown-title">
          <strong>Character breakdown</strong>
          <small v-if="breakdownPreview">{{ breakdownPreview }}</small>
        </span>
        <span class="breakdown-chevron" aria-hidden="true"></span>
      </summary>

      <div class="breakdown-body">
        <header class="character-overview">
          <strong class="han">{{ char }}</strong>
          <div class="reading-list">
            <div v-for="reading in readingEntries" :key="`${reading.p}-${reading.en}`">
              <b>{{ reading.p }}</b>
              <p v-if="reading.en">
                <span>{{ characterInfo?.readings?.length ? 'Definition' : definitionLabel }}:</span>
                {{ reading.en }}
              </p>
            </div>
          </div>
          <span class="stroke-count" aria-live="polite">
            {{ strokeCount ? `${strokeCount} strokes` : strokeCountLoading ? 'Counting...' : 'Strokes' }}
          </span>
        </header>

        <h4 v-if="componentVisuals.length" class="breakdown-heading">Components</h4>
        <div v-if="componentVisuals.length" class="composition-flow">
          <div class="composition-parts">
            <template v-for="(part, index) in componentVisuals" :key="part.character">
              <span v-if="index" class="composition-plus" aria-hidden="true">+</span>
              <NuxtLink
                class="composition-part"
                :to="{ path: '/hanzi', query: { character: part.character } }"
                :title="`Explore ${part.character}`"
              >
                <span>{{ part.label }} / {{ part.position }}</span>
                <strong class="han">{{ part.character }}</strong>
                <em v-if="part.pinyin">{{ part.pinyin }}</em>
                <small>{{ part.meaning }}</small>
              </NuxtLink>
            </template>
          </div>
          <span class="composition-arrow" aria-hidden="true">&#8595;</span>
          <div class="composition-result">
            <strong class="han">{{ char }}</strong>
            <span>{{ breakdown.pinyin?.join(' / ') }}</span>
          </div>
        </div>
        <div v-else class="composition-single">
          <strong class="han">{{ char }}</strong>
          <span class="han">{{ breakdown.decomposition }}</span>
        </div>

        <div class="breakdown-meta">
          <div v-if="structureName">
            <span>Structure</span>
            <strong>{{ structureName }}</strong>
          </div>
          <div v-if="breakdown.radical">
            <span>Radical</span>
            <strong><b class="han">{{ breakdown.radical }}</b>{{ radicalInfo?.meaning || '' }}</strong>
          </div>
          <div v-if="formationName">
            <span>Type</span>
            <strong>{{ formationName }}</strong>
          </div>
        </div>

        <section v-if="analysisSummary" class="breakdown-section">
          <h4>How it works</h4>
          <p>{{ analysisSummary }}</p>
        </section>

        <section v-if="phoneticFamily.length" class="breakdown-section phonetic-family">
          <h4>Sound family</h4>
          <div>
            <NuxtLink
              v-for="member in phoneticFamily"
              :key="member.character"
              :to="{ path: '/hanzi', query: { character: member.character } }"
              :title="`Explore ${member.character}`"
            >
              <strong class="han">{{ member.character }}</strong>
              <span>{{ member.pinyin }}</span>
              <small v-if="member.meaning">{{ member.meaning }}</small>
            </NuxtLink>
          </div>
        </section>

        <section v-if="commonWords.length" class="breakdown-section common-words">
          <div class="common-words-header">
            <h4>Common words <span>{{ commonWords.length }}</span></h4>
            <div class="word-sort" aria-label="Sort common words">
              <button
                type="button"
                title="Sort by HSK level"
                :class="{ active: wordSort === 'level' }"
                :aria-pressed="wordSort === 'level'"
                @click="wordSort = 'level'"
              >HSK</button>
              <button
                type="button"
                title="Sort by use in course texts"
                :class="{ active: wordSort === 'frequency' }"
                :aria-pressed="wordSort === 'frequency'"
                @click="wordSort = 'frequency'"
              >Use</button>
            </div>
          </div>
          <ul>
            <li v-for="word in visibleCommonWords" :key="`${word.c}-${word.p}`">
              <strong class="han">{{ word.c }} <b>HSK {{ word.level }}</b></strong>
              <span>{{ word.p }}</span>
              <small>{{ word.en }}</small>
            </li>
          </ul>
          <button
            v-if="hiddenWordCount || showAllWords"
            type="button"
            class="words-toggle"
            :aria-expanded="showAllWords"
            @click="showAllWords = !showAllWords"
          >{{ showAllWords ? 'Show fewer' : `Show ${hiddenWordCount} more` }}</button>
        </section>
      </div>
    </details>
  </div>
</template>

<style scoped>
.practice-btn {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1.5px solid;
  background: #fff;
  transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
  cursor: pointer;
}
.practice-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px -4px rgba(0,0,0,.2);
}
.practice-btn:disabled {
  opacity: .4;
  cursor: not-allowed;
}
.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1.5px dashed;
  background: #fff;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.start-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px -4px rgba(0,0,0,.2);
  border-style: solid;
}
.start-btn .han { font-weight: 800; }
.breakdown-card {
  order: -1;
  width: min(17rem, 100%);
  border: 1px solid;
  border-radius: 8px;
  background: rgba(255, 255, 255, .94);
  text-align: left;
  overflow: hidden;
  box-shadow: 0 4px 14px -12px rgba(31, 29, 26, .5);
}
.breakdown-card summary {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr) 1rem;
  align-items: center;
  gap: 8px;
  min-height: 2.75rem;
  padding: 7px 10px;
  color: #1f1d1a;
  cursor: pointer;
  list-style: none;
  transition: background .15s ease;
}
.breakdown-card summary:hover { background: color-mix(in srgb, var(--breakdown-accent) 5%, white); }
.breakdown-card summary:focus-visible { outline: 2px solid var(--breakdown-accent); outline-offset: -2px; }
.breakdown-card summary::-webkit-details-marker { display: none; }
.breakdown-mark {
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  border-radius: 6px;
  background: color-mix(in srgb, var(--breakdown-accent) 10%, white);
  color: var(--breakdown-accent);
  font-size: 17px;
  font-weight: 800;
}
.breakdown-title {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
}
.breakdown-title strong {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .06em;
  line-height: 1.25;
  text-transform: uppercase;
}
.breakdown-title small {
  overflow: hidden;
  color: rgba(31, 29, 26, .55);
  font-size: 9px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.breakdown-chevron {
  width: 7px;
  height: 7px;
  border-right: 1.5px solid var(--breakdown-accent);
  border-bottom: 1.5px solid var(--breakdown-accent);
  transform: rotate(45deg) translate(-2px, -2px);
  transition: transform .18s ease;
}
.breakdown-card[open] .breakdown-chevron { transform: rotate(225deg) translate(-1px, -1px); }
.breakdown-card[open] summary { border-bottom: 1px solid rgba(31, 29, 26, .08); }
.breakdown-body { padding: 12px 10px 10px; }
.character-overview {
  display: grid;
  grid-template-columns: 2.8rem minmax(0, 1fr) auto;
  align-items: start;
  gap: 8px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgba(31, 29, 26, .09);
}
.character-overview > strong { color: var(--breakdown-accent); font-size: 36px; line-height: 1; }
.character-overview > div { min-width: 0; }
.reading-list { display: grid; gap: 5px; }
.reading-list > div + div { padding-top: 4px; border-top: 1px dashed rgba(31, 29, 26, .1); }
.character-overview b { display: block; color: #1f1d1a; font-size: 12px; line-height: 1.35; }
.character-overview p { margin: 3px 0 0; color: rgba(31, 29, 26, .7); font-size: 9px; line-height: 1.4; }
.character-overview p span { color: rgba(31, 29, 26, .5); font-weight: 800; text-transform: uppercase; }
.stroke-count {
  padding: 3px 5px;
  border: 1px solid color-mix(in srgb, var(--breakdown-accent) 25%, white);
  border-radius: 4px;
  color: var(--breakdown-accent);
  font-size: 8px;
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: nowrap;
}
.breakdown-heading,
.breakdown-section h4 {
  margin: 10px 0 6px;
  color: rgba(31, 29, 26, .5);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.composition-flow { display: flex; flex-direction: column; align-items: center; }
.composition-parts { display: flex; width: 100%; align-items: center; justify-content: center; gap: 6px; }
.composition-part {
  display: grid;
  min-width: 0;
  flex: 1 1 0;
  grid-template-rows: minmax(1.35rem, auto) 2.4rem 1rem auto;
  justify-items: center;
  padding: 7px 4px;
  border-bottom: 2px solid color-mix(in srgb, var(--breakdown-accent) 35%, white);
  background: color-mix(in srgb, var(--breakdown-accent) 4%, white);
  text-decoration: none;
  transition: border-color .15s ease, background .15s ease;
}
.composition-part:hover { border-color: var(--breakdown-accent); background: color-mix(in srgb, var(--breakdown-accent) 9%, white); }
.composition-part:focus-visible { outline: 2px solid var(--breakdown-accent); outline-offset: 2px; }
.composition-part > span {
  color: var(--breakdown-accent);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .07em;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
}
.composition-part strong { color: #1f1d1a; font-size: 28px; line-height: 1; }
.composition-part em { color: #1f1d1a; font-size: 9px; font-style: normal; font-weight: 700; line-height: 1.2; }
.composition-part small { color: rgba(31, 29, 26, .55); font-size: 8px; line-height: 1.25; text-align: center; }
.composition-plus { flex: 0 0 auto; color: rgba(31, 29, 26, .3); font-size: 14px; }
.composition-arrow { height: 18px; color: color-mix(in srgb, var(--breakdown-accent) 65%, white); font-size: 14px; line-height: 18px; }
.composition-result { display: flex; align-items: baseline; gap: 7px; }
.composition-result strong { color: var(--breakdown-accent); font-size: 34px; line-height: 1; }
.composition-result span { color: #1f1d1a; font-size: 12px; font-weight: 700; }
.composition-single { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 4px 0 10px; }
.composition-single strong { color: var(--breakdown-accent); font-size: 34px; line-height: 1; }
.composition-single span { color: rgba(31, 29, 26, .55); font-size: 15px; }
.breakdown-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 11px;
  border-top: 1px solid rgba(31, 29, 26, .09);
  border-bottom: 1px solid rgba(31, 29, 26, .09);
}
.breakdown-meta > div { min-width: 0; padding: 7px 5px; }
.breakdown-meta > div + div { border-left: 1px solid rgba(31, 29, 26, .08); }
.breakdown-meta span { display: block; color: rgba(31, 29, 26, .48); font-size: 8px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.breakdown-meta strong { display: block; margin-top: 2px; color: #1f1d1a; font-size: 9px; font-weight: 700; line-height: 1.3; overflow-wrap: anywhere; }
.breakdown-meta b { margin-right: 3px; color: var(--breakdown-accent); font-size: 13px; }
.breakdown-section { margin-top: 10px; border-top: 1px solid rgba(31, 29, 26, .09); }
.breakdown-section > p { margin: 0; color: rgba(31, 29, 26, .74); font-size: 10px; line-height: 1.5; }
.phonetic-family > div { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; }
.phonetic-family a {
  display: grid;
  min-width: 0;
  justify-items: center;
  padding: 5px 3px;
  border-bottom: 2px solid color-mix(in srgb, var(--breakdown-accent) 25%, white);
  color: #1f1d1a;
  text-align: center;
  text-decoration: none;
}
.phonetic-family a:hover { border-color: var(--breakdown-accent); background: color-mix(in srgb, var(--breakdown-accent) 5%, white); }
.phonetic-family a:focus-visible { outline: 2px solid var(--breakdown-accent); outline-offset: 1px; }
.phonetic-family strong { font-size: 20px; line-height: 1.1; }
.phonetic-family span { color: var(--breakdown-accent); font-size: 8px; font-weight: 700; }
.phonetic-family small { width: 100%; overflow: hidden; color: rgba(31, 29, 26, .55); font-size: 7.5px; line-height: 1.25; text-overflow: ellipsis; white-space: nowrap; }
.common-words-header { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.common-words ul { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
.common-words h4 span {
  display: inline-grid;
  min-width: 1.1rem;
  height: 1.1rem;
  margin-left: 3px;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--breakdown-accent) 10%, white);
  color: var(--breakdown-accent);
  font-size: 8px;
}
.common-words li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 6px;
  align-items: baseline;
  padding-left: 8px;
  border-left: 2px solid color-mix(in srgb, var(--breakdown-accent) 28%, white);
}
.common-words strong { color: #1f1d1a; font-size: 12px; }
.common-words strong b {
  display: inline-block;
  margin-left: 3px;
  padding: 1px 3px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--breakdown-accent) 9%, white);
  color: var(--breakdown-accent);
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 7px;
  line-height: 1.3;
  vertical-align: middle;
}
.common-words span { color: var(--breakdown-accent); font-size: 9px; font-weight: 700; }
.common-words small { grid-column: 1 / -1; color: rgba(31, 29, 26, .6); font-size: 9px; line-height: 1.3; }
.word-sort { display: inline-flex; flex: 0 0 auto; border: 1px solid rgba(31, 29, 26, .12); border-radius: 5px; overflow: hidden; }
.word-sort button {
  min-height: 1.4rem;
  padding: 2px 5px;
  border: 0;
  background: white;
  color: rgba(31, 29, 26, .55);
  font-size: 7.5px;
  font-weight: 800;
  cursor: pointer;
}
.word-sort button + button { border-left: 1px solid rgba(31, 29, 26, .12); }
.word-sort button.active { background: var(--breakdown-accent); color: white; }
.word-sort button:focus-visible { outline: 2px solid var(--breakdown-accent); outline-offset: -2px; }
.words-toggle {
  width: 100%;
  margin-top: 7px;
  padding: 5px;
  border: 1px solid color-mix(in srgb, var(--breakdown-accent) 24%, white);
  border-radius: 5px;
  background: white;
  color: var(--breakdown-accent);
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}
.words-toggle:hover { background: color-mix(in srgb, var(--breakdown-accent) 5%, white); }
</style>
