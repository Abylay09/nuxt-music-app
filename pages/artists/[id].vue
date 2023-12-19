<script setup>

import ArtistList from '~/components/artist/ArtistList.vue';
import MusicList from '~/components/music/MusicList.vue'
import EditArtistForm from '~/components/artist/EditArtistForm.vue'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const id = route.params.id
const config = useRuntimeConfig()
const {data: artist, pending} = useAsyncData(async () => {
    const response = await fetch(`${config.public.apiBase}/artist/${id}`)
    const artist = await response.json()
    return artist
}, {
    server: false
})

const edit = ref(true)
</script>
<template>
    <div>
        <div class="container">
            <template v-if="!pending">
                <EditArtistForm v-if="edit" :artist="artist" />
                <template v-else>
                    <div class="artist-info">
                    <div class="artist-info__image">
                            <img :src="`${config.public.apiBase}/public/artist/images/${artist.image}`" alt="">
                    </div>
                    <div class="artist-info__content">
                        Name: {{ artist.surname }} <br>xx
                        Surname: {{ artist.name  }} <br>
                        Pseudonym: {{ artist.pseudonym }}
                    </div>
                </div>
                <div class="artist-tracks" v-if="artist.tracks">
                    <div class="title">Tracks</div>
                    <MusicList :tracks="artist?.tracks" />
                </div>
                </template>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.artist-info {
    display: flex;
    gap: 20px;
    &__image {
        img {
            width: 320px;
            border-radius: 8px;
        }
    }
    margin-bottom: 24px;
}
</style>