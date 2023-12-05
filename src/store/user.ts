import { defineStore } from 'pinia'
import {UserControllerService} from "../../generated/services/UserControllerService"
import { accessEnum } from '@/access/accessEnum';

export const userStore = defineStore('loginUser', {
  state: ()=>{
    return {
        "loginUser":{
            "userName":"未登录",
            "userRole":""
        }
    }
  },
  actions: {
    async getLoginUser(){
      //向后端发送请求
      const res =  await UserControllerService.getLoginUserUsingGet();
      if(res?.code === 0){
        this.updateUser(res?.data)
      }else{
        console.log("aaaa")
        this.loginUser.userRole = accessEnum.NOT_LOGIN
      }
    },
    updateUser(payLoad:any){
      this.loginUser = payLoad
    },
    userLogin(payLoad:string){
        this.loginUser.userName =payLoad
    },
    GiveAdmin(payLoad:any){
      this.loginUser.userRole = payLoad
    }
  },
})