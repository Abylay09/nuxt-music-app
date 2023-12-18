<script setup></script>
<template>
    <header>
        <img src="@/assets/images/site-icon.png" alt="">
        <nav class="nav">
            <li>
                <nuxt-link to="music">Music</nuxt-link>
            </li>
            <li>
                <nuxt-link to="music">Add music</nuxt-link>
            </li>
            <li>
                <nuxt-link to="signup">signup</nuxt-link>
            </li>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid grey;
        img{
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
    }
    .nav{
        display: flex;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        gap: 24px;
        width: 50%;
        li{
            a{
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-decoration: none;
                text-transform: lowercase;
                font-size: 24px;
                color: $main-color;
                font-weight: 400;
            }
        }
    }
</style>