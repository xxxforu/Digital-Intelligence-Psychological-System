import request from '@/request';
// 学生登录
export async function studentLoginPOST(
    body: API.LoginParams,
    options?: { [key: string]: any },
) {
    return request('/student/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {})
    })
}
// 学生获取测评列表
export async function studentQuestionListGET(
    params: API.StuGetQuenstionList,
    options?: { [key: string]: any },
) {
    return request<API.QuestionListResponse>('/student/question/getStudentQuestionList', {
        method: "GET",
        params: {
            ...params,
        },
        ...(options || {})
    })
}
// 获取题目信息
export async function studentGetQuestion(
    questionId: String,
    options?: { [key: string]: any },
) {
    return request<API.TestModule>(`/student/question/${questionId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    });
}
// 提交答案
export async function studentAnswerCommit(
    body: API.QuestionCommit,
    options?: { [key: string]: any },
) {
    return request<API.BasicResponse>('/student/answer/commit', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {})
    })
}
