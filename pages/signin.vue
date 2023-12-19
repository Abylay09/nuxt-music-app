<script setup>
import { reactive } from 'vue';
const state = reactive({
    email: '',
    password: ''
})
const name = ref('')
const config = useRuntimeConfig()
const cookie = useCookie('token')
const signup = async () => {
    const response = await fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: state.email,
            password: state.password,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await response.json()
    if(response.ok){
        cookie.value = res.access_token;
        navigateTo('/')
    }else{
        console.log(error)
    }
}

definePageMeta({
  layout: false,
});
</script>

<template>
    <div class="auth-page">
        <form class="form" @submit.prevent="signup">
            <h1>Login</h1>
            <input v-model="state.email" type="text" placeholder="email">
            <input v-model="state.password" type="text" placeholder="password">
            <button>Sign in</button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
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
        
    }
</style>