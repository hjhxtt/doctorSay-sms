<template>
  <div class="vipQcAudit-wrapper">
    <el-dialog
      title="电话QC审核"
      :visible.sync="dialogVisible"
      width="35%"
      center>
      <div>
        <el-form label-width="150px" size="mini">
          <el-form-item label="拨打科室电话次数：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="拨打手机电话次数：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="QC结果：">
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="下次访问时间：">
            <el-select style="width: 200px;"></el-select>
            <el-select style="width: 200px;"></el-select>
            <el-select style="width: 200px;"></el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea"
               style="width: 200px;">
            </el-input>
            <div style="color:red">备注信息请不要太长</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>    
    <div class="title">
      <i class="el-icon-search"></i><span>电话QC记录</span>
    </div>
    <div class="query-wrapper">
      <el-form ref="form" :inline="true" size="mini" label-width="120px">
        <el-form-item label="用户ID：">
          <el-input style="width: 200px;" v-model="userId"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input style="width: 200px;" v-model="mobile"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input style="width: 200px;" v-model="realName"></el-input>
        </el-form-item>
        <el-form-item label="激活状态:">
          <el-select style="width: 200px;" v-model="state">
            <el-option label="未激活" value="0"></el-option>
            <el-option label="已激活" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨科电数 ：" title="拨打科室电话次数">
          <el-select style="width: 90px;" v-model="roomtype">
            <el-option label=">=" value=0></el-option>
            <el-option label="<=" value=1></el-option>
          </el-select>
          <el-input style="width: 120px;" v-model="roomenum"></el-input>
        </el-form-item>
        <el-form-item label="短信次数 ：" title="发送短信次数">
          <el-select style="width: 90px;" v-model="msgtype">
            <el-option label=">=" value=0></el-option>
            <el-option label="<=" value=1></el-option>
          </el-select>
          <el-input style="width: 120px;" v-model="msgNum"></el-input>
        </el-form-item>
        <el-form-item label="拨手机数  ：" title="拨打手机电话次数">
          <el-select style="width: 90px;" v-model="mobiletype">
            <el-option label=">=" value=0></el-option>
            <el-option label="<=" value=1></el-option>
          </el-select>
          <el-input style="width: 120px;" v-model="mobilenum"></el-input>
        </el-form-item>
        <el-form-item label="上传证书  ：">
          <el-select style="width: 200px;" placeholder="是否上传证书" v-model="isCertificate">
            <el-option label="否" value=0></el-option>
            <el-option label="是" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拨打电话时间：">
            <el-time-select
              placeholder="请选择起始时间"
              class="startTime"
              v-model="beginTime"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
              }">
            </el-time-select>
            <span style="margin: 0 12px;">到</span>
            <el-time-select
              placeholder="请选择结束时间"
              class="endTime"
              v-model="endTime"
              :picker-options="{
                start: '06:00',
                step: '01:00',
                end: '18:00',
                minTime: beginTime
              }">
            </el-time-select>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker
            v-model="registTimeBegin"
            type="date"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="time"
            value-format="yyyy-MM-dd">
          </el-date-picker>
           <span style="margin: 0 12px;">到</span>
          <el-date-picker
            v-model="registTimeEnd"
            type="date"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="time"
            value-format="yyyy-MM-dd">
          </el-date-picker>  

        </el-form-item>
        <!--<el-form-item >
          <el-button type="success" plain>待释放人数：0</el-button>
        </el-form-item>        -->
        <el-form-item >
          <el-button type="primary" @click="getQcMemberList(pageIndex,pageSize)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="unLock(0)">待释放人数：{{peopleNum}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="el-icon-search"></i><span>会员搜索结果</span><span v-if="pageTotal" style="color:red;font-size:14px;">共{{pageTotal}}条数据</span><span v-else style="color:red;font-size:14px;">共0条数据</span>
    </div>
    <el-table
    :data="tableData"
    v-loading="loading"
    border
    size="mini"
    :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
    style="width: 100%">
    <el-table-column
      prop="id"
      width="80"
      label="会员id">
    </el-table-column>
    <el-table-column
      prop="memberRealname"
      width="80"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="memberZone"
      width="80"
      label="地区">
    </el-table-column>
    <el-table-column
      prop="teltime"
      width="120"
      label="拨打电话时段">
    </el-table-column>
    <el-table-column
      prop="phoneNum"
      label="已拨打科室电话次数">
    </el-table-column>
    <el-table-column
      prop="mobileNum"
      label="已拨打过手机次数">
    </el-table-column>
    <el-table-column
      prop="recommendcode"
      width="80"
      label="推荐人">
    </el-table-column>
    <el-table-column
      prop="filename"
      label="是否提交过执业证书">
    </el-table-column>
    <el-table-column
      prop="station"
      label="职称">
    </el-table-column>
    <el-table-column
      prop="memberState"
      width="70"
      label="激活状态">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="audit(scope.row)">点击审核</el-button>
        
        <el-button v-show="scope.row.memberState == '未激活'" type="text" size="small" @click="showSendCode(scope.row)">发送激活码</el-button>
      </template>
    </el-table-column>    
  </el-table>    
    <el-pagination
      layout="prev, pager, next"
      :total="pageTotal"
      :page-size="pageSize"
      @current-change="go">
    </el-pagination>  
      <el-dialog
        title="发送激活码"
        :visible.sync="dialogAddVisible"
        width="500px"
        center>
        <div>
            <span>激活码</span><el-input disabled type="text" v-model="code" style="width:150px;margin:0 50px;margin-bottom:30px;"></el-input>
            <el-button  @click="getCode()">刷新激活码</el-button>
            <el-button  style="margin-left:90px;" @click="sendCode()">发送激活码</el-button>
            <!-- <a href=" ">
             <img id="test" style="cursor:pointer;width: 100px;height: 36px;margin: 5px 0 0 5px;border-radius: 3px;" title="点击刷新验证码" src="http://47.102.194.98:8080/doctor_sys_api/sys/api/audit/getVerifiCode"/>
          </a> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCode()">保存</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        peopleNum:0,
        code:'',
        phoneStatus:null,
        msgCount:null,
        state:"1",
        loading:true,
        tableData: [],
        dialogVisible: false,
        teltime:null,
        userId:null,
        mobile:null,
        realName:null,
        studioPhone:null,
        mobilePhone:null,
        isCertificate:null,
        registTimeBegin:null,
        registTimeEnd:null,
        beginTime:null,
        endTime:null,
        registerTime:null,
        roomtype: null,
        roomenum:null,
        mobiletype:null,
        mobilenum:null,
        pageIndex:1,
        pageSize:20,
        pageTotal:null,
        dialogAddVisible:false ,
        showData:null,
        msgtype:null,
        msgNum:null
      };
    },
    mounted(){
      if(Boolean(JSON.parse(sessionStorage.getItem('userId')))){
        this.userId = JSON.parse(sessionStorage.getItem('userId'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('mobile')))){
        this.mobile = JSON.parse(sessionStorage.getItem('mobile'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('realName')))){
        this.realName = JSON.parse(sessionStorage.getItem('realName'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('roomtype')))){
        this.roomtype = JSON.parse(sessionStorage.getItem('roomtype'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('roomenum')))){
        this.roomenum = JSON.parse(sessionStorage.getItem('roomenum'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('mobiletype')))){
        this.mobiletype = JSON.parse(sessionStorage.getItem('mobiletype'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('isCertificate')))){
        this.isCertificate = JSON.parse(sessionStorage.getItem('isCertificate'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('beginTime')))){
        this.beginTime = JSON.parse(sessionStorage.getItem('beginTime'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('endTime')))){
        this.endTime = JSON.parse(sessionStorage.getItem('endTime'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('registerTime')))){
        this.registerTime = JSON.parse(sessionStorage.getItem('registerTime'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('registTimeBegin')))){
        this.registTimeBegin = JSON.parse(sessionStorage.getItem('registTimeBegin'))
      }
      if(Boolean(JSON.parse(sessionStorage.getItem('registTimeEnd')))){
        this.registTimeEnd = JSON.parse(sessionStorage.getItem('registTimeEnd'))
      }


      this.getQcMemberList(this.pageIndex,this.pageSize)
      this.unLock(1)
    },
    beforeDestroy() {
        sessionStorage.setItem('userId',JSON.stringify(this.userId))
        sessionStorage.setItem('mobile',JSON.stringify(this.mobile))
        sessionStorage.setItem('realName',JSON.stringify(this.realName))
        sessionStorage.setItem('roomtype',JSON.stringify(this.roomtype))
        sessionStorage.setItem('roomenum',JSON.stringify(this.roomenum))
        sessionStorage.setItem('mobiletype',JSON.stringify(this.mobiletype))
        sessionStorage.setItem('isCertificate',JSON.stringify(this.isCertificate))
        sessionStorage.setItem('beginTime',JSON.stringify(this.beginTime))
        sessionStorage.setItem('endTime',JSON.stringify(this.endTime))
        sessionStorage.setItem('registTimeBegin',JSON.stringify(this.registTimeBegin))
        sessionStorage.setItem('registTimeEnd',JSON.stringify(this.registTimeEnd))
    },
    methods: {
      unLock(num){
        var para = new URLSearchParams()
         para.append('lockState',num)
         this.axios({
            method: 'post',
            url: this.common.getApi() + '/sys/api/audit/getLockCountOrUnLock',
            data: para
          }).then(res=>{

            if(res.data.success){
              if(num === 0){
                this.$message({
                  message:'释放成功',
                  type:'success'
                })
                this.unLock(1)
              }
              if(num === 1){
                  this.peopleNum = res.data.obj;
                  
                }
              this.getQcMemberList(this.pageIndex,this.pageSize)
            }else{
              this.$message.error(res.data.msg);
            }
          })
      },
      saveCode(){
        var para = new URLSearchParams()
         para.append('memberId',this.showData.id)
         para.append('memberHandPhone',this.showData.memberHandPhone)
         para.append('vireCode',this.code)
         this.axios({
            method: 'post',
            url: this.common.getApi() + '/sys/api/audit/saveVerifiCode',
            data: para
          }).then(res=>{

            if(res.data.success){
              this.$message({
                message:'保存成功',
                type:'success'
              })
            this.dialogAddVisible = false
            }else{
              this.$message.error(res.data.msg);
            }
            
            
          })
       
      },
      getCode(){
         
         var code = Math.random().toString(36).substr(2,4);
         this.code = code
      },
      showSendCode(data){
        this.dialogAddVisible = true
        this.showData = data
        this.getCode()
      },
      sendCode(){
        
        this.axios.post(this.common.getApi() + '/sys/api/audit/sendVerifiCode?memberHandPhone='+this.showData.memberHandPhone+'&vireCode='+this.code).then((res) => {
          if(res.data.success){
            this.$message({
              message:'发送成功',
              type:'success'
            })
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      time(){
        console.log(this.registerTime);
        
      },
      resetForm(){
        this.userId = null;
        this.mobile = null;
        this.realName = null;
        this.roomtype = null;
        this.roomenum = null;
        this.mobiletype = null;
        this.mobilenum = null;
        this.isCertificate = null;
        this.beginTime = null;
        this.endTime = null;
        this.registerTime = null; 
        this.registTimeBegin = null
        this.registTimeEnd = null
        this.msgtype = null
        this.msgNum = null
         this.state = null   
        

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      audit(row){
        sessionStorage.setItem('id',row.id);
        this.axios.get(this.common.getApi() + '/sys/api/audit/goQcMemberAudit',{
          params:{
            params:{
              id: Number(row.id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            if(Boolean(res.data.obj)){
              debugger
              sessionStorage.setItem('qcinfo',JSON.stringify(res.data.obj));
            }
            this.$router.push({ path: 'vipTelVerify'})            
          }else{
            this.$message.error(res.data.msg);
          }
        })          
      },
      getQcMemberList(pageIndex,pageSize){
        this.loading = true
        let userId = this.userId?Number(this.userId):null;
        let mobile = this.mobile?this.mobile:null;
        let realName = this.realName?this.realName:null;
        let studioPhone = this.roomtype && this.roomenum?{type: this.roomtype ,number: this.roomenum }:null;
        let mobilePhone = this.mobiletype && this.mobilenum?{type: this.mobiletype ,number: this.mobilenum }:null;
      
        let msgNum = this.msgtype && this.msgNum?{type: this.msgtype ,number: this.msgNum }:null;
        let isCertificate = this.isCertificate?this.isCertificate:null; 
        let beginTime = this.beginTime?Number(this.beginTime.slice(0,2)):null;
        let endTime = this.endTime?Number(this.endTime.slice(0,2)):null;

      


        this.axios.get(this.common.getApi() + '/sys/api/audit/getQcMemberList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              userId: userId,
              mobile:mobile,
              realName: realName,
              studioPhone: studioPhone,
              mobilePhone: mobilePhone,
              isCertificate: isCertificate,
              registTimeBegin: this.registTimeBegin,
              registTimeEnd: this.registTimeEnd,
              beginTime: beginTime,
              endTime: endTime,
              memberState:this.state,
              msgNum:msgNum
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          
          this.pageTotal = res.data.obj.pager.total;
          this.tableData = res.data.obj.list;
          for(var i = 0; i < this.tableData.length; i++){
            this.teltime = this.tableData[i].beginTime + "时 至" + this.tableData[i].endTime + "时";
            this.tableData[i].teltime = this.teltime;
            this.tableData[i].filename = Boolean(this.tableData[i].filename)?'已上传': '未上传';
            this.tableData[i].phoneNum = this.tableData[i].phoneNum?this.tableData[i].phoneNum:0;
            this.tableData[i].mobileNum = this.tableData[i].mobileNum?this.tableData[i].mobileNum:0;


            if(this.tableData[i].memberState == 1){
              this.tableData[i].memberState = '已激活'
            }else if(this.tableData[i].memberState == 0){
              this.tableData[i].memberState = '未激活'
            }

          }
          this.loading = false
        })
      },   
      go(currentPage){
        
        this.getQcMemberList(currentPage,this.pageSize);
      }      
    }    
  }  
</script>

<style>
  .vipQcAudit-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  .vipQcAudit-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .vipQcAudit-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  } 
  
  .vipQcAudit-wrapper .query-wrapper{
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 20px;
  }  
  
  .vipQcAudit-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }    
 .vipQcAudit-wrapper .el-form-item--mini.el-form-item {
   margin-bottom: 5px;
 }
</style>