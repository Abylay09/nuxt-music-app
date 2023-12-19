<script setup>
const cookie = useCookie('token')
const isLoggedIn = cookie.value?.length

const logout = () => {
    console.log('log')
    cookie.value = '';
    navigateTo('/')
}
</script>


<template>
    <aside class="sidebar">
        <div class="logo">
            <NuxtLink to="/">
                <img src="/logo.png" alt="logo">
            </NuxtLink> 
        </div>
        <nav class="nav">
            <ul>
                <li>
                    <nuxt-link to="/">Tracks</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/artists">Artists</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/add-track">Add track</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/search">Search</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="isLoggedIn" @click="logout">Log out</nuxt-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style lang="scss">
.sidebar {
    background-color: #212121;
    padding: 32px;
}
.logo {
    margin-bottom: 24px;
    img {
        width: 146px;
    }
}
ul {
    list-style: none;
    padding: 0;
    li {
        margin-bottom: 24px;
        a {
            font-size: 21px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;

            &.router-link-active {
                color: #1DB954;
            }
        }
    }
}
</style>