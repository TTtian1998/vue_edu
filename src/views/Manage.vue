<template>
  <div class="bge">
    <!--顶部导航-->
    <div class="nav nav-default " >
      <!--顶部左侧导航-->
      <ul class="nav-menu-left" >
        <li class="nav-menu-item " style="margin: 7px;">
          <el-button style="margin-bottom: 10px"  icon="el-icon-s-fold" :underline="false" @click="drawer = true" type="primary" circle>
          </el-button>
          <el-drawer
            title="我是标题"
            append-to-body
            :visible.sync="drawer"
            :direction="'ltr'"
            :with-header="false"
            size="20%">
            <span>我来啦!</span>
          </el-drawer>
        </li>
        <li style="width: 250px;margin-top: 7px;">
          <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/course' }">课堂</el-breadcrumb-item>
              <el-breadcrumb-item>{{course.courseName}} {{ course.courseNum}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </li>
      </ul>
      <!--顶部右侧导航-->
      <ul class="nav-menu-right">
        <li class="paper-repeat nav-menu-item" v-if="hasPerm('nav:check')">
          <a href="#">
            <i class="el-icon-search">论文查重</i>
          </a>
        </li>
        <li class="addtea nav-menu-item " v-if="hasPerm('nav:invite')">
          <a href="#">
            <i class="addteacher el-icon-s-custom">邀请教师</i>
          </a>
        </li>
        <li class="nav-menu-item " v-if="hasPerm('nav:notice')">
          <!--通知-->
          <el-popover
            placement="bottom"
            width="250"
            trigger="click">
            <el-col :key="item" v-for="item in notice">
              <el-link style="width: 100%" href="#">{{item}}</el-link>
            </el-col>
            <div class="bt-bar">
              <div class="more operation-more">
                <el-button id="ignore-all" class="operation-more-ingoreall" href="javascript:void(0);">全部标记已读</el-button>
                <el-button class="link operation-more-ink" href="#">查看全部</el-button>
              </div>
            </div>
            <el-badge  slot="reference" :value="notice.length" class="item">
              <el-button icon="el-icon-bell"  size="small" circle></el-button>
            </el-badge>
          </el-popover>
        </li>
        <li class="nav-menu-item user" v-if="hasPerm('nav:personalSet')">
          <el-dropdown>
            <span class="el-dropdown-link">
            <el-avatar style="height: 25px;width: 25px" icon="el-icon-user-solid"  src="https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028" alt="" title=""></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>开通VIP</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>邀请记录</el-dropdown-item>
              <el-dropdown-item ><a @click="logout">退出账户</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <!--菜单-->
    <div class="ktcon">
      <div style="width: 100%;margin-top: 100px;">
          <el-card :body-style="{ padding: '0px' }" style="width: 85%;height:20%;margin: 0 auto">
            <div style="position: relative;">
              <img  style="height: 200px;width: 100%" src="../img/29.png" class="image">
              <span style="position: absolute; top: 20px; left: 25px;"><el-link @click="handleNameClick(course.courseId)"  style="color: white;font-size: 32px">{{course.courseName}}</el-link></span>
              <span style="position: absolute; top: 50px; left: 25px;"><p style="font-family: Arial;color: white;font-size: 16px" href="#">{{course.courseNum}}</p></span>
              <span style="position: absolute; top: 100px; left: 25px;">
                   <el-dropdown>
                    <span class="el-dropdown-link">
                      <a style="font-family: Arial;color: white;font-size: 13px" href="#"><i class="el-icon-s-grid"></i>加课码:{{course.joinCode}}</a>
                    </span>
                     <!--todo 加课码状态-->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>停用</el-dropdown-item>
                      <el-dropdown-item>重置</el-dropdown-item>
                      <el-dropdown-item>启用</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              <span style="position: absolute; top: 80px; left: 180px;"><p style="font-family: Arial;color: darkgrey;font-size: 12px" href="#">{{course.termYear}}</p></span>
              <span style="position: absolute; top: 90px; left: 180px;"><p style="font-family: Arial;color: darkgrey;font-size: 12px" href="#">{{course.termDetail}}</p></span>
            </div>
            <div style="margin-top: -4px;">
              <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="rgb(241,243,244)"
                text-color="black"
                active-text-color="rgb(50,142,235)">
                <el-menu-item class="menu-item" index="1">课堂互动</el-menu-item>
                <el-menu-item class="menu-item" index="2">作业
                  <!--<router-link to="/manage/homeWork">作业</router-link>-->
                </el-menu-item>
                <el-menu-item class="menu-item" index="3">话题</el-menu-item>
                <el-menu-item class="menu-item" index="4">资料</el-menu-item>
                <el-menu-item class="menu-item" index="5">测试</el-menu-item>
                <el-menu-item class="menu-item" index="6">公告</el-menu-item>
              </el-menu>
            </div>
          </el-card>
      </div>
    </div>
    <!--内容-->
    <HomeWork style="margin-top: 2%;height: 1000px">
      <div>
      </div>
    </HomeWork>
  </div>
</template>

<script>
import HomeWork from './HomeWork'
export default {
  name: 'Manage',
  components: {HomeWork},
  data () {
    return {
      drawer: false,
      activeIndex2: '2',
      notice: ['通知1', '通知2'],
      stuNum: 20,
      homework: ['作业1', '作业2'],
      noticeNum: 3,
      course: {
        courseId: '',
        courseName: '',
        courseNum: '',
        joinCode: '',
        termYear: '',
        termDetail: '',
        teacher: ''
      }
    }
  },
  methods: {
    handleHWclick () {
      alert(1)
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 根据课程id查询课程
    getCourseById () {
      this.$axios.get('api/course/getCourseById?courseId=' + this.$route.query.courseId)
        .then(res => { // 接口成功返回结果执行
          this.course = res.data.info
        })
        .catch(err => { // 请求失败或者接口返回失败或者.then()中的代码发生错误时执行
          console.log(err)
        })
    }
  },
  mounted () {
    this.getCourseById()
  }
}
</script>

<style scoped>

  .menu-item{
    margin-left: 60px
  }
  .nav{height:72px}.nav-default{background-color:#fff;color:#FFF;position:fixed;top:0;width:100%}.nav-menu-left{float:left;margin-top: 10px;padding-left: 0px;}.nav-menu-right{float:right}.nav-menu-item{margin:18px;float:left;color:#FFF;position:relative;height:27px;line-height:27px}.nav-menu-item a.active{color:#3B3D45;padding-bottom:5px}.nav-menu-item .side-button{display:block;height:24px;line-height:40px}.nav-menu-item .ketangpaitophref img,.nav-menu-item .side-button img{display:inline-block;vertical-align:middle;padding:2px 10px 2px 0;margin-top:-4px;margin-left:-2px}.nav-menu-item .side-button span{display:inline-block;vertical-align:middle;height:24px}.nav-menu-item .count{min-width:13px;height:18px;line-height:18px;background:#e2e9f8;border-radius:10px;text-align:center;color:#357ae8;font-style:normal;font-size:13px;padding:0 5px;position:absolute;left:32px;top:-9px}.nav-menu-item .ignore{position:absolute;color:grey!important;right:14px;top:15px;width:80px;line-height:28px;text-align:right;background-color:#fff;font-size:12px!important}
  .nav a:active{height:67px;background:rgba(255,255,255,.3)}
  .nav a:hover{color:#000}
  .nav-default{z-index:2;padding:0 2%;box-sizing:border-box;box-shadow:0 0 10px #ccc}
  .nav-menu-left .nav-menu-item:first-of-type{margin-left:0;margin-right:0}
  .nav-menu-right{margin-right:0;margin-top:8px}
  .nav-menu-item{position:relative;top:3px}
  .nav-menu-left{margin-left:0;margin-top:5px}.nav-menu-left .nav-menu-item:first-of-type{margin-left:0;margin-right:0}.nav-menu-right{margin-right:0;margin-top:8px}.nav-menu-item.user{margin-right:0}.nav-menu-item.user>a{padding-right:0}.nav-menu-left .nav-menu-item a{padding-bottom:22px;padding-left:15px;padding-right:15px}@media screen and (max-width:1100px){.nav-menu-left .nav-menu-item a{padding:0 8px 22px}}
  .paper-repeat{margin-top:16px}.paper-repeat i{height:32px;padding-left:35px;line-height:28px} .addteacher,.paper-repeat i{display:inline-block;font-style:normal;color:rgba(95,99,104,1)}
  .addtea{margin-top:10px} .addteacher{height:40px;padding-left:40px;line-height:40px}
  /*解决element抽屉组件全黑*/
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    opacity: .5;
    background: #000;
  }
</style>
