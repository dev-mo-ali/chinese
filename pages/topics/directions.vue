<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('directions')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
