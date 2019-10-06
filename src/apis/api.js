import axios from 'axios'

const IP = 'http://localhost:3000'//设置IP常量

//登陆
export function login(acc,pwd){
    return axios.post(IP+'/login',{acc,pwd})
}

//token验证
export function getToken(token){
    return axios.get(IP+'/gettoken',{params:{token}})
}

//账号管理-添加账号
export function addAccount(acc,pwd,usergroup){
    return axios.post(IP+'/main/addaccount',{acc,pwd,usergroup})
}
//账号管理-修改密码
export function changePassword(id,pwd,newpwd){
    return axios.post(IP+'/main/changepwd',{id,pwd,newpwd})
}
//账号管理-获取用户数据
export function getUsers(curpage,row){
    return axios.get(IP+'/main/accountmanagement',{
        params:{
            curpage,
            row
        }
    })
}
//账户管理-删除账户
export function deleteUser(id){
    return axios.get(IP+'/removeaccount',{params:{id}})
}

//商品管理-添加商品
export function addCommodity(category,barCode,name,salePrice,marketPrice,stockPrice,stockCount,commodityWeight,commodityUnit,vipDiscount,promotion,goodsDesc){
    return axios.get(IP+'/main/addcommodity',
    {params:{
        category,barCode,name,salePrice,marketPrice,stockPrice,stockCount,commodityWeight,commodityUnit,vipDiscount,promotion,goodsDesc
    }})
}
//商品管理-获取商品数据
export function getCommodity(curpage,row){
    return axios.get(IP+'/main/commoditymanagement',{
        params:{
            curpage,
            row
        }
    })
}