<template>
  <div class="changepwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更改密码</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="myForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input v-model="ruleForm.newpassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input v-model="ruleForm.checkpassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePassword } from "../../../apis/api";
export default {
  data() {
    //原密码验证规则
    var validatePass = (rule, value, callback) => {
      var reg = /^\w{3,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入3到8位数字字母下划线"));
      }
    };
    //新密码验证规则
    var validateNewPass = (rule, value, callback) => {
      var reg = /^\w{3,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入3到8位数字字母下划线"));
      }
    };
    //确认密码验证规则
    var validateCheckPass = (rule, value, callback) => {
      if (value === this.ruleForm.newpassword) {
        callback();
      } else {
        callback(new Error("两次密码输入不一致"));
      }
    };
    return {
      ruleForm: {
        password: "",
        newpassword: "",
        checkpassword: ""
      },
      rules: {
        //验证规则
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          //默认验证规则
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validatePass, trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validateNewPass, trigger: "blur" }
        ],
        checkpassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          changePassword(
            localStorage.getItem("id"),
            this.ruleForm.password,
            this.ruleForm.newpassword
          ).then(res => {
            if (res.data === "ok") {
              this.$message({
                message: "恭喜你，修改密码成功",
                type: "success"
              });
            } else if(res.data === "fail") {
              this.$message.error('很遗憾，密码修改失败');
            }else{
              this.$message.error('用户原密码输入不正确');
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>