<template>
  <template v-if="route.path.startsWith('/user') && route.path!=='/user/info'">
    <div id="user">
      <UserLayout />
    </div>
  </template>
  <template v-else>
    <div id="app">
      <BasicLayout />
    </div>
  </template>
</template>

<style>
#app {}
</style>
<script setup lang="ts">
import BasicLayout from "@/Layout/BasicLayout.vue";
import UserLayout from "@/Layout/UserLayout.vue";
import { useRouter, useRoute } from "vue-router";
import { userStore } from "./store/user";
import { accessEnum } from "./access/accessEnum";
import { onMounted } from "vue";
import { UserControllerService } from "../generated/services/UserControllerService"
import { doCheckAuth } from "./access/checkAccess"

const userStoreInfo = userStore()
const router = useRouter();
const route = useRoute();

/**
 * 预留一个全局项目入口，单次调用的代码都可以放到这里
 */
const doInit = () => {
  console.log("hello,欢迎来到我的项目")
}
onMounted(() => {
  doInit();
}),

  //进行权限设置
  router.beforeEach(async (to, from, next) => {
    let loginUser = userStoreInfo.loginUser;
    console.log(userStoreInfo.loginUser)
    if (loginUser.userRole === "") {
      //用户需要进行登录
      await userStoreInfo.getLoginUser();
    }
    loginUser=userStoreInfo.loginUser
    //如果用户已经登陆过，则不让他去登陆页面和注册页面
    if(to.fullPath==="/user/login"&&loginUser.userRole!==accessEnum.NOT_LOGIN){
      next(from.fullPath)
    }
    //判断用户的权限
    const needAccess = to.meta?.access ?? accessEnum.NOT_LOGIN;

    if (needAccess !== accessEnum.NOT_LOGIN) {
      //如果没登录，就要先登录
      if (loginUser.userRole === accessEnum.NOT_LOGIN) {
        router.push({
          path: "/user/login",
          replace: true
        })
        return;
      }
      console.log("测试"+loginUser.userRole+" "+needAccess)
      if (!doCheckAuth(loginUser, needAccess as string)) {
        next("/noAuth")
        return;
      }
    }
    next();
  })
</script>
