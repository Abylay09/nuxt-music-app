<script setup>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';

</script>

<template>
    <div class="layout">
        <Header/>
        <main>
            <slot/>
        </main>
        <Footer/>
    </div>
</template>

<style lang="scss" scoped>
    .layout{
        padding: 0 32px;
        display: flex;
        flex-direction: column;
        height: 100vh;
        main{
            flex: 1;
        }
    }
</style>