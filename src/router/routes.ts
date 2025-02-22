import ACCESS_ENUM from "@/access/accessEnum";
import { RouteRecordRaw } from "vue-router";

import StudentLayout from "@/layouts/StudentLayout.vue";
import TeacherLayout from "@/layouts/TeacherLayout.vue";
import PsyEvaluateManageVue from "@/views/psychologist/PsyEvaluateManage.vue";
import StuHome from "@/views/student/StuHome.vue";
import TeaEvaluateManageVue from "@/views/teacher/TeaEvaluateManage.vue";
import TeaReportViewVue from "@/views/teacher/TeaReportView.vue";
import UserLoginPage from "@/views/UserLoginPage.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "登录页",
    component: UserLoginPage,
    meta: {
      access:ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: "/visualReport",
    name: "可视化看板",
    component: ()=>import("@/views/VisualReport/VisualReport.vue"),
    meta: {
      access:ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: "/student",
    name: "心理学生端",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "心理学生端首页",
        component: StuHome,
        meta: {
          access:ACCESS_ENUM.STUDENT
        }
      },
      {
        path: "report",
        name: "学生查看报告",
        component: ()=>import("@/views/student/StuReport.vue"),
        meta: {
          access:ACCESS_ENUM.STUDENT
        }
      },
      {
        path: "answer",
        name: "学生进行测评",
        component: ()=>import("@/views/student/StuAnswer.vue"),
        meta: {
          access:ACCESS_ENUM.STUDENT
        }
      },
    ]
  },

  {
    path: "/teacher",
    name: "普通教师",
    component: TeacherLayout,
    children: [
      {
        path: "",
        name: "普通老师测评管理",
        component: TeaEvaluateManageVue,
        meta: {
          access: ACCESS_ENUM.TEACHER,
        },
      },
      {
        path: "dataBoard",
        name: "普通老师数据看板",
        component: ()=>import("@/views/DataBoardEnter.vue"),
        meta: {
          access: ACCESS_ENUM.TEACHER,
        },
      },
      
     
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
        path: "/teacher/reportView",
        name: "普通老师查看报告",
        component: TeaReportViewVue,
        meta: {
          access: ACCESS_ENUM.TEACHER,
          hideInMenu: true,
        },
      },
  {
    path: "/psychologist",
    name: "心理教师",
    component: TeacherLayout,
    children: [
      {
        path: "",
        name: "测评管理",
        component: PsyEvaluateManageVue,
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
      {
        path: "dataBoard",
        name: "数据看板",
        component: ()=>import("@/views/DataBoardEnter.vue"),
        meta: {
          access: ACCESS_ENUM.PSYCHOLOGIST,
        },
      },
      {
        path: "reportView/:check?",
        name: "心理教师查看报告",
        component: ()=>import("@/views/psychologist/PsyReportView.vue"),
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


// import ACCESS_ENUM from "@/access/accessEnum";
// import { RouteRecordRaw } from "vue-router";

// import StudentLayout from "@/layouts/StudentLayout.vue";
// import TeacherLayout from "@/layouts/TeacherLayout.vue";
// import DataBoardEnterVue from "@/views/DataBoardEnter.vue";
// import PsyEvaluateManageVue from "@/views/psychologist/PsyEvaluateManage.vue";
// import PsyReportViewVue from "@/views/psychologist/PsyReportView.vue";
// import StuAnswer from "@/views/student/StuAnswer.vue";
// import StuHome from "@/views/student/StuHome.vue";
// import StuReport from "@/views/student/StuReport.vue";
// import TeaEvaluateManageVue from "@/views/teacher/TeaEvaluateManage.vue";
// import TeaReportViewVue from "@/views/teacher/TeaReportView.vue";
// import UserLoginPage from "@/views/UserLoginPage.vue";
// import VisualReportVue from "@/views/VisualReport/VisualReport.vue";
// export const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "登录页",
//     component: UserLoginPage,
//     meta: {
//       access:ACCESS_ENUM.NOT_LOGIN
//     }
//   },
//   {
//     path: "/visualReport",
//     name: "可视化看板",
//     component: VisualReportVue,
//     meta: {
//       access:ACCESS_ENUM.NOT_LOGIN
//     }
//   },
//   {
//     path: "/student",
//     name: "心理学生端",
//     component: StudentLayout,
//     children: [
//       {
//         path: "",
//         name: "心理学生端首页",
//         component: StuHome,
//         meta: {
//           access:ACCESS_ENUM.STUDENT
//         }
//       },
//       {
//         path: "report",
//         name: "学生查看报告",
//         component: StuReport,
//         meta: {
//           access:ACCESS_ENUM.STUDENT
//         }
//       },
//       {
//         path: "answer",
//         name: "学生进行测评",
//         component: StuAnswer,
//         meta: {
//           access:ACCESS_ENUM.STUDENT
//         }
//       },
//     ]
//   },

//   {
//     path: "/teacher",
//     name: "普通教师",
//     component: TeacherLayout,
//     children: [
//       {
//         path: "",
//         name: "普通老师测评管理",
//         component: TeaEvaluateManageVue,
//         meta: {
//           access: ACCESS_ENUM.TEACHER,
//         },
//       },
//       {
//         path: "dataBoard",
//         name: "普通老师数据看板",
//         component: DataBoardEnterVue,
//         meta: {
//           access: ACCESS_ENUM.TEACHER,
//         },
//       },
      
     
//     ],
//     meta: {
//       hideInMenu: true,
//     },
//   },
//   {
//         path: "/teacher/reportView",
//         name: "普通老师查看报告",
//         component: TeaReportViewVue,
//         meta: {
//           access: ACCESS_ENUM.TEACHER,
//           hideInMenu: true,
//         },
//       },
//   {
//     path: "/psychologist",
//     name: "心理教师",
//     component: TeacherLayout,
//     children: [
//       {
//         path: "",
//         name: "测评管理",
//         component: PsyEvaluateManageVue,
//         meta: {
//           access: ACCESS_ENUM.PSYCHOLOGIST,
//         },
//       },
//       {
//         path: "dataBoard",
//         name: "数据看板",
//         component: DataBoardEnterVue,
//         meta: {
//           access: ACCESS_ENUM.PSYCHOLOGIST,
//         },
//       },
//       {
//         path: "reportView/:check?",
//         name: "心理教师查看报告",
//         component: PsyReportViewVue,
//         meta: {
//           access: ACCESS_ENUM.PSYCHOLOGIST,
//           hideInMenu: true,
//         },
//       },
//     ],
//     meta: {
//       hideInMenu: true,
//     },
//   },
// ];