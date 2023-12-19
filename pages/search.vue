<template>
    <div class="container">
      <h1>Music Search</h1>
      <div class="search-container">
        <input v-model="searchTerm" type="text" placeholder="Search for music..." @input="delayedSearchMusic" />
      </div>
      <div v-if="isLoading" class="results-container">
        <p>Loading...</p>
      </div>
      <div v-else-if="searchResults.length > 0" class="results-container">
        <h2>Search Results:</h2>
        <MusicList v-if="searchResults.length" :tracks="searchResults"/>
      </div>
      <div v-else class="results-text">
        <p>Not found</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MusicList from '~/components/music/MusicList.vue';
  const searchTerm = ref('');
  const searchResults = ref([]);
  const isLoading = ref(false);
  const config = useRuntimeConfig();
  
  const delayedSearchMusic = () => {
    clearTimeout(delayedSearchMusic.timer); 
  
    delayedSearchMusic.timer = setTimeout(() => {
      searchMusic();
    }, 1500);
  };
  
  const searchMusic = async () => {
    try {
      isLoading.value = true;
  
      const response = await fetch(`${config.public.apiBase}/music/search?name=${searchTerm.value}`);
      const data = await response.json();
  
      if (data.success) {
        searchResults.value = data.data;
      } else {
        console.error('Failed to search music:', data.message);
      }
    } catch (error) {
      console.error('Error searching music:', error);
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  <style scoped>
  .search-container {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    height: 50px;
    font-size: 24px;
    margin: 16px 0;
  }
  
  .results-container {
    margin-top: 20px;
  }
  
  .results-text{
    font-size: 24px;
    color: #f5f5f5;
    text-align: center;
  }
  </style>
  