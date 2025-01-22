import ACCESS_ENUM from "@/access/accessEnum";
// import UserLayout from "@/layouts/UserLayout.vue";
import { RouteRecordRaw } from "vue-router";

import StudentLayout from "@/layouts/StudentLayout.vue";
import TeacherLayout from "@/layouts/TeacherLayout.vue";
import CheckQuestionList from "@/views/CheckQuestionList.vue";
import PsyDataBoardEnterVue from "@/views/psychologist/PsyDataBoardEnter.vue";
import PsyEvaluateManageVue from "@/views/psychologist/PsyEvaluateManage.vue";
import PsyReportViewVue from "@/views/psychologist/PsyReportView.vue";
import StuAnswer from "@/views/student/StuAnswer.vue";
import StuHome from "@/views/student/StuHome.vue";
import StuReport from "@/views/student/StuReport.vue";
import TeaDataBoardEnterVue from "@/views/teacher/TeaDataBoardEnter.vue";
import TeaEvaluateManageVue from "@/views/teacher/TeaEvaluateManage.vue";
import TeaReportViewVue from "@/views/teacher/TeaReportView.vue";
import UserLoginPage from "@/views/UserLoginPage.vue";
import VisualReportVue from "@/views/VisualReport/VisualReport.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "登录页",
    // component: VisualReportVue,
    component: UserLoginPage,
    meta: {
      access:ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: "/visualReport",
    name: "可视化看板",
    component: VisualReportVue
  },
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
  //   path: "/app/detail/:id",
  //   name: "应用详情页",
  //   props: true,
  //   component: AppDetailPage,
  //   meta: {
  //     hideInMenu: true,
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
    path: "/student",
    name: "心理学生端",
    component: StudentLayout,
    children: [
      {
        path: "/student",
        name: "心理学生端首页",
        component: StuHome
      },
      {
        path: "/student/report",
        name: "学生查看报告",
        component: StuReport,
      },
      {
        path: "/student/answer",
        name: "学生进行测评",
        component: StuAnswer,
        
      },
    ]
  },

  {
    path: "/teacher",
    name: "普通教师",
    component: TeacherLayout,
    children: [
      {
        path: "/teacher",
        name: "测评管理",
        component: TeaEvaluateManageVue,
        meta: {
          access: ACCESS_ENUM.TEACHER,
        },
      },
      {
        path: "/teacher/dataBoard",
        name: "数据看板",
        component: TeaDataBoardEnterVue,
        meta: {
          access: ACCESS_ENUM.TEACHER,
        },
      },
      {
        path: "/teacher/reportView",
        name: "查看报告",
        component: TeaReportViewVue,
        meta: {
          access: ACCESS_ENUM.TEACHER,
          hideInMenu: true,
        },
      },
      {
        path: "/teacher/checkList",
        name: "查看测评详情",
        component: CheckQuestionList,
        meta: {
          access: ACCESS_ENUM.TEACHER,
          hideInMenu: true,
        },
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/psychologist",
    name: "心理教师",
    component: TeacherLayout,
    children: [
      {
        path: "/psychologist",
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
          hideInMenu: true,
        },
      },
      {
        path: "/psychologist/checkList",
        name: "查看测评详情",
        component: CheckQuestionList,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
          hideInMenu: true,
        },
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
];
