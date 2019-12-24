<template>
  <div id="main">
    <div id="indextop" class="header header2 header-theme-none">
      <div class="logo fl">
        <a href="#" class="active"></a>
      </div>
      <div class="nav fl">
        <a href="#" class="active">首页</a>
        <a href="#">移动教学</a>
        <a href="#">精品专区</a>
        <div id="solutiontop" style="float:left;" class="">
          <a target="_blank" style="cursor: pointer;">解决方案</a>
          <ul id="solutionul">
            <div style="height:10px;"></div>
            <li class="solutionli"><a href="#" class="nobg">申请机构版</a></li>
            <li class="solutionli"><a href="#" class="nobg">本地化部署</a></li>
            <div style="height:10px;"></div>
          </ul>
        </div>
        <a href="#" class="" target="_blank">会员权益</a>
        <a href="#">帮助中心</a>
        <a href="#" class="">产品动态</a>
      </div>
      <!--根据是否登录隐藏登录注册按钮-->
      <div class="log-reg fr" v-if="showloginBtn">
        <a href="http://localhost:8080/#/login" class="login">登录</a>
        <a href="http://localhost:8080/#/regist" class="regist">注册</a>
      </div>
      <div class="log-reg fr" v-if="hasPerm('nav:personalSet')"  >
        <a href="http://localhost:8080/#/login"  class="regist">进入课堂</a>
      </div>
    </div>
    <div class="hide">
      <a href="#">
        <img src="../img/images/04.jpg" alt="课堂派" title="课堂派" width="121" height="75">
      </a>
    </div>
    <div class="home-page">
      <div class="section1" >
        <el-carousel style="height: 100%"  arrow="always">
          <el-carousel-item >
            <div style="display: flex;justify-content: center">
              <img  src="../img/6.png" >
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div style="display: flex;justify-content: center" >
              <img  src="../img/8.png" >
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    <div class="section2-1">
      <div class="cWidth">
        <div class="summaryBox">
          <ul>
            <li>
              <img src="../img/images/1.png" alt="">
              <h2>极简教学主义</h2>
              <p>无安装，无插件，无需专门学习；掌握简单，三分钟上手；上传一个课件，即可开启精彩的课堂</p>
            </li>
            <li>
              <img src="../img/images/2.png" alt="">
              <h2>精彩的课堂教学</h2>
              <p>提供更多课堂互动场景：课件讲解，手机遥控，标记疑问，评论，弹幕互动，同屏课件，语音直播...</p>
            </li>
            <li>
              <img src="../img/images/3.png" alt="">
              <h2>有趣的课堂互动</h2>
              <p>抢答，点名和随机提问，多种表现奖励形式，记录混合教学过程，激发学生学习原动力，创造更精彩的课堂</p>
            </li>
            <li>
              <img src="../img/images/4.png" alt="">
              <h2>实时随堂试题互动</h2>
              <p>上课讲解课件时，随时发起随堂试题互动：投票、评价、拍照、选择、简答等多种题型，实时作答，即时分析</p>
            </li>
            <li>
              <img src="../img/images/5.png" alt="">
              <h2>精准的考勤签到</h2>
              <p>二维码，数字口令，GPS，传统考勤等多种考勤形式；杜绝代签，一键导出考勤记录</p>
            </li>
            <li>
              <img src="../img/images/6.png" alt="">
              <h2>作业神器</h2>
              <p>81种文档格式作业在线展示和批阅，随时随地批改作业；实时查重，精准比对，避免学生抄袭；自动管理成绩，一键下载作业数据</p>
            </li>
            <li>
              <img src="../img/images/7.png" alt="">
              <h2>智能成绩管理</h2>
              <p>汇总考勤、表现、作业、测试、平时成绩、期末成绩；自由调整成绩权重，汇总最终教学成绩，科学权威</p>
            </li>
            <li>
              <img src="../img/images/8.png" alt="">
              <h2>教学全过程数据分析</h2>
              <p>教学全过程活动数据自动生成，实时查看课程和学生数据面板和报表，教学数据可留存，可追溯</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section3-1">
         <img src="../img/section3-1.png" style="width: 100%;height: 100%" alt="">
    </div>
    <div class="section8" id="section-words">
        <h3>媒体报道</h3>
        <p>课堂派深耕教学管理，受到广泛认可</p>
        <!--分割线-->
        <el-divider></el-divider>
        <el-carousel   height="300px" :interval="4000" indicator-position="outside" type="card">
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://news.ncepu.edu.cn/mthd/76621.htm">【华北电力大学】“互联网+”让教育发现每一个学生</a></div>
              <div class="mrinfo">“课堂上教师要及时了解学生对内容的掌握程度，课下学生也希望教师能对自己的学习困难进行及时的指导。”在以前，这些实现起来比较困难的事情，“课堂派”可以让这一切变得轻而易举。</div>
              <div class="mrbt">
                <div class="mrdate">2016/04/22</div>
                <div class="mrlogo"><img src="../img/images/huadian.png" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://edu.163.com/15/0327/14/ALNHV72O00294MBF.html">【网易教育】课堂派：教师指向型在线教育平台新思路</a></div>
              <div class="mrinfo">目前，教育资源渐趋雷同并竞相抢占市场份额，在线教育发展进入瓶颈期。可喜的是，课堂派的出现打破了这一随大流的现有局面，致力于教师指向型在线教育平台开发，为在线教育市场发展提出新思路。</div>
              <div class="mrbt">
                <div class="mrdate">2015/03/27</div>
                <div class="mrlogo"><img src="../img/images/wangyi.png" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://edu.qq.com/a/20180719/029331.htm">助力智慧课堂：课堂派成为腾讯微校生态战略伙伴
              </a></div>
              <div class="mrinfo">7月18日，腾讯微校发布会在北京船山书院如期举行，正式推出以微信校园卡、腾讯校园码为核心的数字校园解决方案——腾讯微校2.0。本次发布会突破传统Q&amp;A的传统模式，现场模拟校园场景，利用“一款非常好用的应用”课堂派进行了现场互动。作为腾讯微校的生态战略伙伴，互动教学品牌课堂派展现了科技时代，智慧课堂所带来的创新和变化。</div>
              <div class="mrbt">
                <div class="mrdate">2018/07/19</div>
                <div class="mrlogo"><img src="../img/images/tencent.jpg" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="https://www.sohu.com/a/228148312_429328">课堂派亮相2018中国“互联网+”数字经济峰会
              </a></div>
              <div class="mrinfo">4月12日下午教育分论坛，北京大学软件与微电子学院林院长分享了智慧课堂的建设经验：教学资源呈现多样化、课堂形式丰富、如何把学生从玩手机的屏幕聚焦到课堂互动环节等方面。林院长表示，课堂派在研发过程中，学院的一线教师主动参与，把很多丰富的实际教学经验融入研发当中，使整个智慧课堂的建设更具实用性和前瞻性。</div>
              <div class="mrbt">
                <div class="mrdate">2018/04/23</div>
                <div class="mrlogo"><img src="../img/images/sohu.jpg" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://edu.qq.com/a/20180627/034766.htm">新时代新青年 课堂派创始人陈杰宾的创业梦
              </a></div>
              <div class="mrinfo">6月26日，中国共产主义青年团第十八次全国代表大会在人民大会堂开幕。共青团委对福建省驻京团工委点赞，CCTV新闻频道进行了同步报道。分享会上，课堂派创始人陈杰宾作为闽籍创业青年代表，向在京青年创业者分享了课堂派的发展模式以及创业历程。</div>
              <div class="mrbt">
                <div class="mrdate">2018/06/27</div>
                <div class="mrlogo"><img src="../img/images/tencent.jpg" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://news.sina.com.cn/o/2015-08-19/doc-ifxfxrai2235429.shtml">【新浪新闻】课堂派云管理颠覆高校传统实习模式</a></div>
              <div class="mrinfo">用课堂派最大的好处就是在学习的过程中，随时跟老师进行沟通和分享，无论从知识和情感层面都需要倾诉，而课堂派不仅提供跟老师同学交流的机会，还能够获得别人的指导和鼓励，让整个学习过程更加轻松。</div>
              <div class="mrbt">
                <div class="mrdate">2015/08/19</div>
                <div class="mrlogo"><img src="../img/images/sina.png" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://news.ncepu.edu.cn/mthd/76621.htm">【华北电力大学】“互联网+”让教育发现每一个学生</a></div>
              <div class="mrinfo">“课堂上教师要及时了解学生对内容的掌握程度，课下学生也希望教师能对自己的学习困难进行及时的指导。”在以前，这些实现起来比较困难的事情，“课堂派”可以让这一切变得轻而易举。</div>
              <div class="mrbt">
                <div class="mrdate">2016/04/22</div>
                <div class="mrlogo"><img src="../img/images/huadian.png" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://edu.163.com/15/0327/14/ALNHV72O00294MBF.html">【网易教育】课堂派：教师指向型在线教育平台新思路</a></div>
              <div class="mrinfo">目前，教育资源渐趋雷同并竞相抢占市场份额，在线教育发展进入瓶颈期。可喜的是，课堂派的出现打破了这一随大流的现有局面，致力于教师指向型在线教育平台开发，为在线教育市场发展提出新思路。</div>
              <div class="mrbt">
                <div class="mrdate">2015/03/27</div>
                <div class="mrlogo"><img src="../img/images/wangyi.png" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="http://edu.qq.com/a/20180719/029331.htm">助力智慧课堂：课堂派成为腾讯微校生态战略伙伴
              </a></div>
              <div class="mrinfo">7月18日，腾讯微校发布会在北京船山书院如期举行，正式推出以微信校园卡、腾讯校园码为核心的数字校园解决方案——腾讯微校2.0。本次发布会突破传统Q&amp;A的传统模式，现场模拟校园场景，利用“一款非常好用的应用”课堂派进行了现场互动。作为腾讯微校的生态战略伙伴，互动教学品牌课堂派展现了科技时代，智慧课堂所带来的创新和变化。</div>
              <div class="mrbt">
                <div class="mrdate">2018/07/19</div>
                <div class="mrlogo"><img src="../img/images/tencent.jpg" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="slider">
              <div class="mrtitle"><a target="_blank" href="https://www.sohu.com/a/228148312_429328">课堂派亮相2018中国“互联网+”数字经济峰会
              </a></div>
              <div class="mrinfo">4月12日下午教育分论坛，北京大学软件与微电子学院林院长分享了智慧课堂的建设经验：教学资源呈现多样化、课堂形式丰富、如何把学生从玩手机的屏幕聚焦到课堂互动环节等方面。林院长表示，课堂派在研发过程中，学院的一线教师主动参与，把很多丰富的实际教学经验融入研发当中，使整个智慧课堂的建设更具实用性和前瞻性。</div>
              <div class="mrbt">
                <div class="mrdate">2018/04/23</div>
                <div class="mrlogo"><img src="../img/images/sohu.jpg" alt=""></div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="section7" id="section-cooperation">
        <div class="cWidth">
          <h3><span>6000+ </span>学校正在使用课堂派</h3>
          <!-- <p>目前有<span>1000+</span>个不同学科，<span>500+</span>所学校的教师加入课堂派，在这里管理他们的课堂和资料</p> -->
          <div class="all">
            <div class="onelogos">
              <img src="../img/images/1(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/2(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/3(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/4(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/5(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/6(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/7(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/8(1).png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/9.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/10.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/11.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/12.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/13.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/14.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/15.png" alt="">
            </div>
            <div class="onelogos">
              <img src="../img/images/16.png" alt="">
            </div>
          </div>
        </div>
    </div>
    </div>
    <div class="footer">
      <div class="cWidth">
        <div class="nav-new clearfix">
          <a href="https://www.ketangpai.com/index/abouts.html">关于我们</a>
          <a href="https://www.ketangpai.com/index/contact.html">联系我们</a>
          <a href="https://www.ketangpai.com/index/service.html">服务条款</a>
          <a href="https://www.ketangpai.com/index/older.html" target="_blank">浏览器下载</a>
          <a href="https://www.ketangpai.com/index/updateDynamics">更新动态</a>
        </div>
        <p>Copyright © 2014 ketangpai.com All Rights Reserved. 京ICP备14023276号-4</p>
      </div>
    </div>
    <span style="display: none">
    <img src="../img/images/track_ua.gif">
    </span>
  </div>
</template>

<script>

export default {
}

</script>

<style rel="stylesheet" lang="css">
  @import "../style/homepage.css";
  @import "../style/layer.css";
  @import "../style/main.css";
  @import "../style/style.css";
  @import "../style/swiper.min.css";
  #solutiontop{
    position: relative;
  }
  #solutiontop:hover #solutionul{
    /* height: auto !important; */
    display: block
  }
  #solutionul{
    background: white;
    width: 120px;
    box-shadow: 0px 0px 5px 1px rgba(80,80,80,0.4);
    position: absolute;
    z-index: 20;
    top: 60px;
    left: 0;
    display: none;
  }
  .solutionli a{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    color: #333 !important;
    padding: 0 10px !important;
    height: 40px !important;
    line-height: 40px !important;
  }
  .solutionli{
    height: 40px;
  }
  .slider{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin:auto;
    width: 58%;
    height: 80%;
    padding: 20px 20px 20px 20px;
  }
  .el-carousel__container{
    height: 100%;
  }
  .el-carousel__indicator--horizontal {
    display: inline-block;
    padding: 75px 4px;
  }
</style>
