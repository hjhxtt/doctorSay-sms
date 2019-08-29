<template>
  <div class="hospitalList-wrapper">
    <el-dialog
      title="新增医院"
      :visible.sync="dialogAddVisible"
      width="30%"
      center>
      <div>
        <el-form ref="addform" :model="addform" label-width="120px" :rules="rules" size="mini" style=" height:500px;overflow-y:scroll;padding-right:20px;">
          <el-form-item label="省："  prop="province" required>
            <el-select style="width: 100%;" v-model="addform.province" @change="getCityByProvince(addform.province)">
              <el-option v-for="item in provinceList" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市："  prop="city" required>
            <el-select style="width: 100%;"  v-model="addform.city">
              <el-option v-for="item in cityList" :label="item.cityName" :value="item.cityId" :key="item.cityId"></el-option>
            </el-select>
          </el-form-item>  
          <el-form-item label="医院名称：" prop="hospitalName" required>
            <el-input v-model="addform.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="医院级别：" prop="hospitalLevel" required>
            <el-select style="width: 100%;" v-model="addform.hospitalLevel">
              <el-option v-for="item in hospitalLevelList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>    
          
          <el-form-item label="医院等级：" prop="hospitalGrade" required>
            <el-select style="width: 100%;" v-model="addform.hospitalGrade">
              <el-option v-for="item in hospitalGradeList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院性质：" prop="hospitalNature" required>
            <el-select style="width: 100%;" v-model="addform.hospitalNature">
              <el-option v-for="item in hospitalNatureList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院类型：" prop="hospitalType" required>
            <el-select style="width: 100%;" v-model="addform.hospitalType">
              <el-option v-for="item in hospitalTypeList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专科类型：">
            <el-select style="width: 100%;" v-model="addform.specialtys">
              <el-option v-for="item in specialtysList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="床位数：" prop="bedNumber" required>
            <el-input type="text" v-model="addform.bedNumber"></el-input>
          </el-form-item>
          <el-form-item label="别名1：">
            <el-input type="text" v-model="addform.aka1"></el-input>
          </el-form-item>
          <el-form-item label="别名2：">
            <el-input type="text" v-model="addform.aka2"></el-input>
          </el-form-item>
          <el-form-item label="别名3：">
            <el-input type="text" v-model="addform.aka3"></el-input>
          </el-form-item>
          <el-form-item label="别名4：">
            <el-input type="text" v-model="addform.aka4"></el-input>
          </el-form-item>
          <el-form-item label="别名5：">
            <el-input type="text" v-model="addform.aka5"></el-input>
          </el-form-item>
          <el-form-item label="别名6：">
            <el-input type="text" v-model="addform.aka6"></el-input>
          </el-form-item>
          <el-form-item label="别名7：">
            <el-input type="text" v-model="addform.aka7"></el-input>
          </el-form-item>
          <el-form-item label="别名8：">
            <el-input type="text" v-model="addform.aka8"></el-input>
          </el-form-item>
          <el-form-item label="别名9：">
            <el-input type="text" v-model="addform.aka9"></el-input>
          </el-form-item>
          <el-form-item label="别名10：">
            <el-input type="text" v-model="addform.aka10"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('addform')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑医院"
      :visible.sync="dialogEditVisible"
      width="30%"
      center>
      <div>
        <el-form ref="editform" :model="editform" label-width="120px" :rules="rules" size="mini" style=" height:500px;overflow-y:scroll;padding-right:20px;">
          <el-form-item label="省：" prop="province" required>
            <el-select  style="width: 100%;" v-model="editform.province" @change="getCityByProvince(editform.province)">
              <el-option v-for="item in provinceList" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市：" prop="city" required>
            <el-select  style="width: 100%;" v-model="editform.city">
              <el-option v-for="item in cityList" :label="item.cityName" :value="item.cityId" :key="item.cityId"></el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="医院名称：" prop="hospitalName" required>
            <el-input v-model="editform.hospitalName"></el-input>
          </el-form-item>
          <el-form-item label="医院级别：" prop="hospitalLevel" required>
            <el-select style="width: 100%;" v-model="editform.hospitalLevel">
              <el-option v-for="item in hospitalLevelList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>    
          
          <el-form-item label="医院等级：" prop="hospitalGrade" required>
            <el-select style="width: 100%;" v-model="editform.hospitalGrade">
              <el-option v-for="item in hospitalGradeList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院性质：" prop="hospitalNature" required>
            <el-select style="width: 100%;" v-model="editform.hospitalNature">
              <el-option v-for="item in hospitalNatureList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院类型：" prop="hospitalType" required>
            <el-select style="width: 100%;" v-model="editform.hospitalType">
              <el-option v-for="item in hospitalTypeList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专科类型：" prop="specialtys" required>
            <el-select style="width: 100%;" v-model="editform.specialtys">
              <el-option v-for="item in specialtysList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="床位数：" prop="bedNumber" required>
            <el-input type="text" v-model="editform.bedNumber"></el-input>
          </el-form-item>
          <el-form-item label="别名1：">
            <el-input type="text" v-model="editform.aka1"></el-input>
          </el-form-item>
          <el-form-item label="别名2：">
            <el-input type="text" v-model="editform.aka2"></el-input>
          </el-form-item>
          <el-form-item label="别名3：">
            <el-input type="text" v-model="editform.aka3"></el-input>
          </el-form-item>
          <el-form-item label="别名4：">
            <el-input type="text" v-model="editform.aka4"></el-input>
          </el-form-item>
          <el-form-item label="别名5：">
            <el-input type="text" v-model="editform.aka5"></el-input>
          </el-form-item>
          <el-form-item label="别名6：">
            <el-input type="text" v-model="editform.aka6"></el-input>
          </el-form-item>
          <el-form-item label="别名7：">
            <el-input type="text" v-model="editform.aka7"></el-input>
          </el-form-item>
          <el-form-item label="别名8：">
            <el-input type="text" v-model="editform.aka8"></el-input>
          </el-form-item>
          <el-form-item label="别名9：">
            <el-input type="text" v-model="editform.aka9"></el-input>
          </el-form-item>
          <el-form-item label="别名10：">
            <el-input type="text" v-model="editform.aka10"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('editform')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确定删除？"
      :visible.sync="hospitalDialogVisible"
      width="30%"
      center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hospitalDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteHospital">确 定</el-button>
      </span>
    </el-dialog>
    <div class="query-wrapper">
      <el-form label-width="100px" size="mini" :inline="true">
        <el-form-item label="省：">
          <el-select style="width: 200px;" v-model="province" @change="getCityByProvince(province)">
            <el-option v-for="item in provinceList" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市：">
          <el-select style="width: 200px;" v-model="city">
            <el-option v-for="item in cityList" :label="item.cityName" :value="item.cityId" :key="item.cityId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院级别：">
          <el-select style="width: 200px;" v-model="hospitalLevel">
            <el-option v-for="item in hospitalLevelList" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称：" >
          <el-input style="width: 200px;" placeholder="请输入医院名"  v-model="hospitalName"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="getHospitalPage(pageIndex,pageSize)">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
        <br />
        <el-form-item style="padding-left: 50px;">
          
          <el-button type="primary" @click="dialogAddVisible = true">增加</el-button>
          <el-button type="primary" @click="exportHospital">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="el-icon-search"></i><span>医院搜索结果</span><span v-if="pageTotal" style="color:red;font-size:14px;">共{{pageTotal}}条数据</span><span v-else style="color:red;font-size:14px;">共0条数据</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column
        prop="id"
        label="编号"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        width="150"
        label="医院名">
      </el-table-column>
      <el-table-column
        prop="hospitalLevelStr"
        label="医院级别">
      </el-table-column>
      <el-table-column
        prop="hospitalGradeStr"
        label="医院等级">
      </el-table-column>
      <el-table-column
        prop="natureStr"
        label="医院性质">
      </el-table-column>
      <el-table-column
        prop="fkPolyclinicIdStr"
        label="医院类型">
      </el-table-column>
      <el-table-column
        prop="fkSpecialtyIdStr"
        label="专科类型">
      </el-table-column>
      <el-table-column
        prop="numberOfBeds"
        label="床位数">
      </el-table-column>
      <el-table-column
        prop="alias1"
        label="别名1">
      </el-table-column> 
      <el-table-column
        prop="alias2"
        label="别名2">
      </el-table-column> 
      <el-table-column
        prop="alias3"
        label="别名3">
      </el-table-column> 
      <el-table-column
        prop="alias4"
        label="别名4">
      </el-table-column> 
      <el-table-column
        prop="alias5"
        label="别名5">
      </el-table-column> 
      <el-table-column
        prop="alias6"
        label="别名6">
      </el-table-column> 
      <el-table-column
        prop="alias7"
        label="别名7">
      </el-table-column> 
      <el-table-column
        prop="alias8"
        label="别名8">
      </el-table-column> 
      <el-table-column
        prop="alias9"
        label="别名9">
      </el-table-column> 
      <el-table-column
        prop="alias10"
        label="别名10">
      </el-table-column> 
      <el-table-column
        fixed="right"
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="confirmDel(scope.row)">删除</el-button>
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
    data() {
      return {
        hospitalDialogVisible:false,
        editProvince:null,
        editCity:null,
        editId:null,
        specialtysList:null,
        hospitalTypeList:null,
        hospitalNatureList:null,
        hospitalGradeList:null,
        provinceList:null,
        cityList:null,
        hospitalLevelList:null,
        province:null,
        city:null,
        hospitalLevel:null,
        hospitalName:null,
        giftStatus:'1',
        loading:true,
        baseurl: baseurl,
        dialogAddVisible:false,
        dialogEditVisible:false,
        tableData: [],
        multipleSelection: [],
        pageIndex: 1,
        pageSize: 30,
        pageTotal: null,      
        giftsId:null,
        categoryName: null,
        type: null,
        count:null,
        addform:{
          province:null,
          city:null,
          number:null,
          hospitalName:null,
          hospitalLevel:null,
          hospitalGrade:null,
          hospitalNature:null,
          hospitalType:null,
          specialtys:null,
          bedNumber:null,
          aka1:null,
          aka2:null,
          aka3:null,
          aka4:null,
          aka5:null,
          aka6:null,
          aka7:null,
          aka8:null,
          aka9:null,
          aka10:null,
        },
        fileList: [],
        editform:{
          province:null,
          city:null,
          number:null,
          hospitalName:null,
          hospitalLevel:null,
          hospitalGrade:null,
          hospitalNature:null,
          hospitalType:null,
          specialtys:null,
          bedNumber:null,
          specialtys:null,
          aka1:null,
          aka2:null,
          aka3:null,
          aka4:null,
          aka5:null,
          aka6:null,
          aka7:null,
          aka8:null,
          aka9:null,
          aka10:null,
        },
        categoryList:[],
        rules: {
          province:[
            { required: true, message: '请选择省份', trigger: 'blur' },
          ],
          city:[
            { required: true, message: '请选择市', trigger: 'blur' },
          ],
          hospitalName: [
            { required: true, message: '请填写医院名', trigger: 'blur' },
          ],
          
          hospitalLevel: [
            { required: true, message: '请选择医院级别', trigger: 'change' }
          ],
          hospitalGrade: [
            { required: true, message: '请选择医院等级', trigger: 'change' }
          ],
          hospitalNature:[
            { required: true, message: '请选择医院性质', trigger: 'change' }
          ],
          hospitalType:[
            { required: true, message: '请选择医院类型', trigger: 'change' }
          ],
          bedNumber:[
            { required: true, message: '请填写床位数', trigger: 'change' }
          ],
          specialtys:[
            { required: true, message: '请填写专科类型', trigger: 'change' }
          ],
        }
      }
    },
    mounted(){
      this.getProvince()
      this.getHospitalLevel()
      this.getHospitalGrade()
      this.getHospitalNature()
      this.getHospitalType()
      this.getSpecialtys()
      this.getHospitalPage(this.pageIndex,this.pageSize)
    },
    methods:{
      exportHospital(){
        console.log(this.city);
        
        debugger
        const loading = this.$loading({
          lock: true,
          text: '导出中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.get(this.common.getApi() + '/sys/api/hospital/downloadHospitalConfig',{
          params:{
            params:{
              provinceId:this.province,
              cityId:this.city,
              hospitalLevel:this.hospitalLevel,
              name:this.hospitalName
            }
          }
        },{
        }).then((res) => {
          this.fileList = [];
            this.fileParam = '';
            this.uploadForm = new FormData()
            this.$message.success('成功导出医院信息文件')
            let a = document.createElement('a');
            let content="\ufeff"+res.data;
            let url = window.URL.createObjectURL(new Blob([content],{type:'text/plain,charset=utf-8'}));
            let filename = '医院信息.csv';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            loading.close();
        }) 
      },
      confirmDel(row){
        this.hospitalDialogVisible = true
        this.delId = row.id
      } , 
      deleteHospital(){
        this.axios.get(this.common.getApi() + '/sys/api/hospital/delHospital',{
          params:{
            params:{
              id:this.delId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.$message.success('删除成功')
            this.hospitalDialogVisible = false
            this.getHospitalPage(this.pageIndex,this.pageSize)
          }else{
            this.$message.error(res.data.msg)
          }
        })  
      },
      onSubmit(formName) {
        if(formName == 'addform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {



                  var params =  {
                      "params": {
                        "id":null,
                        "name": this.addform.hospitalName,
                        "fkProvId": Number(this.addform.province),
                        "fkCityId": Number(this.addform.city),
                        "hospitalLevel": Number(this.addform.hospitalLevel),
                        "hospitalGrade": Number(this.addform.hospitalGrade),
                        "nature": Number(this.addform.hospitalNature),
                        "fkPolyclinicId": Number(this.addform.hospitalType),
                        "fkSpecialtyId": Number(this.addform.specialtys),//专科类型
                        "numberOfBeds": Number(this.addform.bedNumber),
                        "alias1": this.addform.aka1,
                        "alias2": this.addform.aka2,
                        "alias3": this.addform.aka3,
                        "alias4": this.addform.aka4,
                        "alias5": this.addform.aka5,
                        "alias6": this.addform.aka6,
                        "alias7": this.addform.aka7,
                        "alias8": this.addform.aka8,
                        "alias9": this.addform.aka9,
                        "alias10": this.addform.aka10
                      }
                    }
                   

                
                this.axios.post(this.common.getApi() + '/sys/api/hospital/updeteInsertHospitl',params,{
                }).then((res) => {
              //  this.isload = false                
                  if(res.data.success){
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    })
                    this.getHospitalPage(this.pageIndex,this.pageSize);
                    this.dialogAddVisible = false;
                  }else{
                    this.$message.error(res.data.msg);
                  }
                  
                })
            }else {
              console.log('error submit!!');
              return false;
            }
          })
        }else if(formName == 'editform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
          //  this.isload = true;
              
              var params =  {
                      "params": {
                        "id":this.editId,
                        "name": this.editform.hospitalName,
                        "fkProvId": Number(this.editform.province),
                        "fkCityId": Number(this.editform.city),
                        "hospitalLevel": Number(this.editform.hospitalLevel),
                        "hospitalGrade": Number(this.editform.hospitalGrade),
                        "nature": Number(this.editform.hospitalNature),
                        "fkPolyclinicId": Number(this.editform.hospitalType),
                        "fkSpecialtyId": Number(this.editform.specialtys),//专科类型
                        "numberOfBeds": Number(this.editform.bedNumber),
                        "alias1": this.editform.aka1,
                        "alias2": this.editform.aka2,
                        "alias3": this.editform.aka3,
                        "alias4": this.editform.aka4,
                        "alias5": this.editform.aka5,
                        "alias6": this.editform.aka6,
                        "alias7": this.editform.aka7,
                        "alias8": this.editform.aka8,
                        "alias9": this.editform.aka9,
                        "alias10": this.editform.aka10
                      }
                    }
              
              
              this.axios.post(this.common.getApi() + '/sys/api/hospital/updeteInsertHospitl',params,{
              }).then((res) => {
            //  this.isload = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '编辑成功'
                  })
                  this.getHospitalPage(this.pageIndex,this.pageSize);
                  this.dialogEditVisible = false;
                }else{
                  this.$message.error(res.data.msg);
                }
                
              })
            }else {
              console.log('error submit!!');
              return false;
            }
          })          
        }

      }, 
      
      getHospitalPage(pageIndex,pageSize){
        this.loading = true
        this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospitalPage',{
          params:{
            pageIndex:pageIndex,
            pageSize:pageSize,
            params:{
              provinceId:this.province,
              cityId:this.city,
              hospitalLevel:this.hospitalLevel,
              name:this.hospitalName
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.tableData = res.data.obj.list;
            this.loading = false
            this.pageTotal = res.data.obj.pager.total
          }
        })        
      }, 
      getSpecialtys(){
        this.axios.get(this.common.getApi() + '/sys/api/specialty/getSpecialtys','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.specialtysList = res.data.obj;
          }
        })        
      }, 
      getHospitalType(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalType','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospitalTypeList = res.data.obj;
          }
        })        
      }, 
      getHospitalNature(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalNature','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospitalNatureList = res.data.obj;
          }
        })        
      }, 
      getHospitalGrade(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalGrade','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospitalGradeList = res.data.obj;
          }
        })        
      }, 
      getHospitalLevel(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalLevel','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospitalLevelList = res.data.obj;
          }
        })        
      }, 
      getProvince(){
        this.axios.get(this.common.getApi() + '/sys/api/area/getProvince','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.provinceList = res.data.obj;
          }
        })        
      }, 
      //获取城市列表
      getCityByProvince(provinceId){
        debugger
        this.city = null
        this.addform.city = null
        this.editform.city = null
        this.axios.get(this.common.getApi() + '/sys/api/area/getCityByProvince',{
          params:{
            params:{
              provinceId: provinceId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.cityList = res.data.obj;

          }
        })           
      }, 
      resetForm(){
        
        this.province = null;
        this.city = null;
        this.hospitalLevel = null;
        this.hospitalName = null;
      },
    
      go(currentPage){
        this.pageIndex = currentPage
        this.getHospitalPage(this.pageIndex,this.pageSize);
      },
     
      editshow(row){
        debugger
        this.editform.province = row.fkProvId.toString()
        if(Boolean(row.fkProvId)){
          this.getCityByProvince(row.fkProvId)
        }
        
        this.editform.city = row.fkCityId.toString()
        this.dialogEditVisible = true;
       this.editId = row.id
       this.editform.hospitalName = row.name
       this.editform.hospitalLevel = row.hospitalLevel.toString()
       this.editform.hospitalGrade = row.hospitalGrade.toString()
       this.editform.hospitalNature = row.nature.toString()
       this.editform.hospitalType = row.fkPolyclinicId.toString()
       if(!Boolean(row.fkSpecialtyId)){
         this.editform.specialtys = ''
       }else{
         this.editform.specialtys = row.fkSpecialtyId.toString()
       }
       
       this.editform.bedNumber = row.numberOfBeds
       this.editform.aka1 = row.alias1
       this.editform.aka2 = row.alias2
       this.editform.aka3 = row.alias3
       this.editform.aka4 = row.alias4
       this.editform.aka5 = row.alias5
       this.editform.aka6 = row.alias6
       this.editform.aka7 = row.alias7
       this.editform.aka8 = row.alias8
       this.editform.aka9 = row.alias9
       this.editform.aka10 = row.alias10

      }
    }
  }  
</script>

<style>
  .hospitalList-wrapper .query-wrapper {
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  
  .hospitalList-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{

    -webkit-appearance: none !important;
    margin: 0; 
}                                                                             

input[type="number"]{-moz-appearance:textfield;}  
.hospitalList-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }

  .hospitalList-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .hospitalList-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }
</style>