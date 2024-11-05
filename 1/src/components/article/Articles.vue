<script setup>
import { defineProps, computed } from 'vue';
import ArticleItem from './ArticleItem.vue';

const props = defineProps({
  articles: Array,
  searchQuery: String,
  sortBy: String,
  latestOnly: Boolean
})

const filterBySearchQuery = (article) => {
  return article.author.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
    article.title.toLowerCase().includes(props.searchQuery.toLowerCase());
};

const filterByLatestOnly = (article) => {
  const currentYear = new Date().getFullYear();
  const articleYear = new Date(article.dateAdded).getFullYear();
  return articleYear === currentYear
};

const sortArticles = (articles, sortBy) => {
  switch (sortBy) {
    case 'author':
      articles.sort((a, b) => {
        const nameA = a.author.toUpperCase();
        const nameB = b.author.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
      break;
    case 'dateAscending':
      articles.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      break;
    case 'dateDescending':
      articles.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
  }
}

const filteredArticles = computed(() => {
  let filtered = props.articles.filter(article => {
    if (props.latestOnly) {
      return filterByLatestOnly(article);
    }

    return filterBySearchQuery(article);
  });

  sortArticles(filtered, props.sortBy);

  return filtered;
});
</script>


<template>
  <div class="container" v-if="filteredArticles.length">
    <ArticleItem v-for="(article, index) in filteredArticles" :key="index" :article="article" />
  </div>
  <div v-else>No articles found</div>
</template>