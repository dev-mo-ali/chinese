<script setup>
import { topicBySlug } from '~/composables/useTopics.js'
const topic = topicBySlug('kitchen')
</script>

<template>
  <TopicPage :topic="topic" />
</template>
