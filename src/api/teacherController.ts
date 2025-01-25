import request from '@/request';
// 教师登录
export async function teacherLoginPOST(
    body: API.LoginParams,
    options?: { [key: string]: any },
) {
    return request('/teacher/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {})
    })
}
// 心理老师获取测评列表
export async function psyQuestionListGET(
    params: API.GetQuenstionList,
    options?: { [key: string]: any },
) {
    return request<API.PsyQuestionListResponse>('/question/list', {
        method: "GET",
        params: {
            ...params,
        },
        ...(options || {})
    })
}
// 心理教师上线测评
export async function teacherOnlinePOST(
    body: API.OnlineProps,
    options?: { [key: string]: any },
) {
    return request<API.BasicResponse>('/question/online', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {})
    })
}
// 心理老师获取年级班级
export async function psyGradeListGET(
    options?: { [key: string]: any },
) {
    return request<Array<API.GradeListItem>>('/clazz/grade/list', {
        method: "GET",
        ...(options || {})
    })
}
export async function psyClassListGET(
  query: API.GetClassesListProps,
  options?: { [key: string]: any },
) {
  // 手动序列化数组为字符串
  const serializedQuery = {
    ...query,
    gradeIds: query.gradeIds?.join(','), // 将数组转为逗号分隔字符串
  };

  return request<Array<API.ClassListItem>>('/clazz/list', {
    method: 'GET',
    params: serializedQuery,
    ...(options || {}),
  });
}

