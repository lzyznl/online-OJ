import { accessEnum } from "./accessEnum";

/**
 * 定义公共的权限校验
 * 判断某个用户是否具有哪些权限
 * 因为很多地方都会遇到权限校验，所以进行方法抽离
 */
export const doCheckAuth=(loginUser:any,needAccess=accessEnum.NOT_LOGIN)=>{
    const loginUserAccess = loginUser?.userRole ?? accessEnum.NOT_LOGIN
    if(needAccess=== accessEnum.NOT_LOGIN){
        return true;
    }
    else if(needAccess === accessEnum.USER){
        //需要先登录
        if(loginUser.userRole===accessEnum.NOT_LOGIN){
            return false;
        }
    }
    else if(needAccess === accessEnum.ADMIN){
        if(loginUser.userRole!==accessEnum.ADMIN){
            return false;
        }
    }
    return true;
}