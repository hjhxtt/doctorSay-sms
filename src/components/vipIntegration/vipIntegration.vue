<template>
  <div class="vipIntegration-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i><span>积分文本上传</span>
    </div>
    <el-form ref="integrationForm" label-width="150px" size="mini">
      <el-form-item label="积分参数文本：">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="123"
          :auto-upload=false
          :on-change="newhandleChange"
          :on-success="newhandlesuccess"
          :on-exceed="handleExceed"
          :limit="1"
          accept=".csv">
          <el-button size="small" type="success">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitUpload">上传积分文本</el-button>
      </el-form-item>
    </el-form>
    <div class="intr-txt">
      <p>上传参数文本说明：上传的文本需是.csv格式的文件，上传的参数必须统一为会员数字ID或者会员手机号</p>
      <p>1.每个参数文本可包含N条参数；</p>
      <p>2.每条参数应包含3种数据，会员ID（需要统一数字ID或者会员手机号），分值，积分明细；</p>
      <p>3.积分明细中，如果出现标点符号，必须是中文状态下的标点符号，否则会出错。</p>
      <p>4.参数文本实例：<span style="color: red;font-weight: bold;">(注意：如果写的是负分，那么就是扣除积分)</span></p>
      <div style="margin-left: 40px;">
        <p style="color: #000000;">15365095178，30，8月份推荐10名医生系统奖励30积分,</p>
        <p style="color: #000000;">15365095178，10，参与活动系统奖励10积分,</p>
        <p style="color: #000000;">15365095178，20，参与论坛系统奖励20积分,</p>
      </div>
      <p>请注意以上红色文字标注！</p>
    </div>
    <!--:auto-upload=false
    :before-upload="beforeUpload"
    :on-change="newhandleChange"
    :on-success="newhandlesuccess"
    :on-exceed="handleExceed"-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      menberData:[{idnum:'',type:'',}],
      centerDialogVisible: false,
        fileParam:'',
        uploadForm: new FormData(),
        fileList:[]
    }
  },
  methods:{
      handleExceed(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload(file){

      },
      newhandlesuccess(file){
        console.log(file);
      },
      newhandleChange(response,file,filelist){
        this.fileParam = file;
        this.fileName = file[0].name
      },
      submitUpload(){
        if(this.fileParam === ''){
          this.$message.error('积分文本不能为空')
          return false
        }
        this.uploadForm.append('file', this.fileParam[0].raw);
        var that = this
        this.axios.post(this.common.getApi() + '/sys/api/memberintegral/uploadIntegral',this.uploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success){
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.fileList = [];
            this.fileParam = '';
            this.uploadForm = new FormData()
            this.$refs.upload.clear()
          }else{
             this.$message({
                showClose: true,
                message: '上传文件有误，请查看错误信息',
                type: 'error',
                duration:0
              });
            // this.$message.error(res.data.msg);
            let a = document.createElement('a');
            let content="\ufeff"+res.data;
            let url = window.URL.createObjectURL(new Blob([content],{type:'text/plain,charset=utf-8'}));
            debugger
            let filename = that.fileName.slice(0,that.fileName.indexOf('.'))+'_error.csv';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            
          }
        })
      },
  }
}
</script>

<style>
  .vipIntegration-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }

  .vipIntegration-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .vipIntegration-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }

  .vipIntegration-wrapper .intr-txt{
    font-size: 14px;
    line-height: 15px;
    margin-top: 40px;
    padding-left: 40px;
  }

  .vipIntegration-wrapper .intr-txt p{
    color: blue;
  }
  .vipIntegration-wrapper  .el-upload-list{
    width: 240px;
  }
</style>