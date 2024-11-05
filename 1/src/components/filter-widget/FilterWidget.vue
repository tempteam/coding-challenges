<script setup>
import { ref, defineEmits } from 'vue';
import FormInput from '../FormInput.vue';
import FormSelect from '../FormSelect.vue';
import FormCheckbox from '../FormCheckbox.vue';

const emit = defineEmits(['update-search-query', 'update-sort-by', 'update-latest-only']);

const updateSearchQuery = (event) => emit('update-search-query', event.target.value);
const updateSortBy = (event) => emit('update-sort-by', event.target.value);
const updateLatestOnly = (event) => emit('update-latest-only', event.target.checked);

const searchOptions = [
  {
    id: 'all',
    value: 'All Results'
  },
  {
    id: 'author',
    value: 'Author'
  },
  {
    id: 'dateAscending',
    value: 'Date (Ascending)'
  },
  {
    id: 'dateDescending',
    value: 'Date (Descending)'
  }
];
const selectedOptions = ref('all');
</script>

<template>
  <div class="filter-widget">
    <FormInput placeholder="Filter by title, author..." @input="updateSearchQuery" />
    <FormSelect v-model="selectedOptions" :options="searchOptions" @change="updateSortBy" />
    <FormCheckbox label="Latest only" @change="updateLatestOnly" />
  </div>
</template>

<style lang="scss">
@import 'style.scss'
</style>