<template>
  <div class="header">
    <!-- 折叠图片 -->
    <div class="collapse-btn" @click="collapseChange">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">music后台管理</div>
    <div class="header-right">
      <!-- 切换全屏 -->
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!-- 头像 -->
      <div class="user-avatar">
        <img src="../assets/img/user.jpg" alt="">
      </div>
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}
           <!-- 向下箭头 -->
        <i class="el-icon-caret-bottom"></i>
        </span>
        <!-- 下拉列表 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/bus'
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false
    }
  },
  computed:{
    userName(){
      return localStorage.getItem('userName');
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChange() {
      this.collapse = !this.collapse;
      // 发送信息
      bus.$emit('collapse', this.collapse);
    },
    // 切换全屏
    handleFullScreen() {
      if(this.fullscreen){
        if(document.exitFullscreen){
          document.exitFullscreen();
        }else if(document.webkitCancelFullScreen){//safari chorome
          document.webkitCancelFullScreen();
        }else if(document.mozCancelFullScreen){ //firefox
          document.mozCancelFullScreen();
        }else if(document.msExitFullScreen){ //ie
          document.msExitFullScreen();
        }
      }else{
        let element = document.documentElement;
        if(element.requestFullscreen){
          element.requestFullscreen();
        }else if(element.webkitRequestFullScreen){ //safari chorome
          element.webkitRequestFullScreen();
        }else if(element.mozRequestFuulScreen){ //firefox
          element.mozRequestFuulScreen();
        }else if(element.msRequestFullScreen){ //ie
          element.msRequestFullScreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleCommand(command){
      if(command=='logout'){
        localStorage.removeItem('userName');
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
.header {
  /* 相对位置 */
  position: relative;
  background-color: #253041;
  /* 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的
  需要在header内设置其它元素的边框和内边距的值都包含在width内;
  */
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  /* cursor属性定义了鼠标指针放在一个元素边界范围内时所用的光标形状
  光标呈现为指示链接的指针（一只手） */
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  position: relative;
  float: left;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  margin-right: 5px;
  font-size: 24px;
  transform: rotate(45deg);
}
.user-avatar{
  margin-left: 20px;
}
.user-avatar img{
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name{
  margin-left: 10px;
}
.el-dropdown-link{
  color: #ffffff;
  cursor: pointer;
}
</style>