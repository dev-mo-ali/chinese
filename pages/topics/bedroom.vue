<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('bedroom')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
