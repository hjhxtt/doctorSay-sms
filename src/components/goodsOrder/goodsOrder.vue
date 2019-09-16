<template>
  <div class="goodsOrder-wrapper">
    <div class="query-wrapper">
      <el-form label-width="120px" size="mini" :inline="true">
        <el-form-item label="所属系列：" >
            <el-select style="width: 200px;" v-model="categoryName">
              <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="订单ID：">
          <el-input style="width: 200px;" v-model="id"></el-input>
        </el-form-item>
        <el-form-item label="会员ID：">
          <el-input style="width: 200px;" v-model="userid"></el-input>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select style="width: 200px;" v-model="deliverstatus">
            <el-option label="待支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
            <el-option label="无效订单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兑换时间：">
          <el-date-picker
            v-model="converttime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核日期：">
          <el-date-picker
            v-model="adminCheckTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        
        <br />
        <el-form-item style="padding-left: 50px;">
          <el-button type="primary" @click="getConvertGifsList(pageIndex,pageSize);">查询</el-button>
          <el-button type="primary" @click="downloadConvertGifs">导出</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="centerDialogVisible = true">成功订单批量上传</el-button>
          <el-dialog
            title="上传参数文本"
            :visible.sync="centerDialogVisible"
            width="30%"
            >
            <span>
              <el-form-item label="">
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
                  <el-button size="small" type="primary">选择文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
                </el-upload>
              </el-form-item>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%;"
      :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="80">
      </el-table-column>
      <el-table-column
        prop="id"
        width="80"
        label="订单ID">
      </el-table-column>
      <el-table-column
        prop="userid"
        width="60"
        label="会员ID">
      </el-table-column>
      <el-table-column
        prop="memberHandphone"
        width="110"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="memberRealname"
        width="100"
        label="会员姓名">
      </el-table-column>
      
      <el-table-column
        prop="deliverstatus"
        width="80"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="adress"
        width="250"
        label="兑换联系信息">
      </el-table-column>
      <el-table-column
        prop="giftname"
        label="礼品名称">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        width="100"
        label="价格(积分)">
      </el-table-column>
      <el-table-column
        prop="converttime"
        width="200"
        label="兑换时间">
      </el-table-column>
      <el-table-column
        prop="verfynote"
        label="审核备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showdialog(scope.row)">审核</el-button>
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

    <el-dialog
      title="订单审核"
      :visible.sync="editdialogVisible"
      @close='close'
      width="30%"
      center>
      <div>
        <el-form label-width="120px" ref="editform" :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="用户姓名："  prop="auditType">
            {{editform.name}}
          </el-form-item>
          <el-form-item label="审核状态： " prop="auditType">
            <el-select v-model="editform.auditType" style="width: 80%;">
              <el-option value='0' label='待支付'></el-option>
              <el-option value='1' label='已支付'></el-option>
              <el-option value='3' label='无效订单'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核备注：" >
            <el-input type="textarea" v-model="editform.remark" style="width: 80%;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm('editform')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileName:null,
        loading:true,
        tableData: [],
        categoryList:[],
        multipleSelection: [],
        pageIndex: 1,
        pageSize: 30,
        pageTotal: null,
        rules: {
          giftname: [
            { required: true, message: '请填写商品名称', trigger: 'blur' },
          ],
        },
        categoryName:null,
        id:null,
        userid:null,
        deliverstatus: '0',
        converttime: null,
        adminCheckTime:null,
        editdialogVisible:false,
        editform:{
          auditType:null,
          remark:null,
          id:null,
          name:null
        },
        rules: {
          auditType: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
          remark:[
            { required: true, message: '请填写备注', trigger: 'blur' },
          ],
        },
        ids:null,
        centerDialogVisible: false,
        fileParam:'',
        uploadForm: new FormData(),
        fileList:[]
      }
    },
    mounted(){
      this.getGiftCategoryList();
      this.getConvertGifsList(this.pageIndex,this.pageSize);
    },
    methods:{
      close(){
        this.editform.auditType = null
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
        this.fileName = file[0].name
      },
      submitUpload(){
        var that = this
        const loading = this.$loading({
          lock: true,
          text: '正在检查文件。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.uploadForm.append('file', this.fileParam[0].raw);
        this.axios.post(this.common.getApi() + '/sys/api/convertgifs/uploadConvertGifsAudit',this.uploadForm,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          loading.close()
          if(res.data.success){
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.getGiftCategoryList();
            this.getConvertGifsList(this.pageIndex,this.pageSize);
            this.$refs.upload.clearFiles()
            this.uploadForm = new FormData()
            
        this.centerDialogVisible = false;
            
          }else{
            console.log(res)
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
      resetForm(){
        this.categoryName = null;
        this.id = null;
        this.userid = null;
        this.deliverstatus = null;
        this.converttime = null;
        this.adminCheckTime = null;
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        this.ids = [];
        for(var i = 0; i < this.multipleSelection.length;i++){
          this.ids.push(this.multipleSelection[i].id)
        }
        this.ids = this.ids.join(',');
        console.log(this.ids);
      },
      downloadConvertGifs(){
        var time = new Date
        var mm = (time.getMinutes()>10)?time.getMinutes():'0'+time.getMinutes()
        var timeStap = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+'：'+mm
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍后。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if(this.ids){
          this.axios({
            url:this.common.getApi() + '/sys/api/convertgifs/downloadConvertGifs',
            method:'get',
            params: {
              ids: this.ids
            },
            responseType: 'blob',
          }).then((res) => {
            loading.close()
            this.$message.success('生成文件：订单信息')
            let data = res.data
            const blob = data
            const fileName = '订单_'+timeStap+'.csv'
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          })
        }else{
          var convertStartTime = null
          var convertEndTime = null
          var adminCheckTimeStartTime = null
          var adminCheckTimeEndTime = null
          debugger
         if(Boolean(this.converttime)){
           convertStartTime = this.converttime[0],
           convertEndTime = this.converttime[1]
         }
         if(Boolean(this.adminCheckTime)){
           adminCheckTimeStartTime = this.adminCheckTime[0],
           adminCheckTimeEndTime = this.adminCheckTime[1]
         }
          this.id = this.id?Number(this.id): null;
          this.userid = this.userid?Number(this.userid): null;
          var deliverstatus = this.deliverstatus?Number(this.deliverstatus): null;


          var jsonStr = {
              categoryName: this.categoryName,
              id: this.id,
              userid: this.userid,
              deliverstatus: deliverstatus,
              convertStartTime:convertStartTime,
              convertEndTime:convertEndTime,
              adminCheckTimeStartTime:adminCheckTimeStartTime,
              adminCheckTimeEndTime:adminCheckTimeEndTime
          }
          var data = new URLSearchParams()

          data.append('jsonStr',JSON.stringify(jsonStr))
              


          this.axios({
            url:this.common.getApi() + '/sys/api/convertgifs/downloadConvertGifs',
            method:'get',
            params: data,
            responseType: 'blob',
          }).then((res) => {
             loading.close()
            let data = res.data
            const blob = data
            const fileName = '订单_'+timeStap+'.csv'
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          })
        }
      },
      getConvertGifsList(pageIndex,pageSize){
        console.log(this.converttime);
         console.log(this.adminCheckTime);
         var convertStartTime = null
          var convertEndTime = null
          var adminCheckTimeStartTime = null
          var adminCheckTimeEndTime = null
         if(Boolean(this.converttime)){
           convertStartTime = this.converttime[0],
           convertEndTime = this.converttime[1]
         }
         if(Boolean(this.adminCheckTime)){
           adminCheckTimeStartTime = this.adminCheckTime[0],
           adminCheckTimeEndTime = this.adminCheckTime[1]
         }
        this.loading = true
        this.id = this.id?Number(this.id): null;
        this.userid = this.userid?Number(this.userid): null;
        var deliverstatus = this.deliverstatus?Number(this.deliverstatus): null;
        this.axios.get(this.common.getApi() + '/sys/api/convertgifs/getConvertGifsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              categoryName: this.categoryName,
              id: this.id,
              userid: this.userid,
              deliverstatus: deliverstatus,
              convertStartTime:convertStartTime,
              convertEndTime:convertEndTime,
              adminCheckTimeStartTime:adminCheckTimeStartTime,
              adminCheckTimeEndTime:adminCheckTimeEndTime
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].deliverstatus == 0){
              this.tableData[i].deliverstatus = '待支付';
            }else if(this.tableData[i].deliverstatus == 1){
              this.tableData[i].deliverstatus = '已支付';
            }else if(this.tableData[i].deliverstatus == 3){
              this.tableData[i].deliverstatus = '无效订单';
            }else if(this.tableData[i].deliverstatus == 5){
              this.tableData[i].deliverstatus = '未发放显示原因';
            }
            
          }
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
          this.loading = false
        })
      },
      go(currentPage){
        this.getConvertGifsList(currentPage,this.pageSize);
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editform.auditType == 3) {
              if (!Boolean(this.editform.remark)) {
                this.$message.error('备注不可为空')
                return false
              }
            }
            console.log('1');
            
            this.axios.post(this.common.getApi() + '/sys/api/convertgifs/auditConvertGifs',{
              params:{
                id: Number(this.editform.id),
                auditType: Number(this.editform.auditType),
                remark: this.editform.remark
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.editdialogVisible = false;
                this.editform.auditType = ''
                this.editform.remark = ''
                
                this.getConvertGifsList(this.pageIndex,this.pageSize);
              }else{
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      del(row){
//      this.axios.get(this.common.getApi() + '/sys/api/rule/delExchangeRule',{
//        params:{
//          params:{
//            id: row.id
//          }
//        }
//      },{
//        headers: {
//          'Content-Type': 'application/x-www-form-urlencoded'
//        }
//      }).then((res) => {
//        if(res.data.success){
//          this.$message({
//            message: '删除成功',
//            type: 'success'
//          });
//          this.getExchangeRuleList(this.pageIndex,this.pageSize)
//        }else{
//          this.$message.error(res.data.msg);
//        }
//      })
      },
      showdialog(row){
        debugger
        this.editform.id = row.id;
        this.editform.name = row.memberRealname
        this.editform.remark = row.verfynote
        this.editdialogVisible = true;
          if(row.deliverstatus == '待支付'){
            this.editform.auditType = '0'
          }else if(row.deliverstatus == '已支付'){
            this.editform.auditType = '1'
          }else if( row.deliverstatus == '无效订单'  ){
            this.editform.auditType = '3'
          }
      },
      getGiftCategoryList(){
        this.axios.get(this.common.getApi() + '/sys/api/giftcategory/getGiftCategoryList',{
          params:{
//          pageIndex: pageIndex,
//          pageSize: pageSize
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.categoryList = res.data.obj.list;
//        this.pageTotal = res.data.obj.pager.total;
//        console.log(this.pageTotal);
        })
      },
    }
  }
</script>

<style>
  .goodsOrder-wrapper .query-wrapper {
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .goodsOrder-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
  .el-table td, .el-table th{
    padding: 0;
  }
</style>