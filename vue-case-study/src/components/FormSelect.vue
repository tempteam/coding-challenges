<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  options: Array
})

const emit = defineEmits(['update:modelValue']);

const innerValue = ref(props.modelValue);
const changeOption = () => emit('update:modelValue', innerValue.value);
</script>

<template>
  <select class="form-control" v-model="innerValue" @change="changeOption">
    <option v-for="option in options" :key="option.id" :value="option.id">{{ option.value }}</option>
  </select>
</template>