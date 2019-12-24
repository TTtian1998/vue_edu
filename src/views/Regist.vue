<template>
  <div>
    <div id="regist-page">
      <img src="../img/regist.png">
    </div>
    <div class="regist-box">
      <el-card  style="width: 30%;margin:100px auto" class="box-card">
        <div slot="header" class="clearfix">
          <h2>注册账号</h2>
        </div>
        <div >
          <el-form :label-position="labelPosition" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm loginFrom">
            <el-form-item prop="account" label="账号">
              <el-input v-model="ruleForm.account" type="text" autocomplete="off" name="account" placeholder="邮箱/账号/手机号"/>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" name="pass" placeholder="密码"/>
            </el-form-item>
            <el-form-item prop="password" label="姓名">
              <el-input v-model="ruleForm.userName" type="text" autocomplete="off" name="pass" placeholder="姓名"/>
            </el-form-item>
            <el-form-item prop="password" label="身份">
              <el-radio  label="2" v-model="ruleForm.roleId" >教师/助教</el-radio>
              <el-radio  label="3" v-model="ruleForm.roleId" >学生</el-radio>
            </el-form-item>
            <el-form-item v-show="userNumShow" prop="password" label="学号/工号">
              <el-input v-model="ruleForm.userNum" type="text" autocomplete="off" name="pass" placeholder="学号/教师工号"/>
            </el-form-item>
            <el-form-item prop="password" label="学校">
              <el-input v-model="ruleForm.school" type="text" autocomplete="off" name="pass" placeholder="学校"/>
            </el-form-item>
            <!--<el-form-item prop="password" label="验证码">-->
              <!--<el-input v-model="ruleForm.vali" type="password" autocomplete="off" name="pass" placeholder="验证码"/>-->
            <!--</el-form-item>-->
          </el-form>
          <div class="padding-cont pt-login">
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 70%">注册</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'left',
      checked: false,
      userNumShow: false,
      ruleForm: {
        account: '', // 用户名
        password: '', // 密码
        userName: '',
        roleId: '',
        userNum: '',
        school: ''
        // vali: ''
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
        }],
        userName: [{
          required: true,
          message: '姓名',
          trigger: 'blur'
        }],
        roleId: [{
          required: true,
          message: '请选择身份',
          trigger: 'blur'
        }],
        // 可以为空
        userNum: [{
          required: false,
          message: '请输入学号/工号',
          trigger: 'blur'
        }],
        school: [{
          required: true,
          message: '请输入学校',
          trigger: 'blur'
        }]
        // vali: [{
        //   required: true,
        //   message: '请输入验证码',
        //   trigger: 'blur'
        // }]
      }
    }
  },
  computed: {
    roleIdChange () {
      return this.ruleForm.roleId
    }
  },
  watch: {
    roleIdChange () {
      if (this.ruleForm.roleId === '2') {
        this.userNumShow = false
      } else if (this.ruleForm.roleId === '3') {
        this.userNumShow = true
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          Number(this.ruleForm.roleId)
          // 请求后台
          this.$axios
            .post('api/login/regist', this.ruleForm, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success('注册成功,返回登录页面')
                this.jumpToList()
              } else {
                this.$message.error('注册失败')
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.msg)
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    jumpToList () {
      this.$router.push('/login')
    },
    judegeShowInpt () {
      if (this.ruleForm.roleId === 2) {
        this.userNumShow = true
      } else {
        this.userNumShow = false
      }
    }
  },
  mounted () {
    // this.judegeShowInpt()
  }
}
</script>

<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  #regist-page{
    padding: 0;
    height: 722px;
  }
  .regist-box{
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
