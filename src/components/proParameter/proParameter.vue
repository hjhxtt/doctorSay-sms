<template>
  <div class="proParameter-wrapper">
    <el-form ref="form" :model="form" label-width="170px" size="mini" label-position="left">
      <el-form-item label="文件格式">
        TXT格式-参数随机
      </el-form-item>
      <el-form-item label="项目id">
        <el-input v-model="form.pro_id" class="inputlength" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.pro_name" class="inputlength" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目参数文本">
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
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="download">下载参数文本</el-button>
      </el-form-item>
      <el-form-item style="margin-left:170px;">
        
        <template slot="label">
          <el-select  v-model="form.choose_param">
            <el-option label="删除未使用的参数" value="0"></el-option>
            <el-option label="删除全部参数" value="1"></el-option>
          </el-select>
        </template>
        <el-button type="primary" @click="deleteParam">删除参数文本</el-button>
      </el-form-item>
      <el-form-item style="margin-left:170px;">
        <template slot="label">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入要删除的手机号以英文逗号分隔"
            v-model="telArr">
          </el-input>
        </template>
      </el-form-item >
      <el-button style="margin-left:170px;" type="primary" @click="deleteTel()">删除参与记录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          pro_id: '',
          pro_name: '',
          choose_param: null,
        },
        fileList:[],
        fileParam:'',
        uploadForm: new FormData(),
        telArr:'',

      }
    },
    mounted(){
      this.getProject();
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
        return loading;
      },
      deleteTel(){

          if(this.telArr==''){
            this.$message.error('请输入要删除的手机号以英文逗号分隔');
            return
          }
          this.axios.get(this.common.getApi() + '/sys/api/projectPara/deleteUsedPara',{
            params:{
              params:{
                id: Number(sessionStorage.getItem("id")),
                mobile: this.telArr
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            console.log(res)
            if(res.data.success){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }else{
              this.$message.error(res.data.msg);
            }
          })
      },
      onSubmit() {
        console.log('submit!');
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
        this.uploadForm.append('id', sessionStorage.getItem('id'));
        console.log(this.uploadForm.get('file'));
        console.log(this.uploadForm.get('id'));
        this.axios.post(this.common.getApi() + '/sys/api/projectPara/uploadParam',this.uploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          if(Boolean(res.data.success)){

            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.uploadForm=''
            this.openLoading().close()
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

              let a = document.createElement('a');
              let content="\ufeff"+res.data;
              let url = window.URL.createObjectURL(new Blob([content],{type:'text/plain,charset=utf-8'}));
              let filename = '错误日志.csv';
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
            }

            
            
            this.uploadForm=''
            this.openLoading().close()
          }
        })
      },
      deleteParam(){
        if(this.form.choose_param==null){
          this.$message.error('请选择删除对象');
          return
        }
        this.openLoading()
        this.axios.get(this.common.getApi() + '/sys/api/projectPara/deletePara',{
          params:{
            params:{
              id: Number(sessionStorage.getItem("id")),
              state: this.form.choose_param
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          console.log(res)
          if(res.data.success){
            this.openLoading().close()
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      download(){
        //todo
        this.openLoading()
        this.axios({
            url:this.common.getApi() + '/sys/api/projectPara/downloadParam',
            method:'get',
            params: {
              id: this.form.pro_id
            },
            responseType: 'blob',
          }).then((res) => {
            
            let data = res.data
            const blob = data
            console.log();
            var fileName = this.form.pro_id+'-参数.csv'
            const elink = document.createElement('a')//创建一个元素
            elink.download = fileName //设置文件下载名
            elink.style.display = 'none' //隐藏元素
            elink.href = URL.createObjectURL(blob)//元素添加href
            document.body.appendChild(elink)//元素放入body中
            elink.click()//元素点击实现
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
            this.openLoading().close()
            this.$message.success('下载成功')
          })


        // location.href = this.common.getApi() + "/sys/api/projectPara/downloadParam/?id="+this.form.pro_id;
        // debugger

      },
      getProject(){
        this.axios.get(this.common.getApi() + '/sys/api/project/getProject',{
          params: {
            params:{
              id: Number(sessionStorage.getItem("id"))
//            id: Number(this.$route.query.id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            console.log(res.data.obj);
            this.form.pro_id = res.data.obj.id;
            this.form.pro_name = res.data.obj.projectName;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
    }
  }
</script>

<style>
  .proParameter-wrapper .inputlength{
    width: 200px;
  }
.el-loading-spinner i {
    color: #009999;
    font-weight:700;
}
.el-loading-spinner .el-loading-text {
    color: #009999;
    font-weight:700;
}
  .proParameter-wrapper .upload-demo{
    width: 30%;
  }
  .el-loading-spinner {
    top: 25%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
  .proParameter-wrapper .el-textarea__inner{
    height: 150px !important;
    width: 380px;
  }
  .el-input.is-disabled .el-input__inner{
    color:#666;
  }
  .el-input__inner::placeholder{
    color:#666;
  }
  .el-textarea__inner::placeholder{
    color:#666;
  }
</style>