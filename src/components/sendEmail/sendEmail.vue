<template>
  <div class="pro-wrapper">
    <el-form   ref="ruleForm" label-width="120px" size="mini" >
      <el-form-item label="本次任务名称" prop="title">
        <el-input v-model="taskName" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="邮件标题" prop="title">
        <el-input v-model="title" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="邮件内容" prop="email">
        <quill-editor ref="myTextEditor" v-model="email"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">发送</el-button>
        <el-button type="primary" @click="$router.push('/sampleRecord')" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email:'',
        title:'',
        taskName:'',
      };
    },
    mounted(){
      this.getProject()
    },
    methods: {
      getProject(){
        this.axios.get(this.common.getApi() + '/sys/api/project/getProject',{
          params: {
            params:{
              id: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
           this.title = res.data.obj.mailtitle
            this.email = res.data.obj.projectMailMessage
            

            
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      openLoading() {
        const loading = this.$loading({           // 声明一个loading对象
          lock: true,                             // 是否锁屏
          text: '',                     // 加载动画的文字
          spinner: 'el-icon-loading',             // 引入的loading图标
          background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
          target: '.sub-main',                    // 需要遮罩的区域
          body: true,                              
          customClass: 'mask'                     // 遮罩层新增类名
        })
        setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
          loading.close();                        // 关闭遮罩层
        },10000)
        return loading;
      },
      submitForm(formName) {

        if(this.email=='' || this.title == '' || this.taskName == '' ){
            this.$message({
            message: '请完善邮件信息',
            type: 'warning'
          })
            return
        }





        this.openLoading()
        this.axios.post(this.common.getApi() + '/sys/api/projectSample/sendBatchEmail',{
                params:{
                  id : Number(sessionStorage.getItem('nweid')),
                  title : this.title,
                  content : this.email,
                  taskName : this.taskName,
                  emailType : true
                }
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '邮件发送成功'
                  })
                }else{
                  this.$message.error(res.data.msg)
                  console.log(res.data)
                }
                this.openLoading().close()
              }).catch(function(err){
                console.log(err);
              })

      },
    }
  }
</script>

<style>
  .pro-wrapper .inputlength{
    width: 200px;
  }

  .pro-wrapper .el-form-item--mini .el-form-item__content{
    /*display: flex;*/

  }

  .pro-wrapper .quill-editor{
    width: 70%;
  }

  .pro-wrapper .quill-editor .ql-container{
    height: 200px;
  }
   .el-loading-spinner i {
    color: #009999;
    font-weight:700;
}
.el-loading-spinner .el-loading-text {
    color: #009999;
    font-weight:700;
}
   .el-loading-spinner {
    top: 25%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
</style>