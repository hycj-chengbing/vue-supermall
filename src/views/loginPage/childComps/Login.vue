<template>
  <div id="login" class="dom">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      label-width="60px"
      :rules="loginFormRules"
      label-position="top"
      status-icon
    >
      <div class="s1">
        <el-form-item label="账号" prop="LoginName">
          <el-input
            v-model="loginForm.LoginName"
            name="LoginName"
            type="text"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
      </div>
      <div class="s1">
        <el-form-item label="密码" prop="LoginPassword">
          <el-input
            v-model="loginForm.LoginPassword"
            name="LoginPassword"
            type="password"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
      </div>
      <div class="s2">
        <input type="checkbox" id="remCheck" checked />
        <span>记住密码</span>
      </div>
      <el-button class="btn" @click="login" type="primary">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getHomeMultidata } from "network/home"; //没有default 导出要加{}
export default {
  name: "Login",
  components: {},
  created() {},
  data() {
    return {
      //判断是否记住密码
      isremCheck: true,
      loginForm: {
        LoginName: "",
        LoginPassword: "",
      },
      // 表单验证
      loginFormRules: {
        LoginName: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        LoginPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 登录 表单拦截
    login() {
      this.$refs.loginFormRef.validate(async (res) => {
        if (!res) {
          // console.log("验证不通过");
          return false;
        } else {
          // //跳转到管理页面(不需要回退)
          this.$router.replace({ path: "app/home" });
        }
      });
    },
  },
};
</script>

<style>
</style>