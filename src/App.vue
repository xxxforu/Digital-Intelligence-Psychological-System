<template>
  <div id="app" lang="ts">
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

<style lang='scss'>
#app {
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  .pointerAndNotSelect {
    cursor: pointer;
    user-select: none;
  }

  .textReportBox {
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
    border-radius: 10px;

    .boxTitle {
      color: rgb(25, 25, 50);
      font-family: Urbanist;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
    }

    .textReportItem {
      margin: 10px 0;

      .blueTitle {
        color: rgb(0, 178, 255);
        font-family: Urbanist;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        margin: 8px 0;
      }

      .blackTitle {
        color: rgb(25, 25, 50);
        font-family: Urbanist;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        margin: 5px 0;
      }

      .content {
        color: rgb(25, 25, 50);
        font-family: Urbanist;
        font-size: 18px;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0%;
        text-align: left;
      }
    }
  }
}
</style>
