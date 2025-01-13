<template>
  <div id="app">
    <template v-if="route.path.startsWith('/psychologist')">
      <PsyLayout />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import PsyLayout from "./layouts/PsyLayout.vue";

const route = useRoute();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {

};

onMounted(() => {
  doInit();
});
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
}
</style>
