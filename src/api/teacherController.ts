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
// 普通老师获取测评列表
export async function teaQuestionListGET(
    params: API.GetQuenstionList,
    options?: { [key: string]: any },
) {
    return request<API.PsyQuestionListResponse>('/student/question/teacher/list', {
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
// 心理教师结束测评
export async function psyEndTestPOST(
    body:Object
) {
    return request<API.BasicResponse>('/question/end', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body
    })
}
// 心理教师开始测评
export async function psyStartTestPOST(
    body:Object
) {
    return request<API.BasicResponse>('/question/start', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: body
    })
}
// 老师获取年级
export async function psyGradeListGET(
    options?: { [key: string]: any },
) {
    return request<Array<API.GradeListItem>>('/clazz/grade/list', {
        method: "GET",
        ...(options || {})
    })
}
// 老师获取学期
export async function psyTermGET(
    options?: { [key: string]: any },
) {
    return request<Array<string>>('/term/list', {
        method: "GET",
        ...(options || {})
    })
}
// 老师获取班级
export async function psyClassVisualListGET(
    query: API.GetClassesListProps,
    options?: { [key: string]: any },
) {
    const serializedQuery = {
    gradeIds: query.gradeIds?.join(','), // 将数组转为逗号分隔字符串
  };

  return request<Array<API.ClassListItem>>('/clazz/visual/list', {
    method: 'GET',
    params: serializedQuery,
    ...(options || {}),
  });
}
// 老师获取学生
export async function psyStudentListGET(
    query: {
        classesIds:number
    },
) {
  return request<Array<API.StudentListItem>>('/student/list', {
    method: 'GET',
    params: query
  });
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

//心理老师获取报告
//社会情感
export async function psySFReportGET(
  query: API.teacherGetReportParams,
  options?: { [key: string]: any },
) {
 return request<Array<API.StuSFReportProps>>('/student/question/psychologist/teacher/socialFeeling/report', {
    method: 'GET',
    params: query,
    ...(options || {}),
  });
}
//多元智能与霍兰德
export async function psyIPReportGET(
  query: API.teacherGetReportParams,
  options?: { [key: string]: any },
) {
 return request<Array<API.StuSFReportProps>>('/student/question/psychologist/teacher/intelligenceAndProfessionReport', {
    method: 'GET',
    params: query,
    ...(options || {}),
  });
}
//MHT
export async function psyMHTReportGET(
  query: API.teacherGetReportParams,
  options?: { [key: string]: any },
) {
 return request('/student/question/psychologist/teacher/mht/report', {
    method: 'GET',
    params: query,
    ...(options || {}),
  });
}
//心理动态预警
export async function psyWarnReportGET(
  query: API.teacherGetReportParams,
  options?: { [key: string]: any },
) {
 return request('/student/question/psychologist/teacher/warn/report', {
    method: 'GET',
    params: query,
    ...(options || {}),
  });
}
//心理老师标记报告
export async function psyMarkPOST(
    body: API.MarkParams,
    options?: { [key: string]: any },
) {
    // 处理 tagList 数组
    const params = {
        ...body,
        tagList: body.tagList.join(','), // 将数组转换为逗号分隔的字符串
    };

    return request<API.BasicResponse>('/student/question/report/mark', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        params: params, // 传递处理后的参数
        ...(options || {}),
    });
}
//心理老师填写干预方案
export async function psyInterVentionPOST(
    body: API.InterventionParams,
    options?: { [key: string]: any },
) {
    return request<API.BasicResponse>('/student/question/intervention', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        params: body, // 传递处理后的参数
        ...(options || {}),
    });
}
// 普通老师获取社会情感报告
export async function teaSFReportGET(
    questionId: String,
    studentId:number
) {
    return request<API.StuSFReportProps>(`/student/question/teacher/socialFeeling/report?questionId=${questionId}&studentId=${studentId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
// 普通老师获取霍兰德多元智能混合报告
export async function teaIPReportGET(
    questionId: String,
    studentId:number
) {
    return request<API.IPReportProps>(`/student/question/teacher/intelligenceAndProfessionReport?questionId=${questionId}&studentId=${studentId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
//获取可视化报告
//集体
export async function CollectiveVisualGET(
  query: API.CollectiveVisualProps,
  options?: { [key: string]: any },
) {
  // 手动序列化数组为字符串
  const serializedQuery = {
    ...query,
    classesIds: query.classesIds?.join(','), // 将数组转为逗号分隔字符串
  };

  return request<API.collectiveSFVisual | API.collectiveMIVisual | API.collectiveHLDVisual | API.collectiveMHTVisual | API.collectiveWarnVisual>('/questionClazz/group/visual', {
    method: 'GET',
    params: serializedQuery,
    ...(options || {}),
  });
}
//个人
export async function PersonalVisualGET(
  query: API.PersonalVisualProps,
  options?: { [key: string]: any },
) {
  return request<API.personalSFVisual | API.personalMIVisual | API.personalHLDVisual | API.personalMHTVisual | API.personalWarnVisual>('/student/answer/visual', {
    method: 'GET',
    params: query,
    ...(options || {}),
  });
}


