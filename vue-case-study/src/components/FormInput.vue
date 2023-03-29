<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import IconSearch from './icons/IconSearch.vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue);
const updateValue = () => emit('update:modelValue', innerValue.value);
</script>

<template>
  <div class="flex">
    <IconSearch />
    <input type="text" v-model="innerValue" class="form-control" :placeholder="placeholder" @input="updateValue">
  </div>
</template>