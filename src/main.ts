import "@/access";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// import dataV from '@jiaminghi/data-view';
import DataVVue3 from '@kjgl77/datav-vue3';
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


const pinia = createPinia();

createApp(App).use(ArcoVue).use(ArcoVueIcon).use(pinia).use(router).use(DataVVue3).mount("#app");
