declare namespace API {
  type BasicResponse = {
    data?: Array | Object,
    code?: number,
    msg?:string
  }
  type TestInform = {
    questionId: string,
    questionType: number,
  }
  type LoginUserVO = {
    id?: number;
    number?:string,
    classesName?: string;
    gender?: number;
    name?: string;
    role?: string;
  };
  //登录
  type LoginParams = {
    number: string,
    password: string
  }

  //学生获取问题列表
  type GetQuenstionList = {
    current?: number,
    pageSize?: number,
    questionTemplateId?: number,
    cnt?: number,//第几次
    status?: number
  }
  type StuQuestionListResponse = {
    total: number,
    questions: Array<StuQuestionItem>
  }
  type StueQuestionItem = {
    questionId: string,
    questionTitle: string,
    questionType: number,
    term: string,
    cnt?: number,
    endTime?: string,
    status: number
  }
  // 学生获取问题列表
  type TestModule = {
    questionId: string,
    questionTitle: string,
    questionDesc: string,
    questionContent: Array<SingleQuestion>,
  }
  type SingleQuestion = {
    title: string
    index: number,
    firstDimension: string,
    secondDimension: string,
    options:Array<QuestionOption>
  }
  type QuestionOption = {
    result: string,
    score: number,
    value: string,
    key:string
  }
  // 学生提交答卷
  type QuestionCommit = {
     questionId: string,
    questionType: number,
    choices:Array<string>
  }
  // 学生获取社会情感报告
  type StuSFReportProps = {
    scoreDistribute?: Object<MaxRadarEndedData>,
    totalScore?: Array<Array<string>>,
    scoreDesc?: Array<SocialFeelingText>,
    radarData?:Object<MaxRadarFrontedData>
  }
  // 雷达图后端数据
  type MaxRadarEndedData = {
    scoreValues: Array<string>,//value
    list:Array<Object>//indicator
  }
  // 雷达图前端数据
  type MaxRadarFrontedData = {
    value: Array<string>,//value
    indicator:Array<Object>//indicator
  }
  // 社会情感文字报告
  type SocialFeelingText = {
    overview: string,//能力解释
    rank: string,//等级，如A-中等
    title: string,//能力名称
    content:string//能力评价
  }
  // 学生获取霍兰德与多元智能耦合报告
  type IPReportProps = {
    intelligenceDistribute?: Object<MaxRadarEndedData>,//多元智能能力分布雷达图
    professionDistribute?: Object<MaxRadarEndedData>,//霍兰德能力分布雷达图
    professionReport?: Array<HollanderText>,//霍兰德职业测试报告
    intelligenceReport?:Array<IntelligenceText>,//多元智能测试报告
    mixReport?: IGHLDMixText,//混合报告
    IGradarData?: Object<MaxRadarFrontedData>,
    ProradarData?:Object<MaxRadarFrontedData>
  }
  //霍兰德职业测试报告
  type HollanderText = {
    resultName: string//类型名称
    characterName: string,//类型特点
    characterDesc: string,//类型解释
    characterCase: string,//相关生活案例
    majorLocation: string,//推荐专业定位
  }
  //多元智能测试报告
  type IntelligenceText = {
    resultName: string,//维度名称
    resultDesc: string,//维度评语
    dimensionDesc: string,//维度解释
    method: string,//建议
    majorRecommend:Array<SubjectText>//推荐专业
  }
  //每个学科类型详情
  type SubjectText = {
    majorCode: string,//学科类型编码
    majorMain: string,//学科类型名称
    majorInclude: string,//包含学科
    majorDesc: string,//学科类型介绍
  }
  //混合报告
  type IGHLDMixText = {
    resultName: string,//霍兰德类型名称
    dimension: string,//核心智能名称
    majorRecommend:Array<SubjectText>
  }
  type PsyQuestionListResponse = {
    total: number,
    questions: Array<PsyQuestionItem>
  }
  type PsyQuestionItem = {
    id: string,
    questionTitle: string,
    term: string,
    cnt: number,
    endTime?: string,
    status: number,
    includeClassesStr: string,
    includeClasses?:string
  }
  //心理老师上线测评
  type OnlineProps = {
    classesIds: Array<string>,
    questionType: number,
    cnt: number,
    startTime: string,
    endTime: string,
  }
  // 心理老师获取年级班级
  type GradeListItem = {
    gradeName: string,
    gradeId:number
  }
  type GetClassesListProps = {
    gradeIds: Array<string>,
    questionType: number,
    cnt: number,
    term?:string,
  }
  type ClassListItem = {
    classesName:string ,
    classesId: number
  }
}
