<template>
  <div class="bge">
    <!--顶部导航-->
    <div class="nav nav-default ">
      <!--顶部左侧导航-->
      <ul class="nav-menu-left">
        <li class="nav-menu-item ktplogo ">
          <a class="ketangpaitophref" href="https://www.ketangpai.com/Index/index">
            <img src="../img/logo-mainblue.png" alt="" width="96px" height="24px">
          </a>
        </li>
        <li class="nav-menu-item" v-if="hasPerm('nav:class')"><a href="#" class="active">课堂</a></li>
        <li class="nav-menu-item" v-if="hasPerm('nav:prepare')"><a href="#" class="active">备课区</a></li>
        <li class="nav-menu-item jingpin" v-if="hasPerm('nav:boutique')" data-yy="0"><a href="#" class="active">精品专区</a></li>
        <li class="nav-menu-item" v-if="hasPerm('nav:myBoutique')"><a href="#" class="active">我的精品</a></li>
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
        <li class="nav-menu-item " style="margin: 4px 0 0 45px" v-if="hasPerm('nav:notice')">
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
        <li class="nav-menu-item user" style="margin: 12px 0px 0px 30px;" v-if="hasPerm('nav:personalSet')">
          <el-dropdown>
            <span class="el-dropdown-link">
            <el-avatar style="height: 33px;width: 33px" icon="el-icon-user-solid"  src="https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028" alt="" title=""></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>开通VIP</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>邀请记录</el-dropdown-item>
              <el-dropdown-item><a @click="logout">退出账户</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
  </div>
    <div class="ktcon">
      <div class="ktcon1 ">
        <div>
          <p style="display: block;">全部课程</p>
          <p style="display: none;">置顶课程</p>
        </div>
        <div style="display: flex;flex-direction: row">
          <div style="line-height: 45px;margin-right: 25px">
              <el-link v-if="hasPerm('banner:sort')" :underline="false" href="#" class="el-icon-s-operation" style="margin-right: 25px">课程排序</el-link>
                <el-popover
                  placement="left"
                  width="420"
                  trigger="click">
                  <el-table :data="fileCourses">
                    <el-table-column width="150" property="courseName" label="课程名"></el-table-column>
                    <el-table-column width="100" property="teacher" label="老师"></el-table-column>
                    <el-table-column label="操作" width="160">
                      <template slot-scope="scope">
                        <!--scope.row是拿到表格每一行的数据,scope.$index是获取每一行的索引-->
                        <el-button  @click="recover(scope.row.courseId)" type="text" size="small" >恢复</el-button>
                        <el-button  @click="deleteOpen(scope.row.courseId)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-link slot="reference" v-if="hasPerm('banner:fileManage')" :underline="false"  class="el-icon-folder-opened">归档管理</el-link>
                </el-popover>
          </div>
          <div>
            <el-dropdown>
            <span class="el-dropdown-link">
              <el-button v-if="hasPerm('banner:joinANDcreate')" type="primary">+ 创建/加入课程</el-button>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a @click="showCreateCourse">创建课程</a></el-dropdown-item>
                <el-dropdown-item><a @click="joinCourse">加入课程</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if="hasPerm('banner:publish')" type="primary">+ 快速发布活动</el-button>
            <el-button @click="joinCourse" v-if="hasPerm('banner:join')" type="primary">+ 加入课程</el-button>
          </div>
        </div>
      </div>
      <div>
        <el-row>
          <!--Layout布局，分为8栏-->
          <el-col :span="8" v-for="(course) in courses" :key="course.courseId" >
            <el-card :body-style="{ padding: '0px' }" style="width: 95%;height:280px;margin-bottom: 24px;">
              <div style="position: relative;">
                <img  style="height: 70%" src="../img/29.png" class="image">
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
              <div style="padding: 5px;height: 150px" >
                <div style="margin-bottom: 20px;height: 40%">
                  <span style="padding-right: 160px;font-size: 13px;color: grey">近期作业</span>
                  <el-col :key="item" v-for="item in homework" style="padding-right: 170px">
                    <el-link href="#">{{item}}</el-link>
                  </el-col>
                </div>
                <!--分割-->
                <el-divider></el-divider>
                <div class="bottom clearfix" >
                  <span v-if="hasPerm('more:showCNum')" >成员:{{getStuNumByID(course.courseId)}} 人</span>
                  <span v-if="hasPerm('more:showTeaName')">教师:{{ course.teacher }}</span>
                  <el-dropdown>
                  <span class="el-dropdown-link" >
                     <el-button style="margin-left: 120px;line-height: 10px" type="text" class="button">更多</el-button>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="hasPerm('more:edit')"><a @click="showUpdate(course)">编辑</a></el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:delete')"><a @click="deleteOpen(course.courseId)">删除</a></el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:file')"><a @click="courseFileOpen(course.courseId)">归档</a></el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:copy')">复制课程</el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:download')">打包下载</el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:transfer')">转让</el-dropdown-item>
                      <el-dropdown-item v-if="hasPerm('more:quit')">退课</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--创建/加入课程-->
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }" style="width: 256.5px;height:280px;margin-bottom: 24px;">
              <div style="position: relative;">
                <img  style="height: 70%" src="../img/create-course.png" class="image">
              </div>
              <div style="padding: 5px" >
                <div class="bottom clearfix">
                  <a v-if="hasPerm('banner:joinANDcreate')" href="javascript:void(0)" @click="showCreateCourse" class="el-icon-plus"></a>
                  <a v-if="hasPerm('banner:join')" href="javascript:void(0)" @click="joinCourse" class="el-icon-plus"></a>
                  <p v-if="hasPerm('banner:joinANDcreate')"><a href="javascript:void(0)" @click="showCreateCourse">创建课程</a></p>
                  <p v-if="hasPerm('banner:join')"><a href="javascript:void(0)" @click="joinCourse">加入课程</a></p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!--创建课程对话框-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form  :model="course" :rules="rules" ref="course" label-position="left" label-width="80px"
                 style='width: 300px; margin-left:50px;'>
          <el-form-item label="课程名称" prop="courseName">
            <el-input placeholder="请输入课程名称" name="courseName" type="text" v-model="course.courseName">
            </el-input>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-input placeholder="请输入班级名称(选填)" name="courseNum" type="text" v-model="course.courseNum">
            </el-input>
          </el-form-item>
          <el-form-item label="选择学年" prop="termYear">
            <el-select v-model="course.termYear" name="termYear" placeholder="请选择学年">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学期" prop="termDetail">
            <el-select v-model="course.termDetail" name="termDetail" placeholder="选择学期">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" :loading="loading" @click.native.prevent="createCourse">创 建</el-button>
          <el-button v-if="dialogStatus=='update'" type="primary" :loading="loading" @click.native.prevent="courseEdit">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Course',
  data () {
    return {
      loading: false,
      notice: ['通知1', '通知2'],
      homework: ['作业1', '作业2'],
      fileCourses: [],
      courses: [],
      // 选课人数存储
      stuNums: new Map(),
      course: {
        courseId: '',
        courseName: '',
        courseNum: '',
        joinCode: '',
        termYear: '',
        termDetail: '',
        teacher: ''
      },
      rules: {
        courseName: [{
          required: true,
          message: '请输入课程名称',
          trigger: 'blur'
        }],
        termYear: [{
          required: true,
          message: '请选择学年',
          trigger: 'blur'
        }],
        termDetail: [{
          required: true,
          message: '请选择学期',
          trigger: 'blur'
        }]
      },
      // 归档对话框
      dialogVisible: false,
      // 课程创建编辑对话框
      dialogStatus: 'create',
      dialogFormVisible: false,
      textMap: {
        create: '创建课程',
        update: '编辑课程'
      },
      tempArticle: {
        id: '',
        content: ''
      },
      options: [
        {
          value: '2016-2017',
          label: '2016-2017'
        }, {
          value: '2017-2018',
          label: '2017-2018'
        }, {
          value: '2018-2019',
          label: '2018-2019'
        }, {
          value: '2019-2020',
          label: '2019-2020'
        }, {
          value: '2020-2021',
          label: '2020-2021'
        }, {
          value: '2021-2022',
          label: '2021-2022'
        }, {
          value: '2022-2023',
          label: '2022-2023'
        }
      ],
      options1:
        [
          {
            value: '不限',
            label: '不限'
          }, {
            value: '第一学期',
            label: '第一学期'
          }, {
            value: '第二学期',
            label: '第二学期'
          }
        ]
    }
  },
  methods: {
    // 展示创建课程弹框
    showCreateCourse () {
      // 显示新增对话框
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    showUpdate (course) {
      // 显示修改对话框
      this.course = course
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 教师创建课程
    createCourse () {
      this.$refs.course.validate((valid) => {
        if (valid) {
          // 提交到后台
          this.$axios.post('api/course/createCourse', this.course)
            .then(res => { // 接口成功返回结果执行
              console.log(res)
              this.getAll()
            })
            .catch(err => {
              console.log(err)
              this.$message.error('创建失败,服务请求错误')
            })
          this.$message.success('课程创建成功')
        } else {
          this.$message.error('课程名或者学期信息输入为空')
          return false
        }
        this.dialogFormVisible = false
      })
    },
    // 学生根据加课麻加入课程
    joinCourse () {
      this.$prompt('请输入课程加课验证码', '加入课程', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '输入为空'
      }).then(({ value }) => {
        this.$axios.post('api/course/joinCourse', {joinCode: value})
          .then(res => {
            if (res.data.code === 500) {
              this.$message({
                type: 'error',
                message: '加入课程失败,该课程不存在或者加课码已失效'
              })
            } else if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '加入课程成功'
              })
              this.getAll()
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 点击课程名进入课程管理页面
    handleNameClick (courseId) {
      this.$router.push({path: '/manage', query: {courseId: courseId}})
    },
    // 注销
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 获取所有课程
    getAll () {
      this.$axios.post('api/course/getAll')
        .then(res => {
          // 获取所有课程
          this.courses = res.data.info
        })
        .catch(err => {
          console.log(err)
        })
        .finally(alwaysDo => {
        // 获取每门课程对应的选修人数 学生端访问该接口返回500
          this.$axios.post('api/course/getStuNums', this.courses)
            .then(res => {
              this.stuNums = res.data.info
              console.log(this.stuNums)
            })
        })
    },
    // 获取所有归档课程
    getAllFileCourse () {
      this.$axios.post('api/course/getAllFileCourse')
        .then(res => {
          // 获取所有课程
          this.fileCourses = res.data.info
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据课程ID查询选课人数
    getStuNumByID (courseId) {
      var map = new Map()
      map = this.stuNums
      var stuNum = 0
      stuNum = map[courseId]
      return stuNum
    },
    // 归档管理
    courseFileOpen (courseId) {
      this.$confirm('确定归档该课程, 是否继续(若是教师归档课程,则学生无法再次查看该课程信息)?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('api/course/courseFile?courseId=' + courseId)
          .then(res => {
            if (res.data.code === 200) {
              this.$message.success('归档成功')
              this.getAll()
              this.getAllFileCourse()
            } else {
              this.$message.error('归档失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消归档'
        })
      })
    },
    // 修改课程
    courseEdit () {
      this.$axios.post('api/course/courseEdit', this.course)
        .then(res => {
          this.$message.success('修改成功')
          this.dialogFormVisible = false
          // this.getAll()
        })
        .catch(err => {
          this.$message.error('修改失败')
          console.log(err)
        })
    },
    // 删除课程
    deleteOpen (courseId) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作
        this.$axios.get('api/course/courseDelete?courseId=' + courseId)
          .then(res => {
            this.$message.success('删除成功')
            // 移除数组最后一个元素
            this.courses.pop()
          })
          .catch(err => {
            this.$message.error('删除失败')
            console(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 恢复课程
    recover (courseId) {
      this.$axios.get('api/course/courseFileRecover?courseId=' + courseId)
        .then(res => {
          this.$message.success('恢复成功')
          this.getAllFileCourse()
          this.getAll()
        })
        .catch(err => {
          this.$message.error('恢复失败')
          console(err)
        })
    }
  },
  mounted () {
    this.getAll()
    this.getAllFileCourse()
  }
}
</script>

<style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .el-col-8 {
    width: 270px;
  }
  .el-col-offset-2 {
    margin-left: 0;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  a {
    text-decoration: none;
  }
  .bge{height:100%;min-height:600px}
  .nav{height:72px}.nav-default{background-color:#fff;color:#FFF;position:fixed;top:0;width:100%}.nav-menu-left{float:left}.nav-menu-right{float:right}.nav-menu-item{margin:18px;float:left;color:#FFF;position:relative;height:27px;line-height:27px}.nav-menu-item a.active{color:#3B3D45;padding-bottom:5px}.nav-menu-item .side-button{display:block;height:24px;line-height:40px}.nav-menu-item .ketangpaitophref img,.nav-menu-item .side-button img{display:inline-block;vertical-align:middle;padding:2px 10px 2px 0;margin-top:-4px;margin-left:-2px}.nav-menu-item .side-button span{display:inline-block;vertical-align:middle;height:24px}.nav-menu-item .count{min-width:13px;height:18px;line-height:18px;background:#e2e9f8;border-radius:10px;text-align:center;color:#357ae8;font-style:normal;font-size:13px;padding:0 5px;position:absolute;left:32px;top:-9px}.nav-menu-item .ignore{position:absolute;color:grey!important;right:14px;top:15px;width:80px;line-height:28px;text-align:right;background-color:#fff;font-size:12px!important}
  .nav a:active{height:67px;background:rgba(255,255,255,.3)}
  .nav a:hover{color:#000}
  .nav-default{z-index:2;padding:0 2%;box-sizing:border-box;box-shadow:0 0 10px #ccc}
  .nav-menu-left .nav-menu-item:first-of-type{margin-left:0;margin-right:0}
  .nav-menu-right{margin-right:0;margin-top:8px}
  .nav-menu-item{position:relative;top:3px}
  .paper-repeat{margin-top:16px}.paper-repeat i{height:32px;padding-left:35px;line-height:28px} .addteacher,.paper-repeat i{display:inline-block;font-style:normal;color:rgba(95,99,104,1)}
  .addtea{margin-top:10px} .addteacher{height:40px;padding-left:40px;line-height:40px}
  .nav-menu-left{margin-left:0;margin-top:5px}.nav-menu-left .nav-menu-item:first-of-type{margin-left:0;margin-right:0}.nav-menu-right{margin-right:0;margin-top:8px}.nav-menu-item.user{margin-right:0}.nav-menu-item.user>a{padding-right:0}.nav-menu-left .nav-menu-item a{padding-bottom:22px;padding-left:15px;padding-right:15px}@media screen and (max-width:1100px){.nav-menu-left .nav-menu-item a{padding:0 8px 22px}}
  /*.cl {*/
    /*clear: left;*/
  /*}*/
  .ktcon {
    height: 100%;
    overflow: hidden;
    padding: 85px 4% 100px;
    background-color: white;
  }
  .ktcon1 {
    padding-bottom: 12px;
    /*position: relative;*/
    z-index: 1;
    /*justify-content: flex-start;*/
    box-shadow: 0 1px 0 0 rgba(226,230,237,1);
    margin-bottom: 20px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .ktcon1>p {
    height: 36px;
    line-height: 36px;
    color: rgba(59,61,69,1);
  }
  .ktcon1>p, .ktcon1l, .quick-release {
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .fl {
    float: left;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .ktcon1l, .quick-release {
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
    cursor: pointer;
    background: rgba(50,186,240,1);
    text-align: center;
    font-size: 14px;
    color: rgba(255,255,255,1);
    padding: 5px 15px;
  }
  .ktcon1>p, .ktcon1l, .quick-release {
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .ktcon1 .options {
    display: none;
    position: absolute;
    top: 56px;
    right: 149px;
    border: 1px solid #dcdcdc;
    width: 131px;
    background: #fff;
    padding: 5px 0;
  }
  .ktcon1r ul {
    float: right;
    display: flex;
    align-items: center;
  }
  .ktcon1 .options li {
    cursor: pointer;
    height: 44px;
    padding-left: 23px;
    line-height: 44px;
  }
  .ktcon1 .options li a {
    color: #2c2c2c;
    display: block;
  }
  .fr, .mgCalendar_timeConfirm {
    float: right;
  }
  li, ul {
    list-style: none;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  .ktcon1r ul li.ktli1 {
    line-height: 16px;
    height: 16px;
    background-position: 0 2px;
    color: #272636;
    font-size: 14px;
  }
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }
  body {
    font-size: 14px;
    font-family: 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;
    background: #fff;
    color: #2d2d2d;
  }
  .ktcon1r, .ktcon1r ul, .ktcon1r ul li {
    height: 34px;
    line-height: 34px;
  }
</style>
