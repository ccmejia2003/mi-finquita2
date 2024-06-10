import { ref, computed, onMounted, inject } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth", () => {
  const toast = inject("toast");
  const auth = useFirebaseAuth();
  const router = useRouter();
  const authUser = ref(null);
  const db = getFirestore();
  const errorMsg = ref("");

  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
    "auth/invalid-credential": "Credenciales Invalidas",
    "auth/email-already-in-use": "El email ya está en uso",
    "auth/weak-password": "La contraseña es demasiado débil",
  };

  onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        authUser.value = user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
        }
      }
    });
  });

  const login = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      authUser.value = user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") {
          router.push({ name: "products" });
        } else {
          router.push({ name: "shop" });
        }
      } else {
        toast.open({
          message: "Error al obtener el rol del usuario",
          type: "error",
        });
      }
    } catch (error) {
      toast.open({
        message: "Credenciales Invalidas",
        type: "error",
      });
    }
  };

  const register = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      authUser.value = user;

      await setDoc(doc(db, "users", user.uid), { role: "user" });

      toast.open({
        message: "Registro exitoso",
        type: "success",
      });

      router.push({ name: "login" });
    } catch (error) {
      toast.open({
        message: errorCodes[error.code] || "Error en el registro",
        type: "error",
      });
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null;
        router.push({ name: "login" });
      })
      .catch((error) => {});
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
