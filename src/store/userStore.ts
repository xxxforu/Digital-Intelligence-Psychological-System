import ACCESS_ENUM from "@/access/accessEnum";
import { getLoginUser } from "@/api/appController";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    name: "未登录",
    role:ACCESS_ENUM.NOT_LOGIN
  });

  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  async function fetchLoginUser() {
    const res = await getLoginUser();
  if (res && res.data) {
    loginUser.value = res.data; // 提取 data 部分
  } else {
    loginUser.value = { role: ACCESS_ENUM.NOT_LOGIN };
  }
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
