<template>
  <div class="login-wrapper">
    <div class="login">
      <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-width="40px" class="demo-ruleForm" @keyup.enter.native="submitForm('loginForm')">
        <h2>登陆</h2>
        <el-form-item label="用户" prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="button-margin">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <!--<el-button @click="registerForm('loginForm')">注册</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 100%;
    .login {
      border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      padding: 35px 35px 15px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      h2 {
        margin-bottom: 15px;
        text-align: center;
      }
      .button-margin {
        text-align: center;
        .el-form-item__content {
          margin-left: 0!important;
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { login, register } from '~/api/login';
  import { isUserName } from '~/utils/validate';
  import store from '~/store/index';
  export default {
    data() {
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.loginForm.username !== '') {
            this.loginForm.username = this.loginForm.username.trim();
            if (isUserName(this.loginForm.username)) {
              callback();
            } else {
              callback(new Error('仅支持英文和数字'));
            }
          }
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        login(this.loginForm).then((res) => {
          if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            this.$router.push({path: 'admin'});
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          }
        });
      },
      registerForm(formName) {
        register(this.loginForm).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            this.getUser();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          }
        })
      }
    }
  };
</script>
