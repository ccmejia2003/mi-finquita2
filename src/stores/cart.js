import { ref, computed, watchEffect, inject } from "vue";
import { defineStore } from "pinia";
import { useCouponStore } from "./coupons";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { getCurrentDate } from "../helpers";
import { useRouter } from "vue-router";
import { useAuthStore } from "./auth";

// const auth = useAuthStore();
export const useCartStore = defineStore("cart", () => {
  const toast = inject("toast");
  const authentication = useAuthStore();
  const coupon = useCouponStore();
  const db = useFirestore();
  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.1;

  const router = useRouter();

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    taxes.value = subtotal.value * TAX_RATE;
    total.value = Number((subtotal.value + taxes.value).toFixed(2));
    total.value = Number(
      (subtotal.value + taxes.value - coupon.discount).toFixed(2)
    );
  });

  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        toast.open({
          message: "Has alcanzado el limite",
          type: "warning",
        });
        return;
      }
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function clearCart() {
    items.value = [];
  }

  async function checkout() {
    try {
      if (!authentication.authUser) {
        toast.open({
          message: "No has iniciado Sesión!",
          type: "warning",
        });
        setTimeout(() => {
          router.push({ name: "login" });
        }, 2000);
      } else {
        await addDoc(collection(db, "sales"), {
          items: items.value.map((item) => {
            const { availability, category, ...data } = item;
            return data;
          }),
          subtotal: subtotal.value,
          taxes: taxes.value,
          discount: coupon.discount,
          total: total.value,
          date: getCurrentDate(),
        });

        items.value.forEach(async (item) => {
          const productRef = doc(db, "products", item.id);
          await runTransaction(db, async (transaction) => {
            const currentProduct = await transaction.get(productRef);
            const availability =
              currentProduct.data().availability - item.quantity;
            transaction.update(productRef, { availability: availability });
          });
        });
        $reset();
        coupon.$reset();
      }
    } catch (error) {}
  }

  function $reset() {
    items.value = [];
    subtotal.value = 0;
    taxes.value = 0;
    total.value = 0;
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);
  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  const isEmpty = computed(() => items.value.length === 0);

  const countItem = computed(() => {
    const count = items.value.length;
    return count > 10 ? "10+" : count;
  });
  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  return {
    items,
    subtotal,
    total,
    addItem,
    removeItem,
    checkout,
    taxes,
    isEmpty,
    checkProductAvailability,
    updateQuantity,
    countItem,
    clearCart,
  };
});
