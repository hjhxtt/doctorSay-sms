<template>
  <div class="vipZyzAudit-wrapper">
    <div class="title">
      <i class="el-icon-search"></i><span>执业证审核</span>
    </div>
    <div class="query-wrapper">
      <el-form label-width="120px" :inline="true" size="mini">
        <el-form-item label="会员手机号：">
          <el-input style="width: 200px;" v-model="memberMobile" debounce="2000"></el-input>
        </el-form-item>
        <el-form-item label="会员ID：">
          <el-input style="width: 200px;" v-model="memberId"></el-input>
        </el-form-item>
        
        <el-form-item label="会员姓名：">
          <el-input style="width: 200px;" v-model="memberName"></el-input>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select style="width: 200px;" v-model="state">
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核未通过" value="5,6"></el-option>
            <el-option label="审核已通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item style="padding-left: 30px;">          
          <el-button size="mini" type="primary" @click="getCertificateMemberList(1,30)">立即查询</el-button>        
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
     <i class="el-icon-search"></i><span>会员搜索结果</span><span v-if="pageTotal" style="color:red;font-size:14px;">共{{pageTotal}}条数据</span><span v-else style="color:red;font-size:14px;">共0条数据</span>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
      size="mini">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="memberHandPhone"
        label="会员手机号">
      </el-table-column>
      
      <el-table-column
        prop="recommendcode"
        label="推荐码">
      </el-table-column>
      <el-table-column
        label="执业证书">
         <template slot-scope="scope">
            <img style="height:60px;" :src="baseurl + scope.row.filename" alt="" @click="bigSize('first',scope.row)" />
            <img style="height:60px;" :src="baseurl + scope.row.secondfilename" alt="" @click="bigSize('second',scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="isblackname"
        label="审核结果">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doCertificateAudit(scope.row,2)">通过</el-button>
          <el-button type="text" size="small" @click="doCertificateAudit(scope.row,3)">不通过</el-button>
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
    <div class="bigPic" v-if="showPic" @click="showPic=false">
      <img :src="picUrl" alt="" >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        state:'',
        loading:true,
        picUrl:'',
        tableData: [],
        pageIndex:1,
        pageSize:30,
        pageTotal:null,
        memberName:null,
        memberMobile:null,
        memberId:null,
        state:'0',
        baseurl: baseurl,
        showPic:false
      }
    },
    mounted(){
      this.getCertificateMemberList(this.pageIndex,this.pageSize);
    },
    methods: {
      bigSize(type,row){
        console.log(row);
        
        this.showPic = true
        if(type == "first"){
          this.picUrl = this.baseurl + row.filename
        }else{
          this.picUrl = this.baseurl + row.secondfilename
        }
        console.log(this.picUrl);
        
        
      },
      resetForm(){
        this.memberId = null;
        this.memberMobile = null;
        this.memberName = null;
      },
      getCertificateMemberList(pageIndex,pageSize){

        this.loading = true
        this.axios.get(this.common.getApi() + '/sys/api/audit/getCertificateMemberList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              memberId: this.memberId,
              memberMobile: this.memberMobile,
              memberName: this.memberName,
              blackname:this.state
            } 
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.tableData = res.data.obj.list;
            this.pageTotal = res.data.obj.pager.total;
            for(var i = 0; i < this.tableData.length; i++){
              if(this.tableData[i].isblackname == 0){
                this.tableData[i].isblackname = "未审核"
              }else if(this.tableData[i].isblackname == 2){
                this.tableData[i].isblackname = "审核通过"
              }else if(this.tableData[i].isblackname == 3){
                this.tableData[i].isblackname = "ID审核"
              }else if(this.tableData[i].isblackname == 4){
                this.tableData[i].isblackname = "未审核"
              }else if(this.tableData[i].isblackname == 5){
                this.tableData[i].isblackname = "未审核通过"
              }else if(this.tableData[i].isblackname == 6){
                this.tableData[i].isblackname = "信息填写错误"
              }else if(this.tableData[i].isblackname == 7){
                this.tableData[i].isblackname = "科室电话错误"
              }else if(this.tableData[i].isblackname == 8){
                this.tableData[i].isblackname = "未联系到本人"
              }else if(this.tableData[i].isblackname == 9){
                this.tableData[i].isblackname = "兼职"
              }else if(this.tableData[i].isblackname == 10){
                this.tableData[i].isblackname = "测试"
              }
            }
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      go(currentPage){
        this.getCertificateMemberList(currentPage,this.pageSize);
      },
      doCertificateAudit(row,state){
//      console.log(this.state);
//      var state = null;
//      if(this.state == true){
//        this.state = 2
//      }else{
//        this.state = 3
//      }
        this.axios.post(this.common.getApi() + '/sys/api/audit/doCertificateAudit',{
          params:{
            id: row.id,
            state: state
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.getCertificateMemberList(this.pageIndex,this.pageSize);
          }else{
            this.$message.error(res.data.msg);
          }
        })          
      },
    }
  }  
</script>

<style>
.vipZyzAudit-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipZyzAudit-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipZyzAudit-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  } 
  .vipZyzAudit-wrapper .query-wrapper{
    min-height: 50px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }   
 
  
  .vipZyzAudit-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  } 
  .bigPic{
    width: 100vw;
    height: 100vh;
    background:rgba(0,0,0,.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
  }  
  .bigPic img{
    max-width: 70vw;
    max-height: 70vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }  
</style>