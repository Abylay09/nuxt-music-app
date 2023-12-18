<script setup>
import ArtistList from '~/components/artist/ArtistList.vue';
import MusicList from '~/components/music/MusicList.vue';
definePageMeta({
    middleware: 'auth'
})
const config = useRuntimeConfig()
const {data, pending} = useAsyncData(async () => {
    const response = await fetch(`${config.public.apiBase}/artist/all`)
    const responseTracks = await fetch(`${config.public.apiBase}/music/get-all-tracks`)
    const artists = await response.json()
    const tracks = await responseTracks.json()
    console.log(tracks);
    return {
        artists,
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
                <ArtistList :artists="data.artists"/>
                <MusicList :tracks="data.tracks"/>
            </div>
            <div v-else>Laoding</div>
        </div>
    </div>
</template>