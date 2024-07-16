import { createRouter, createWebHistory } from "vue-router";
import ShopView from "@/views/ShopView.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import Checkout from "../views/admin/Checkout.vue";
import NotFound from "@/views/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/checkout",
      name: "check",
      component: Checkout,
      children: [
        {
          path: "carrito-de-compras",
          name: "cart",
          component: () => import("@/components/ShoppingCart.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      children: [
        {
          path: "productos",
          name: "products",
          component: () => import("../views/admin/ProductsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "ventas",
          name: "sales",
          component: () => import("../views/admin/SalesView.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "productos/nuevo",
          name: "new-product",
          component: () => import("../views/admin/NewProductView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "productos/editar/:id",
          name: "edit-product",
          component: () => import("../views/admin/EditProductView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "productos/seeder",
          name: "seed-products",
          component: () => import("../views/admin/SeederView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    try {
      await authenticateUser();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
function authenticateUser() {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export default router;
