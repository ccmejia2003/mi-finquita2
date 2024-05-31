import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
  const url = ref("");
  const storage = useFirebaseStorage();

  const onFileChange = (e) => {
    const file = e.target.files[0]; //Obtener el archivo
    const filename = uid() + ".jpg"; //Le asignamos un nombre unico
    const sRef = storageRef(storage, "/products/" + filename); //Generamos la referencia
    // Subir archivo
    const uploadTask = uploadBytesResumable(sRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => console.log(error),
      () => {
        // La imagen ya se subio
        getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {
          url.value = dowloadURL;
        });
      }
    );
  };

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    url,
    onFileChange,
    isImageUploaded,
  };
}
