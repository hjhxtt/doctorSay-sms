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
        prop="label"
        label="活跃度">
      </el-table-column>
      <el-table-column
        prop="min"
        label="下限（%）">
      </el-table-column>
      <el-table-column
        prop="max"
        label="上限（%）">
      </el-table-column>
      
      <el-table-column
        prop="integralrecordmsg"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="search" style="margin-top:20px;">
      最近 <el-input type="number" v-model="mounth" placeholder="单行输入" style="width:120px;margin:0 8px;" :disabled="disabled"></el-input>月内 
      <el-button type="primary" style="margin-left:40px;" @click="handleMounth">{{handleText}}</el-button>
      <el-button type="primary" style="margin-left:40px;" @click="setFizz" >更新活跃度</el-button>
    </div>
    
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="400px"
      center>
        <el-form label-position="left" label-width="120px" :model="form">
          <el-form-item label="活跃度类型">
            {{form.label}}
          </el-form-item>
          <el-form-item label="下限（%）">
            <el-input v-model="form.min"></el-input>
          </el-form-item>
          <el-form-item label="上限（%）">
            <el-input v-model="form.max"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
      form: {
        id: null,
        label: null,
        max: null,
        min: null,
        sysid: null,
        sysname: null
      }
    }
  },
  mounted(){
    this.getActivity()
  },
  methods:{
    setFizz(){
      const loading = this.$loading({
          lock: true,
          text: '活跃度更新中。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      this.axios({
        url:this.common.getApi() + '/sys/api/systemmaster/setFizz',
        method:'post',
      }).then((res) => {
        if(res.data.success){
          loading.close()
          this.$message.success('更新成功')
        }else{
          loading.close()
          this.$message.error(res.data.msg)
        }
      })
    },
    submit(){
      if(Number(this.form.min) > Number(this.form.max)){
        this.$message.error('上限必须大于下限')
        return false
      }

      var jsonStr = {
        sysid:this.form.sysid,//修改的时候固定传值
        id:this.form.id,
        sysname:this.form.min+'-'+this.form.max,
        label:this.form.label
      }
      var params = new URLSearchParams()
      params.append('jsonStr',JSON.stringify(jsonStr))
      this.axios({
          url:this.common.getApi() + '/sys/api/systemmaster/editActivity',
          method:'post',
          params:params
        }).then((res) => {
          if(res.data.success){
            this.$message.success('编辑成功')
            this.centerDialogVisible = false
            this.getActivity()
          }else{
            this.$message.error(res.data.msg)
          }
        })
      
    },
    handleMounth(){
      if(this.handleText === "编辑"){
        this.disabled = false
        this.handleText = "保存"

      }else{
        if(this.mounth<0 || this.mounth>24){
          this.$message.error('请输入正确月份')
          return false
        }
        
        
        var jsonStr = {
          sysid:10,//月份候固定传值
          id:5,//月份固定传值
          sysname:this.mounth,
          label:"活跃度评判月份"
        }
        var params = new URLSearchParams()
        params.append('jsonStr',JSON.stringify(jsonStr))
        this.axios({
            url:this.common.getApi() + '/sys/api/systemmaster/editActivity',
            method:'post',
            params:params
          }).then((res) => {
            if(res.data.success){
              this.$message.success('编辑成功')
              this.disabled = true
              this.handleText = "编辑"
              this.centerDialogVisible = false
              this.getActivity()
            }else{
              this.$message.error(res.data.msg)
            }
          })
      }
    },
    edit(row){
      this.centerDialogVisible = true
      this.form.min = row.min
      this.form.max = row.max
      this.form.label = row.label
      this.form.id = row.id
      this.form.sysid = row.sysid
      this.form.sysname = row.sysname
    },
    getActivity(){
      this.axios({
          url:this.common.getApi() + '/sys/api/systemmaster/getActivity',
          method:'get',
        }).then((res) => {
          if(res.data.success){
            var mounth = res.data.obj.splice(res.data.obj.length-1,1)
            res.data.obj.map(e=>{
              e.min = e.sysname.split('-')[0]
              e.max = e.sysname.split('-')[1]
            })
             this.tableData = res.data.obj
             this.mounth = mounth[0].sysname
          }else{
            this.$message.error(res.data.msg)
          }
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