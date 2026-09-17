<script setup>
import { useUnitCompletionStore } from '~/stores/unitCompletion'

const props = defineProps({
  level: { type: Number, required: true },
  lesson: { type: Number, required: true },
})
const completion = useUnitCompletionStore()
const studied = computed(() => completion.isStudied(props.level, props.lesson))
const error = ref('')
watch(() => [props.level, props.lesson], () => { error.value = '' })
const toggle = () => {
  error.value = completion.toggle(props.level, props.lesson)
    ? ''
    : 'Your change could not be saved in this browser. Please allow browser storage and try again.'
}
</script>

<template>
  <div class="border-t border-ink/10 px-5 sm:px-7 py-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-ink" role="status">
          {{ studied ? '✓ Studied' : 'Finished studying this unit?' }}
        </p>
        <p class="mt-1 text-xs text-ink-soft">Saved in this browser only.</p>
      </div>
      <button type="button" :disabled="!completion.loaded" @click="toggle"
              class="min-h-11 rounded-xl border border-gold-deep/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50">
        {{ studied ? 'Mark as not studied' : 'Mark as studied' }}
      </button>
    </div>
    <p v-if="error" role="alert" class="mt-3 text-sm text-red-700">{{ error }}</p>
  </div>
</template>
