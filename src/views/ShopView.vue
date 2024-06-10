<script setup>
import { storeToRefs } from 'pinia'
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '@/components/ProductCard.vue';
const products = useProductsStore()
const { filterProducts, noResults } = storeToRefs(products)
</script>
<template>
    <MainNav />
    <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
        <div class="lg:screen lg:overflow-y-scroll py-24 px-10">
            <p v-if="noResults" class="text-center text-4xl">No hay Productos</p>
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-5 md:grid-cols-2">
                <ProductCard v-for="product in filterProducts" :key="product.id" :product="product" />
            </div>
        </div>
    </main>
</template>
