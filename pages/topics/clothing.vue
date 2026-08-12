<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('clothing')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
