import ACCESS_ENUM from "@/access/accessEnum";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 登录用户信息全局状态
 */
export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  async function fetchLoginUser() {
    // const res = await getLoginUserUsingGet();
    const res = {
      code: 200,
      msg: "success",
      data: {
        createTime: "2024",
        id: 1111111,
        updateTime: "2025",
        userName: "pp水",
        userRole: "psychologist",
      }
    }
    if (res.code === 0 && res.data) {
      loginUser.value = res.data;
    } else {
      loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
    }
    console.log(loginUser.value);
    
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
