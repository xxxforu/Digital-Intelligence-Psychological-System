import { Message } from "@arco-design/web-vue";
import axios from "axios";
const myAxios = axios.create({
  baseURL: "/api",
  timeout: 60000,
  withCredentials: true, // 允许携带跨域 Cookie
});

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 从本地存储中获取 token
    const token = localStorage.getItem('token');
    // 如果 token 存在，将其添加到请求头中
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response: any) {
    const { data } = response;
    
    // 未登录
    if ( data.msg === '登录过期'  ) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("/login") &&
        !(window.location.pathname === "/")
      ) {
        window.location.href = `/`;
        Message.warning("请先登录");
      }
    }

    return Promise.resolve(data || {});
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default myAxios;