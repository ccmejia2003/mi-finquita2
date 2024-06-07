<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
    try {
        await auth.register({ email: email.value, password: password.value });
        router.push({ name: 'login' });
    } catch (error) {
        errorMessage.value = error.message || 'Registration failed';
        console.error(error);
    }
};
</script>

<template>
    <div class="flex gap-2 justify-center items-center">
        <img src="/img/FAVI.png" alt="" class="w-16">
        <h1 class="text-3xl font-black to-black">MI <span class="text-amber-800">FINQUITA</span></h1>
    </div>
    <div class="flex justify-center items-center flex-col">
        <p class="text-2xl text-white text-center my-2">
            Crea una nueva cuenta
        </p>
        <div class="bg-white px-16 rounded-md py-24 w-2/4">
            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" id="email" class="mt-1 block w-full border rounded-md" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700">Password</label>
                    <input v-model="password" type="password" id="password" class="mt-1 block w-full border rounded-md" required>
                </div>
                <div class="text-center text-red-500" v-if="errorMessage">{{ errorMessage }}</div>
                <div class="flex justify-center mt-4">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Registrarse</button>
                </div>
            </form>
            <p class="text-center mt-4">
                <RouterLink to="/login" class="text-blue-500">Iniciar Sesión</RouterLink>
            </p>
        </div>
    </div>
</template>

