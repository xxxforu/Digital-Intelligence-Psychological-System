import "@/access";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import DataVVue3 from "@kjgl77/datav-vue3";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


// 创建 Pinia 并持久化状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 创建 Vue 应用并挂载插件
createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(pinia)
  .use(router)
  .use(DataVVue3)
  .mount("#app");