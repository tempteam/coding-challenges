<script setup>
import { ref } from 'vue';
import apiData from './api.json';
import Articles from './components/article/Articles.vue';
import FilterWidget from './components/filter-widget/FilterWidget.vue';

const articles = ref(apiData?.payload?.data || []);

const searchQuery = ref('');
const sortBy = ref('all');
const latestOnly = ref(false);

const updateSearchQuery = (value) => searchQuery.value = value;
const updateSortBy = (value) => sortBy.value = value;
const updateLatestOnly = (value) => latestOnly.value = value;
</script>

<template>
  <header>
    <div class="header-content">
      <div class="header-title">dev articles</div>
      <FilterWidget @update-search-query="updateSearchQuery" @update-sort-by="updateSortBy"
        @update-latest-only="updateLatestOnly" />
    </div>
  </header>
  <main>
    <Articles :articles="articles" :search-query="searchQuery" :sort-by="sortBy" :latest-only="latestOnly" />
  </main>
</template>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 220px;
  background-color: var(--color-primary-variant);
  z-index: 1;

  .header-content {
    width: 920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  }

  .header-title {
    font-size: 24px;
    color: var(--color-gray);
    font-weight: 500;
  }
}

main {
  position: relative;
  top: 300px;
  width: 920px;
  min-width: 320px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 20px;
}
</style>