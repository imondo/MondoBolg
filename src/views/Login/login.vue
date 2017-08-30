<template>
  <div class="login-wrapper">
    <div class="login">
      <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-width="40px" class="demo-ruleForm">
        <h2>登陆</h2>
        <el-form-item label="用户" prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .login-wrapper {
    width:380px;
    height:280px;
    position:absolute;
    left:50%;
    top:50%;
    margin:-190px 0 0 -230px;
    padding: 10px;
    .login {
      border-radius: 5px;
      -moz-border-radius: 5px;
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
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { login } from 'api/login';
  import { isUserName } from 'utils/validate';
  import store from 'store/index';
  export default {
    name: 'login',
    data() {
      var validateUser = (rule, value, callback) => {
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
      var validatePass = (rule, value, callback) => {
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
      comFn(formName, Fn) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Fn(this.loginForm.username, this.loginForm.password).then((res) => {
              let user = JSON.parse(JSON.stringify(res));
              store.dispatch('SetToken', res._sessionToken).then(() => {
                store.dispatch('GetUser', user).then(() => {
                  this.$router.push({path: 'admin'});
                });
              });
            }).catch((err) => {
              if (err.code === 211) {
                this.$message.error('找不到该用户');
              } else if (err.code === 210) {
                this.$message.error('用户名和密码不匹配');
              } else if (err.code === 202) {
                this.$message.error('用户名已经被占用');
              } else {
                this.$message.error(err.message);
              };
              return false;
            });
          }
        });
      },
      submitForm(formName) {
        this.comFn(formName, login);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
