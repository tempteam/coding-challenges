<script setup>
import { defineProps, ref, watch } from 'vue';
import ArticleImage from './ArticleImage.vue';
import ArticleMeta from './ArticleMeta.vue';
import ArticleLike from './ArticleLike.vue';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const article = ref(props.article);
watch(() => props.article, (value) => article.value = value);

const handleLikeClick = () => {
  article.value.likes += article.value.liked ? -1 : 1;
  article.value.liked = !article.value.liked;
};

</script>

<template>
  <div class="card">
    <ArticleImage :image-url="article.images[0].landscape[0]" />
    <div class="card-body">
      <ArticleMeta :author="article.author" :date-added="article.dateAdded" />
      <div class="article-title">{{ article.title }}</div>
    </div>
    <div class="card-footer">
      <ArticleLike :liked="article.liked || false" :likes="article.likes" @like-click="handleLikeClick" />
    </div>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>