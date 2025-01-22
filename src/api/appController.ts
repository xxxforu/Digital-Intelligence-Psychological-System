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

// /** listAppByPage POST /api/app/list/page */
// export async function listAppByPageUsingPost(
//   body: API.AppQueryRequest,
//   options?: { [key: string]: any },
// ) {
//   return request<API.BaseResponsePageApp_>('/api/app/list/page', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }


// /** listMyAppVOByPage POST /api/app/my/list/page/vo */
// export async function listMyAppVoByPageUsingPost(
//   body: API.AppQueryRequest,
//   options?: { [key: string]: any },
// ) {
//   return request<API.BaseResponsePageAppVO_>('/api/app/my/list/page/vo', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
