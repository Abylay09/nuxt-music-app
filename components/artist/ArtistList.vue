<script setup>
defineProps({
  artists: Array,
});
const config = useRuntimeConfig();
</script>
<template>
  <div class="artist-list">
    <div
      v-for="(artist, index) in artists"
      :key="index + 1"
      class="artist-item">
      <NuxtLink :to="`/artists/${artist.id}`" class="full" />
      <div class="artist-item__image">
        <img
          :src="`${config.public.apiBase}/public/artist/images/${artist.image}`"
          alt="" />
      </div>
      <h4 class="artist-item__title">{{ artist.pseudonym }}</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.artist-list {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}
.artist-item {
  position: relative;
  text-align: center;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.2);
    color: #1DB954;
  }
  &__title {
    margin-top: 12px;
    font-size: 24px;
  }
  &__image {
    margin: auto;
    border-radius: 100%;
    border: 1.5px solid grey;
    overflow: hidden;
    width: 120px;
    height: 120px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
