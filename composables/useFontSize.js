// Global font-size accessibility control.
// Scales the root <html> font-size, which in turn rescales every Tailwind
// rem-based size utility across the app. Persisted in localStorage so the
// user's choice survives reloads and route changes.

import { ref, watch } from 'vue'

// Discrete steps (px). Index 1 (16px) matches the browser default.
export const FONT_STEPS = [14, 16, 18, 20, 22]
const DEFAULT_INDEX = 1
const STORAGE_KEY = 'chinese-app:font-step'

const stepIndex = ref(DEFAULT_INDEX)
let initialized = false

function applyToRoot (idx) {
  if (typeof document === 'undefined') return
  document.documentElement.style.fontSize = `${FONT_STEPS[idx]}px`
}

function init () {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = raw === null ? DEFAULT_INDEX : Number(raw)
  if (Number.isInteger(parsed) && parsed >= 0 && parsed < FONT_STEPS.length) {
    stepIndex.value = parsed
  }
  applyToRoot(stepIndex.value)
  watch(stepIndex, (v) => {
    applyToRoot(v)
    try { window.localStorage.setItem(STORAGE_KEY, String(v)) } catch {}
  })
}

export function useFontSize () {
  init()
  return {
    stepIndex,
    steps: FONT_STEPS,
    canIncrease: () => stepIndex.value < FONT_STEPS.length - 1,
    canDecrease: () => stepIndex.value > 0,
    increase: () => { if (stepIndex.value < FONT_STEPS.length - 1) stepIndex.value++ },
    decrease: () => { if (stepIndex.value > 0) stepIndex.value-- },
    reset:    () => { stepIndex.value = DEFAULT_INDEX },
    currentPx: () => FONT_STEPS[stepIndex.value],
  }
}
