import { Message } from "@arco-design/web-vue";
import axios from "axios";
const myAxios = axios.create({
  baseURL: "/api",
  timeout: 60000,
 withCredentials: true, // 允许携带跨域 Cookie
});
// 获取指定名称的 Cookie
function getCookie(name:string) {
  console.log(document.cookie);
  
  const value:any = `; ${document.cookie}`;
  const parts:any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 全局请求拦截器
myAxios.interceptors.request.use(
 function (config) {
    const sessionId = getCookie('JSESSIONID'); // 获取 JSESSIONID Cookie

    console.log(sessionId);
    
    if (sessionId) {
      config.headers.Cookie = `JSESSIONID=${sessionId}`; // 将 Cookie 添加到请求头
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response:any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { data } = response;
    // 未登录
    if (data==="未登录") {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("/login") &&
        !(window.location.pathname==="/")
      ) {
        
        window.location.href = `/`;
        Message.warning("请先登录");
      }
    }
    // if ("code" in data) {
    //   if(data.code!== 200 && data.code!==0) return Promise.reject(response);
    // } else return Promise.reject(response)

    return Promise.resolve(data || {})
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default myAxios;
