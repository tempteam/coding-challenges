<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  author: {
    type: String,
    required: true
  },
  dateAdded: {
    type: String,
    required: true
  }
});

const initials = computed(() => props.author.split(" ").map(word => word[0]).join(""));
const formattedDate = computed(() => {
  const options = { day: '2-digit', month: 'short' };
  const dateString = new Date(props.dateAdded).toLocaleDateString('de-DE', options);
  return dateString.split('.').join('');
});
</script>

<template>
  <div class="card-meta">
    <div class="user-avatar">{{ initials }}</div>
    <div class="card-meta-info">
      <h5>{{ author }}</h5>
      <small :title="dateAdded">{{ formattedDate }}</small>
    </div>
  </div>
</template>
