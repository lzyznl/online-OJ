<template>
  <a-row class="headGrid" align="center" :wrap="false">
    <a-col flex="auto">
      <div class="menu-demo">
        <a-menu mode="horizontal" theme="light" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <div id="logo">
              <img src="../assets/ojLogo.jpg" class="logoimage">
              <div class="title">阳-OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in filterRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px" class="user">
      <div class="loginUserInfo">
        <a-avatar :size="60" @click="toUserInfoClick">
          <img alt="avatar"
            src="../assets/ojLogo.jpg" />
        </a-avatar>
        <div class="username">{{ userStoreInfo.loginUser.userName }}</div>
      </div>
    </a-col>
  </a-row>
</template>
  
<script setup lang="ts">
import { routes } from '@/router/router';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';
import { userStore } from "../store/user"
import { doCheckAuth } from "../access/checkAccess";
import { accessEnum } from '@/access/accessEnum';

const userStoreInfo = userStore()
const route = useRoute;
const selectedKeys = ref(["/"])
const router = useRouter()

//隐藏需要隐藏的页面
//此处可以使用computed来刷新变量
const filterRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    else if (!doCheckAuth(userStoreInfo.loginUser, item.meta?.access as string)) {
      return false;
    }
    else {
      return true;
    }
  })
})

const toUserInfoClick = () => {
  router.replace("/user/info")
}

//测试代码，三秒后自动更新
setTimeout(async () => {
  // userStoreInfo.userLogin("lzy")
  // await userStoreInfo.getLoginUser();
}, 3000);

//路由跳转后执行的事件
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})

//菜单点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key
  })
}

</script>
<style scoped>
#logo {
  display: flex;
  align-items: center;
}

.logoimage {
  height: 70px;
  width: 70px;
}

.title {
  font-size: 20px;
  color: black;
  font-weight: bolder;
  margin-left: 10px;
}

.user {
  font-size: 17px;
  font-weight: 600;
}

.userAvator {
  width: 60px;
  height: 60px;
}

.username {
  width: 60px;
}

.loginUserInfo {
  display: flex;
  align-items: center;
}
</style>
  