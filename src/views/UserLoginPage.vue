<template>
  <div id="userLoginPage">
    <div class="dropdown">
      <a-select
        :style="{ width: '120px', height: '40px', borderRadius: '5px', margin: '3px', background: ' rgb(0, 178, 255)', color: '#fff', fontSize: '18px', fontWeight: 'bold', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)' }"
        v-model="loginType">
        <a-option value="student">学生登录</a-option>
        <a-option value="teacher">教师登录</a-option>
      </a-select>
    </div>

    <div class="login-container">
      <div class="outBorderBox">
        <div class="innerBorderBox">
          <div class="login-header">数智心理平台</div>
          <p class="welcome">欢迎登录</p>
          <form class="form">
            <div class="form-group">
              <label for="username">账号</label>
              <a-input id="number" v-model="form.number" placeholder="请输入账户名" allow-clear>
                <template #prefix>
                  <img src="../assets/image/loginUser.png" alt="loginUser">
                </template>
              </a-input>
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <a-input-password id="password" v-model="form.password" v-model:visibility="visibility"
                :defaultVisibility="false" allow-clear placeholder="请输入密码">
                <template #prefix>
                  <img src="../assets/image/loginPassword.png" alt="loginUser">
                </template>
              </a-input-password>
              <div class="helper-text" :style="{ visibility: loginError ? 'visible' : 'hidden' }"
                :class="{ hidden: !loginError }">
                账号或密码错误</div>
            </div>
            <button class="login-button" @click="handleSubmit" :class="{ active: active }"
              :disabled="!active">确定</button>
          </form>
        </div>
      </div>

    </div>
    <div class="loginCover">
      <img v-if="loginType === 'student'" src="../assets/image/loginCover.png" alt="loginCover">
      <img v-else src="../assets/image/teacherLoginCover.png" alt="teacherLoginCover">
    </div>
  </div>

</template>

<script setup lang="ts">
import ACCESS_ENUM from '@/access/accessEnum';
import { studentLoginPOST } from '@/api/studentController';
import { teacherLoginPOST } from '@/api/teacherController';
import { useLoginUserStore } from '@/store/userStore';
import { Message } from '@arco-design/web-vue';
import {
  computed,
  reactive, ref
} from "vue";
import { useRouter } from "vue-router";

const loginUserStore = useLoginUserStore();
const router = useRouter();

const loginType = ref("student")
let loginError = ref(false)
const form = reactive({
  // number: "2370407",
  //八年级mht
  //三年级八班老师
  // number: "13798075048",
  // number: "2210834",
  //number:"2210835",
  // number: "2210833",
  //三年级霍兰德
  // number: "2310415",
  //二年级社会情感已完成
  // number: "13113175140",
  number: "",
  // 心理老师
  // number: "16673074887",
  //普通老师
  // password: "quanta2025",
  password: ""
} as API.LoginParams);
const visibility = ref(true);

const active = computed(() => {
  return form.number && form.password
})
/**
 * 提交
 */
const handleSubmit = async (e: any) => {
  e.preventDefault();
  var res: API.BasicResponse;
  if (loginType.value === "student") { res = await studentLoginPOST(form); }
  else { res = await teacherLoginPOST(form) }

  if (res.code === 0) {

    localStorage.setItem('token', res.data.token);

    await loginUserStore.fetchLoginUser();
    Message.success("登录成功");
    const loginUser = <API.LoginUserVO>(loginUserStore.loginUser)
    localStorage.setItem('role', loginUser.role as string)


    switch (loginUser.role) {
      case ACCESS_ENUM.STUDENT:
        router.push({
          path: "/student",
        });
        break;
      case ACCESS_ENUM.PSYCHOLOGIST:
        router.push({
          path: "/psychologist",
        });
        break;
      case ACCESS_ENUM.TEACHER:
        router.push({
          path: "/teacher",
        });
        break;
    }
  } else {
    loginError.value = true
    setTimeout(() => {
      loginError.value = false; // 三秒后隐藏
    }, 3000);
  }
};
</script>
<style lang="scss" scoped>
#userLoginPage {
  ::v-deep input[type="password"]::-webkit-credentials-cramble-button {
    appearance: none;
  }

  ::v-deep input[type="password"]::-ms-reveal {
    display: none;
  }

  ::v-deep input[type="password"]::-ms-clear {
    display: none;
  }

  ::v-deep input[type="password"] {
    -webkit-appearance: none;
  }

  ::v-deep .arco-input-wrapper {
    padding: 0 10px;
  }

  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/image/loginBG.jpg);
  background-repeat: no-repeat;

  .dropdown {
    position: absolute;
    top: 20px;
    right: 20px;

    select {
      color: #fff;
      border: none;
      font-size: 14px;
      padding: 8px;
      box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      background: rgb(0, 178, 255);
    }
  }

  .login-container {
    width: 50%;
    background: transparent;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .outBorderBox {
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.03);
      width: 70%;
      padding: 20px;
      border-radius: 5px;

      .innerBorderBox {
        margin: auto;
        padding: 20px;
        box-sizing: border-box;
        border: 0.5px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.03);
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

        .form {
          width: 90%;

          #password,
          #number {
            width: 100%;
            height: 47px;
            border-radius: 10px;
            background: rgba(191, 205, 255, 0.25);
            margin-top: 5px;
          }

          #password::placeholder,
          #number::placeholder {
            color: rgba(25, 25, 50, 0.7);
            font-family: Urbanist;
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
          }
        }



        .login-header {
          width: 90%;
          text-align: left;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          color: rgb(25, 25, 50);
          font-family: Urbanist;
          font-size: 50px;
          font-weight: 600;
          line-height: 60px;
          letter-spacing: 0%;
        }

        .welcome {
          color: rgba(25, 25, 50, 0.7);
          font-family: Urbanist;
          font-size: 20px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: 0%;
          text-align: left;
          width: 90%;
          margin-bottom: 20px;
        }

        .form-group {
          text-align: left;
          margin-bottom: 20px;
        }

        .form-group label {
          color: rgb(25, 25, 50);
          font-family: Urbanist;
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-group input:focus {
          border-color: #007bff;
          outline: none;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background: #ccc;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: 0px 8px 9px 0px rgba(0, 0, 0, 0.1);
        }

        .active {
          background: rgb(77, 161, 255);
        }

        .helper-text {
          color: rgb(255, 85, 72);
          font-family: Inter;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          text-align: right;
          margin-top: 10px;
        }

        /* 隐藏时的占位样式 */
        .hidden {
          visibility: hidden;
          opacity: 0;
        }
      }
    }

  }

  .loginCover {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 55%;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f8fa;
}

input[type="password"]::-webkit-credentials-cramble-button {
  appearance: none;
}

input[type="password"]::-ms-reveal {
  display: none;
}

input[type="password"]::-ms-clear {
  display: none;
}

input[type="password"] {
  -webkit-appearance: none;
}

input[type="password"]::-ms-reveal {
  pointer-events: none;
}
</style>
