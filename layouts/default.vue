<script setup>
import Sidebar from '~/components/Sidebar.vue'

</script>

<template>
    <div class="layout">
        <Sidebar />
        <main>
            <slot/>
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .layout{
        padding: 0 32px 0 0;
        display: flex;
        height: 100vh;
        main{
            flex: 1;
            padding: 30px;
        }
    }
</style>