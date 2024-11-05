import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue';

describe('App component', () => {
  it('renders the header title', () => {
    const wrapper = mount(App);
    expect(wrapper.find('.header-title').text()).toBe('dev articles');
  });

  it('filters articles based on search query', async () => {
    const wrapper = mount(App);

    const filterWidget = wrapper.findComponent({ name: 'FilterWidget' });
    const searchInput = filterWidget.find('input[type="text"]');
    await searchInput.setValue('QA in 2022');

    const articlesComponent = wrapper.findComponent({ name: 'Articles' });

    expect(wrapper.vm.searchQuery).toBe('QA in 2022');
    const articleCards = articlesComponent.findAll('.card');
    expect(articleCards).toHaveLength(1);
    expect(articleCards[0].find('.article-title').text()).toBe('QA in 2022');
  });

  it('sorts articles by author name', async () => {
    const wrapper = mount(App);

    const filterWidget = wrapper.findComponent({ name: 'FilterWidget' });
    const sortBySelect = filterWidget.find('select');
    await sortBySelect.setValue('author');

    const articlesComponent = wrapper.findComponent({ name: 'Articles' });
    
    const sortedArticles = articlesComponent.vm.filteredArticles.sort((a, b) => a.author.localeCompare(b.author));
    const articleTitles = articlesComponent.findAll('.card .article-title').map(wrapper => wrapper.text());


    expect(wrapper.vm.sortBy).toBe('author');
    expect(articleTitles).toEqual(sortedArticles.map(article => article.title));
  });

  it('sorts articles by date in ascending order', async () => {
    const wrapper = mount(App);
  
    const filterWidget = wrapper.findComponent({ name: 'FilterWidget' });
    const sortBySelect = filterWidget.find('select');
    await sortBySelect.setValue('dateAscending');
  
    const articlesComponent = wrapper.findComponent({ name: 'Articles' });

    const sortedArticles = articlesComponent.vm.filteredArticles.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    const articleTitles = articlesComponent.findAll('.card .article-title').map(wrapper => wrapper.text());
  
    expect(articleTitles).toEqual(sortedArticles.map(article => article.title));
  });

  it('sorts articles by date in descending order', async () => {
    const wrapper = mount(App);
  
    const filterWidget = wrapper.findComponent({ name: 'FilterWidget' });
    const sortBySelect = filterWidget.find('select');
    await sortBySelect.setValue('dateDescending');
  
    const articlesComponent = wrapper.findComponent({ name: 'Articles' });

    const sortedArticles = articlesComponent.vm.filteredArticles.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    const articleTitles = articlesComponent.findAll('.card .article-title').map(wrapper => wrapper.text());
  
    expect(articleTitles).toEqual(sortedArticles.map(article => article.title));
  });

  it('filters articles by current year', async () => {
    const wrapper = mount(App);
  
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
  
    const articlesComponent = wrapper.findComponent({ name: 'Articles' });

    const currentYear = new Date().getFullYear();
    const filteredArticles = articlesComponent.vm.filteredArticles.filter(article => new Date(article.dateAdded).getFullYear() === currentYear);
    const articleTitles = articlesComponent.findAll('.card .article-title').map(wrapper => wrapper.text());
  
    expect(wrapper.vm.latestOnly).toBe(true);
    expect(articleTitles).toEqual(filteredArticles.map(article => article.title));
  });

  it('likes an article', async () => {
    const wrapper = mount(App);
  
    const articlesComponent = wrapper.findComponent({ name: 'Articles' });

    const likeButton = articlesComponent.find('.btn');
    await likeButton.trigger('click');

    expect(articlesComponent.vm.filteredArticles[0].liked).toBe(true);
    expect(articlesComponent.vm.filteredArticles[0].likes).toBe(13);
  });
});
