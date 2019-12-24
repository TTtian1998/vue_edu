<template>
  <div>
    <div id="login-page">
      <img src="../img/login.jpg">
    </div>
    <div class="login-box">
      <el-card  style="width: 28%;margin: 150px auto" class="box-card">
        <div slot="header" class="clearfix">
          <h3>账号登录</h3>
        </div>
        <div >
          <div style="margin: 20px;"></div>
          <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-loginForm loginFrom">
            <el-form-item prop="account" label="账号">
              <el-input v-model="loginForm.account" type="text" autocomplete="off" name="account" placeholder="邮箱/账号/手机号"/>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="loginForm.password" type="password" autocomplete="off" name="pass" placeholder="密码"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
          <div class="padding-cont pt-login">
            <div>
              <a href="http://localhost:8080/#/regist" style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">还没有账号？去注册</a>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      checked: false,
      loginForm: {
        account: '', // 用户名
        password: '' // 密码
      },
      rules: {
        account: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(data => {
            this.loading = false
            if (data.result === 'success') {
              this.$router.push({path: '/course'})
            } else {
              this.$message.error('账号/密码错误')
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('账号/密码错误')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  #login-page{
    padding: 0;
    height: 718px;
  }
  .login-box{
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,0.5);
  }
</style>
