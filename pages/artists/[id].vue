<script setup>
import ArtistList from "~/components/artist/ArtistList.vue";
import MusicList from "~/components/music/MusicList.vue";
import EditArtistForm from "~/components/artist/EditArtistForm.vue";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const id = route.params.id;
const config = useRuntimeConfig();
const { data: artist, pending } = useAsyncData(
  async () => {
    const response = await fetch(`${config.public.apiBase}/artist/${id}`);
    const artist = await response.json();
    return artist;
  },
  {
    server: false,
  }
);

const edit = ref(false);
</script>
<template>
  <div>
    <div class="container">
      <template v-if="!pending">
        <EditArtistForm v-if="edit" :artist="artist" />
        <template v-else>
          <div class="artist-info">
            <div class="artist-info__data">
              <div class="artist-info__image">
                <img
                  :src="`${config.public.apiBase}/public/artist/images/${artist.image}`"
                  alt="" />
              </div>
              <div class="artist-info__content">
                <span>Name: {{ artist.surname }}</span>
                <span>Surname: {{ artist.name }}</span>
                <span>Pseudonym: {{ artist.pseudonym }}</span>
              </div>
            </div>
            <p class="edit-btn" @click="edit = true">Edit Artist</p>
          </div>
          <div class="artist-tracks" v-if="artist.tracks">
            <h1 class="title">Tracks</h1>
            <MusicList :tracks="artist?.tracks" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 36px;
  color: #1db954;
}
.artist-info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__data {
    display: flex;
    align-items: center;
    gap: 50px;
  }
  &__image {
    img {
      width: 280px;
      height: 280px;
      border-radius: 8px;
    }
  }
  margin-bottom: 24px;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 25px;
    span {
      font-size: 28px;
    }
  }
}
.edit-btn {
  padding: 14px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  width: 150px;
  cursor: pointer;
  text-align: center;
}
</style>
