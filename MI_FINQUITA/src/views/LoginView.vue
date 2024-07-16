<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
const route = useRoute()
const authRoutes = [{ name: "login", text: "Volver A inicio" }];
const auth = useAuthStore()

const handleSubmit = (formData) => {
    const { email, password } = formData
    auth.login({ email, password })
};

</script>

<template>
    <div class="flex gap-2 justify-center items-center">
        <img src="/img/FAVI.png" alt="" class="w-16">
        <h1 class="text-3xl font-black to-black">MI <span class="text-amber-800">FINQUITA</span></h1>
    </div>
    <div class="flex justify-center items-center flex-col ">
        <p class="text-2xl text-white text-center my-2">
            Si tienes una cuenta Inicia Sesión
        </p>


        <div class=" bg-white px-16 rounded-md py-24 w-2/4 ">
            <form @submit.prevent="iraregistro">
                <FormKit id="loginForm" type="form" :actions="false"
                    incomplete-message="No se puedo enviar, revisa las notificaciones" @submit="handleSubmit">
                    <FormKit type="email" label="Email" name="email" placeholder="Email de Usuario"
                        validation="required|email" :validation-messages="{
                            required: 'El email es obligatorio',
                            email: 'Email no valido',
                        }" />
                    <FormKit type="password" label="Password" name="password" placeholder="Password de Usuario"
                        validation="required" :validation-messages="{
                            required: 'El Password es obligatorio',
                        }" />
                    <FormKit type="submit">Iniciar Sesión</FormKit>
                </FormKit>
                <p class="text-center mt-4">
                    Si no tienes una Cuenta <span>

                        <RouterLink to="/register" class="text-orange-600 font-bold">Registrate</RouterLink>
                    </span>
                </p>
            </form>
        </div>
    </div>
    <nav class="flex flex-col items-center space-y-5 lg:flex-row mt-2 lg:justify-evenly lg:space-y-0">
        <RouterLink v-for="authRoute in authRoutes"
            class="uppercase font-bold text-white px-4 bottom-0 py-2 rounded-md " :to="{ name: authRoute.name }"
            :class="{ hidden: route.name === authRoute.name }">
            {{ authRoute.text }}
        </RouterLink>
    </nav>
</template>
