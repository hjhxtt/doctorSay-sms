<template>
    <div class="mainRole-wraper">
        <el-button type="primary" @click="addRole">添加</el-button>
        <el-table
        :data="tableData4"
        style="width: 100%">
            <el-table-column
              prop="id"
              label="角色id"
              width="150">
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
              label="操作"
              >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="edit(scope.row, tableData4)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.row, tableData4)"
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
              pageIndex:1,
              pageSize:8,
                value:'',
                userInfo: {
                  userName: '',
                  userRole: ''
                },
                options: [{
                  value: '选项1',
                  label: '管理员'
                }, {
                  value: '选项2',
                  label: '维修人员管理员'
                }, ],
                tableData4: [{
                  date: '2016-05-03',
                  name: '管理员',
                  province: '上海',
                  city: '普陀区',
                  address: '2019-05-22',
                  zip: 200333
                }, {
                  date: '2016-05-04',
                  name: '管理员',
                  province: '上海',
                  city: '普陀区',
                  address: '2019-05-22',
                  zip: 200333
                }, {
                  date: '2016-05-01',
                  name: '管理员',
                  province: '上海',
                  city: '普陀区',
                  address: '2019-05-22',
                  zip: 200333
                }]
            }
        },
        mounted() {
          this.getRoleList(this.pageIndex,this.pageSize)
        },
        methods:{
          go(currentPage){
              this.getRoleList(currentPage,this.pageSize)
              
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
              
              this.axios.get(this.common.getApi()+'/sys/api/role/turnStopFlag',{
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
            deleteRow(data){
              
              this.axios.get(this.common.getApi() + '/sys/api/role/delRole',{
                params:{
                  params:{
                    id:data.id
                  }
                }
              }).then((res) => {
                if(res.data.success){
                  console.log('1');
                  this.getRoleList(this.pageIndex,this.pageSize)
                  this.$message.success('删除成功')
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
              })
            },
            edit(data){
              this.$router.push({
                path:'/allList',
                query:{
                  id:data.id,
                  roleName:data.roleName
                }
              })
            },
            getRoleList(pageIndex,pageSize){
              this.axios.get(this.common.getApi() + '/sys/api/role/getRoleList',{
                params:{
                  pageIndex:pageIndex,
                  pageSize:pageSize
                }
              }).then((res) => {
                if(res.data.success){
                  console.log(res.data.obj.list );
                  this.pageTotal = res.data.obj.pager.total
                  res.data.obj.list.map(e=>{
                    if (e.stopFlag === 0 ) {
                      e.stopFlag = true
                    }else if(e.stopFlag === 1 ) {
                      e.stopFlag = false
                    }
                  })
                  
                  this.tableData4 = res.data.obj.list
                }else{

                }
              }).catch(function(err){
              })
            },
            addRole(){
              this.$router.push('/allList')
            },
        }
    }
</script>
<style scoped>
  .mainRole-wraper .el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>