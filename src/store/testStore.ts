import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 登录用户信息全局状态
 */
export const useTestInformStore = defineStore("testInform", () => {
  const testInform = ref<API.TestInform>({
    questionId: "",
    questionType:-1
  });

  function setTestInform(testInformProp: API.TestInform) {
    testInform.value = testInformProp;
  }

  return { testInform, setTestInform };
});
