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
  padding: 14px 0;
}
.artist-item {
  &__image {
    border-radius: 100%;
    border: 1.5px solid grey;
    overflow: hidden;
    width: 80px;
    height: 80px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
