<template>
  <div class="sampleRecord-wrapper">
    <div class="title">
      <i class="el-icon-edit"></i>
      <span>项目抽样记录</span>抽样总人数 {{cy_number}}
      <p style="float:right;" > <span style="font-size:14px;">项目id：{{pro_id}}</span><span style="font-size:14px;margin-right:20px;">项目名称：{{pro_name}}</span></p>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="sampleTime"
        width="160"
        label="抽样时间">
      </el-table-column>
      <!--<el-table-column
        prop="samplename"
        label="抽样名称">
      </el-table-column>-->
      <el-table-column
        prop="sampleContent"
        label="抽样条件">
      </el-table-column>
      <el-table-column
        prop="sampleNumber"
        label="抽样人数"
        width="80"
        >
      </el-table-column>
      <el-table-column
        prop="sampleno"
        label="批次"
        width="80"
        >
      </el-table-column>
      <el-table-column
        prop="smsno"
        label="短信次数"
        width="80"
        >
      </el-table-column>
      <el-table-column
        prop="emailno"
        label="邮件次数"
        width="80"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        width="160"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="sendEmail(scope.$index,scope.row)">发送邮件</el-button>
          <el-button type="text" size="small" @click="sendMessage(scope.$index,scope.row)">发送短信</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.getSampleRecord();
      this.getSampleTotal();
      this.getProject()
    },
    data() {
      return {
        pro_id:'',
        pro_name:'',
      }
    },
    methods: {
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
            this.pro_id = res.data.obj.id;
            this.pro_name = res.data.obj.projectName;
            
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      sendEmail(index,data){
        //console.log(sessionStorage)
        console.log(this.tableData)
        console.log(this.tableData[index].id)
        let id = this.tableData[index].id //todd 批次id到底是什么
        sessionStorage.setItem('nweid',id);
        this.$router.push({ path: 'sendEmail'})

      },
      sendMessage(index,data){
        let id = this.tableData[index].id //todd 批次id到底是什么
        sessionStorage.setItem('nweid',id);
        this.$router.push({ path: 'sendMessage'})
      },
      getSampleTotal(){
        this.axios.get(this.common.getApi() + '/sys/api/projectSample/getSampleTotal',{
          params:{
            params:{
              projectId: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.cy_number = res.data.obj;

          }else{
            this.$message.error(res.data.msg);
          }
        })
      },

      getSampleRecord(index, rows){
        this.axios.get(this.common.getApi() + '/sys/api/projectSample/getSampleRecord',{
          params:{
            params:{
              projectId: Number(sessionStorage.getItem("id"))
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.tableData = res.data.obj.list;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
    },

    data() {
      return {
        tableData: [],
        cy_number:''
      }
    }
  }
</script>

<style>
  .sampleRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }

  .sampleRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .sampleRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
  .sampleRecord-wrapper .el-table td{
    padding: 5px 0;
  }
</style>