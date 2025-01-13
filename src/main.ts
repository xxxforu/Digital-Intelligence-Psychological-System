import "@/access";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import dataV from '@jiaminghi/data-view';
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

createApp(App).use(ArcoVue).use(pinia).use(router).use(dataV).mount("#app");
