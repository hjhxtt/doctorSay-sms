<template>
    <div class="manAccount-warpper">
        <el-dialog
          :title="diaTitle"
          :visible.sync="centerDialogVisible"
          width="500px"
          center>
          <el-form :inline="true" class="demo-form-inline">
            <el-row>
             <el-col :span="12">
              <el-form-item label="账号名">
                <el-input v-model="userInfo.userName"></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="12">
              <el-form-item label="角色名">
                  <el-select v-model="value" placeholder="请选择" @change="selectGet()">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
             </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>

        <el-table
        :data="adminList"
        style="width: 100%"
        >
            <el-table-column
              prop="id"
              label="管理员id"
              width="150">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="账号名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="plaintextPassword"
              label="密码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="300">
            </el-table-column>
            <el-table-column
              prop="stopFlag"
              label="状态"
              width="120">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.stopFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="turnStopFlag(scope.row,scope.row.stopFlag)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRole(scope.row,'edit')"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click="resetPassword(scope.row)"
                  type="text"
                  size="small">
                  重置密码
                </el-button>
                <el-button
                  @click.native.prevent="delRole(scope.row, adminList)"
                  type="text"
                  size="small">
                  删除
                </el-button>
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
</template>
<script>
    export default {
        data(){
            return {
                pageTotal:null,
                diaTitle:'添加账户信息',
                centerDialogVisible: false,
                userInfo: {
                  userName: '',
                  userRole: '',
                  password:''
                },
                  options: [{
                  value: '选项1',
                  label: '管理员'
                }, {
                  value: '选项2',
                  label: '维修人员管理员'
                }, ],
                adminList: [],
                pageIndex:1,
                pageSize:6,
                value2:true,
                value:'',
                editId :null
            }
        },
        methods:{
          go(currentPage){
            this.getUserList(currentPage,this.pageSize)
          },
          cancel(){
            this.userInfo.userName = ''
                      this.value = ''
            this.centerDialogVisible = false
          },
          //重置密码
          resetPassword(row){
              this.axios.get(this.common.getApi() + '/sys/api/user/resetpassword',{
                  params:{
                    params:{
                      id:row.id
                    }
                  }
                }).then((res) => {
                  if(res.data.success){
                    this.getUserList(this.pageSize,this.pageSize)
                    this.$message.success(res.data.msg)
                    console.log('1');
                    
                  }else{

                  }
                }).catch(function(err){

                })
          },
          
          //删除管理员
          delRole(row){
            console.log('1');
            
            this.axios.get(this.common.getApi() + '/sys/api/user/delUser',{
                params:{
                  params:{
                    id:row.id
                  }
                }
              }).then((res) => {
                if(res.data.success){
                  this.getUserList(this.pageSize,this.pageSize)
                  this.$message.success(res.data.msg)
                  
                }else{

                }
              }).catch(function(err){

              })
          },
          
          add(){
            this.diaTitle='添加账户信息'
            this.centerDialogVisible = true
          },
          //编辑角色
          editRole(row){
            this.diaTitle='编辑账户信息'
            this.userInfo.userName = row.userName
            this.editId = row.id
            this.centerDialogVisible = true
            console.log(row);
            
            let para = {
              id:row.id,
              
            }
            
          //   this.axios.post(this.common.getApi() + '/sys/api/user/editUser',{
          //   params:para
          // }).then((res) => {
            
          //       if(res.data.success){
          //         this.$message.success(res.data.msg)
          //       }else{
          //         this.$message.error(res.data.msg)
          //       }
          //     }).catch(function(err){
          //   })
          },
          //下拉框选中事件
          selectGet(value){//这个vId也就是value值
            console.log(this.value);
            
            // let obj = {};
            // obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
            //   return item.id === vId;//筛选出匹配数据
            // });
            // console.log(obj);//我这边的name就是对应label的
          },
          //获取角色列表
            getRoleList(){
              this.axios.get(this.common.getApi() + '/sys/api/role/getRoleList',{
                params:{
                  pageIndex:this.pageIndex,
                  pageSize:this.pageSize
                }
              }).then((res) => {
                if(res.data.success){
                  this.options =res.data.obj.list
                  console.log(this.options);
                  
                }else{

                }
              }).catch(function(err){

              })
            },
          //开关状态
            turnStopFlag(row,data){
              let state = data?0:1
              let id = row.id

              var pama = {
                  state:state,
                  id:id
                }
              console.log(pama);
              
              this.axios.get(this.common.getApi()+'/sys/api/user/turnStopFlag',{
                params:{
                  params:pama
                }
              }).then(res=>{
                if(res.data.success){
                  console.log(res.data);
                  
                }else{
                  this.$message.error(res.data.msg)
                }
                
              })
              
              
            },
            //重置密码
             open2() {
            this.$confirm('密码已重置成功', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {

            }).catch(() => {

            });
          },

          deleteRow(index, rows) {
            rows.splice(index, 1);
          },
          //获取管理员列表
          getUserList(pageIndex,pageSize){
            this.axios.get(this.common.getApi() + '/sys/api/user/getUserList',{
            params:{
                userName: 'root',
                userRole:2,
                pageIndex:pageIndex,
                pageSize:pageSize,
            },
          }).then((res) => {
            if(res.data.success){
                this.pageTotal = res.data.obj.pager.total
                res.data.obj.list.map(e=>{
                    if (e.stopFlag === 0 ) {
                      e.stopFlag = true
                    }else if(e.stopFlag === 1 ) {
                      e.stopFlag = false
                    }
                  })

                this.adminList=res.data.obj.list
                console.log(this.adminList);
            }else{
              this.$message.error(res.data.msg);
            }
          })
          },
          //添加管理员
          addUser(){
            var role = Number(this.value)
            console.log(role);


            
          

            if(this.diaTitle == '编辑账户信息'){
              var params = {
                userName:this.userInfo.userName,
                userRole:role,
                id:this.editId
            }

            this.axios.post(this.common.getApi() + '/sys/api/user/editUser',{
                params:params
              }).then((res) => {
                
                    if(res.data.success){
                      this.userInfo.userName = ''
                      this.value = ''
                      this.getUserList(this.pageSize,this.pageSize)
                      this.$message.success(res.data.msg)
                      this.centerDialogVisible = false
                    }else{
                      this.$message.error(res.data.msg)
                    }
                  }).catch(function(err){
                })

              return false
            }else{
              var para = {
            userName:this.userInfo.userName,
            userRole:role
            }

          this.axios.post(this.common.getApi() + '/sys/api/user/addUser',{
            params:para
          }).then((res) => {
            
                if(res.data.success){
                  this.userInfo.userName = ''
                  this.$message.success(res.data.msg)
                  this.centerDialogVisible = false
                  this.getUserList(this.pageSize,this.pageSize)
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
            })
            }

            
            

          },
        },
        mounted() {
          this.getUserList(this.pageIndex,this.pageSize)
          this.getRoleList()
        },
    }
</script>
<style scoped>
</style>
<style>
    .el-dialog--center{
        width: 50% !important;
    }
    .el-dialog--center .el-dialog__body {
    padding-top: 50px !important;
}
    .el-dialog .el-button{
        width: 100px;
    }
    .manAccount-warpper .el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>