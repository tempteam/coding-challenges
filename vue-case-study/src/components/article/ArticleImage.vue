<script setup>
import { defineProps } from 'vue';

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
});

</script>

<template>
  <img :src="imageUrl" alt="Image" />
</template>