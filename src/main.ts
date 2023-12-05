import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
// import "bytemd/dist/index.css"
import "bytemd/dist/index.css"
// import "@/access"

const pinia = createPinia()

createApp(App).use(store).use(router).use(ArcoVue).use(pinia).mount("#app");
