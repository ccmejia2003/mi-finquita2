import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const authUser = ref(null);

  const errorMsg = ref("");

  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
    "auth/invalid-credential": "Credenciales Invalidas",
    "auth/email-already-in-use": "El email ya está en uso",
    "auth/weak-password": "La contraseña es demasiado débil",
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  });

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({ name: "admin-propiedades" });
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code] || "Error en el inicio de sesión";
      });
  };

  const register = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      authUser.value = userCredential.user;
      router.push({ name: 'login' });
    } catch (error) {
      errorMsg.value = errorCodes[error.code] || "Error en el registro";
      console.error(error);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null;
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hasError = computed(() => {
    return errorMsg.value;
  });

  const isAuth = computed(() => {
    return authUser.value;
  });

  return {
    login,
    register,
    hasError,
    errorMsg,
    authUser,
    isAuth,
    logout,
  };
});

