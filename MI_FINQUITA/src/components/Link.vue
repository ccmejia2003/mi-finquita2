<script setup>
import { RouterLink } from 'vue-router';
defineProps({
    to: {
        type: String
    }
})
</script>
<template>
    <RouterLink :to="{ name: to }" class="rounded bg-orange-300 hover:bg-orange-400 transition-colors font-bold py-2 px-10">
        <slot></slot>
    </RouterLink>
</template>

