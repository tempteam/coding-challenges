<script setup>
import IconHeart from '../icons/IconHeart.vue';
import Button from '../Button.vue';

defineProps({
  liked: {
    type: Boolean,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['like-click']);
const toggleLikeState = () => emit('like-click');
</script>

<template>
  <Button label="Like" :class="{ 'active': liked }" @click="toggleLikeState" />
  <div class="likes">
    <IconHeart /> {{ likes }} likes
  </div>
</template>
