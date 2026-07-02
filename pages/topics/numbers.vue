<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('numbers')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
