<template>
    <form @submit.prevent="updateArtist">
      <div>
        <label for="name">Name:</label>
        <input v-model="editedArtist.name" type="text" id="name" />
      </div>
      <div>
        <label for="surname">Surname:</label>
        <input v-model="editedArtist.surname" type="text" id="surname" />
      </div>
      <div>
        <label for="pseudonym">Pseudonym:</label>
        <input v-model="editedArtist.pseudonym" type="text" id="pseudonym" />
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" @change="handleFileUpload" id="image" />
      </div>
        <button type="submit">Update</button>
        <h3 v-if="message" class="message">{{ message }}</h3>
    </form>
  </template>
  
  <script setup>
  import { ref, defineProps, onMounted } from 'vue';
  
  const props = defineProps({
    artist: {
      type: Object,
      required: true,
    },
  });
  
  const config = useRuntimeConfig()

  const editedArtist = ref({ ...props.artist });
  const message = ref('')
  const handleFileUpload = (event) => {
    editedArtist.value.image = event.target.files[0];
  };
  
  const updateArtist = async () => {
    const formData = new FormData();
    formData.append('name', editedArtist.value.name);
    formData.append('surname', editedArtist.value.surname);
    formData.append('pseudonym', editedArtist.value.pseudonym);
    formData.append('image', editedArtist.value.image);
  
    try {
      const response = await fetch(`${config.public.apiBase}/artist/update/${props.artist.id}`, {
        method: 'PATCH',
        body: formData,
      });
      const result = await response.json()
      if (response.ok) {
        message.value = result.message
      } else {
        message.value = result.message
        console.error('Failed to update artist');
      }
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };
  
  </script>

<style lang="scss">
  form {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type="file"] {
    margin-top: 4px;
  }

  button {
    background-color: #1db954;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 150px;
  }

  button:hover {
    background-color: #25ac54;
    color: #fff;
    margin: 0 auto;
  }
  .message{
    font-size: 24px;
    color: #1db954;
  }
</style>