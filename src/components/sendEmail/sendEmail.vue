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

    },
    methods: {
      submitForm(formName) {

        if(this.email=='' || this.title == '' || this.taskName == '' ){
            this.$message({
            message: '请完善邮件信息',
            type: 'warning'
          })
            return
        }





        // let para = {
        //   id : Number(sessionStorage.getItem('id')),
        //   title : this.title,
        //   content : this.email,
        //   taskName : this.taskName,
        //   emailType : true
        // }
        // console.log(para)


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
                    message: '添加成功'
                  })
                }else{
                  this.$message.error(res.data.msg)
                  console.log(res.data)
                }
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
</style>