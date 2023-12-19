<template>
  <h1>Add new Artist</h1>
  <form @submit.prevent="updateArtist">
    <div>
      <label for="name">Name:</label>
      <input v-model="state.name" type="text" id="name" />
    </div>
    <div>
      <label for="surname">Surname:</label>
      <input v-model="state.surname" type="text" id="surname" />
    </div>
    <div>
      <label for="pseudonym">Pseudonym:</label>
      <input v-model="state.pseudonym" type="text" id="pseudonym" />
    </div>
    <div>
      <label for="image">Image:</label>
      <input type="file" @change="handleFileUpload" id="image" />
    </div>
    <button type="submit">Create</button>
    <h3 v-if="message" class="message">{{ message }}</h3>
  </form>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
});
const state = reactive({
  name: "",
  surname: "",
  pseudonym: "",
});
const image = ref();
const config = useRuntimeConfig();

const message = ref("");
const handleFileUpload = (event) => {
  image.value = event.target.files[0];
};

const updateArtist = async () => {
  const formData = new FormData();
  formData.append("name", state.name);
  formData.append("surname", state.surname);
  formData.append("pseudonym", state.pseudonym);
  formData.append("image", image.value);

  try {
    const response = await fetch(`${config.public.apiBase}/artist/create`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      message.value = "Артист добавлен";
    } else {
      message.value = result.message;
      console.error("Failed to update artist");
    }
  } catch (error) {
    console.error("Error updating artist:", error);
  }
};
</script>

<style lang="scss">
h1 {
  font-size: 36px;
}
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
.message {
  font-size: 24px;
  color: #1db954;
}
</style>
