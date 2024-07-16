<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');

const handleRegister = ({ email, password }) => {
    auth.register({ email, password });
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
            <FormKit id="registerForm" type="form" @submit="handleRegister" :actions="false">
                <FormKit type="email" v-model="email" label="Email" name="email" placeholder="Email de Usuario"
                    validation="required|email" :validation-messages="{
                        required: 'El email es obligatorio',
                        email: 'Email no válido',
                    }" />
                <FormKit type="password" v-model="password" label="Password" name="password"
                    placeholder="Password de Usuario" validation="required|min:6" :validation-messages="{
                        required: 'El password es obligatorio',
                        min: 'El password debe tener al menos 6 caracteres',
                    }" />
                <FormKit type="submit">Registrarse</FormKit>
                <p class="text-center mt-4">
                    Si ya tienes una cuenta <span>

                        <RouterLink to="/login" class="text-orange-600 font-bold">Inicia Sesion</RouterLink>
                    </span>
                </p>
            </FormKit>
        </div>
    </div>
</template>
