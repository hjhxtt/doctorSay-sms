<template>
  <div class="vipIntegrationRecord-wrapper">
    <div class="title">
      <span>活跃度管理</span>
      <!-- <p style="float:right;" > <span style="font-size:14px;">用户id：{{id}}</span><span style="font-size:14px;margin-right:0px;">用户名：{{name}}</span></p> -->
    </div>
    <!-- <div style="margin-bottom: 15px;padding-left:20px ;">总获得积分：{{total}},总兑换积分：{{exchangeTotal}},当前积分：{{now}}</div> -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="integralrecordid"
        label="活跃度">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="下限（%）">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="上限（%）">
      </el-table-column>
      
      <el-table-column
        prop="integralrecordmsg"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="search" style="margin-top:20px;">
      最近 <el-input type="number" v-model="mounth" placeholder="单行输入" style="width:120px;margin:0 8px;" :disabled="disabled"></el-input>月内 <el-button type="primary" style="margin-left:40px;" @click="handleMounth">{{handleText}}</el-button>
    </div>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="400px"
      center>
      <el-item>
        <el-form label-position="left" label-width="120px" :model="formEdit">
          <el-form-item label="活跃度类型">
            {{formEdit.type}}
          </el-form-item>
          <el-form-item label="下限（%）">
            <el-input v-model="formEdit.low"></el-input>
          </el-form-item>
          <el-form-item label="上限（%）">
            <el-input v-model="formEdit.heigh"></el-input>
          </el-form-item>
        </el-form>
      </el-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
  name: 'slider',
  data(){
    return {
      centerDialogVisible:false,
      handleText:'编辑',
      disabled:true,
      mounth:null,
      pageTotal:0,
      pageIndex: 1,
      pageSize:20,
      tableData:[],
      id:'',
      name:'',
      total:'',
      exchangeTotal:'',
      now:'',
      formEdit: {
        low: '',
        heigh: '',
        type: '忠诚'
      }
    }
  },
  mounted(){
    this.getMemberIngretalRecord(this.pageIndex,this.pageSize)
  },
  methods:{
    handleMounth(){
      if(this.handleText === "编辑"){
        this.disabled = false
        this.handleText = "保存"
      }else{
        this.disabled = true
        this.handleText = "编辑"
      }
    },
    edit(){
      this.centerDialogVisible = true
    },
    getMemberIngretalRecord(pageIndex,pageSize){
      this.axios.get(this.common.getApi() + '/sys/api/member/getMemberIngretalRecord',{
        params:{
          pageIndex: pageIndex,
          pageSize: pageSize,
          params:{
            id: Number(sessionStorage.getItem('userid'))
          }
        }
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {

          var resu = res.data.obj.list

          resu.sort((a,b) => {
            return a.integralrecordtime > b.integralrecordtime ? -1 : 1;
          })

          console.log(resu);


        this.tableData = resu;
        this.pageTotal = res.data.obj.pager.total;
      })
    },
  }
}
</script>

<style>
  .vipIntegrationRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }

  .vipIntegrationRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .vipIntegrationRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }

  .vipIntegrationRecord-wrapper .el-pagination{
    text-align: center;
    margin-top: 2%;
  }
</style>