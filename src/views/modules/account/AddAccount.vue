<template>
  <div class="changepwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="myForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input v-model="ruleForm.checkpassword" show-password></el-input>
        </el-form-item>
        <!-- 选择用户组 -->
        <el-form-item label="选择用户组" prop="usergroup">
          <el-select v-model="ruleForm.usergroup" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addAccount } from "../../../apis/api";
export default {
  data() {
    //用户名验证规则
    var validateName = (rule, value, callback) => {
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
    //确认密码验证规则
    var validateCheckPass = (rule, value, callback) => {
      if (value === this.ruleForm.password) {
        callback();
      } else {
        callback(new Error("两次密码输入不一致"));
      }
    };
    return {
      ruleForm: {
        password: "",
        newpassword: "",
        checkpassword: "",
        value: "选择用户组"
      },
      rules: {
        //验证规则
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          //默认验证规则
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validateName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          //默认验证规则
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validatePass, trigger: "blur" }
        ],
        checkpassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          //自定义验证规则
          { validator: validateCheckPass, trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "1",
          label: "超级管理员"
        },
        {
          value: "2",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        addAccount(
          this.ruleForm.name,
          this.ruleForm.password,
          this.ruleForm.usergroup
        ).then(res => {
          if (res.data === "ok") {
            this.$message({
              message: "恭喜你，添加账户成功",
              type: "success"
            });
          } else {
              this.$message.error('很遗憾，添加账号失败');
          }
        });
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