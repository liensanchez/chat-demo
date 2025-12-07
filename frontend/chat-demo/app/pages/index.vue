<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 text-center">
      <!-- Header -->
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">
        Chat Demo
      </h1>
      <p class="text-slate-400 mb-12 text-lg">
        Elige tu rol
      </p>

      <!-- Selection cards -->
      <div class="flex flex-col sm:flex-row gap-6">
        <!-- Customer Card -->
        <NuxtLink 
          to="/customer"
          class="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 w-72 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <div class="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-500/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-white mb-2">Cliente</h2>
          <p class="text-slate-400 text-sm">
            Conversar con el equipo de soporte
          </p>
          <div class="mt-5 text-blue-400 text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
            Empezar a chatear
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>

        <!-- Service Card -->
        <NuxtLink 
          to="/service/login"
          class="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 w-72 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10"
        >
          <div class="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-white mb-2">Agente de Soporte</h2>
          <p class="text-slate-400 text-sm">
            Login para ver conversaciones de clientes
          </p>
          <div class="mt-5 text-emerald-400 text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
            Login al panel
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page - no logic needed yet
</script>