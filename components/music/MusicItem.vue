<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  track: String,
});

const trackName = computed(() => {
    const lastDotIndex = props.track.name.lastIndexOf('.');
    if (lastDotIndex !== -1 && lastDotIndex !== 0) {
        return props.track.name.slice(0, lastDotIndex);
    }
    return props.track.name;
})
</script>
<template>
  <div class="music-item">
    <h4>{{ trackName }}</h4>
    <audio controls>
      <source
        :src="`${config.public.apiBase}/public/music/${track.name}`"
        type="audio/mpeg" />
    </audio>
  </div>
</template>

<style lang="scss">
.music-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    h4{
      font-size: 24px;
      font-weight: 400;
    }
    audio{
        width: 100%;
    }
}
</style>
