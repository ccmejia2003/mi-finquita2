<script setup>
import { storeToRefs } from 'pinia'
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue';
const products = useProductsStore()
const { filterProducts, noResults } = storeToRefs(products)
import ShoppingCart from '@/components/ShoppingCart.vue';
</script>
<template>
    <MainNav />
    <main class="pt-10 p-60">
        <div class="lg:screen py-24 px-10">
            <div>
                <ShoppingCart />
            </div>
        </div>
    </main>
</template>
