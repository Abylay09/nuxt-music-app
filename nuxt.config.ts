// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  alias: {
    assets: resolve(__dirname, './assets'),
  },
  css: ['~/assets/styles/main.scss'],
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: `@import "./assets/styles/variables.scss";`,
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL
    }
  }
})
