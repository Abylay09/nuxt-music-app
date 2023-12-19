<template>
  <div class="container">
    <h1>Upload Track</h1>
    <form @submit.prevent="uploadTrack" v-if="!pending">
      <div>
        <label for="artist">Select Artist:</label>
        <select v-model="selectedArtist" id="artist">
          <option v-for="artist in data" :key="artist.id" :value="artist.id">
            {{ artist.pseudonym }}
          </option>
        </select>
      </div>
      <div>
        <label for="trackFile">Upload Track:</label>
        <input type="file" @change="handleFileUpload" id="trackFile" />
      </div>
        <button type="submit">Upload</button>
        <span class="result-message">{{ message }}</span>
    </form>
    <div v-else></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const config = useRuntimeConfig();
const {data, pending} = useAsyncData(async () => {
    const response = await fetch(`${config.public.apiBase}/artist/all`)
    const artists = await response.json()
    return artists
}, {
    server: false
})

const selectedArtist = ref("");
const trackFile = ref(null);
const message = ref('')
const handleFileUpload = (event) => {
  trackFile.value = event.target.files[0]; 
};


const uploadTrack = async () => {
  const formData = new FormData();
  formData.append("artistId", selectedArtist.value);
  formData.append("file", trackFile.value);
  try {
    const response = await fetch(`${config.public.apiBase}/music/upload`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json()
    console.log(result.message)
    if (response.ok) {
      message.value = result.message
    } else {
      console.error("Failed to upload track");
      message.value = result.message
    }
  } catch (error) {
    console.error("Error uploading track:", error);
  }
};
</script>

<style scoped>
h1{
  font-size: 32px;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  margin-top: 36px;
}

label {
  font-size: 18px;
  margin-bottom: 16px; /* увеличьте отступ между метками */
}

select,
input {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  font-size: 24px;
}
option{
  padding: 6px 0;
}
button {
  padding: 14px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  align-self: center;
  width: 50%;
}

button:hover {
  background-color: #45a049;
}
.result-message{
  margin-top: 24px;
  font-size: 26px;
  text-align: center;
}
</style>
