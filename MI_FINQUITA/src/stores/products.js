import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCollection, useFirestore, useFirebaseStorage } from "vuefire";
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { inject } from "vue";

export const useProductsStore = defineStore("products", () => {
  const swal = inject("$swal");
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const selectedCategory = ref(0);

  const categories = [
    { id: 0, name: "TODOS" },
    { id: 1, name: "FERTILIZANTES" },
    { id: 2, name: "MAQUINAS" },
    { id: 3, name: "INSECTICIDAS" },
    { id: 4, name: "VITAMINAS" },
  ];

  const q = query(collection(db, "products"), orderBy("availability", "asc"));
  const productsCollection = useCollection(q);

  const filterProducts = computed(() => {
    if (selectedCategory.value === 0)
      return productsCollection.value.filter(
        (product) => product.availability > 0
      );

    return productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.availability > 0);
  });

  async function createProduct(product) {
    await addDoc(collection(db, "products"), product);
    swal.fire({
      icon: "success",
      title: "Producto Agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      });
      swal.fire({
        icon: "success",
        title: "Producto Actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await updateDoc(docRef, values);
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: "Seleccione", value: "", attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
    return options;
  });

  async function deleteProduct(id) {
    if (confirm("¿Eliminar Producto?")) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);
      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
      swal.fire({
        icon: "success",
        title: "Producto Eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  const noResults = computed(() => productsCollection.value.length === 0);

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    categories,
    selectedCategory,
    categoryOptions,
    noResults,
    filterProducts,
  };
});
