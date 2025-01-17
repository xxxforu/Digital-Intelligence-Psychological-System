<template>
  <!-- <div id="userLoginPage">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form :model="form" :style="{ width: '480px', margin: '0 auto' }" label-align="left" auto-label-width
      @submit="handleSubmit">
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不小于 8 位" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <div style="
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          ">
          <a-button type="primary" html-type="submit" style="width: 120px">
            登录
          </a-button>
          <a-link href="/user/register">新用户注册</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div> -->

  <div id="userLoginPage">
    <div class="dropdown">
      <select v-model="loginType">
        <option value="student">学生登录</option>
        <option value="teacher">教师登录</option>
      </select>
    </div>

    <div class="login-container">
      <div class="login-header">数智平台</div>
      <form>
        <div class="form-group">
          <label for="username">账号</label>
          <input type="text" id="username" placeholder="请输入账号名称">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <a-input-password id="password" v-model:visibility="visibility" :style="{ width: '320px' }"
            :defaultVisibility="false" allow-clear placeholder="请输入密码" />

          <div class="helper-text">账号或密码错误</div>
        </div>
        <button type="submit" class="login-button" @click="logIn">确定</button>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { userLoginUsingPost } from "@/api/userController";
import { useLoginUserStore } from "@/store/userStore";
import message from "@arco-design/web-vue/es/message";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const loginUserStore = useLoginUserStore();
const router = useRouter();

const loginType = ref("student")
const logIn = () => {
  console.log(loginType.value);

  if (loginType.value === "student") {
    router.push('student/home')
  }
  else {
    router.push('/psychologist')
  }
}

const form = reactive({
  userAccount: "",
  userPassword: "",
} as API.UserLoginRequest);
const visibility = ref(true);

/**
 * 提交
 */
const handleSubmit = async () => {
  const res = await userLoginUsingPost(form);
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.data.message);
  }
};
</script>
<style lang="scss" scoped>
#userLoginPage {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
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

.login-container {
  width: 400px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
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
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.login-button:hover {
  background: #007bff;
}

.dropdown {
  position: absolute;
  top: 20px;
  right: 20px;
}

.dropdown select {
  font-size: 14px;
  padding: 5px;
}

.helper-text {
  font-size: 12px;
  color: gray;
  text-align: left;
  margin-top: 10px;
}
</style>
