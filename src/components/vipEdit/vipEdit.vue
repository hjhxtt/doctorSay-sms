<template>
  <div class="vipEdit-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" size="mini" :inline-message='true'>
      <el-form-item label="推荐人"  required>
        <el-input v-model="form.recommendcode" disabled style="width: 200px;margin-right: 10px;"></el-input>我的推荐码：{{form.smscode}}
      </el-form-item>
      <el-form-item label="手机号码" prop="memberHandphone" required>
        <el-input v-model="form.memberHandphone" disabled style="width: 200px;margin-right: 10px;"></el-input>我们将只会使用该手机号码，已短信的形式通知您参加调查
      </el-form-item>
      <el-form-item label="真实姓名" prop="memberRealname" >
        <el-input v-model="form.memberRealname" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.memberMail" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="您的性别" prop="memberSex" required>
        <el-radio-group v-model="form.memberSex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="科室电话">
        <el-input v-model="form.departmentstle" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker
          v-model="form.registerTime"
          type="datetime"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>        
      </el-form-item>
      
      <el-form-item label="职称" prop="memberstation">
        <el-select v-model="form.zc_1" @change = "getStationTechnicalTitle(form.zc_1);clear();" style="width: 98px;">
          <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
        </el-select>
        <el-select v-model="form.memberstation" style="width: 98px;">
          <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
        </el-select>  
      </el-form-item>
      <el-form-item label="执业证类型" prop="membercertificatetype">
        <el-select v-model="form.membercertificatetype" style="width: 200px;">
          <el-option v-for="item in member_options" :label="item.label" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="证件号" prop="memberidcard">
        <el-input v-model="form.memberidcard" style="width: 200px;margin-right: 10px;"></el-input>
      </el-form-item>
      
      <el-form-item label="工作科室" prop="membersectionoffice">
        <el-select v-model="form.hospital_departments_1" style="width: 198px;" @change="getSonOffice(form.hospital_departments_1);clear2();">
          <el-option v-for="item in hospital_1_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
        </el-select>
        <el-select v-model="form.membersectionoffice" style="width: 198px;">
          <el-option v-for="item in hospital_2_options" :label="item.sectionofficename" :key="item.sectionofficeid" :value="item.sectionofficeid"></el-option>
        </el-select>
      </el-form-item>
        
      <el-form-item label="行政职位" prop="administrativeposition">
        <el-select v-model="form.administrativeposition" style="width: 200px;">
          <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在医院" prop="fkHospitalId">
        <el-select placeholder="请选择" v-model="form.memberProvince" style="width: 131px;" @change="getCityByProvince(form.memberProvince);clearByP();getHospital(form.memberProvince,form.memberCity,form.fkDistrictId,null)">
          <el-option v-for="item in province_options" :label="item.provinceName" :value="item.provinceId" :key="item.provinceId"></el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="form.memberCity" style="width: 131px;" @change="getDistrictByCity(form.memberProvince,form.memberCity);clearByC();getHospital(form.memberProvince,form.memberCity,form.fkDistrictId,null)">
          <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="form.fkDistrictId" style="width: 130px;" @change="clearByD();getHospital(form.memberProvince,form.memberCity,form.fkDistrictId,null)">
          <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          
        </el-select>
        <br>
        <el-select placeholder="请选择" style="width: 400px;margin-top: 10px;" v-model="form.fkHospitalId" @change="getHospitalById(form.fkHospitalId)">
          <el-option v-for="item in hospital_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          <el-option label="其他" value="-1"></el-option>
        </el-select>
        <br>
        <el-input style="width: 400px;margin-top: 10px;" v-if="form.fkHospitalId == -1" v-model="form.memberhospital"></el-input>
        
        
      </el-form-item>
      <el-form-item label="医院信息:" v-if = "form.fkHospitalId != -1">
        <div>医院级别：{{level}}</div>
        <div>医院等级：{{grade}}</div>
        <div>医院性质：{{hospitalNature}}</div>
        <div>医院类型：{{hospitalType}}</div>
        <div>专科类型：{{professionalType}}</div>
        <div>床位数：{{numberOfBeds}}</div>
      </el-form-item>
      
      <!-- <el-form-item label="从医领域" prop="medical_field_2" style="width:518px;"> 
        <el-button @click="visi=true">选择</el-button>
      </el-form-item> -->
      <el-form-item label="从医领域" prop="medical_field_2"> 
        <el-row><el-button @click="visi=true" style="margin-bottom:10px;">选择</el-button></el-row>
        <span style="display:none;">
          <el-select  v-model="form.medical_field_1" placeholder="请选择" multiple style="width:400px;margin-bottom: 10px;" @change="getSonFields2(form.medical_field_1)">
            <el-option v-for="item in field_1_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </span>
        
        <!-- <br /> -->
        <el-select v-model="form.membertechnical" placeholder="请选择" multiple style="width: 400px;">
          <el-option v-for="item in field_2_options" :label="item.fieldname" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="接听电话时间" prop="end_time" >
        <el-time-select
          placeholder="请选择起始时间"
          v-model="form.beginTime"
          style="width: 200px;"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '18:00',
          }">
        </el-time-select>
        <span style="margin: 0 12px;">到</span>
        <el-time-select
          placeholder="请选择结束时间"
          v-model="form.endTime"
          style="width: 200px;"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '18:00',
            minTime: form.beginTime
          }">
        </el-time-select>
      </el-form-item > 
      <el-form-item label="从医年份">
        <el-date-picker
          style="width: 200px;"
          v-model="form.workdate"
          type="year"
          placeholder="选择年份"
          value-format="yyyy">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="出生年份">
        <el-date-picker
          style="width: 200px;"
          v-model="form.memberBirYear"
          type="year"
          placeholder="选择年份"
          value-format="yyyy">
        </el-date-picker>        
      </el-form-item>
      <el-form-item label="加入的学会" prop="societyid">
        <el-select v-model="form.societyid" multiple placeholder="请填写您参加过的学会" class="meetingInput" style="width: 400px;">
          <el-option v-for="item in meeting_options" :label="item.societyname" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历" prop="memberEducation">
        <el-select v-model="form.memberEducation" style="width: 200px;">
          <el-option v-for="item in education_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="毕业时间">
        <el-date-picker v-model="form.graduationTime" type="year" placeholder="选择日期" value-format="yyyy" style="width: 200px;"></el-date-picker>
      </el-form-item>

      <el-form-item label="毕业院校" prop="graduationInstitutions">
        <el-select placeholder="请选择省份" v-model="form.province" @change="getGraduateList(form.province);clearSchool()">
          <el-option v-for="item in province_options" :label="item.provinceName" :key="item.provinceId" :value="item.provinceId"></el-option>
        </el-select>
        <el-select placeholder="请选择学校" v-model="form.graduationInstitutions">
          <el-option v-for="item in school_options" :label="item.graduatename" :key="item.graduateid" :value="item.graduateid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执业证1">
        <img style="max-width:400px;max-height:400px;" :src="form.filename" alt="">
      </el-form-item>  
      <el-form-item label="执业证2">
        <img style="max-width:400px;max-height:400px;" :src="form.secondfilename" alt="">
      </el-form-item>     
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" :loading="isload">保存</el-button>
      </el-form-item> 
    </el-form>
    <el-dialog title="列表" width="800px" :visible.sync="visi">
      <div class="info_body">
        <div class="box" style="overflow-y:scroll;">
          



          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.medical_field_1"  @change="getSonFields2(form.medical_field_1)">
            <el-checkbox v-for="item in field_1_options"  :label="item.id"  :key="item.id"  >{{item.fieldname}}</el-checkbox>
          </el-checkbox-group>
        </div>
        



        <div class="box" style="overflow-y:scroll;">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="form.membertechnical" @change="shouw">
            <el-checkbox v-for="item in field_2_options" :label="item.id" :value="item.id" :key="item.id">{{item.fieldname}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visi = false">取 消</el-button>
        <el-button type="primary" @click="listSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        professionalType:'',
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'],
        isIndeterminate: true,
        checkList:'',
        checkList1:'',
        visi:false,
        member_options:[
          {label:"医师资格证", id:1},
          {label:"医师执业证", id:2},
          {label:"护士资格证", id:3},
          {label:"药师资格证", id:4},
          {label:"药师执业证", id:5},
          {label:"护士执业证", id:8},
        ],
        form: {
          memberHandphone: null,
          smscode: null,
          memberRealname:null,
          memberMail:null,
          memberSex: null,
          memberBirYear: null,
          departmentstle:null,
          workdate:null,
          zc_1:null,
          memberstation:null,
          memberidcard:null,
          administrativeposition:null,
          medical_field_1:null,
          membertechnical:[],
          hospital_departments_1:null,
          membersectionoffice:null,
          memberProvince:null,
          memberCity:null,
          fkDistrictId:null,
          fkHospitalId:null,
          societyid:null,
          memberEducation:null,
          graduationTime:null,
          endTime:null,
          beginTime:null,
          registerTime:null,
          memberhospital: null,
          inputhospital: null,
          province:null,
          graduationInstitutions:null,
          membercertificatetype:null//执业证类型
        },
        rules: {
          memberHandphone: [
            { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
          memberRealname:[
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          memberSex:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          fkHospitalId:[
            { required: true, message: '请选择所在医院', trigger: 'change' }
          ],
          departmentstle:[
            { required: true, message: '请填写科室电话', trigger: 'blur' }
          ],
          membersectionoffice:[
            { required: true, message: '请选择工作科室', trigger: 'change' }
          ],
          memberidcard:[
            { required: true, message: '请填写证件号', trigger: 'blur' }
          ],
          administrativeposition:[
            { required: true, message: '请选择行政职位', trigger: 'change' }
          ],
          memberstation:[
            { required: true, message: '请选择职称', trigger: 'change' }
          ],
          membertechnical:[
            { required: true, message: '请选择从医领域', trigger: 'change' }
          ],
          registerTime:[
            { required: true, message: '请选择注册时间', trigger: 'change' }
          ],
        },
        zc_1_options:[],
        zc_2_options:[],
        xzzw_options:[],
        field_1_options:[],
        field_2_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        province_options:[],
        city_options:[],
        region_options:[],
        hospital_options:[],
        education_options:[],
        school_options:[],
        meeting_options:[],
        level:null,
        grade:null,
        hospitalNature:null,
        hospitalType:null,
        numberOfBeds:null,
        
        isload: false,
      };
    },
    mounted(){
      this.getStationDuties();
      this.getAdminiStraion();
      this.getParentFields();
      this.getParentOffice();
      this.getProvince();
      this.getMemberInfoForEdit();
      this.getEducational();
      this.getSociety();
      debugger
      console.log(this.$route.params.idnh);
    },
    methods: {
      clearSchool(){
        this.form.graduationInstitutions = ''
      },
      clearByP(){
        this.form.memberCity = ''
      this.form.fkDistrictId = ''
      this.form.fkHospitalId = ''
      },
      clearByC(){
      this.form.fkDistrictId = ''
      this.form.fkHospitalId = ''
      },
      clearByD(){
      this.form.fkHospitalId = ''
      },
      clear2(){
        this.form.membersectionoffice = ''
      },
      clear(){
        this.form.memberstation = ''
      },
      shouw(){
        console.log(this.form.membertechnical);
        console.log(this.field_2_options);
        
        
      },
      listSelect(){
        this.visi = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isload = true;
            var memberSex = null;
            if(this.form.memberSex === 0){
              memberSex = "男"
            }else if(this.form.memberSex === 1){
              memberSex = "女"
            }

            var societyid = null
            if(Boolean(this.form.societyid)){
              societyid = this.form.societyid.join(',')
            }
            
            var membertechnical = null
            if(Boolean(this.form.membertechnical)){
              membertechnical = this.form.membertechnical.join(',')
            }
            
            var beginTime = null
            if(Boolean(this.form.beginTime)){
              beginTime = this.form.beginTime.slice(0,2)
            }
            var endTime = null
            if(Boolean(this.form.endTime)){
              endTime = this.form.endTime.slice(0,2)
            }
  


            this.axios.post(this.common.getApi() + '/sys/api/member/editMember',{
              params:{
                id: Number(sessionStorage.getItem("userid")),
                memberRealname: this.form.memberRealname,
                memberMail: this.form.memberMail,
                memberSex: memberSex,
                memberBirYear: Number(this.form.memberBirYear),
                departmentstle: this.form.departmentstle,
                registerTime: this.form.registerTime,
                workdate: Number(this.form.workdate),
                memberstation: Number(this.form.memberstation),
                memberidcard: this.form.memberidcard,
                membersectionoffice: Number(this.form.membersectionoffice),
                administrativeposition: Number(this.form.administrativeposition),
                membertechnical: membertechnical,
                memberProvince: Number(this.form.memberProvince),
                memberCity: Number(this.form.memberCity),
                fkDistrictId: Number(this.form.fkDistrictId),
                fkHospitalId: this.form.fkHospitalId,
                memberhospital: this.form.memberhospital,
                societyid:societyid,
                memberEducation: Number(this.form.memberEducation),
                graduationTime: this.form.graduationTime,
                graduationInstitutions: this.form.graduationInstitutions,
                beginTime: beginTime,
                endTime: endTime,
                membercertificatetype:this.form.membercertificatetype//执业证
              },
            }).then((res) => {
              this.isload = false                
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '保存成功'
                })
              }else{
                this.isload = false  
                this.$message.error(res.data.msg);
              }
            }).catch(err=>{
              this.isload = false   
              this.$message.error(err.message);
            })
          }else {
            this.isload = false  
            this.$message.error('请完善数据');
            return false;
          }
        })
      },
      getMemberInfoForEdit(){
        var id = sessionStorage.getItem("userid");
        this.axios.get(this.common.getApi() + '/sys/api/member/getMemberInfoForEdit',{
          params:{
            params:{
              id: Number(id)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlenc  oded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            console.log(res.data.obj);
            this.form.filename = this.common.getApi() + res.data.obj.filename
            debugger
            this.form.secondfilename = this.common.getApi() + res.data.obj.secondfilename
            this.form.memberHandphone = res.data.obj.memberHandphone;
            this.form.smscode = res.data.obj.smscode;
            this.form.memberRealname = res.data.obj.memberRealname;
            this.form.memberMail = res.data.obj.memberMail;
            this.form.recommendcode = res.data.obj.recommendcode;
            if(res.data.obj.memberSex === '男'){
              this.form.memberSex = 0;
            }else if(res.data.obj.memberSex === '女'){
              this.form.memberSex = 1;
            }
            this.form.departmentstle = res.data.obj.departmentstle;
            this.form.memberstation = res.data.obj.memberstation.toString();
            this.form.memberidcard = res.data.obj.memberidcard;
            if(Number(res.data.obj.administrativeposition)>0){
              this.form.administrativeposition = res.data.obj.administrativeposition.toString();
            }
            
            this.getStationById();
            this.form.membertechnical = res.data.obj.membertechnical;
            if(this.form.membertechnical.length != 0){
              this.form.membertechnical = this.form.membertechnical.split(',');
              var a = [];
              for(var i = 0; i < this.form.membertechnical.length; i++){
                a.push(this.form.membertechnical[i]);
              }
              this.form.membertechnical = a;
              this.getFieldsById();
            }
            this.form.membersectionoffice = res.data.obj.membersectionoffice;
            this.getSectionOfficeById();
            this.form.memberProvince = res.data.obj.memberProvince;
            this.getCityByProvince(this.form.memberProvince)

            if(Boolean(res.data.obj.memberCity)){
              this.form.memberCity = res.data.obj.memberCity;
            }
            debugger
            if(Boolean(res.data.obj.fkDistrictId) && Number(res.data.obj.fkDistrictId)>=0){
              this.form.fkDistrictId = res.data.obj.fkDistrictId.toString();
            }
             
            this.getDistrictByCity(this.form.memberProvince,this.form.memberCity);
            debugger
            if(res.data.obj.fkHospitalId != 0){
              this.form.fkHospitalId = res.data.obj.fkHospitalId.toString();              
            }else{
              this.form.fkHospitalId = res.data.obj.fkHospitalId.toString();              
            }
            this.form.memberhospital = res.data.obj.memberhospital.toString();
//          this.form.inputhospital = res.data.obj.memberhospital;
            if(Boolean(res.data.obj.memberEducation)){
              this.form.memberEducation = res.data.obj.memberEducation.toString();//改
            }
            if(Boolean(res.data.obj.memberBirYear)){
              this.form.memberBirYear = res.data.obj.memberBirYear.toString();//改
            }
            if(Boolean(res.data.obj.workdate)){
              this.form.workdate = res.data.obj.workdate.toString();//改
            }
            if(Boolean(res.data.obj.graduationTime)){
              this.form.graduationTime = res.data.obj.graduationTime;//改
            }
            
            if(res.data.obj.beginTime < 10){
              this.form.beginTime = "0"+ res.data.obj.beginTime + ":00"
            }else if(res.data.obj.beginTime >= 10){
              this.form.beginTime = res.data.obj.beginTime + ":00"
            }
            if(res.data.obj.endTime < 10){
              this.form.endTime = "0"+ res.data.obj.endTime + ":00"
            }else if(res.data.obj.endTime >= 10){
              this.form.endTime = res.data.obj.endTime + ":00"
            }
            
            this.getHospitalById(this.form.fkHospitalId);    
            
            this.form.registerTime = res.data.obj.registerTime;
            this.form.societyid = res.data.obj.societyid;
            if(this.form.societyid.length != 0){
              this.form.societyid = this.form.societyid.split(',');
              var b = [];
              for(var i = 0; i < this.form.societyid.length; i++){
                b.push(this.form.societyid[i]);
              }
              this.form.societyid = b;
            }
            this.form.graduationInstitutions = res.data.obj.graduationInstitutions;

            switch (res.data.obj.membercertificatetype) {
              case 1:
                  this.form.membercertificatetype = "医师资格证"
                break;
              case 2:
                  this.form.membercertificatetype = "医师执业证"
                break;

                case 3:
                  this.form.membercertificatetype = "护士资格证"
                break;
                case 4:
                  this.form.membercertificatetype = "药师资格证"
                break;
                case 5:
                  this.form.membercertificatetype = "药师执业证"
                break;
                case 6:
                  this.form.membercertificatetype = "护士执业证"
                break;
            }

            this.getGraduateById(Number(this.form.graduationInstitutions));
          }
        })                 
      },
      getStationById(){
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationById',{
          params:{
            params:{
              id: this.form.memberstation
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.zc_1 = res.data.obj.parentid.toString();
            this.getStationTechnicalTitle(this.form.zc_1)
          }
        })        
      },
      //获取职称一级
      getStationDuties(){
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationDuties','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zc_1_options = res.data.obj;
          }
        })   
      },
      //获取职称二级
      getStationTechnicalTitle(parentId){
        
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationTechnicalTitle',{
          params:{
            params:{
              parentId: Number(parentId)
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zc_2_options = res.data.obj;
            
          }
        })   
      },
      //获取行政职位
      getAdminiStraion(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getAdminiStraion','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.xzzw_options = res.data.obj;
          }
        })        
      },
      //获取从医领域一级
      getParentFields(){
        this.axios.get(this.common.getApi() + '/sys/api/fields/getParentFields','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.field_1_options = res.data.obj;
          }
        })        
      },
      getSonFields1(parentId){
          this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
            params:{
              params:{
                parentId:parentId,
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.field_2_options = this.field_2_options.concat(res.data.obj);
            }
          })
        //}
      },
      getSonFields2(parentId){
        console.log(this.form.membertechnical);
        if(this.field_2_options.length == 0){
          this.form.membertechnical = []
        }
        
        this.field_2_options = [];
        for(var i = 0; i < parentId.length; i++){
          this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
            params:{
              params:{
                parentId:parentId[i],
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.field_2_options = this.field_2_options.concat(res.data.obj);
            }
          })
        }
      },      
      getFieldsById(){
        this.form.medical_field_1 = [];
        for(var i = 0; i < this.form.membertechnical.length;i++){
          this.axios.get(this.common.getApi() + '/sys/api/fields/getFieldsById',{
            params:{
              params:{
                id: Number(this.form.membertechnical[i])
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              if(this.form.medical_field_1.indexOf(res.data.obj.parentid) == -1){
                this.form.medical_field_1.push(res.data.obj.parentid);
                this.getSonFields1(res.data.obj.parentid);
              }
            }
          })
        }
      },
      //获取科室一级
      getParentOffice(){
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getParentOffice','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_1_options = res.data.obj;
          }
        })
      },
      //获取科室二级
      getSonOffice(parentId){
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSonOffice',{
          params:{
            params:{
              parentId:parentId,
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_2_options = res.data.obj;
          }
        })        
      },   
      getSectionOfficeById(){
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSectionOfficeById',{
          params:{
            params:{
              id: this.form.membersectionoffice
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.form.hospital_departments_1 = res.data.obj.parentid;
            this.getSonOffice(this.form.hospital_departments_1)
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
            this.province_options = res.data.obj;
          }
        })        
      }, 
      //获取城市列表
      getCityByProvince(provinceId){
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
            this.city_options = res.data.obj;

          }
        })           
      },  
      //获取地区
      getDistrictByCity(provinceId,cityId){
        this.axios.get(this.common.getApi() + '/sys/api/area/getDistrictByCity',{
          params:{
            params:{
              cityId: cityId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.region_options = res.data.obj;
          }
        })
        this.getHospital(this.form.memberProvince,this.form.memberCity,this.form.fkDistrictId,null)
        // //获取医院
        // this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospital',{
        //   params:{
        //     params:{
        //       provinceId: provinceId,
        //       cityId: cityId
        //     }
        //   }
        // },{
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }).then((res) => {
        //   if(res.data.code == '200'){
        //     this.hospital_options = res.data.obj;
        //   }
        // })        
      },  
      //获取医院
      getHospital(provinceId,cityId,fkDistrictId,hospitalLevel){
        //特殊情况
        if(fkDistrictId<0){
          fkDistrictId=null
        }
        this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospital',{
          params:{
            params:{
              provinceId:provinceId,
              cityId: cityId,
              fkDistrictId:fkDistrictId,
              hospitalLevel:hospitalLevel
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_options = res.data.obj;
          }
        })
      },
      //获取教育程度
      getEducational(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getEducational','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.education_options = res.data.obj;
          }
        })           
      },
      getHospitalById(id){
        if(this.form.fkHospitalId != 0){
          this.form.inputhospital = ""
          this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospitalById',{
            params:{
              params:{
                id: id
              }
            }
          },{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) => {
            if(res.data.code == '200'){
              this.level = res.data.obj.level;
              this.grade = res.data.obj.grade;
              this.hospitalNature = res.data.obj.hospitalNature;
              this.hospitalType = res.data.obj.hospitalType;
              this.numberOfBeds = res.data.obj.numberOfBeds;
              this.professionalType = res.data.obj.professionalType;
            }
          })
        }else{
          this.level = null
          this.grade = null
          this.hospitalNature = null
          this.hospitalType = null
          this.numberOfBeds = null
          this.professionalType = null
        }
      },
      getSociety(){
        this.axios.get(this.common.getApi() + '/sys/api/society/getSociety','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.meeting_options = res.data.obj
          }
        })             
      },
      getGraduateList(provinceId){
        this.school_options = null;
        this.form.school = null;
        this.axios.get(this.common.getApi() + '/sys/api/graduate/getGraduateList',{
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
            this.school_options = res.data.obj;
          }
        })        
      },
      getGraduateById(id){
        this.axios.get(this.common.getApi() + '/sys/api/graduate/getGraduateById',{
          params:{
            params:{
              id: id
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            if(Boolean(res.data.obj)){
              this.form.province = res.data.obj.provinceid.toString();
              this.getGraduateList(Number(this.form.province));
            }
            
          }
        })        
      }
    }
  }  
</script>

<style>
  .info_body{
    border:1px solid #ccc;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    padding: 20px;
  }
  .info_body .box{
    height: 300px;
    width: 300px;
    margin:0 20px;
  }
  .el-checkbox {
    display: block;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: 30px;
}
</style>