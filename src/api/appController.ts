import request from '@/request';
export async function getLoginUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  options?: { [key: string]: any },
) {
  return request<API.LoginUserVO>('/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}
// 退出登录
export async function logoutPOST() {
    return request('/logout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}