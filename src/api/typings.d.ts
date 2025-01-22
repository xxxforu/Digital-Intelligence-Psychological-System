declare namespace API {
  type BasicResponse = {
    data?: Array | Object,
    code?: number,
    msg?:String
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
  type StuGetQuenstionList = {
    current?: number,
    pageSize?: number,
    questionTemplateId?: number,
    cnt?: number,//第几次
    status?: number
  }
  type QuestionListResponse = {
    total: number,
    questions: Array<QuestionItem>
  }
  type QuestionItem = {
    questionId: string,
    questionTitle: String,
    questionType: number,
    term: String,
    cnt: number,
    endTime: String,
    status: number
  }
  // 学生获取问题列表
  type TestModule = {
    questionId: String,
    questionTitle: String,
    questionDesc: String,
    questionContent: Array<SingleQuestion>,
  }
  type SingleQuestion = {
    title: String
    index: number,
    firstDimension: String,
    secondDimension: String,
    options:Array<QuestionOption>
  }
  type QuestionOption = {
    result: String,
    score: number,
    value: String,
    key:String
  }
  // 学生提交答卷
  type QuestionCommit = {
     questionId: string,
    questionType: number,
    choices:Array<String>
  }
}
