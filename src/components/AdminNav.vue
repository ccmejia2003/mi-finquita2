<script setup>
import { RouterLink } from 'vue-router';
import Link from './Link.vue'
import Logo from './Logo.vue'
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
            <Link to="shop" class="text-neutral-600">
            Ir a Tienda
            </Link>
        </nav>
    </header>
</template>

