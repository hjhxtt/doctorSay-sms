<template>
    <div class="register_bg">
        <div class="register_box">
            <span class="dl">后台管理系统登录</span>
            <el-form :model="userInfo" status-icon :rules="rules2" ref="userInfo" label-width="100px" class="demo-ruleForm">
              <el-form-item  prop="userName">
                <el-input type="text" v-model="userInfo.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item  prop="password" >
                <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="big" @click="login()" class="submit">提交</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.userInfo.checkPass !== '') {
            this.$refs.userInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        userInfo: {
          userName: '',
          password: '',
        },
        rules2: {
          userName: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login(){
            
            if(this.userInfo.userName=='' || this.userInfo.password==''){
              this.$message.error('请输入用户名和密码')
              return false
            }

            var params = {
                userName:this.userInfo.userName,
                password : this.userInfo.password
            }
            console.log(params);
            
            this.axios.post(this.common.getApi() + '/sys/api/auth/login',{params:params}).then((res) => {
            if(res.data.success){
                console.log(res.data);
                
                this.$message.success(res.data.msg);
                localStorage.setItem('isLogin',true)
                if(Boolean(this.$route.params.redirect)){//有传路由则跳转到之前的路由，否者跳转主页
                    this.$router.push(this.$route.params.redirect)
                }else{
                    this.$router.push('/')
                }
            }else{
              this.$message.error(res.data.msg);
            }
          })
      },
      submitForm(formName) {
        //写死的账号密码
        if(this.userInfo.userName !=='root' || this.userInfo.password !=='root'){
          this.$message.error('用户名或密码有误，请重新输入')
          return false
        }
      },
    }
  }
</script>
<style scoped>
    .register_bg{
        width: 100%;
        height: 100%;
        background: url(../../assets/bg.jpg) no-repeat center;
        background-size: cover;
    }
    .el-form-item{
        margin-bottom: 30px;
    }
    .el-input__inner{
        height: 50px;
        line-height: 50px;
    }
    .register_box{
        background:rgba(255,255,255,.8);
        width: 260px;
        border-radius:10px;
        padding:30px 50px;
        position:fixed;
        right:10vw;
        bottom: 30vh;
    }
    .submit{
        width: 100%;
    }
    .line{
        margin-top: 30px;
        width: 100%;
        border-bottom: 2px dashed #fff;
        position:absolute;

    }
    .register_box span.dl{
      font-size:24px;
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-bottom: 40px;
      font-weight: 700;
    }
</style>
<style type="text/css">

    .el-form-item__content{
      margin-left: 0 !important;
    }

</style>