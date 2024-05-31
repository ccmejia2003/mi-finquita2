<script setup>
import { useProductsStore } from '../../stores/products'
import Link from '@/components/Link.vue'
import Product from '@/components/Product.vue'
const products = useProductsStore()

</script>
<template>
    <div>
        <Link to="new-product" class="rounded bg-white hover:bg-white transition-colors font-bold py-2 px-10">
        Nuevo Producto
        </Link>
        <h1 class="text-4xl font-black text-gray-800 my-10">Productos</h1>
        <p v-if="products.noResults">No hay resultados</p>
        <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            <Product v-for="product in products.productsCollection" key="product.id" :product="product" />
        </ul>
    </div>
</template>

