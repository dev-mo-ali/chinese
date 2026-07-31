<script setup>
import { computed, ref, onBeforeUnmount, watch, nextTick } from 'vue'
import hanziBreakdowns from '~/assets/data/hanzi-breakdowns.json'
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
const breakdown = computed(() => hanziBreakdowns[props.char] || null)

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
const structureSummary = computed(() => {
  if (!breakdown.value?.decomposition) return null

  const arrangement = structureName.value
    ? `a ${structureName.value} arrangement`
    : 'the component arrangement shown'
  const parts = componentCharacters.value.length
    ? ` The visible components are ${componentCharacters.value.join(' and ')}.`
    : ''

  return `${props.char} is written using ${arrangement}.${parts}`
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
watch(() => props.char, () => { if (started.value) build() })
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

    <details v-if="hasBreakdownDetails" class="breakdown-card" :style="{ borderColor: accent + '44' }">
      <summary :style="{ color: accent }">
        <span aria-hidden="true">拆</span>
        Character breakdown
      </summary>
      <dl>
        <div v-if="breakdown.pinyin?.length">
          <dt>Reading</dt>
          <dd>{{ breakdown.pinyin.join(' · ') }}</dd>
        </div>
        <div v-if="breakdown.radical">
          <dt>Radical</dt>
          <dd>
            <span class="han">{{ breakdown.radical }}</span>
            <template v-if="radicalInfo">
              · {{ radicalInfo.pinyin }} · {{ radicalInfo.meaning }}
            </template>
          </dd>
        </div>
        <div v-if="breakdown.decomposition">
          <dt>Structure</dt>
          <dd>
            <span class="han">{{ breakdown.decomposition }}</span>
            <span v-if="structureName"> · {{ structureName }}</span>
          </dd>
        </div>
        <div v-if="formationName">
          <dt>Formation</dt>
          <dd>{{ formationName }}</dd>
        </div>
        <div v-if="breakdown.etymology?.semantic">
          <dt>Meaning</dt>
          <dd>
            <span class="han">{{ breakdown.etymology.semantic }}</span>
            <span v-if="breakdown.etymology.hint"> · {{ breakdown.etymology.hint }}</span>
          </dd>
        </div>
        <div v-if="breakdown.etymology?.phonetic">
          <dt>Sound</dt>
          <dd class="han">{{ breakdown.etymology.phonetic }}</dd>
        </div>
      </dl>
      <div class="breakdown-explanation">
        <section v-if="analysisSummary">
          <h4>How the character works</h4>
          <p>{{ analysisSummary }}</p>
        </section>
        <section v-if="structureSummary">
          <h4>Written structure</h4>
          <p>{{ structureSummary }}</p>
        </section>
        <section v-if="breakdown.etymology?.hint">
          <h4>Origin clue</h4>
          <p>{{ breakdown.etymology.hint }}</p>
        </section>
        <section v-if="breakdown.etymology?.phonetic">
          <h4>Pronunciation note</h4>
          <p>
            <span class="han">{{ breakdown.etymology.phonetic }}</span>
            acts as a sound clue. Sound components reflect historical pronunciation,
            so the modern reading may not match exactly.
          </p>
        </section>
        <section v-if="breakdown.radical">
          <h4>Dictionary lookup</h4>
          <p>
            This character is indexed under the
            <span class="han">{{ breakdown.radical }}</span> radical in traditional
            character dictionaries.
          </p>
        </section>
      </div>
      <p
        v-if="breakdown.etymology?.hint && !breakdown.etymology?.semantic && !analysisSummary"
        class="breakdown-hint"
      >
        {{ breakdown.etymology.hint }}
      </p>
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
  border-radius: 10px;
  background: rgba(255, 255, 255, .88);
  text-align: left;
  overflow: hidden;
}
.breakdown-card summary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  list-style: none;
}
.breakdown-card summary::-webkit-details-marker { display: none; }
.breakdown-card summary::after {
  content: '+';
  margin-left: auto;
  font-size: 14px;
}
.breakdown-card[open] summary::after { content: '−'; }
.breakdown-card dl {
  margin: 0;
  padding: 0 9px 8px;
}
.breakdown-card dl > div {
  display: grid;
  grid-template-columns: 4.2rem minmax(0, 1fr);
  gap: 7px;
  padding: 4px 0;
  border-top: 1px solid rgba(31, 29, 26, .08);
  font-size: 11px;
  line-height: 1.35;
}
.breakdown-card dt {
  color: rgba(31, 29, 26, .55);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.breakdown-card dd {
  margin: 0;
  color: #1f1d1a;
  overflow-wrap: anywhere;
}
.breakdown-explanation {
  margin: 0 9px 9px;
  border-top: 1px solid rgba(31, 29, 26, .08);
}
.breakdown-explanation section {
  padding: 8px 0 1px;
}
.breakdown-explanation section + section {
  border-top: 1px solid rgba(31, 29, 26, .06);
}
.breakdown-explanation h4 {
  margin: 0 0 3px;
  color: rgba(31, 29, 26, .58);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.breakdown-explanation p {
  margin: 0 0 7px;
  color: rgba(31, 29, 26, .82);
  font-size: 11px;
  line-height: 1.55;
}
.breakdown-hint {
  margin: 0 9px 9px;
  padding-top: 7px;
  border-top: 1px solid rgba(31, 29, 26, .08);
  color: rgba(31, 29, 26, .75);
  font-size: 11px;
  line-height: 1.45;
}
</style>
