<template>
<div>
  <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer"
           v-loading="loading"
           element-loading-text="正在加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">

    <h3 class="loginTitle">登录系统</h3>
    <el-form-item prop="username">
      <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password"  auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item style="clear: both" prop="code">
      <el-input type="text"  auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px;float: left"></el-input>
      <img :src="captchaUrl" alt="" @click="updateCaptcha">
    </el-form-item>

    <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
    <el-button type="primary" style="width: 100%" @click="loginClick">登录</el-button>
  </el-form>

</div>
</template>

<script>
// import {postRequest} from "@/utils/api";

export default {
  name: "Login",
  data(){
    return {
      captchaUrl:'/captcha?time='+new Date(),
      checked:true,
      loading:false,
      loginForm:{
        username:'admin',
        password:'123',
        code:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      }

    }
  },
  methods:{
    // 更换验证码
    updateCaptcha(){
      this.captchaUrl = '/captcha?time='+new Date()
    },
    loginClick(){
      // alert('111')

      this.$router.replace('/home')

     /* this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          // this.loading = true
           // this.postRequest

          postRequest('/login',this.loginForm).then(resp=>{
            // alert(JSON.stringify(resp))
            if (resp){
            //  this.loading = false
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              // 存储token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              // 不可回退
              this.$router.replace('/home')
            }
          })
        } else {
         //  this.loading = false
          // console.log('error submit!!');
          this.$message.error('请输入所有字段')
          return false;
        }
      });*/
    }
  }
}
</script>

<style scoped>

.loginContainer{


  width: 350px;
  margin: 180px auto;
  padding: 15px 35px 15px 35px;

  background-color: #fff;
  border: 1px solid #ccc;

  border-radius: 15px;
  background-clip: padding-box;

  box-shadow: 0 0 25px #cac6c6;

}

.loginTitle{
  margin: 0px auto 20px auto;
  text-align: center;
}

.loginRemember{
  float: left;
  margin-bottom: 25px
}
</style>
