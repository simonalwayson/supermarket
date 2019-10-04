<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>永辉超市管理系统</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="myForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <p v-show="isShow">用户名或密码错误</p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login }from '../apis/api'
export default {
  data() {
      //用户名验证规则
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w{3,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入3到8位数字字母下划线"));
      }
    };
    //密码验证规则
    var validatePass = (rule, value, callback) => {
      var reg = /^\w{3,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入3到8位数字字母下划线"));
      }
    };
    return {
      isShow:false,
      ruleForm: {
        name: "",
        password:""
      },
      rules: {
        //验证规则
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          //默认验证规则
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if(valid){//前端验证通过才可以发送请求
          login(this.ruleForm.name,this.ruleForm.password).then(res=>{
            if(res.data.msg === 'ok'){//登陆成功 
              localStorage.setItem('id',res.data.id)//保存用户id
              localStorage.setItem('username',this.ruleForm.name)//保存用户名
              localStorage.setItem('usergroup',res.data.usergroup)//保存用户分组
              localStorage.setItem('token',res.data.token)//保存token对象
              this.$router.push("/main/commoditymanagement");//跳转到主页
            }else
              this.isShow = true;//显示提示信息
          }) 
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  .box-card {
    width: 480px;
    height: 300px;
    margin-right:50px;
  }
}
</style>