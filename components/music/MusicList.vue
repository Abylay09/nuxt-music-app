<script setup>
import MusicItem from './MusicItem.vue';
defineProps({
  tracks: String,
});
</script>
<template>
  <div class="music-list">
    <MusicItem v-for="(track,index) in tracks" :key="index+1" :track="track"/>
  </div>
</template>

<style lang="scss">
.music-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}
</style>
