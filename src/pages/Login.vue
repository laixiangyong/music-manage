<template>
  <div class="login-wrap">
    <div class="ms-title">music后台登录</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>

        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mixin } from '../mixins/index';
import {getLoginStatus} from '../api/index';
export default {
  mixins:[mixin],
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods:{
    submitForm(){
      let params = new URLSearchParams();
      params.append('name',this.ruleForm.username);
      params.append('password',this.ruleForm.password);
      getLoginStatus(params)
      .then((res)=>{
        if(res.code==1){
          localStorage.setItem('userName',this.ruleForm.username)
          this.$router.push('/Info');
          this.notify('登录成功','success');
        }else{
          this.notify('登录失败','error')
        }
      })
    }
  }
}
</script>
<style scoped>
.login-wrap {
  position: relative;
  /*相对定位*/
  background: url('../assets/img/background.jpg');
  /* 设置背景图像是否固定或者随着页面的其余部分滚动。 */
  background-attachment: fixed;
  /* 指定背景图像位置 */
  background-position: center;
  /* 设置背景图片大小 */
  background-size: cover;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  /*绝对定位*/
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}</style>