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
    params: API.GetQuenstionList,
    options?: { [key: string]: any },
) {
    return request<API.StuQuestionListResponse>('/student/question/getStudentQuestionList', {
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
// 获取社会情感报告
export async function stuSFReportGET(
    questionId: String,
) {
    return request<API.StuSFReportProps>(`/student/answer/socialFeeling/report?questionId=${questionId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
// 获取霍兰德多元智能混合报告
export async function stuIPReportGET(
    questionId: String,
) {
    return request<API.IPReportProps>(`/student/answer/intelligenceAndProfessionReport?questionId=${questionId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
