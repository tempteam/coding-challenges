<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  label: String
})

const emit = defineEmits(['update:modelValue']);

const innerState = ref(props.modelValue);
const changeState = () => emit('update:modelValue', innerState.value);
</script>

<template>
  <label>
    <input type="checkbox" class="form-control checkbox" v-model="innerState" name="checkbox" @change="changeState" />
    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.checkbox {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--color-gray);
  color: currentColor;
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.10em;
  transform: translateY(-0.075em);
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 1em;
    height: 1em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: transform 120ms ease-in-out;
    box-shadow: inset 1em 1em var(--color-primary);
    background-color: CanvasText;
  }

  &:checked::before {
    transform: scale(1);
  }
}
</style>