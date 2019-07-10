<template>
  <div class="proIntegration-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i><span>项目积分信息文本上传</span>
    </div>
    
    <el-form :model="integrationForm" ref="integrationForm" label-width="140px" size="mini">
      <el-form-item label="项目ID " prop="pro_id">
        <el-input v-model="integrationForm.pro_id" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目编号 " prop="pro_num">
        <el-input v-model="integrationForm.pro_num" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目名称 " prop="pro_name">
        <el-input v-model="integrationForm.pro_name" disabled class="inputlength"></el-input>
      </el-form-item>
      <el-form-item label="项目积分文本">
        <el-col :span="8">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="123"
            :auto-upload=false
            :before-upload="beforeUpload"
            :on-change="newhandleChange"
            :on-success="newhandlesuccess"
            :on-exceed="handleExceed"
            :limit="1"
            accept=".csv">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="curTextType" label="0">url参数文本</el-radio>
          <el-radio v-model="curTextType" label="1">会员id文本</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item>
        
        <div>
          <el-col :span="1">
            <div style="font-size:14px;margin-left:-80px;">
              加分类别
            </div>
          </el-col>
          <el-col :span="12">
            <el-radio v-model="addGradeType" label="0">C/S/Q/l状态积分</el-radio>
            <el-radio v-model="addGradeType" label="1" @change="integrationForm.addSQValue=null;integrationForm.addCValue=null">现金发放</el-radio>
            <el-radio v-model="addGradeType" label="2" @change="integrationForm.addSQValue=null;integrationForm.addCValue=null">审核拒绝</el-radio>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item v-show="addGradeType==0" label="未完成会员加分分值 ">
        <el-input v-model="integrationForm.addSQValue"  class="inputlength"></el-input>
      </el-form-item>
      <el-form-item v-show="addGradeType==0" label="完成会员加分分值 ">
        <el-input v-model="integrationForm.addCValue"  class="inputlength"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" @click="submitUpload">上传积分文本并加分</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="download">下载积分文本</el-button>
      </el-form-item>      
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addGradeType:'0',
        curTextType:'0',
        integrationForm: {
          pro_id: '222222',
          pro_num: 'sadasdsad',
          pro_name: 'sdasd',
          add_type: '',
          addSQValue:null,
          addCValue:null,
        },
        fileList:[],
        fileParam:'',
        uploadForm: new FormData(),
      };
    },
    mounted(){
      this.getProject();
    },
    methods:{
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
        console.log(this.fileParam);
      },
      submitUpload(){

        if(!Boolean(this.fileParam)){
          this.$message.error('请选择文件')
          return false
        }
        this.openLoading()
        console.log(this.fileParam);
        console.log(sessionStorage.getItem('id'));
        this.uploadForm.append('file', this.fileParam[0].raw);
        this.uploadForm.append('projectId', sessionStorage.getItem('id'));

        this.uploadForm.append('addGradeType', Number(this.addGradeType));
        this.uploadForm.append('curTextType', Number(this.curTextType));
        this.uploadForm.append('addSQValue', Number(this.integrationForm.addSQValue));
        this.uploadForm.append('addCValue', Number(this.integrationForm.addCValue));


        // console.log(this.uploadForm.get('file'));
        // console.log(this.uploadForm.get('id'));
        console.log(this.uploadForm);


        debugger
        this.axios.post(this.common.getApi() + '/sys/api/projectIntegral/uploadIntegral',this.uploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success){
            this.openLoading().close()
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.integrationForm.addSQValue = ''
            this.integrationForm.addCValue = ''
            this.fileParam = ''
            
          }else{
            if(Boolean(res.data.msg)){
              this.$message.error(res.data.msg);
            }else{
            this.$message.error('文件格式有误，请查看错误日志');
            this.fileList = [];
            this.fileParam = '';
            this.uploadForm = new FormData()
            // var aaaa = "data:text/csv;charset=utf-8,\ufeff" + res.data;
            // var link = document.createElement("a");
            // link.setAttribute("href", aaaa);
            // link.setAttribute("download","错误位置.csv");
            // link.click();

            // const elink = document.createElement('a')//创建一个元素
            // elink.download = '错误日志.csv' //设置文件下载名
            // elink.style.display = 'none' //隐藏元素
            // elink.href = URL.createObjectURL(res.data)//元素添加href
            // document.body.appendChild(elink)//元素放入body中
            // elink.click()//元素点击实现
            // URL.revokeObjectURL(elink.href) // 释放URL 对象
            // document.body.removeChild(elink)

            let a = document.createElement('a');
            let content="\ufeff"+res.data;
            let url = window.URL.createObjectURL(new Blob([content],{type:'text/plain,charset=utf-8'}));
            let filename = '错误日志.csv';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            
            this.integrationForm.addSQValue = ''
            this.integrationForm.addCValue = ''
            this.fileParam = ''
            }
            this.openLoading().close()
          }
        })
      },  
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
            this.integrationForm.pro_id = res.data.obj.id;
            this.integrationForm.pro_name = res.data.obj.projectName;      
            this.integrationForm.pro_num = res.data.obj.projectId;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },       
      download(){
        this.openLoading()
        this.axios({
            url:this.common.getApi() + '/sys/api/projectIntegral/downloadProjectIntegral',
            method:'get',
            params: {
              projectId: Number(sessionStorage.getItem("id"))
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            console.log();
            var fileName = sessionStorage.getItem("id")+'-积分文本.csv'
            const elink = document.createElement('a')//创建一个元素
            elink.download = fileName //设置文件下载名
            elink.style.display = 'none' //隐藏元素
            elink.href = URL.createObjectURL(blob)//元素添加href
            document.body.appendChild(elink)//元素放入body中
            elink.click()//元素点击实现
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
            this.$message.success('下载成功')
            this.openLoading().close()
          })

       // location.href = this.common.getApi() + "/sys/api/projectIntegral/downloadProjectIntegral?projectId="+Number(sessionStorage.getItem("id"));
      },      
    }
  }
</script>

<style>
  .proIntegration-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
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
  .proIntegration-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .proIntegration-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }  
  
  .proIntegration-wrapper .inputlength{
    width: 200px;
  }
</style>