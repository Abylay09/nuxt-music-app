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
      <div>
        <button type="submit">Update</button>
      </div>
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

  const editedArtist = ref({ ...props.artist }); // Populate the form with passed artist data
  
  const handleFileUpload = (event) => {
    editedArtist.value.image = event.target.files[0]; // Store the selected file
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
  
      if (response.ok) {
        // Handle successful update
      } else {
        // Handle update failure
        console.error('Failed to update artist');
      }
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };
  
  // Log the artist data on mount (for debugging purposes)
  onMounted(() => {
    console.log('Artist props:', props.artist);
  });
  </script>