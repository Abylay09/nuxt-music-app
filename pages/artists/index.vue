<script setup>
import ArtistList from '~/components/artist/ArtistList.vue';
definePageMeta({
    middleware: 'auth'
})
const config = useRuntimeConfig()
const {data, pending} = useAsyncData(async () => {
    const response = await fetch(`${config.public.apiBase}/artist/all`)
    const artists = await response.json()
    return {
        artists,
        
    }
}, {
    server: false
})
</script>
<template>
    <div>
        <div class="container">
            <div v-if="!pending">
                <div class="title">Artists</div>
                <ArtistList :artists="data.artists"/>
            </div>
            <div v-else>Loading</div>
        </div>
    </div>
</template>