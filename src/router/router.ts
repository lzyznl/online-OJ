import { RouteRecordRaw } from "vue-router";
import hello from "@/components/hello.vue";
import noAuth from "@/components/noAuth.vue";
import UserLayout from "@/Layout/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue"
import UserRegisterView from "@/views/user/UserRegisterView.vue"
import { accessEnum } from "@/access/accessEnum";
import UserInfoView from "@/views/user/UserInfoView.vue";
import addQuestion from "../views/question/addQuestion.vue";
import manageQuestion from "@/views/question/manageQuestion.vue";
import questionView from "../views/question/questionView.vue"
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView
      },
      {
        path: "/user/info",
        name: "用户个人信息",
        component: UserInfoView
      }
    ],
    meta: {
      hideInMenu: true
    }
  },
  {
    path: "/",
    name: "浏览题目",
    component: questionView,
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: addQuestion,
    meta: {
      access:accessEnum.ADMIN
    }
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: manageQuestion,
    meta: {
      access:accessEnum.ADMIN
    }
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: hello,
  //   meta: {
  //     access: accessEnum.ADMIN
  //   }
  // },
  {
    path: "/about",
    name: "关于我们",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/hello.vue"),
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: noAuth,
    meta: {
      hideInMenu: true
    }
  }
];