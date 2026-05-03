<script setup>
import { ref, onBeforeUnmount, watch, nextTick } from 'vue'

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
</style>
