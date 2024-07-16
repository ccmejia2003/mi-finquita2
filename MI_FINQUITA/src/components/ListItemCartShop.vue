<script setup>
import { useCartStore } from '@/stores/cart';
import Link from './Link.vue';
import ShoppingCartItem from './ShoppingCartItem.vue';
import { formatCurrency } from '@/helpers';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDeleteLeft, faArrowsToCircle } from '@fortawesome/free-solid-svg-icons';
const cart = useCartStore();

</script>

<template>
    <div class="bg-gray-300 p-3 w-auto h-auto rounded-md absolute right-56 top-32 z-10">
        <div v-if="cart.items.length > 0">
            <p class="font-bold text-lg">Cantidad de Productos: {{ cart.countItem }}</p>
            <p class="font-bold text-lg">Total: {{ formatCurrency(cart.total) }} </p>
        </div>
        <ul v-if="cart.items.length > 0" role="list"
            class="mt-6 divide-y divide-gray-200 text-center mb-2 max-h-80 overflow-y-auto">
            <ShoppingCartItem v-for="item in cart.items" :key="item.id" :item="item" />
            <Link to="cart" class="mr-3">
            Ver Carrito
            </Link>
            <button @click="cart.clearCart"
                class="rounded bg-red-500 hover:bg-red-600 transition-colors font-bold py-2 px-6">
                Vaciar
                <FontAwesomeIcon :icon="faDeleteLeft" />
            </button>
        </ul>
        <h1 class="font-bold" v-else>El carrito está vacío</h1>
    </div>
</template>
