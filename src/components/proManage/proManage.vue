<template>
	<div class="proManage-wrapper">
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="项目类型： " prop="type">
            <el-select v-model="editform.type">
              <el-option label="抽样全导出" value="0"></el-option>
              <el-option label="参加者导出" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <el-form label-width="120px" ref="editform" :model="批次id" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="抽样批次 " prop="type">
            <el-select v-model="editform.type">
              <el-option label="全部" value="0"></el-option>
              <el-option label="已参与" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCy()">取 消</el-button>
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="query-wrapper">
      <el-form :inline="true" :model="formInline" size="mini">
        <el-form-item label="项目id">
          <el-input v-model="formInline.pro_id" placeholder="" size=""></el-input>
        </el-form-item>
        <el-form-item label="项目标题">
          <el-input v-model="formInline.pro_title" placeholder="" size=""></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="formInline.pro_state" size="">
            <el-option label="正在进行" value="0"></el-option>
            <el-option label="已结束" value="1"></el-option>
            <el-option label="等待积分处理" value="2"></el-option>
            <el-option label="暂停" value="3"></el-option>
            <el-option label="尚未开始" value="5"></el-option>
            <el-option label="项目撤销" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="mini" @click="querylist">查询</el-button>
      <el-button type="primary" size="mini" @click="toAdd">增加</el-button>
      <el-button type="primary" size="mini" @click="resetForm">重置</el-button>
    </div>
    <div class="title">
      <i class="el-icon-search"></i><span>项目搜索结果</span><span v-if="pageTotal" style="color:red;font-size:14px;">共{{pageTotal}}条数据</span><span v-else style="color:red;font-size:14px;">共0条数据</span>
    </div>
    <div class="table-wrapper">

      <el-table
        :data="tableData3"
        v-loading="loading"
        border
        :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
        style="width: 100%"
        size="mini">
        <el-table-column
          prop="id"
          width="70"
          label="项目ID">
        </el-table-column>
        <el-table-column
          prop="projectId"
          width="90"
          label="项目编号">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目标题"
          >
        </el-table-column>
        <el-table-column
          prop="projectSampleTotal"
          width="50"
          label="目标样本量">
        </el-table-column>
        <el-table-column
          prop="projectState"
          width="70"
          label="项目状态">
        </el-table-column>
        <el-table-column
          prop="projectPerson"
          width="70"
          label="记录人">
        </el-table-column>
        <el-table-column
          prop="projectIntegral"
          width="50"
          label="项目奖励">
        </el-table-column>
        <el-table-column
          prop="projectPutTime"
          label="发布时间"
          width="90">
        </el-table-column>
        <el-table-column
          prop="projectEndTime"
          label="结束时间"
          width="90">
        </el-table-column>
        <el-table-column
          prop="sampleNumber"
          width="50"
          label="抽样人数">
        </el-table-column>
        <el-table-column
          prop="projectJoinNum"
          width="50"
          label="已参与数">
        </el-table-column>
        <el-table-column
          prop="finishNum"
          width="50"
          label="完成量">
        </el-table-column>
        <el-table-column
          prop="projectSendTotalScore"
          width="80"
          label="项目总发放积分">
        </el-table-column>
        
        <el-table-column
          label="操作"
          width="190"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button @click="" type="text" size="small" @click="toStat(scope.row)">进度</el-button>
            <el-button @click="" type="text" size="small" @click="toParam(scope.row)">参数</el-button>
            <el-button @click="" type="text" size="small" @click="toSample(scope.row)">抽样</el-button>
            <el-button @click="" type="text" size="small" @click="toSampleRecord(scope.row)">抽样记录</el-button>
            <el-button @click="" type="text" size="small" @click="toIntegration(scope.row)">积分添加</el-button>
            <el-button @click="" type="text" size="small" @click="showdialog(scope.row)">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size="pageSize"
        @current-change="go">
      </el-pagination>
    </div>
	</div>
</template>

<script>
  export default {
  name: 'slider',
  data(){
    return {
      total:null,
      loading:true,
      formInline: {
        pro_id: null,
        pro_title: null,
        pro_state:null,
      },
      pageTotal:0,
      pageIndex: 1,
      pageSize:20,
      tableData3:[],
      dialogVisible:false,
      editform:{
        id: null,
        type:null
      },
      rules: {
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' },
        ],
      },
    }
  },
  mounted(){

    if ( Boolean(sessionStorage.getItem('formInline'))) {
        this.formInline = JSON.parse(sessionStorage.getItem('formInline'))
        debugger
        this.getList(this.pageIndex,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
      }else{
        this.getList(this.pageIndex,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
      }
    
  },
  beforeDestroy() {
    sessionStorage.setItem('formInline',JSON.stringify(this.formInline))
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
        return loading;
      },
    closeCy(){
      this.editform.type = ''
      this.dialogVisible = false
    },
    resetForm(){
      this.formInline.pro_id = null;
      this.formInline.pro_title = null;
      this.formInline.pro_state = null;
    },
    toAdd(){
      this.$router.push({ path: 'proAdd'})
    },
    toEdit(row){
      console.log(row.id)
      sessionStorage.setItem('id',row.id);
//    this.$router.push({ path: 'proEdit',query:{id:row.id}})
      this.$router.push({ path: 'proEdit' })
    },
    toParam(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proParameter'})
    },
    toSample(row){
      console.log(row);
      if(row.projectState === '正在进行'){
        sessionStorage.setItem('id',row.id);
        this.$router.push({ path: 'proSample'})
      }else{
        this.$message.error('请确认项目状态是否正在进行')
      }
      
    },
    toSampleRecord(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'sampleRecord'})
    },
    toStat(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proStatistics'})
    },
    toIntegration(row){
      sessionStorage.setItem('id',row.id);
      this.$router.push({ path: 'proIntegration'})
    },
    onSubmit() {
      console.log('submit!');
    },
    getList(pageIndex,pageSize,id,projectName,projectState){
      this.loading = true
      this.axios.get(this.common.getApi() + '/sys/api/project/getList',{
        params:{
          pageIndex: pageIndex,
          pageSize: pageSize,
          params:{
            projectId: id,
            projectName: projectName,
            projectState: projectState
          }
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.tableData3 = res.data.obj.list;
        this.total = res.data.obj.list.length
        for(var i = 0;i < this.tableData3.length;i++){
          if(this.tableData3[i].projectState == 0){
            this.tableData3[i].projectState = '正在进行'
          }else if(this.tableData3[i].projectState == 1){
            this.tableData3[i].projectState = '已结束'
          }else if(this.tableData3[i].projectState == 2){
            this.tableData3[i].projectState = '等待积分处理'
          }else if(this.tableData3[i].projectState == 3){
            this.tableData3[i].projectState = '暂停'
          }else if(this.tableData3[i].projectState == 5){
            this.tableData3[i].projectState = '尚未开始'
          }else if(this.tableData3[i].projectState == 6){
            this.tableData3[i].projectState = '项目撤销'
          }
        }
        this.pageTotal = res.data.obj.pager.total;
        console.log(this.pageTotal);
        this.loading =false
      })
    },
    go(currentPage){
      this.getList(currentPage,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
    },
    querylist(){
      this.getList(this.pageIndex,this.pageSize,this.formInline.pro_id,this.formInline.pro_title,this.formInline.pro_state);
    },
    showdialog(row){
      this.dialogVisible = true;
      this.editform.id = row.id;
    },
    submitForm(formName){
      
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.openLoading()
          this.axios({
            url:this.common.getApi() + '/sys/api/project/downloadSample',
            method:'get',
            params: {
              id: Number(this.editform.id),
              type: Number(this.editform.type)
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            console.log();
              var fileName = ''
            if(that.editform.type === '0'){
               fileName = this.editform.id+'-抽样全导出.csv'
            }else{
             fileName = this.editform.id+'-参加者导出.csv'
            }

            

            const elink = document.createElement('a')//创建一个元素
            elink.download = fileName //设置文件下载名
            elink.style.display = 'none' //隐藏元素
            elink.href = URL.createObjectURL(blob)//元素添加href
            document.body.appendChild(elink)//元素放入body中
            elink.click()//元素点击实现
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
            this.openLoading().close()
            this.editform.type = ''
            this.dialogVisible = false
            this.$message.success('导出成功')
          })
        }
      })
    },
    downloadSample(){
//    this.axios({
//      url:this.common.getApi() + '/sys/api/member/downloadMember',
//      method:'get',
//      params: {
//        id: this.editform.id,
//        type: this.editform.type
//      },
//      responseType: 'blob',
//    }).then((res) => {
//      let data = res.data
//      const blob = data
//      const fileName = '会员信息.csv'
//      const elink = document.createElement('a')
//      elink.download = fileName
//      elink.style.display = 'none'
//      elink.href = URL.createObjectURL(blob)
//      document.body.appendChild(elink)
//      elink.click()
//      URL.revokeObjectURL(elink.href) // 释放URL 对象
//      document.body.removeChild(elink)
//    })
    }
  }
}
</script>

<style>
  .proManage-wrapper .query-wrapper{
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .proManage-wrapper .el-button+.el-button {
     margin-left: 0px;
  }

  .proManage-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
  .proManage-wrapper .el-table--mini td, .el-table--mini th {
    padding:0;
}
  .proManage-wrapper .el-button--small{
    padding: 5px 5px;
  }
  .proManage-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }

  .proManage-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .proManage-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
</style>