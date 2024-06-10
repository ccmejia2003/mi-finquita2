<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import Logo from './Logo.vue'
const auth = useAuthStore()
</script>
<template>
    <header class="px-10 py-5 bg-white flex justify-between absolute top-0 w-full z-10">
        <div>
            <Logo />
        </div>
        <nav>
            <RouterLink :to="{ name: 'products' }" class="rounded text-black font-bold p-2">
                Productos
            </RouterLink>
            <RouterLink :to="{ name: 'sales' }" class="rounded text-black font-bold p-2">
                Ventas
            </RouterLink>
            <!-- <Link to="shop" class="text-neutral-600">
            Ir a Tienda
            </Link> -->
            <button v-if="auth.isAuth" @click="auth.logout"
                class="rounded bg-red-500 hover:bg-red-600 transition-colors font-bold py-2 px-10 ml-2">Cerrar
                Sesión</button>
        </nav>
    </header>
</template>
