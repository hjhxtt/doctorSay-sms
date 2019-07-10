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
         <el-button type="primary" @click="reset" >重置</el-button>
      </el-form-item>
    </el-form>
     <div style="font-size:14px;margin-left:120px;line-height:26px;color:red;">
    %1%--------项目数字编号<br>
    %2%--------会员手机号<br>
    %3%--------项目编号<br>
    %4%--------项目名称<br>
    %5%--------项目时长<br>
    %6%--------会员姓名<br>
    %7%--------会员密码  <br>
      </div>
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
      reset(){
        this.message=''
        this.testTel=''
        this.sendTime=''
        this.taskName=''
      },
      submitForm(formName) {

      function checkTime(i){
              if (i<10){
                  i="0" + i
              }
              return i;
            }



     
    
        

                var date = new Date(this.sendTime);

              function pad2(n) { return n < 10 ? '0' + n : n }

                var date = new Date(this.sendTime);
                var data1 = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());

              console.log(data1);
              
        
    


          // var date_value=String(date.getFullYear())  + String((date.getMonth() + 1))  + String(date.getDate())  + String(checkTime(date.getHours()))  + String(checkTime(date.getMinutes()))  + String(checkTime(date.getSeconds()));
          //var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
          //最后显示yyyy-MM-dd hh:mm:ss

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
          sendTime : data1,
          content : this.message,
          taskName : this.taskName
        }
        console.log(para)
        this.openLoading()
         this.axios.post(this.common.getApi() + '/sys/api/projectSample/sendBatchSmsMessage',{
                params:para
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '发送成功'
                  })
                }else{
                  this.$message.error(res.data.msg)
                  console.log(res.data)
                }
                this.openLoading().close()
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