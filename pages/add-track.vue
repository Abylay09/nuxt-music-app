<template>
    <div class="container">
      <h1>Upload Track</h1>
      <form @submit.prevent="uploadTrack">
        <div>
          <label for="artist">Select Artist:</label>
          <select v-model="selectedArtist" id="artist">
            <option v-for="artist in artists" :key="artist.id" :value="artist.id">{{ artist.name }}</option>
          </select>
        </div>
        <div>
          <label for="trackFile">Upload Track:</label>
          <input type="file" @change="handleFileUpload" id="trackFile" />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedArtist = ref('');
  const trackFile = ref(null);
  const artists = [
    // Replace this with actual artist data fetched from your API
    { id: 1, name: 'Artist 1' },
    { id: 2, name: 'Artist 2' },
    // Add more artists as needed
  ];
  
  const handleFileUpload = (event) => {
    trackFile.value = event.target.files[0]; // Store the selected track file
  };
  
  const config = useRuntimeConfig()

  const uploadTrack = async () => {
    const formData = new FormData();
    formData.append('artistId', selectedArtist.value);
    formData.append('file', trackFile.value);
  
    try {
      const response = await fetch(`${config.public.apiBase}/music/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Handle successful upload
      } else {
        // Handle upload failure
        console.error('Failed to upload track');
      }
    } catch (error) {
      console.error('Error uploading track:', error);
    }
  };
  </script>
  
  