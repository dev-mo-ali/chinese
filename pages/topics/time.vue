<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('time')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
