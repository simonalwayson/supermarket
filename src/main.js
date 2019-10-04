import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getToken } from './apis/api'

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
    //根据token决定是否能跳转到管理系统
    getToken(localStorage.getItem('token')).then(res=>{
      if(res.data==="ok"){
        next()//跳转到主页
      }else{
        next('/')//跳转到登陆界面
      }
    })
  }else{
    next()//跳转到主页
  }
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
