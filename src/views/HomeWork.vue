<template>
    <div>
      <!--作业发布-->
      <el-button v-if="hasPerm('hw:pulish')" style="margin-left:7.5%;display: flex;flex-flow: row"  :underline="false" @click="releaseWorkDiv = false" >发布个人作业</el-button>
      <div style="width: 85%;margin:1% auto">
        <div :class="{'play':releaseWorkDiv,'homework':!releaseWorkDiv}">
          <el-input v-model="homework.homeworkName" style="font-size:110%;" placeholder="作业名称" clearable></el-input>
          <el-input v-model="homework.brief" style="font-size:110%;margin-top:20px;" type="textarea" :autosize="{ minRows: 3}" placeholder="作业简介，作业格式等要求" clearable></el-input>
          <el-upload
            class="upload-demo"
            action="http://localhost:8000/files/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-form style="margin-top:20px;"  ref="form" :model="homework" label-width="80px">
            <el-form-item label="截至日期:">
              <el-date-picker v-model="homework.deadline" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item prop="maxMark" :rules="[{ required: true, message: '分值不能为空'},{ type: 'number', message: '分值必须为数字值'}]" label="满分:">
              <el-input v-model.number="homework.maxMark" style="font-size:110%;width:60px;" ></el-input>
            </el-form-item>
            <el-form-item align="right">
              <el-button @click="releaseWorkDiv = true;">取消</el-button>
              <el-button :disabled="homework.homeworkName==''||homework.homeworkName==null" type="primary" @click="publishHw()">发布个人作业</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--element layout布局 el-row中没有给垂直排列的参数-->
      <el-row style="display: flex;flex-direction: column">
        <el-col  v-for="(homework) in homeworks" :key="homework.homeworkId">
          <el-card :body-style="{ padding: '0px'}" style="width: 85%;height:50%;margin:1% auto">
            <div style="display: flex;flex-direction: column;padding: 30px">
              <div style="display: flex;flex-direction: row;">
                <span style="background:rgb(241,243,244)">个人作业</span>
                <span style="margin-left: 30px">{{homework.createDate}}</span>
              </div>
              <el-dropdown v-if="hasPerm('hw:show')" >
                    <span class="el-dropdown-link" style="margin-left: 90%">
                      <el-link :underline="false" class="el-icon-more"></el-link>
                    </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>保存到</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="homeworkBody" >
                <el-link @click="jumptoProcessHw(homework.homeworkId,homework.homeworkName,homework.deadline)" style="font-size: 25px;color: #1F2023">{{homework.homeworkName}}</el-link>
              </div>
              <div class="homeworkBody">
                <div>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="3"
                    :file-list="fileList">
                  </el-upload>
                </div>
               <div v-if="hasPerm('hw:show')" style="margin-left:50%">
                 <span>已批:<span class="showNum">{{homework.readed}}</span></span>
                 <span style="color: red">未批:<span class="showNum">{{homework.unread}}</span></span>
                 <span>未交:<span class="showNum">{{homework.unsubmit}}</span></span>
               </div>
              </div>
              <div class="homeworkBody">
                <span>{{homework.brief}}</span><el-link style="color: dodgerblue">查看全文></el-link>
              </div>
              <div style="margin-top: 30px;display: flex;justify-content: space-between">
                <span>截至日期: {{homework.deadline}}</span>
                <span style="margin-left: 50px">0条讨论</span>
                <div>
                  <el-upload v-if="homework.submitStatus === 0"
                    class="upload-demo"
                    action="http://localhost:8000/files/submitFiles"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">上传作业</el-button>
                  </el-upload>
                  <el-button style="margin-top: 10px" @click="submitHw(homework.homeworkId)" v-if="hasPerm('hw:submit')" type="primary"  class="button">
                    <span v-if="homework.submitStatus === 0">点击提交</span>
                    <span v-else-if="homework.submitStatus === 1">已提交</span>
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'HomeWork',
  data () {
    return {
      fileList: [],
      file: {
        name: '',
        url: ''
      },
      releaseWorkDiv: true,
      notice: ['通知1', '通知2'],
      stuNum: 20,
      homeworks: [],
      homework: {
        homeworkId: '',
        courseId: this.$route.query.courseId,
        homeworkName: '',
        createDate: '',
        deadline: '',
        brief: '',
        urls: '',
        maxMark: ''
      },
      noticeNum: 3,
      course: {
        courseId: '',
        courseName: '',
        courseNum: '',
        joinCode: '',
        termYear: '',
        termDetail: '',
        teacher: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    // 文件相关
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 获取所有作业
    getAll () {
      this.$axios.get('api/homework/getHwList?courseId=' + this.$route.query.courseId)
        .then(res => {
          this.homeworks = res.data.info
        })
        .catch(err => {
          console.log(err)
        })
    },
    publishHw () {
      this.homework.deadline = this.formateDate(this.homework.deadline)
      this.$axios.post('api/homework/publishHw', this.homework)
        .then(res => {
          // 获取所有作业
          if (res.data.code === 200) {
            this.$message.success('发布作业成功')
            this.getAll()
            this.homework = {}
          } else {
            this.$message.error('发布作业失败')
          }
        })
    },
    // 转换时间格式
    formateDate (datetime) {
      function addDateZero (num) {
        return (num < 10 ? '0' + num : num)
      }
      let d = new Date(datetime)
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds())
      return formatdatetime
    },
    jumptoProcessHw (homeworkId, homeworkName, deadline) {
      this.$router.push({path: '/processHomeWork', query: {homeworkId: homeworkId, homeworkName: homeworkName, deadline: deadline}})
    },
    submitHw (homeworkId) {
      this.$axios.get('api/homework/submitHomework?homeworkId=' + homeworkId)
        .then(res => {
          this.getAll()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>

<style scoped>
  .newWork{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    border: 1px solid rgb(226,230,237);
    margin-top: 30px;
    border-radius: 8px;
  }
  .play{
    display: none;
  }
  .homeworkBody{
    display: flex;
    flex-direction: row;
    margin-top:15px
  }
  .showNum{
    font-size: 40px;
    margin-right: 30px;
  }
</style>
