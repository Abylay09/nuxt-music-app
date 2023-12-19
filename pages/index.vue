<script setup>
import ArtistList from '~/components/artist/ArtistList.vue';
import MusicList from '~/components/music/MusicList.vue';
// definePageMeta({
//     middleware: 'auth'
// })
const config = useRuntimeConfig()
const {data, pending} = useAsyncData(async () => {
    const responseTracks = await fetch(`${config.public.apiBase}/music/get-all-tracks`)
    const tracks = await responseTracks.json()
    return {
        tracks
    }
}, {
    server: false
})
</script>
<template>
    <div>
        <div class="container">
            <div v-if="!pending">
                <h1 class="title">Tracks</h1>
                <MusicList :tracks="data.tracks"/>
            </div>
            <div v-else>Loading</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .title{
        font-size: 42px;
    }
</style>