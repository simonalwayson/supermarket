import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './views/Login.vue'

Vue.use(Router)
Vue.use(ElementUI)

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
        {path: '/main/commoditymanagement',name: 'commoditymanagement',component: () => import('./views/modules/commodity/CommodityManagement.vue')},//商品管理
        {path: '/main/addcommodity',name: 'addcommodity',component: () => import('./views/modules/commodity/AddCommodity.vue')},//添加商品
        //统计管理
        {path: '/main/stockmanagement',name: 'stockmanagement',component: () => import('./views/modules/stastics/StockManagement.vue')},//进货统计
        {path: '/main/salesmanagement',name: 'salesmanagement',component: () => import('./views/modules/stastics/SalesManagement.vue')},//销售统计
        //账号管理
        {path: '/main/accountmanagement',name: 'accountmanagement',component: () => import('./views/modules/account/AccountManagement.vue')},//账号管理
        {path: '/main/addaccount',name: 'addaccount',component: () => import('./views/modules/account/AddAccount.vue')},//添加账号
        {path: '/main/changepassword',name: 'changepassword',component: () => import('./views/modules/account/ChangePassword.vue')},//更改密码
      ]
    }
  ]
})
