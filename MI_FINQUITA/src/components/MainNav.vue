<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
import { useProductsStore } from '../stores/products';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ListItemCartShop from './ListItemCartShop.vue';
import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue';
const auth = useAuthStore()

const products = useProductsStore();
const isCartVisible = ref(false);
const toggleCartVisibility = () => {
    isCartVisible.value = !isCartVisible.value;
};
</script>

<template>
    <header
        class="px-10 py-5 bg-white flex flex-col lg:flex-row gap-5 lg:items-center justify-between absolute top-0 w-full z-10">
        <div>
            <Logo />
            <div class="flex gap-5 text-black">
                <h2 class="text-lg font-extrabold">Filtros: </h2>
                <div class="flex items-center gap-2" v-for="category in products.categories" :key="category.id">
                    <input type="radio" name="category" :value="category.id"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :checked="products.selectedCategory === category.id"
                        @change="products.selectedCategory = +$event.target.value">
                    <label class="text-gray-800">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <nav>
            <button @click="toggleCartVisibility" class="mr-2">
                <FontAwesomeIcon :icon="faShoppingCart" size="2xl" />
            </button>
            <!-- <Link to="sales" class="mr-2">
            Administrar
            </Link> -->
            <Link class="mr-2" to="shop">
            Tienda
            </Link>
            <button v-if="auth.isAuth" @click="auth.logout"
                class="rounded bg-red-500 hover:bg-red-600 transition-colors font-bold py-2 px-10">Cerrar
                Sesión</button>
            <button v-else @click="auth.logout"
                class="rounded bg-orange-500 hover:bg-orange-600 transition-colors font-bold py-2 px-10">Iniciar
                Sesión</button>

        </nav>
    </header>
    <div v-if="isCartVisible">
        <ListItemCartShop />
    </div>
</template>
