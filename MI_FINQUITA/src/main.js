import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./config/firebase";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.vue";
import router from "./router";
const $toast = useToast({
  duration: 5000,
  position: "top-right",
});

const app = createApp(App);
app.use(VueSweetalert2);
app.provide("toast", $toast);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(config));
app.mount("#app");
