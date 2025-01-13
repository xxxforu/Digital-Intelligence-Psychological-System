import ACCESS_ENUM from "@/access/accessEnum";
// import UserLayout from "@/layouts/UserLayout.vue";
import { RouteRecordRaw } from "vue-router";

import PsyLayout from "@/layouts/PsyLayout.vue";
import PsyCheckListVue from "@/views/psychologist/PsyCheckList.vue";
import PsyDataBoardEnterVue from "@/views/psychologist/PsyDataBoardEnter.vue";
import PsyEvaluateManageVue from "@/views/psychologist/PsyEvaluateManage.vue";
import PsyReportViewVue from "@/views/psychologist/PsyReportView.vue";
import VisualReportVue from "@/views/VisualReport/VisualReport.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "登录页",
    component: VisualReportVue,
  },
  // {
  //   path: "/add/app",
  //   name: "创建应用",
  //   component: AddAppPage,
  // },
  // {
  //   path: "/add/app/:id",
  //   name: "修改应用",
  //   props: true,
  //   component: AddAppPage,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/add/question/:appId",
  //   name: "创建题目",
  //   component: AddQuestionPage,
  //   props: true,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/add/scoring_result/:appId",
  //   name: "创建评分",
  //   component: AddScoringResultPage,
  //   props: true,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/app/detail/:id",
  //   name: "应用详情页",
  //   props: true,
  //   component: AppDetailPage,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/answer/do/:appId",
  //   name: "答题",
  //   component: DoAnswerPage,
  //   props: true,
  //   meta: {
  //     hideInMenu: true,
  //     access: ACCESS_ENUM.USER,
  //   },
  // },
  // {
  //   path: "/answer/result/:id",
  //   name: "答题结果",
  //   component: AnswerResultPage,
  //   props: true,
  //   meta: {
  //     hideInMenu: true,
  //     access: ACCESS_ENUM.USER,
  //   },
  // },
  // {
  //   path: "/answer/my",
  //   name: "我的答题",
  //   component: MyAnswerPage,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //   },
  // },
  // {
  //   path: "/admin/user",
  //   name: "用户管理",
  //   component: AdminUserPage,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/admin/app",
  //   name: "应用管理",
  //   component: AdminAppPage,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/admin/question",
  //   name: "题目管理",
  //   component: AdminQuestionPage,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/admin/scoring_result",
  //   name: "评分管理",
  //   component: AdminScoringResultPage,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/admin/user_answer",
  //   name: "回答管理",
  //   component: AdminUserAnswerPage,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/noAuth",
  //   name: "无权限",
  //   component: NoAuthPage,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomePage,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/user",
  //   name: "用户",
  //   component: UserLayout,
  //   children: [
  //     {
  //       path: "/user/login",
  //       name: "用户登录",
  //       component: UserLoginPage,
  //     },
  //     {
  //       path: "/user/register",
  //       name: "用户注册",
  //       component: UserRegisterPage,
  //     },
  //   ],
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },


  {
    path: "/psychologist",
    name: "心理教师",
    component: PsyLayout,
    children: [
      {
        path: "/psychologist/manage",
        name: "测评管理",
        component: PsyEvaluateManageVue,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
      {
        path: "/psychologist/dataBoard",
        name: "数据看板",
        component: PsyDataBoardEnterVue,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
      {
        path: "/psychologist/reportView",
        name: "查看报告",
        component: PsyReportViewVue,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
      {
        path: "/psychologist/checkList",
        name: "查看测评详情",
        component: PsyCheckListVue,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
];
