import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 当前查看的报告所属测试全局状态
 */
export const useTestInformStore = defineStore("testInform", () => {
  const testInform = ref<API.TestInform>({
    questionId: "",
    studentId:0,
    questionType: -1,
    cnt: 1,
    gradeId: 0,
    classedId: 0,
    term: "",
    studentName:""
  });
 
  function setTestInform(testInformProp: API.TestInform) {
    testInform.value = testInformProp;
  }

  return { testInform, setTestInform };
}, {
   persist: true// 开启持久化
}
);
