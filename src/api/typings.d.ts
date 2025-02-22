declare namespace API {
  type BasicResponse = {
    data?: Array | Object,
    code?: number,
    msg?:string
  }
  type TestInform = {
    questionId?: string,
    studentId?:number,
    questionType?: number,
    cnt?: number,
    gradeId?: number,
    classedId?: number,
    term?: string,
    studentName?:string
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
    status: number,
    questionStatus:number,
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
  // 获取社会情感报告
  type StuSFReportProps = {
    scoreDistribute?: Object<MaxRadarEndedData>,
    totalScore?: Array<Array<string>> | Array<Array<string|number>>,
    scoreDesc?: Array<SocialFeelingText>,
    radarData?: Object<MaxRadarFrontedData>
    intervention?: string,
    reportMark?:Array<string>,
  }
   // 心理老师获取MHT报告
  type psyMHTReportProps = {
    distribute?: Object<MaxRadarEndedData>,
    score?: Array<Array<string>>| Array<Array<string|number>>,
    details?: Array<MHTText>,
    radarData?: Object<MaxRadarFrontedData>
    intervention?: string,
    reportMark?:Array<string>,
  }
  // 心理老师获取心理预警报告
  type psyWarnReportProps = {
    dimensionExplain: Array<WarnText>,
    heartPain: Object<warnEndedData>,
    vulnerablePosition: Object<warnEndedData>,
    vulnerableTrait: Object<warnEndedData>,
    suicide: Object<warnEndedData>,
    intervention?: string,
    reportMark?: Array<string>,
    HPRadarData?: Object<MaxRadarFrontedData>,
    VPRadarData?: Object<MaxRadarFrontedData>,
    VTRadarData?: Object<MaxRadarFrontedData>
  }
  // 雷达图后端数据
  type MaxRadarEndedData = {
    scoreValues: Array<string>,//value
    list:Array<Object>//indicator
  }
  //心理预警雷达图后端数据
  type warnEndedData = {
    indicator?: Array<Object>,
    score: Array<number>,
    firstDimension:string,
  }
  // 雷达图前端数据
  type MaxRadarFrontedData = {
    value: Array<string>,//value
    indicator: Array<Object>,//indicator
    otherValues?:Array<number>
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
    majorDirection?: string,
    majorRecommend?: Array<SubjectText>//推荐专业
    
  }
  //多元智能测试报告
  type IntelligenceText = {
    resultName: string,//维度名称
    resultDesc: string,//维度评语
    dimensionDesc: string,//维度解释
    method: string,//建议
    majorRecommend: Array<SubjectText>//推荐专业
    resultScore: number,
    selfRepresent:string,
  }
  //MHT测试报告
  type MHTText = {
    advice: string,
    resultName: string,//维度名称
    resultDesc: string,//维度评语
    resultScore: number,
  }
  //心理预警测试报告
  type WarnText = {
    advice: string,
    firstDimension:string,
    resultName: string,//维度名称
    resultDesc: string,//维度评语
    resultScore: number,
    warnType:string
  }
  //每个学科类型详情
  type SubjectText = {
    majorCode: string,//学科类型编码
    majorMain: string,//学科类型名称
    majorInclude: string,//包含学科
    majorDesc: string,//学科类型介绍
    recommend?:string
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
    questionId: string,
    questionTitle: string,
    classesId?: number | string,
    gradeId?:number,
    term: string,
    cnt: number,
    endTime?: string,
    startTime?:string,
    status: number,
    includeClassesStr: string,
    includeClasses?: string,
    questionType?: number,
    classesName?: string,
    finishTime?: string,
    name?: string,
    number?: string,
    questionStatus?: number,
    studentId?: number,
  }
  //心理老师上线测评
  type OnlineProps = {
    classesIds: Array<number>,
    gradeIds: Array<number>,
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
    gradeIds: Array<string> | Array<number>,
    questionType?: number,
    cnt?: number,
    term?:string,
  }
  type ClassListItem = {
    classesName:string ,
    classesId: number
  }
  type StudentListItem = {
    name: string,
    id:number
  }
  //获取报告
  type teacherGetReportParams = {
    studentId: number,
    term: string,
    questionType: number,
    cnt:number
  }
  //心理老师标记报告
  type MarkParams = {
    tagList: Array<string>,
    studentId: number,
    term: string,
    questionType: number,
    cnt: number
  }
  //心理老师标记报告
  type InterventionParams = {
    intervention: string,
    studentId: number,
    term: string,
    questionType: number,
    cnt:number
  }
  //老师获取集体可视化报告
  type CollectiveVisualProps = {
    classesIds: Array<number>,
    resultType: number,
    term?: string,
    cnt?:number
  }
  type PersonalVisualProps = {
    uid: number,
    resultType: number,
    term?: string,
    cnt?:number
  }
  //全局存储可视化报告信息
  type VisualDetail = {
    uid?:number,
    resultType: number,
    cnt?: number,
    classedIds?: Array<number>,
    term: string,
    studentName?: string,
    boardType: number,
    className?:string,
  }

  //可视化图表数据类型
  type scrollText = {
    title: string,
    content: string,
    overview?:string
  }
  type SFSecondLevelItem = {
   overview: string,
    level: string,
    levelName: string,
    percent: number,
    content:string
  }
  type PieDataItem = {
    value: number,
    name:string,
  }
  type pieAndBarListProps = {
    barList: Array<Array<string>> | Array<Array<any>>,
    pieList:Array<PieDataItem>
  }
  type personalSFScoreItem = {
    title: string,
    point: number,
    secondLevel:Array<secondAbilityItem>
  }
  type secondAbilityItem = {
    level: string,
    title: string,
    point: number,
    content:string,
  }
  type significantTypeItem = {
    type2: string,
    type1: string,
    type0: string
  }

  //可视化报告数据类型
  //集体
  type collectiveSFVisual = {
    list: Array<collectiveSFVisualItem>,
    pieAndBarList:Object<pieAndBarListProps>
   }
  type collectiveSFVisualItem = {
    levelName: string,//一级能力名称
    level: string,//一级能力等级
    percent: number,//一级能力占比
    describe: Array<scrollText>,
    secondLevel:Array<SFSecondLevelItem>
  }
  type collectiveMIVisual = {
    data:Array<Array<string>>
  }
  type collectiveHLDVisual = {
    rank: Array<Array<string | number>>,
    distribute:Object<MaxRadarFrontedData>
  }
  type collectiveMHTVisual = {
    list:Array<API.collectiveMHTVisualItem>
  }
  type collectiveMHTVisualItem = {
    advice: string,
    dimension: string,
    rankDesc: string,
    rate:number
  }
  type collectiveWarnVisual = {
    list:Array<API.collectiveWarnVisualItem>
  }
  type collectiveWarnVisualItem = {
    analysis: Object<WarnModule>,
    pie:Array<PieDataItem>
  }
  type WarnModule = {
    dimension: string,
    list:Array<Array<number | string>>
  }
  //个人
  type personalSFVisual = {
    rankList: Array<Array<string>>,
    secondDimensionScore:Array<API.personalSFScoreItem>,
    totalScore: Array<Array<string>> | Array<Array<any>>,
    scoreDesc:Array<Array<string>>,
  }
  type personalMIVisual = {
    rankList: Array<Array<string>>| Array<Array<any>>,
    scoreDistribute: Object<MaxRadarEndedData>,
    intelligenceExplainAndRecommend:Array<IntelligenceText>
  }
  type personalHLDVisual = {
    professionCode: Array<significantTypeItem>,
    score: Array<Array<string>> | Array<Array<string|number>>,
    professionExplain:Array<HollanderText>
  }
  type personalMHTVisual = {
    score: Array<Array<string | number>>,
    explain:Array<MHTText>
  }
  type personalWarnVisual = {
    vulnerablePositionExplain: Array<Array<string>>,
    vulnerableTraitExplain: Array<Array<string>>,
    suicide: Object<warnEndedData>,
    heartPainExplain: Array<Array<string>>,
    suicideExplain: Array<Array<string>>,
    heartPain: Object<warnEndedData>,
    vulnerableTrait: Object<warnEndedData>,
    vulnerablePosition: Object<warnEndedData>,
  }
}
