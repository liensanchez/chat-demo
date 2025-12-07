// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  ssr: false, // We want client-side only for Firebase
  
  app: {
    head: {
      title: 'Chat Demo',
      meta: [
        { name: 'description', content: 'Customer Service Chat Demo' }
      ]
    }
  },

  vite: {
    server: {
      host: true,
      allowedHosts: ['chat.liensdev.com']
    }
  }
})