import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'index',
      component: () => import('./views/Index.vue'),
      children:[
        //商品管理
        {path: '/main/commoditymanagement', meta:{requireAuth:true}, name: 'commoditymanagement',component: () => import('./views/modules/commodity/CommodityManagement.vue')},//商品管理
        {path: '/main/addcommodity', meta:{requireAuth:true}, name: 'addcommodity',component: () => import('./views/modules/commodity/AddCommodity.vue')},//添加商品
        //统计管理
        {path: '/main/stockmanagement', meta:{requireAuth:true}, name: 'stockmanagement',component: () => import('./views/modules/stastics/StockManagement.vue')},//进货统计
        {path: '/main/salesmanagement', meta:{requireAuth:true}, name: 'salesmanagement',component: () => import('./views/modules/stastics/SalesManagement.vue')},//销售统计
        //账号管理
        {path: '/main/accountmanagement', meta:{requireAuth:true}, name: 'accountmanagement',component: () => import('./views/modules/account/AccountManagement.vue')},//账号管理
        {path: '/main/addaccount', meta:{requireAuth:true}, name: 'addaccount',component: () => import('./views/modules/account/AddAccount.vue')},//添加账号
        {path: '/main/changepassword', meta:{requireAuth:true}, name: 'changepassword',component: () => import('./views/modules/account/ChangePassword.vue')},//更改密码
        {path: '/main/uploadavatar', meta:{requireAuth:true}, name: 'uploadavatar',component: () => import('./views/modules/account/UploadAvatar.vue')},//上传头像
      ]
    }
  ]
})
