<template>
  <div class="pro-wrapper">
    <el-form   ref="ruleForm" label-width="120px" size="mini" >
      <el-form-item label="本次任务名称">
        <el-input v-model="taskName" class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="加入测试手机号">
        <el-input v-model="testTel" class="inputlength" placeholder="多个手机号请用英文逗号隔开"></el-input>
      </el-form-item>
      <el-form-item label="发送时间">
        <div class="block">
          <el-date-picker
            v-model="sendTime"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions"
            >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="短信内容"  >
        <el-col :span="12">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="message">
          </el-input>
        </el-col>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" >发送</el-button>
        <el-button type="primary" @click="$router.push('/sampleRecord')" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message:'',
        testTel:'',
        sendTime:'',
        taskName:'',
        pickerOptions: {
         disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
         }
       }
      };
    },
    mounted(){

    },
    methods: {
      submitForm(formName) {

      function checkTime(i){
       if (i<10){
           i="0" + i
       }
       return i;
    }
    var date = new Date(this.sendTime);
    // var date_value=String(date.getFullYear())  + String((date.getMonth() + 1))  + String(date.getDate())  + String(checkTime(date.getHours()))  + String(checkTime(date.getMinutes()))  + String(checkTime(date.getSeconds()));
    var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
    //最后显示yyyy-MM-dd hh:mm:ss
    console.log(date_value);

        if(this.message=='' || this.testTel == '' || this.sendTime == '' || this.taskName == ''){
            this.$message({
            message: '请完善邮件信息',
            type: 'warning'
          })
            return
        }


        let para = {
          id : Number(sessionStorage.getItem('nweid')),
          testMobile : this.testTel,
          sendTime : date_value,
          content : this.message,
          taskName : this.taskName
        }
        console.log(para)
         this.axios.post(this.common.getApi() + '/sys/api/projectSample/sendBatchSmsMessage',{
                params:para
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
              })
      }
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