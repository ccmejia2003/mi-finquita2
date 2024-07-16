<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-6xl font-extrabold text-gray-800">404</h1>
    <h2 class="text-2xl font-semibold text-gray-700 mt-2">Página no encontrada</h2>
    <p class="text-gray-500 mt-4 text-center max-w-md">
      Lo sentimos, la página que estás buscando no existe o ha sido movida.
    </p>
    <RouterLink to="/"
      class="mt-6 px-6 py-2 bg-orange-600 text-white font-bold rounded-md shadow hover:bg-orange-700 transition">
      Volver al inicio
    </RouterLink>
  </div>
</template>
