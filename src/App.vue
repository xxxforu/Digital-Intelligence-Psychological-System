<template>
  <div id="app" lang="ts">
    <!-- <template v-if="route.path.startsWith('/psychologist') || route.path.startsWith('/teacher')">
      <TeacherLayout />
    </template>
<template v-else>
      <router-view />
    </template> -->
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {

};

onMounted(() => {
  doInit();
});

const originalRO = window.ResizeObserver;
window.ResizeObserver = class extends originalRO {
  constructor(callback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (e) {
        console.error("ResizeObserver error:", e);
      }
    });
  }
};

</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}
</style>
