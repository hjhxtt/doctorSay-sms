<template>
  <div class="pro-wrapper">
    <el-form ref="form"  label-width="120px">
      <el-form-item label="角色名">
        <el-input v-model="roleName"></el-input>
      </el-form-item>


      <el-form-item :label="list.authorityParent.name" v-for="list in form" :key="list.authorityParent.id">
        <el-checkbox-group v-model="memberType">
          <el-checkbox :label="item.name"  v-for="item in list.authoritySon" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>



      <!-- <el-form-item label="会员管理">
        <el-checkbox-group v-model="memberType">
          <el-checkbox :label="item.name"  v-for="item in childList[0]" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商城管理">
        <el-checkbox-group v-model="shopType">
          <el-checkbox :label="item.name"  v-for="item in childList[1]" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="调研项目管理">
        <el-checkbox-group v-model="projectType">
          <el-checkbox :label="item.name"  v-for="item in childList[2]" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="网站信息维护">
        <el-checkbox-group v-model="webType">
          <el-checkbox :label="item.name"  v-for="item in childList[1]" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="系统管理">
        <el-checkbox-group v-model="sysType" >
          <el-checkbox :label="item.name"  v-for="item in childList[1]" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="addRole">保存</el-button>
        <el-button @click="$router.push('/manRole')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        memberType:[],
        shopType:[],
        projectType:[],
        webType:[],
        sysType:[],
        childList:[],
        roleName:'',
        form:null,
      };
    },
    mounted(){
      this.getAllList()
      if(Boolean(this.$route.query.id)){
        this.getInfoById()
        this.roleName=this.$route.query.roleName
      }
      
    },
    methods: {
      getInfoById(){
        
        var id = Number(this.$route.query.id)
        this.axios.get(this.common.getApi() + '/sys/api/role/getRoleAuth',{
          params:{
            params:{
              id:id
            }
          }
        }).then((res) => {
                if(res.data.success){
                  console.log(res.data.obj);
                  var childList = []
                  res.data.obj.twoList.map(e=>{
                     switch (e) {
            case 5:
              childList.push('会员信息')
              break;
            case 6:
              childList.push('电话qc记录')
              break;
            case 7:
              childList.push('执业证审核')
              break;
            case 8:
              childList.push('积分管理')
              break;
            case 9:
              childList.push('商品系列')
              break;
            case 10:
              childList.push('商品管理')
              break;
            case 11 :
              childList.push('订单列表')
              break;
            case 12:
              childList.push('项目管理')
              break;
            case 13:
              childList.push( 'banner配置')
              break;
            case 14:
              childList.push('网站公告')
              break;
            case 15:
              childList.push('常见问题')
              break;
            case 16:
              childList.push('兑换规则')
              break;
            case 17 :
              childList.push('业务联系')
              break;
            case 19:
              childList.push('账户管理')
              break;
            case 20:
              childList.push('角色管理')
              break;
                    }
                  })
                  this.memberType=childList
                }else{
                  this.$message.error(res.data.msg)
                  
                }
              }).catch(function(err){
            })
      },
      addRole(){
        if (this.roleName=='') {
          this.$message.error('请输入角色名')
          return false
        }

        






        var parentList = []
        var childList = []

        this.memberType.map(e=>{
          switch (e) {
            case '会员信息':
              parentList.push(1)
              childList.push(5)
              break;
            case '电话qc记录':
              parentList.push(1)
              childList.push(6)
              break;
            case '执业证审核':
              parentList.push(1)
              childList.push(7)
              break;
            case '积分管理':
              parentList.push(1)
              childList.push(8)
              break;
            case '商品系列':
              parentList.push(2)
              childList.push(9)
              break;
            case '商品管理':
              parentList.push(2)
              childList.push(10)
              break;
            case '订单列表':
              parentList.push(2)
              childList.push(11)
              break;
            case '项目管理':
              parentList.push(3)
              childList.push(12)
              break;
            case 'banner配置':
              parentList.push(4)
              childList.push(13)
              break;
            case '网站公告':
              parentList.push(4)
              childList.push(14)
              break;
            case '常见问题':
              parentList.push(4)
              childList.push(15)
              break;
            case '兑换规则':
              parentList.push(4)
              childList.push(16)
              break;
            case '业务联系':
              parentList.push(4)
              childList.push(17)
              break;
            case '账户管理':
              parentList.push(18)
              childList.push(19)
              break;
            case '角色管理':
              parentList.push(18)
              childList.push(20)
              break;
          }
        })
        
        function uniq(array){
          var temp = []; //一个新的临时数组
          for(var i = 0; i < array.length; i++){
              if(temp.indexOf(array[i]) == -1){
                  temp.push(array[i]);
              }
          }
          return temp;
         }

        //编辑角色
        if(Boolean(this.$route.query.id)){
          let params = {
              roleName:this.roleName,
              oneLevel:uniq(parentList).join(','),
              twoLevel:childList.join(','),
              id:this.$route.query.id
          }
          this.axios.post(this.common.getApi() + '/sys/api/role/editRole',{
            params:params
          }).then((res) => {
            
                if(res.data.success){
                  this.$message.success(res.data.msg)
                  this.$router.push('/manRole')
                  return false
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
            })
            return false
        }

        var para = {
            roleName:this.roleName,
            oneLevel:uniq(parentList).join(','),
             twoLevel:childList.join(',')
        }
          
          this.axios.post(this.common.getApi() + '/sys/api/role/addRole',{
            params:para
          }).then((res) => {
            
                if(res.data.success){
                  this.$message.success(res.data.msg)
                  this.$router.push('/manRole')
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
            })
          

      },
      getAllList(){

        
        this.axios.get(this.common.getApi() + '/sys/api/authority/getAllAuthority').then((res) => {
                if(res.data.success){
                 this.form = res.data.obj.list
                  console.log(res.data.obj.list);
                  
                 var childList = []
                  res.data.obj.list.map(item =>{
                    childList.push(item.authoritySon)
                  })
                  this.childList=childList
                  
                  
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
              })
      },



      submitForm(formName) {

        if(this.email=='' || this.title == '' || this.taskName == '' ){
            this.$message({
            message: '请完善邮件信息',
            type: 'warning'
          })
            return
        }

        this.axios.post(this.common.getApi() + '/sys/api/projectSample/sendBatchEmail',{
                params:{
                  id : Number(sessionStorage.getItem('nweid')),
                  title : this.title,
                  content : this.email,
                  taskName : this.taskName,
                  emailType : true
                }
              }).then((res) => {
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  })
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
              })

      },
    }
  }
</script>

<style>
  .form_body{
    margin-left: 80px;
    margin-bottom: 50px;
  }
  .title{
    margin: 20px 0;
    font-weight: 700;
    margin-left: -20px;
  }
  .qxlb{
    margin: 50px 0;
  }
  .el-divider__text {
    position: absolute;
    background-color: #FBFBFB;
    padding: 0 20px;
    font-size: 20px;
    color: #303133;
    font-weight: 700;
}
  .butt{
    margin-top: 50px;
  }
  .el-input__inner{
    width: 200px;
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 16px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>