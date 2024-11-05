<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String
})
</script>

<template>
  <button class="btn">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  font-weight: 400;
  color: var(--color-primary);
  text-align: center;
  vertical-align: middle;
  background-color: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: .8;
  text-transform: uppercase;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

  &:hover {
    color: #fff;
    background-color: var(--color-primary);
    cursor: pointer;
  }

  &.active {
    color: #fff;
    background-color: var(--color-primary);
  }
}
</style>