<script setup>
import { reactive } from 'vue';
const state = reactive({
    name: '',
    surname: '',
    email: '',
    password: ''
})
const name = ref('')
const config = useRuntimeConfig()

const signup = async () => {
    const response = await fetch(`${config.public.apiBase}/auth/registration`, {
        method: "POST",
        body: JSON.stringify({
            name: state.name,
            surname: state.surname,
            password: state.password,
            email: state.email
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(response.ok){
        navigateTo('/signin')
    }
}

definePageMeta({
  layout: false,
});
</script>

<template>
    <div class="auth-page">
        <form class="form" @submit.prevent="signup">
            <h1>Registration</h1>
            <input v-model="state.name" type="text" placeholder="name">
            <input v-model="state.surname" type="text" placeholder="surname">
            <input v-model="state.email" type="text" placeholder="email">
            <input v-model="state.password" type="text" placeholder="password">
            <button>Sign up</button>
            <button>
                <NuxtLink to="/signin">Sign in</NuxtLink>
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>    
a {
    text-decoration: none;
    color: #fff;
}
    .auth-page{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    h1{
        text-align: center;
    }
    .form{
        display: flex;
        flex-direction: column;
        max-width: 420px;
        width: 100%;
        gap: 24px;
        input{
            padding: 12px 8px;
            font-size: 21px;
            border-radius: 12px;
            border: none;
            &::placeholder{
                font-size: 21px;
            }
        }
        button{
            padding: 12px;
            font-size: 24px;
            font-weight: 500;
            background: transparent;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s linear;
            color: #fff;
            &:hover{
                background-color: $main-color;
                color: #1DB954;
            }
        }
    }
</style>