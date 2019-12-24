<template>
    <div>
      <div class="main">
        <!--顶部导航-->
        <div class="nav nav-default " >
          <!--顶部左侧导航-->
          <ul class="nav-menu-left" >
            <li class="nav-menu-item " style="margin: auto;">
              <div>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="path">
                    <el-link style="font-size: 27px;" :underline="false" type="primary" ><i class="el-icon-back"></i></el-link>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </li>
            <li style="width: 250px;margin-top: auto;">
              <div>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="path">
                    <el-button type="primary" class="button" round="">{{course.courseName}}</el-button>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </li>
          </ul>
          <!--顶部右侧导航-->
          <ul class="nav-menu-right">
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
        <el-card :body-style="{ padding: '0px'}" style="width: 85%;height:50%;margin:0 auto;margin-top: 7%;">
          <div style="display: flex;flex-direction: column;padding: 30px">
            <div style="display: flex;flex-direction: row;">
              <span style="background:rgb(241,243,244)">个人作业</span>
            </div>
            <div class="homeworkBody" >
              <el-link  style="font-size: 25px;color: #1F2023">{{this.homework.homeworkName}}</el-link>
            </div>
            <div class="homeworkBody">
            </div>
            <div style="margin-top: 30px;display: flex;justify-content: space-between">
              <span>截至日期: {{this.homework.deadline}}</span>
              <span style="margin-left: 50px">0条讨论</span>
            </div>
          </div>
        </el-card>
        <!--作业表格-->
        <div  class="table-content" style="width:85%;margin:0 auto">
          <div>
            <h2>批改作业</h2>
          </div>
          <el-table :data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)" class = 'table-center'>
            <el-table-column prop = "userId" label="ID" width="40" />
            <el-table-column prop = "userNum" label="学号"  />
            <el-table-column prop = "userName" label="姓名"  />
            <el-table-column prop = "readStatus" label="批阅状态" :formatter="formatBoolean"  :show-overflow-tooltip="true" />
            <el-table-column prop = "submitStatus" label="提交状态" :formatter="formatBoolean1"  :show-overflow-tooltip="true" />
            <el-table-column prop = "mark" label="分数"  />
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <!--scope.row是拿到表格每一行的数据,scope.$index是获取每一行的索引-->
                <el-button v-if="scope.row.submitStatus == 1" @click="openReadHw(scope.row.userId)" type="text" size="small" >批阅</el-button>
                <el-button v-if="scope.row.submitStatus == 1" @click="openGiveMark(scope.row.userId)" type="text" size="small">打分</el-button>
                <el-button v-if="scope.row.submitStatus == 1" type="text" size="small">查看作业</el-button>
                <el-button v-if="scope.row.submitStatus == 0" type="text" size="small">催交</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="students.length">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProcessHomeWork',
  data () {
    return {
      course: {
        courseId: '',
        courseName: ''
      },
      path: '',
      // 初始页
      currentPage: 1,
      // 每页的数据
      pageSize: 10,
      // 新增临时变量用于保存多选数据
      notice: ['通知1', '通知2'],
      stuNum: 20,
      homework: {
        homeworkId: this.$route.query.homeworkId,
        homeworkName: this.$route.query.homeworkName,
        deadline: this.$route.query.deadline
      },
      students: [
      ],
      student: {
        userId: '',
        userNum: '',
        userName: '',
        readStatus: '',
        mark: ''
      }
    }
  },
  methods: {
    // 分页
    handleSizeChange (pageSize) {
      console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
    },
    handleCurrentChange (currentPage) {
      console.log(`当前页: ${currentPage}`)
      this.currentPage = currentPage
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 根据拿到的数据改变表格显示内容
    formatBoolean: function (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = '已阅'
      } else {
        ret = '未阅'
      }
      return ret
    },
    formatBoolean1: function (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = '已提交'
      } else {
        ret = '未提交'
      }
      return ret
    },
    getNeedReadList () {
      this.$axios.get('api/homework/getNeedReadList?homeworkId=' + this.$route.query.homeworkId)
        .then(res => {
          // 获取所有课程
          this.students = res.data.info
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCourseByHwId () {
      this.$axios.get('api/homework/getCourseByHwId?homeworkId=' + this.$route.query.homeworkId)
        .then(res => {
          // 获取所有课程
          this.course = res.data
          this.path = '/manage?courseId=' + this.course.courseId
        })
    },
    openGiveMark (userId) {
      this.$prompt('请输入该学生本次作业分数(打分后即代表已批阅)', '打分', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]\d*|0)(?:\.\d+)?$/,
        inputErrorMessage: '分数输入必须为数字(正数,可包括小数)'
      }).then(({ value }) => {
        this.$axios.get('api/homework/giveMark?homeworkId=' + this.$route.query.homeworkId + '&userId=' + userId + '&mark=' + value)
          .then(res => {
            this.getNeedReadList()
            if (res.data.code === 200) {
              this.$message.success('打分成功')
            } else {
              this.$message.error('打分失败,可能是您输入的分数大于改作业的最大分数或请求异常')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('请求异常')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    openReadHw (userId) {
      this.$confirm('批阅该学生作业', '批阅', {
        confirmButtonText: '批阅',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$axios.get('api/homework/readHomework?homeworkId=' + this.$route.query.homeworkId + '&userId=' + userId)
          .then(res => {
            this.getNeedReadList()
            if (res.data.code === 200) {
              this.$message.success('批阅成功')
            } else {
              this.$message.error('批阅失败')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('请求异常')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  mounted () {
    this.getNeedReadList()
    this.getCourseByHwId()
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
</style>
