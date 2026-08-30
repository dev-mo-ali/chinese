<script setup>
import { useFavoritesStore } from '~/stores/favorites'

const props = defineProps({
  word: {
    type: Object,
    required: true,
  },
})

const favorites = useFavoritesStore()
const active = computed(() => favorites.isFavorite(props.word))
const label = computed(() => `${active.value ? 'Remove' : 'Add'} ${props.word.c} ${active.value ? 'from' : 'to'} favorites`)
</script>

<template>
  <button
    type="button"
    class="favorite-word-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-white text-xl leading-none shadow-sm transition"
    :class="active
      ? 'border-amber-400 text-amber-600 hover:bg-amber-50'
      : 'border-ink/15 text-ink/35 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600'"
    :aria-label="label"
    :aria-pressed="active"
    :title="label"
    @click.stop="favorites.toggle(word)"
  >
    <span aria-hidden="true">{{ active ? '★' : '☆' }}</span>
  </button>
</template>

<style scoped>
.favorite-word-button:focus-visible {
  outline: 2px solid #d97706;
  outline-offset: 2px;
}
</style>
