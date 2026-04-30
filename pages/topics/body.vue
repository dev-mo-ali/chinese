<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('body')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
