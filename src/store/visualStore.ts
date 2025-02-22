import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 查看可视化报告全局状态
 */
export const useVisualStore = defineStore("visualDetail", () => {
  const visualDetail = ref<API.VisualDetail>({
    uid:0,
    resultType: 0,
    cnt: 0,
    classedIds: [],
    term: "",
    studentName: "",
      boardType: 0,
    className:""
  });

  function setVisualDetail(visualDetailProp: API.VisualDetail) {
    visualDetail.value = visualDetailProp;
  }
  

  return { visualDetail, setVisualDetail };
}, {
   persist: true// 开启持久化
});
