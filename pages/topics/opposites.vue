<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('opposites')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
