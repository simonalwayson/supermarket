<template>
  <div class="main">
    <div class="top">
      <h3>永辉超市管理系统</h3>
      <div class="avatar">
        <img src="../assets/images/avatar.jpg" />
        <label>{{ username }}</label>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <el-menu
          :default-active="active"
          class="myMenu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu v-for="item in treeList" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="subitem in item.child" :index="subitem.index" :key="subitem.index">{{ subitem.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '../apis/api'
export default {
  data(){
    return {
      active:'/main/commoditymanagement',
      username:'请登录',
      treeList:[
        {
          index:'1',
          icon:'el-icon-s-home',
          name:'商品管理',
          child:[
            {index:'/main/commoditymanagement',name:'商品管理'},
            {index:'/main/addcommodity',name:'添加商品'}
          ]
        },
        {
          index:'2',
          icon:'el-icon-s-data',
          name:'统计管理',
          child:[
            {index:'/main/stockmanagement',name:'进货统计'},
            {index:'/main/salesmanagement',name:'销售统计'}
          ]
        },
        {
          index:'3',
          icon:'el-icon-user-solid',
          name:'账号管理',
          child:[
            {index:'/main/accountmanagement',name:'账号管理'},
            {index:'/main/addaccount',name:'添加账号'},
            {index:'/main/changepassword',name:'修改密码'}
          ]
        },

      ]
    }
  },
  created(){
    this.active = location.hash.replace('#','')
    getToken(localStorage.getItem('token')).then(res=>{
      if(res.data==='ok'){
          this.username = localStorage.getItem('username')
      }else{
          this.username = "请登录"
      }
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  .top {
    height: 10%;
    color: #fff;
    background-color: #24292e;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    align-items: center;
    .avatar {
      display: flex;
      align-items: center;
      img {
        width: 45px;
        margin-right:10px;
      }
    }
  }
  .center {
    height: 90%;
    display: flex;
    .left {
      width: 300px;
      height: 100%;
      .myMenu {
        height: 100%;
      }
    }
    .right {
      width: 100%;
      height:100%;
      background-color: #f6f8fa;
    }
  }
}
</style>
