import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  serverDir: 'server/',

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-viewport',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/styles/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      api: {},
    },
  },

  fonts: {
    defaults: { preload: true },
    families: [
      {
        name: 'Roboto-Light',
        src: '/fonts/Roboto-Light.woff2',
        weight: 300,
      },
      {
        name: 'Roboto-Regular',
        src: '/fonts/Roboto-Regular.woff2',
        weight: 400,
      },
      {
        name: 'Roboto-Medium',
        src: '/fonts/Roboto-Medium.woff2',
        weight: 500,
      },
      {
        name: 'Roboto-SemiBold',
        src: '/fonts/Roboto-SemiBold.woff2',
        weight: 600,
      },
      {
        name: 'Roboto-Bold',
        src: '/fonts/Roboto-Bold.woff2',
        weight: 700,
      },
      {
        name: 'Roboto-ExtraBold',
        src: '/fonts/Roboto-ExtraBold.woff2',
        weight: 800,
      },
      {
        name: 'Roboto-Black',
        src: '/fonts/Roboto-Black.woff2',
        weight: 900,
      },
    ]
  }
})