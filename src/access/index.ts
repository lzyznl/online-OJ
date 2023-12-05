import { useRouter } from "vue-router";
import { userStore } from "../store/user";
import { accessEnum } from "../access/accessEnum";

const userStoreInfo = userStore()
const router = useRouter();
//进行权限设置
router.beforeEach((to,from,next)=>{
  if(to.meta?.access===accessEnum.ADMIN){
    if(userStoreInfo.loginUser.userRole!=="admin"){
      next("/noAuth")
      return;
    }
  }
  next();
})