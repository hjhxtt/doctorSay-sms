<template>
  <div class="addParam-wrapper">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="抽样条件名称" prop="sample_name">
        <el-input v-model="ruleForm.sample_name" class="inputlength"></el-input>
      </el-form-item>
    </el-form>
    <!-- 增加条件 -->
    <h2 style="font-size:20px;color:#333;padding-left:20px;">增加条件</h2>
    <el-form :model="addForm" ref="addForm" :rules="add_rules" label-width="150px" size="medium" >
          <el-form-item label="会员账户(手机号)：" prop="vip_phone">
            <el-input type="textarea" v-model="addForm.vip_phone" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="会员账户(数字ID)：" prop="vip_id">
            <el-input type="textarea" v-model="addForm.vip_id" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="addForm.sex" class="inputlength">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <div style="border-bottom:1px solid #E6E6E6;margin-bottom:20px;" class="line"></div>
          <!-- todo -->
            <el-form-item label="职称：">
              
                <el-select v-model="addForm.zc_1" class="selectlength" @change = "getStationTechnicalTitle(addForm.zc_1)">
                  <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
                </el-select>
              
            </el-form-item>
            <el-row>

              <el-col :span="12">
                  <el-select v-model="addForm.zc_2" class="selectlength" style='margin-left:150px;' multiple>
                    <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
                  </el-select>
              </el-col>
              <el-col :span="12">
                  <div class="selectTo" @click="addZc">></div>
                  <div class="secondBox"  style=" float:left;">
                    <span>职称：</span>
                    <el-tag v-for="(tag,index) in zc_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,zc_tags,memberstationIn)">
                      {{tag.name}}
                    </el-tag>
                  </div>
              </el-col>
              
            </el-row>
          
          <div style="border-bottom:1px solid #E6E6E6;margin:20px 0;" class="line"></div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所在省份：" prop="province">
                <el-select v-model="addForm.province" class="selectlength" @change = "getCityByProvince(addForm.province)" >
                  <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <div class="selectTo" @click="addProvince()">></div>
                <div class="secondBox"  style=" float:left;">

                  <span style="margin-left: 10px;">省份：</span>
                  <el-tag v-for="(tag,index) in province_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,province_tags,memberProvinceIn)">
                    {{tag.name}}
                  </el-tag>
                </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所在城市：" prop="city">
                <el-select v-model="addForm.city" class="selectlength" @change = "getHospital(addForm.province,addForm.city)" multiple>
                  <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <div class="selectTo" @click="addCity()">></div>
                <div class="secondBox"  style=" float:left;">
                  <span style="margin-left: 10px;">所在城市：</span>
                  <el-tag v-for="(tag,index) in city_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,city_tags,memberCityIn)">
                    {{tag.name}}
                  </el-tag>
                </div>
            </el-col>
          </el-row>
          <div style="border-bottom:1px solid #E6E6E6;margin-bottom:20px;" class="line"></div>
          <!-- <el-form-item label="医院名称：" prop="hospital">
            <el-select v-model="addForm.hospital" class="selectlength" multiple>
              <el-option v-for="item in hospital_options" :label="item.name" :value="item.name" :key="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          
          <el-form-item label="医院级别：" prop="level" >
            <el-select v-model="addForm.level" class="selectlength" multiple>
              <el-option v-for="item in level_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="医院性质：">
            <el-select v-model="addForm.hospital_xz" class="selectlength" multiple>
              <el-option :value="item.id" :label="item.sysname" v-for="item in xz_options" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院等级：" prop="hospital_grade">
            <el-select v-model="addForm.hospital_grade" class="selectlength" multiple>
              <el-option v-for="item in hospital_grade_options" :value="item.id" :label="item.sysname" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院类型：" prop="hospital_type">
            <el-select v-model="addForm.hospital_type" class="selectlength" multiple>
              <el-option v-for="item in hospital_type_options" :value="item.id" :key="item.id" :label="item.sysname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专科类型：" prop="hospital_type">
            <el-select v-model="addForm.fkSpecialtyId" class="selectlength" multiple>
              <el-option v-for="item in zklx_options" :value="item.id" :key="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item> -->
          <div style="border-bottom:1px solid #E6E6E6;margin-bottom:20px;" class="line"></div>
          
            <el-row>
              <el-form-item label="科室：">
                <el-select v-model="addForm.hospital_room_1" class="selectlength" @change="getSonOffice(addForm.hospital_room_1)">
                  <el-option v-for="item in hospital_1_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          <el-row>
            <el-col :span="12">
               <el-select v-model="addForm.hospital_room_2" class="selectlength" style='margin-left: 150px;' multiple>
                  <el-option v-for="item in hospital_2_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
              <div class="selectTo" @click="addHospitalRoom()">></div>
              <div class="secondBox" style="margin-left: 50px;">
                <span style="margin-left: 10px;">科室：</span>
                <el-tag v-for="(tag,index) in room_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,room_tags,membersectionoffice)">
                  {{tag.name}}
                </el-tag>
              </div>
            </el-col>
          </el-row>
          
          
          <div style="border-bottom:1px solid #E6E6E6;margin:20px 0;" class="line"></div>
          <el-form-item label="行政职位：" prop="hospital_xzzw">
            <el-select v-model="addForm.hospital_xzzw" class="selectlength" multiple>
              <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 排他条件 -->
        <h2 style="font-size:20px;color:#333;padding-left:20px;">排他条件</h2>
        <div style="height: 450px;overflow-y: auto;">
        <el-form :model="removeForm" ref="removeForm" :rules="remove_rules" label-width="150px" size="medium" >
          <el-form-item label="会员账户(手机号)：" prop="vip_phone">
            <el-input type="textarea" v-model="removeForm.vip_phone" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="会员账户(数字ID)：" prop="vip_id">
            <el-input type="textarea" v-model="removeForm.vip_id" class="inputlength" resize="none"></el-input>
          </el-form-item>
          <div style="border-bottom:1px solid #E6E6E6;margin-bottom:20px;" class="line"></div>
          <el-form-item label="职称：">
            <el-select v-model="removeForm.zc_1" class="selectlength" @change = "getStationTechnicalTitle(removeForm.zc_1)">
              <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-select v-model="removeForm.zc_2" class="selectlength" multiple>
                <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <div class="selectTo" style="margin-left:-75px;" @click="delZc()">></div>
              <div class="secondBox" style="margin-left:-25px;">
                <span style="margin-left: 10px;">职称：</span>
                <el-tag v-for="(tag,index) in zcNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,zcNot_tags,memberstationNot)">
                  {{tag.name}}
                </el-tag>
              </div>
            </el-col>
          </el-form-item>
          
          <div style="border-bottom:1px solid #E6E6E6;margin-bottom:20px;" class="line"></div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所在省份：" prop="province">
                <el-select v-model="removeForm.province" class="selectlength" @change = "getCityByProvince(removeForm.province)">
                  <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <div class="selectTo" @click="delProvince()">></div>
                <div class="secondBox" style="margin-left: 50px;">
                  <span style="margin-left: 10px;">所在省份：</span>
                  <el-tag v-for="(tag,index) in provinceNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,provinceNot_tags,memberProvinceNot)">
                    {{tag.name}}
                  </el-tag>
                </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所在城市：" prop="city">
                <el-select v-model="removeForm.city" class="selectlength" @change = "" multiple>
                  <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <div class="selectTo" @click="delCity()">></div>
                <div class="secondBox" style="margin-left: 50px;">
                  <span style="margin-left: 10px;">所在城市：</span>
                  <el-tag v-for="(tag,index) in cityNot_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,cityNot_tags,memberCityNot)">
                    {{tag.name}}
                  </el-tag>
                </div>
            </el-col>
          </el-row>
          <!-- <el-form-item label="所在地区：" prop="region">
            <el-select v-model="removeForm.region" class="selectlength">
              <el-option v-for="item in region_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" style="margin:0 0 50px 150px" @click="saveParam()">保存</el-button>
      </span>
  </div>
</template>

<script>
  export default {
    data() {
      var checkVipphone = (rule, value, callback) => {
        var result=value.split(",");
        var regu =/^1[34578]\d{9}$/;
        var flag = true;
        var s = result.join(",")+",";
        var r = this.memberHandphoneIn;
        for(var i = 0; i < result.length; i ++){
          if(!regu.test(Number(result[i])) || s.replace(result[i]+",","").indexOf(result[i]+",")>-1 || r.indexOf(result[i])>-1){
            flag = false;
          }
        }
        if(!flag && value != ""){
          callback(new Error('手机号码格式不正确或手机号有重复'));
        }else{
          callback();
        }
      };
      var checkVipid = (rule, value, callback) => {
        var result=value.split(",");
        var regu =/^[0-9]*$/;
        var flag = true;
        var s = result.join(",")+",";
        var r = this.memberIdIn.join(",")+",";
        for(var i = 0; i < result.length; i ++){
          if(!regu.test(Number(result[i])) || s.replace(result[i]+",","").indexOf(result[i]+",")>-1 || r.indexOf(result[i])>-1){
            flag = false;
          }
        }
        if(!flag && value != ""){
          callback(new Error('id格式不正确或id有重复'));
        }else{
          callback();
        }
      };
      return {
        isload: false,
        isNoData: true,
        isNotFlagData:true,
        zc_1_options:[],//职称一级
        zc_2_options:[],//职称二级
        province_options: [],
        city_options:[],
        region_options:[],
        hospital_options:[],
        xzzw_options:[],
        zklx_options:[],
        level_options:[],
        xz_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        education_options:[],
        hospital_grade_options:[],
        fields_1_options:[],
        fields_2_options:[],
        hospital_type_options:[],
        datesize_options: [{
          value: '0',
          label: ''
        },{
          value: '1',
          label: '>='
        }, {
          value: '2',
          label: '<='
        }],
        ruleForm: {
          sample_name: '',
        },
        rules: {
          sample_name: [
            { required: true, message: '请输入抽样条件名称', trigger: 'blur' }
          ],
        },
        add_rules:{
          vip_phone:[
            { validator: checkVipphone, trigger: 'blur' }
          ],
          vip_id:[
            { validator: checkVipid, trigger: 'blur' }
          ],
        },
        addForm: {
          vip_phone:'',
          vip_id:'',
          sex:'',
          zc_1:'',
          zc_2:'',
          province:'',
          city:'',
          region:'',
          hospital:'',
          provincelist:[],
          citylist:[],
          regionlist:[],
          hospitallist:[],
          hospital_xzzw:'',//行政职位
          xzzwlist:[],
          level:'',//医院级别
          hospitaltypelist:[],
          register_date:'',
          date_size:'',
          hospital_xz:'',//医院性质
          xzlist:[],
          start_date:'',
          end_date:'',
          datelist:[],
          hospital_room_1:'',
          hospital_room_2:'',
          education:'',
          hospital_grade:'',
          fields_1:'',
          fields_2:'',
          hospital_type:'',
          fkSpecialtyId:''
        },
        remove_rules:{
          vip_phone:[
            { validator: checkVipphone, trigger: 'blur' }
          ],
          vip_id:[
            { validator: checkVipid, trigger: 'blur' }
          ],
        },
        removeForm: {
          vip_phone:'',
          vip_id:'',
          sex:'',
          zc_1:'',
          zc_2:'',
          province:'',
          city:'',
          region:'',
        },
        addDialogVisible: false,
        removeDialogVisible: false,
        //要显示的数据
        phone_tags: [],
        id_tags:[],
        sex_tags: [],//性别显示
        zc_tags: [],
        province_tags: [],
        city_tags: [],
        region_tags: [],
        hospital_tags:[],
        xzzw_tags:[],
        level_tags:[],
        xz_tags:[],
        room_tags:[],
        education_tags:[],
        grade_tags:[],
        fields_tags:[],
        type_tags:[],
        registertime_txt:'',//注册时间标签显示
        date_tags:[],

        phoneNot_tags:[],
        idNot_tags:[],
        zcNot_tags:[],
        provinceNot_tags:[],
        cityNot_tags:[],
        regionNot_tags:[],
        //要传的数组
        memberHandphoneIn:[],//手机号包含
        memberIdIn:[],//会员id包含
        sexIn:[],//性别包含
        memberstationIn:[],//职称包含
        memberProvinceIn:[],//省份包含
        memberCityIn:[],//城市包含
        memberDistrictIn:[],//地区包含
        memberhospital:[],//医院包含
        administrativeposition:[],//行政职位
        memberhospitallevel:[],//医院级别
        nature:[],//医院性质
        membersectionoffice:[],//科室
        memberEducation:[],//教育
        hospitalGrade:[],//医院等级
        membertechnical:[],//从医领域
        fkPolyclinicId:[],//医院类型
        memberBirYear:[],//出生年份
        registerTime:null,

        memberHandphoneNot:[],//手机号排他
        memberIdNot:[],//会员id排他
        memberstationNot:[],
        memberProvinceNot:[],
        memberCityNot:[],
        memberDistrictNot:[]
      };
    },
    mounted(){
      this.getStationDuties();
      this.getProvince();
      this.getAdminiStraion();
      this.getHospitalLevel();
      this.getHospitalNature();
      this.getParentOffice();
      this.getEducational();
      this.getHospitalGrade();
      this.getParentFields();
      this.getHospitalType();
      this.getSpecialtys()
    },
    methods: {
      //获取专科分类
      getSpecialtys(){
        this.axios.get(this.common.getApi() + '/sys/api/specialty/getSpecialtys','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.zklx_options = res.data.obj;
            
          }
        })
      },
      saveParam(){
        
        if(this.ruleForm.sample_name==''){
          this.$message.error('请输入抽样条件名')
          return false
        }





        var memberCityNot =[]
        this.cityNot_tags.map(e=>{
          memberCityNot.push({
            id:e.id,
            value:e.name
          })
        })

        var memberCityIn =[]
        this.city_tags.map(e=>{
          memberCityIn.push({
            id:e.id,
            value:e.name
          })
        })

        var memberProvinceIn =[]
        this.province_tags.map(e=>{
          memberProvinceIn.push({
            id:e.id,
            value:e.name
          })
        })

         var memberProvinceNot =[]
        this.provinceNot_tags.map(e=>{
          memberProvinceNot.push({
            id:e.id,
            value:e.name
          })
        })

        var memberstationIn =[]
        this.zc_tags.map(e=>{
          memberstationIn.push({
            id:e.id,
            value:e.name
          })
        })
        
        var memberstationNot =[]
        this.zcNot_tags.map(e=>{
          memberstationNot.push({
            id:e.id,
            value:e.name
          })
        })

        var membersectionoffice =[]
        this.room_tags.map(e=>{
          membersectionoffice.push({
            id:e.id,
            value:e.name
          })
        })

        var sexIn = []
        if(this.addForm.sex === '0'){
          sexIn.push({
            id:0,
            value:'男'
          })
        }else if(this.addForm.sex === '1'){
          sexIn.push({
            id:1,
            value:'女'
          })
        }

        //医院级别 *

        var memberhospitallevel = []
        this.addForm.level.map(e=>{

          var obj = this.level_options.find(item=>{
              return item.id == e
            })
           memberhospitallevel.push({
             id:obj.id,
             value:obj.sysname
           }) 
        })
        //医院性质
        var nature = []
        // this.addForm.hospital_xz.map(e=>{
        //   var obj = this.xz_options.find(item=>{
        //       return item.id == e
        //     })
        //    nature.push({
        //      id:obj.id,
        //      value:obj.sysname
        //    }) 
        // })

        //医院等级
      var hospitalGrade = []
      // var that = this
      //   this.addForm.hospital_grade.map(e=>{
      //     var obj = that.hospital_grade_options.find(item=>{
      //         return item.id == e
      //       })
      //      hospitalGrade.push({
      //        id:obj.id,
      //        value:obj.sysname
      //      }) 
      //   })
        //医院类型

        var fkPolyclinicId = []
      // var that = this
      //   this.addForm.hospital_type.map(e=>{
      //     var obj = that.hospital_type_options.find(item=>{
      //         return item.id == e
      //       })
      //      fkPolyclinicId.push({
      //        id:obj.id,
      //        value:obj.sysname
      //      }) 
      //   })
        //行政职位
  

      var administrativeposition = []
      var that = this
        this.addForm.hospital_xzzw.map(e=>{
          var obj = that.xzzw_options.find(item=>{
              return item.id == e
            })
           administrativeposition.push({
             id:obj.id,
             value:obj.sysname
           }) 
        })

        //专科类型

      var fkSpecialtyId = []
      // var that = this
      //   this.addForm.fkSpecialtyId.map(e=>{
      //     var obj = that.zklx_options.find(item=>{
      //         return item.id == e
      //       })
      //      fkSpecialtyId.push({
      //        id:obj.id,
      //        value:obj.name
      //      }) 
      //   })

        var memberHandphoneIn = null
        var memberHandphoneNot = null
        if(this.addForm.vip_phone !== ''){
          memberHandphoneIn  = this.addForm.vip_phone.split(',')
        }

        if(this.removeForm.vip_phone !== ''){
          memberHandphoneNot = this.removeForm.vip_phone.split(',')
        }
        
        




        var memberIdIn = []

        if(this.addForm.vip_id !== ''){
          memberIdIn = this.addForm.vip_id.split(',')
          memberIdIn = memberIdIn.map(e=>{
             return Number(e)
          })
        }
         var memberIdNot = []
         if(this.removeForm.vip_id !==''){
           memberIdNot = this.removeForm.vip_id.split(',')
          memberIdNot = memberIdNot.map(e=>{
             return Number(e)
          })
         }
        var para = {
                projectId: Number(sessionStorage.getItem('id')),
                sampleName: this.ruleForm.sample_name,//条件名*
                memberHandphoneIn: memberHandphoneIn,//会员账户*
                memberHandphoneNot: memberHandphoneNot,////会员账户（排）*
                memberIdIn: memberIdIn,//会员id*
                memberIdNot: memberIdNot,//会员id（排）*
                sexIn: sexIn,//会员性别*
                memberstationIn: memberstationIn,//职称*
                memberstationNot: memberstationNot,//职称（排）*
                memberProvinceIn: memberProvinceIn,//省份*
                memberProvinceNot: memberProvinceNot,//省份（排）*
                memberCityIn: memberCityIn,//城市*
                memberCityNot: memberCityNot,//城市（排）*
                memberDistrictIn: this.memberDistrictIn,//地区  -
                memberDistrictNot: this.memberDistrictNot,//地区（排） -
                memberhospital: this.addForm.hospital,//医院名*
                administrativeposition: administrativeposition,//行政职位 *
                memberhospitallevel: memberhospitallevel,//医院级别 *
                registerTime:null,//注册时间{}
                nature: nature,//医院性质 *
                membersectionoffice: membersectionoffice,//科室 *
                memberBirYear: this.memberBirYear,//出生年份 -
                memberEducation: this.memberEducation,//最高学历 -
                hospitalGrade: hospitalGrade,//医院等级 *
                membertechnical: this.membertechnical,//从医领域 -
                fkPolyclinicId:fkPolyclinicId ,//医院类型 
                fkSpecialtyId: fkSpecialtyId//专科类型
              }
        

          
        this.axios.post(this.common.getApi() + '/sys/api/projectQuestion/addSampleQuestion',{
              params:para
            }).then((res) => {
              this.isload = false;
              if(res.data.success){
                this.$message({
                  message:'保存条件成功',
                  type: 'success'
                });
                this.$router.push('/proSample')
              }else{
                this.$message.error(res.data.msg);
              }
            })
      },
      closeTag(index,taglist,paramlist){
        taglist.splice(index,1);
        paramlist.splice(index,1);
        console.log(taglist);
        console.log(paramlist);
      },
      delCity(){
        //  var obj = {
        //         name: this.getLable(this.removeForm.city,this.city_options,'cityId','cityName'),
        //         type:'',
        //         id:this.removeForm.city
        //       }
        //   var isIn = false
        //   this.cityNot_tags.map(e=>{
        //     if (e.id == obj.id) {
        //       isIn = true
        //     }
        //   })
        //   if(isIn){
        //     this.$message.error('不能重复添加')
        //     return false
        //   }else{
        //     this.cityNot_tags.push(obj);
        //   }


          var objArr = []
          this.removeForm.city.map(e=>{

            objArr.push({
              name: this.getLable(e,this.city_options,'cityId','cityName'),
              type:'',
              id:e
            })

          })
          var that = this
          objArr = objArr.filter( item=>{
            if(!that.cityNot_tags.some(function(xx,index){
                return xx.id === item.id
            })){
              return item
            }
          })

          this.cityNot_tags=this.cityNot_tags.concat(objArr)

          
      },
      delProvince(){
        var obj = {
                name: this.getLable(this.removeForm.province,this.province_options,'provinceId','provinceName'),
                type:'',
                id:this.removeForm.province
              }
          var isIn = false
          this.provinceNot_tags.map(e=>{
            if (e.id == obj.id) {
              isIn = true
            }
          })
          if(isIn){
            this.$message.error('不能重复添加')
            return false
          }else{
            this.provinceNot_tags.push(obj);
          }
      },
      delZc(){

        var objArr = []
        this.removeForm.zc_2.map(e=>{

          objArr.push({
            name: this.getLable(e,this.zc_2_options,'stationId','stationName'),
            type:'',
            id:e
          })

        })
        var that = this
        objArr = objArr.filter( item=>{
          if(!that.zcNot_tags.some(function(xx,index){
              return xx.id === item.id
          })){
            return item
          }
        })

        this.zcNot_tags=this.zcNot_tags.concat(objArr)
        
      },
      addHospitalRoom(){
        var objArr = []
        this.addForm.hospital_room_2.map(e=>{
          debugger
          objArr.push({
            name: this.getLable(e,this.hospital_2_options,'sectionofficeid','sectionofficename'),
            type:'',
            id:e
          })

        })
        var that = this
        objArr = objArr.filter( item=>{
          if(!that.room_tags.some(function(xx,index){
              return xx.id === item.id
          })){
            return item
          }
        })

        this.room_tags=this.room_tags.concat(objArr)


    
      },
      addCity(){

          // var obj = {
          //       name: this.getLable(this.addForm.city,this.city_options,'cityId','cityName'),
          //       type:'',
          //       id:this.addForm.city
          //     }
          // var isIn = false
          // this.city_tags.map(e=>{
          //   if (e.id == obj.id) {
          //     isIn = true
          //   }
          // })
          // if(isIn){
          //   this.$message.error('不能重复添加')
          //   return false
          // }else{
          //   this.city_tags.push(obj);
          // }


          var objArr = []
          this.addForm.city.map(e=>{

            objArr.push({
              name: this.getLable(e,this.city_options,'cityId','cityName'),
              type:'',
              id:e
            })

          })
          var that = this
          objArr = objArr.filter( item=>{
            if(!that.city_tags.some(function(xx,index){
                return xx.id === item.id
            })){
              return item
            }
          })

          this.city_tags=this.city_tags.concat(objArr)

             
      },
      addProvince(){

        var obj = {
                name: this.getLable(this.addForm.province,this.province_options,'provinceId','provinceName'),
                type:'',
                id:this.addForm.province
              }
          var isIn = false
          this.province_tags.map(e=>{
            if (e.id == obj.id) {
              isIn = true
            }
          })
          if(isIn){
            this.$message.error('不能重复添加')
            return false
          }else{
            this.province_tags.push(obj);
          }
          console.log(this.province_tags);
          
      },
      addZc(){
        console.log(this.addForm.zc_2);
        console.log(this.zc_tags);

        var objArr = []
        this.addForm.zc_2.map(e=>{

          objArr.push({
            name: this.getLable(e,this.zc_2_options,'stationId','stationName'),
            type:'',
            id:e
          })

        })
        var that = this
        objArr = objArr.filter( item=>{
          if(!that.zc_tags.some(function(xx,index){
              return xx.id === item.id
          })){
            return item
          }
        })

        this.zc_tags=this.zc_tags.concat(objArr)
        
      },
      //提交
      submitremoveForm(formName) {
        console.log(this.addForm.hospital);
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.removeForm.vip_phone != ""){//如果添加了手机号
              var a = this.removeForm.vip_phone.split(",");
              for(var i = 0 ; i < a.length ; i ++){
                var obj = {
                  name: a[i],
                  type: ''
                }
                this.phoneNot_tags.push(obj);//标签数组
                this.memberHandphoneNot.push(a[i]);//参数数组
              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.vip_id != ""){//如果添加了会员id
              var b = this.removeForm.vip_id.split(",");
              for(var i = 0 ; i < b.length ; i ++){
                var obj = {
                  name: b[i],
                  type: ''
                }
                this.idNot_tags.push(obj);
                this.memberIdNot.push(b[i]);
              }
              this.isNotFlagData = false;
            }

            if(this.removeForm.zc_2 != ""){
              var obj = {
                name: this.getLable(this.removeForm.zc_2,this.zc_2_options,'stationId','stationName'),
                type:''
              }
              if(this.memberstationNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.zc_2;
              }) == undefined){
                this.memberstationNot.push({id:this.removeForm.zc_2,value:this.getLable(this.removeForm.zc_2,this.zc_2_options,'stationId','stationName')});
                this.zcNot_tags.push(obj);
              }else{

              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.province != ""){
              var obj = {
                name: this.getLable(this.removeForm.province,this.province_options,'provinceId','provinceName'),
                type:''
              }
              console.log(this.removeForm.province);
              if(this.memberProvinceNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.province;
              }) == undefined){
                this.memberProvinceNot.push({id:this.removeForm.province,value:this.getLable(this.removeForm.province,this.province_options,'provinceId','provinceName')});
                this.provinceNot_tags.push(obj);
              }else{

              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.city != ""){
              var obj = {
                name: this.getLable(this.removeForm.city,this.city_options,'cityId','cityName'),
                type:''
              }
              if(this.memberCityNot.find((x) => {
                return x.id == this.removeForm.city;
              }) == undefined){
                this.memberCityNot.push({id: this.removeForm.city,value: this.getLable(this.removeForm.city,this.city_options,'cityId','cityName')});
                this.cityNot_tags.push(obj);
              }else{

              }
              this.isNotFlagData = false;
            }
            if(this.removeForm.region != ""){
              var obj = {
                name: this.getLable(this.removeForm.region,this.region_options,'id','name'),
                type:''
              }
              if(this.memberDistrictNot.find((x) => {
                console.log(x);
                return x.id == this.removeForm.region;
              }) == undefined){
                this.memberDistrictNot.push({id: this.removeForm.region,value: this.getLable(this.removeForm.region,this.region_options,'id','name')});
                this.regionNot_tags.push(obj);
              }else{

              }
              this.isNotFlagData = false;
            }
            this.$refs[formName].resetFields();
            this.removeDialogVisible = false;
            this.removeForm.zc_1 = '';
            this.removeForm.zc_2 = '';

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addForm.vip_phone != ""){//如果添加了手机号
              var a = this.addForm.vip_phone.split(",");
              for(var i = 0 ; i < a.length ; i ++){
                var obj = {
                  name: a[i],
                  type: ''
                }
                this.phone_tags.push(obj);//标签数组
                this.memberHandphoneIn.push(a[i]);//参数数组
              }
              this.isNoData = false;
            }
            if(this.addForm.vip_id != ""){//如果添加了会员id
              var b = this.addForm.vip_id.split(",");
              for(var i = 0 ; i < b.length ; i ++){
                var obj = {
                  name: b[i],
                  type: ''
                }
                this.id_tags.push(obj);
                this.memberIdIn.push(b[i]);
              }
              this.isNoData = false;
            }
            if(this.addForm.sex != ""){
              if(this.addForm.sex == 0){
                this.sex_tags = [{name:"男",type:''}];
                this.sexIn = [{id: 0,value: "男"}]
              }else{
                this.sex_tags = [{name:"女",type:''}];
                this.sexIn = [{id: 1,value: "女"}]
              }
              this.isNoData = false;
            }
            if(this.addForm.zc_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.zc_2,this.zc_2_options,'stationId','stationName'),
                type:''
              }
              if(this.memberstationIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.zc_2;
              }) == undefined){
                this.memberstationIn.push({id:this.addForm.zc_2,value:this.getLable(this.addForm.zc_2,this.zc_2_options,'stationId','stationName')});
                this.zc_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.province != ""){
              var obj = {
                name: this.getLable(this.addForm.province,this.province_options,'provinceId','provinceName'),
                type:''
              }
              console.log(this.addForm.province);
              if(this.memberProvinceIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.province;
              }) == undefined){
                this.memberProvinceIn.push({id:this.addForm.province,value:this.getLable(this.addForm.province,this.province_options,'provinceId','provinceName')});
                this.province_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.city != ""){
              var obj = {
                name: this.getLable(this.addForm.city,this.city_options,'cityId','cityName'),
                type:''
              }
              if(this.memberCityIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.city;
              }) == undefined){
                this.memberCityIn.push({id: this.addForm.city,value: this.getLable(this.addForm.city,this.city_options,'cityId','cityName')});
                this.city_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.region != ""){
              var obj = {
                name: this.getLable(this.addForm.region,this.region_options,'id','name'),
                type:''
              }
              if(this.memberDistrictIn.find((x) => {
                console.log(x);
                return x.id == this.addForm.region;
              }) == undefined){
                this.memberDistrictIn.push({id: this.addForm.region,value: this.getLable(this.addForm.region,this.region_options,'id','name')});
                this.region_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.hospital != ""){
              console.log(this.addForm.hospital);
              var obj = {
                name: this.getLable(this.addForm.hospital,this.hospital_options,'id','name'),
                type:''
              }
              if(this.memberhospital.indexOf(this.addForm.hospital) == -1){
                this.memberhospital.push(this.getLable(this.addForm.hospital,this.hospital_options,'id','name'));
                this.hospital_tags.push(obj);
              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_xzzw != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_xzzw,this.xzzw_options,'id','sysname'),
                type:''
              }
              if(this.administrativeposition.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_xzzw;
              }) == undefined){
                this.administrativeposition.push({id: this.addForm.hospital_xzzw,value: this.getLable(this.addForm.hospital_xzzw,this.xzzw_options,'id','sysname')});
                this.xzzw_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.level != ""){
              var obj = {
                name: this.getLable(this.addForm.level,this.level_options,'id','sysname'),
                type:''
              }
              if(this.memberhospitallevel.find((x) => {
                console.log(x);
                return x.id == this.addForm.level;
              }) == undefined){
                this.memberhospitallevel.push({id: this.addForm.level,value: this.getLable(this.addForm.level,this.level_options,'id','sysname')});
                this.level_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_xz != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_xz,this.xz_options,'id','sysname'),
                type:''
              }
              if(this.nature.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_xz;
              }) == undefined){
                this.nature.push({id: this.addForm.hospital_xz,value: this.getLable(this.addForm.hospital_xz,this.xz_options,'id','sysname')});
                this.xz_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_room_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_room_2,this.hospital_2_options,'sectionofficeid','sectionofficename'),
                type:''
              }
              if(this.membersectionoffice.find((x) => {
                console.log(x);
                return x.id == this.addForm.hospital_room_2;
              }) == undefined){
                this.membersectionoffice.push({id: this.addForm.hospital_room_2,value:this.getLable(this.addForm.hospital_room_2,this.hospital_2_options,'sectionofficeid','sectionofficename')});
                this.room_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.education != ""){
              var obj = {
                name: this.getLable(this.addForm.education,this.education_options,'id','sysname'),
                type:''
              }
              if(this.memberEducation.find((x) => {
                console.log(x);
                return x.id == this.addForm.education;
              }) == undefined){
                this.memberEducation.push({id: this.addForm.education,value:this.getLable(this.addForm.education,this.education_options,'id','sysname')});
                this.education_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_grade != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_grade,this.hospital_grade_options,'id','sysname'),
                type:''
              }
              if(this.hospitalGrade.find((x) => {
                return x.id == this.addForm.hospital_grade;
              }) == undefined){
                this.hospitalGrade.push({id: this.addForm.hospital_grade,value:this.getLable(this.addForm.hospital_grade,this.hospital_grade_options,'id','sysname')});
                this.grade_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }

            if(this.addForm.fields_2 != ""){
              var obj = {
                name: this.getLable(this.addForm.fields_2,this.fields_2_options,'id','fieldname'),
                type:''
              }
              if(this.membertechnical.find((x) => {
                return x.id == this.addForm.fields_2;
              }) == undefined){
                this.membertechnical.push({id: this.addForm.fields_2,value:this.getLable(this.addForm.fields_2,this.fields_2_options,'id','fieldname')});
                this.fields_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.hospital_type != ""){
              var obj = {
                name: this.getLable(this.addForm.hospital_type,this.hospital_type_options,'id','sysname'),
                type:''
              }
              if(this.fkPolyclinicId.find((x) => {
                return x.id == this.addForm.hospital_type;
              }) == undefined){
                this.fkPolyclinicId.push({id: this.addForm.hospital_type,value: this.getLable(this.addForm.hospital_type,this.hospital_type_options,'id','sysname')});
                this.type_tags.push(obj);
              }else{

              }
              this.isNoData = false;
            }
            if(this.addForm.start_date != "" || this.addForm.end_date != ""){
              if(this.addForm.start_date < this.addForm.end_date){
                var obj = {
                  name: this.addForm.start_date.slice(0,4) + "-" + this.addForm.end_date.slice(0,4),
                  type:''
                }
                if(this.memberBirYear.indexOf(this.addForm.start_date.slice(0,4)+"-"+this.addForm.end_date.slice(0,4)) == -1){
                  this.memberBirYear.push({
                    start: this.addForm.start_date.slice(0,4),
                    end: this.addForm.end_date.slice(0,4)
                  });
                  this.date_tags.push(obj);
                }
                this.isNoData = false;
              }
            }
            console.log(this.addForm.start_date);
            console.log(this.memberBirYear);
            console.log(this.date_tags);
            if(this.addForm.register_date != ""){
              if(this.addForm.date_size == "0"){
                this.registertime_txt = this.addForm.register_date;
              }else if(this.addForm.date_size == "1"){
                this.registertime_txt = ">=" + this.addForm.register_date;
              }else{
                this.registertime_txt = "<=" + this.addForm.register_date;
              }
              this.registerTime = {type: this.addForm.date_size,registerTime: this.addForm.register_date};
             
              this.isNoData = false;
            }
//          console.log(this.registerTime);

            // this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            // this.addForm.zc_1 = '';
            // this.addForm.zc_2 = '';
            // this.removeForm.zc_1 = '';
            // this.removeForm.zc_2 = '';
            // this.addForm.date_size = '';
            // this.addForm.hospital_xz = '';
            // this.addForm.hospital_room_1 = '';
            // this.addForm.hospital_room_2 = '';
            // this.addForm.register_date = "";
            // this.addForm.fields_1 = '';
            // this.addForm.fields_2 = '';
            // this.addForm.start_date = '';
            // this.addForm.end_date = '';
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //获取选中的文本
      getLable(value,list,id,name){
        // debugger
        let obj = {};
        if(id == "stationId"){
          obj = list.find((item)=>{
            return item.stationId === value;
          });
          return obj.stationName;
        }else if(id == "provinceId"){
          obj = list.find((item)=>{
            return item.provinceId === value;
          });
          return obj.provinceName;
        }else if(id == "cityId"){
          obj = list.find((item)=>{
            return item.cityId === value;
          });
          return obj.cityName;
        }else if(id == "id" && name == "name"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.name;
        }else if(id == "id" && name == "sysname"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.sysname;
        }else if(id == "sectionofficeid" && name == "sectionofficename"){
          obj = list.find((item)=>{
            return item.sectionofficeid === value;
          });
          console.log(obj)
          return obj.sectionofficename;
        }else if(id == "id" && name == "fieldname"){
          obj = list.find((item)=>{
            return item.id === value;
          });
          return obj.fieldname;
        }
      },
      save(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isload = true;
            this.axios.post(this.common.getApi() + '/sys/api/projectQuestion/addSampleQuestion',{
              params:{
                projectId: Number(sessionStorage.getItem('id')),
                sampleName: this.ruleForm.sample_name,
                memberHandphoneIn: this.memberHandphoneIn,
                memberHandphoneNot: this.memberHandphoneNot,
                memberIdIn: this.memberIdIn,
                memberIdNot: this.memberIdNot,
                sexIn: this.sexIn,
                memberstationIn: this.memberstationIn,
                memberstationNot: this.memberstationNot,
                memberProvinceIn: this.memberProvinceIn,
                memberProvinceNot: this.memberProvinceNot,
                memberCityIn: this.memberCityIn,
                memberCityNot: this.memberCityNot,
                memberDistrictIn: this.memberDistrictIn,
                memberDistrictNot: this.memberDistrictNot,
                memberhospital: this.memberhospital,
                administrativeposition: this.administrativeposition,
                memberhospitallevel: this.memberhospitallevel,
                registerTime: this.registerTime,
                nature: this.nature,
                membersectionoffice: this.membersectionoffice,
                memberBirYear: this.memberBirYear,
                memberEducation: this.memberEducation,
                hospitalGrade: this.hospitalGrade,
                membertechnical: this.membertechnical,
                fkPolyclinicId: this.fkPolyclinicId,
                fkSpecialtyId: this.fkSpecialtyId
              }
            }).then((res) => {
              this.isload = false;
              if(res.data.success){
                this.$message({
                  message:'保存条件成功',
                  type: 'success'
                });
              }else{
                this.$message.error(res.data.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openaddDialogVisible(){
        this.addDialogVisible = true;
      },
      openremoveDialogVisible(){
        this.removeDialogVisible = true;
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
        this.addForm.zc_2 = '';
        this.removeForm.zc_2 = '';
        this.axios.get(this.common.getApi() + '/sys/api/station/getStationTechnicalTitle',{
          params:{
            params:{
              parentId: parentId
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
      //获取医院
      getHospital(provinceId,citys){
          console.log(provinceId);
          console.log(citys);
          var hospitalArr = []
          citys.map(e=>{
            
            var cityId = e
            this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospital',{
              params:{
                params:{
                  provinceId: provinceId,
                  cityId: cityId
                }
              }
            },{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res) => {
              if(res.data.code == '200'){
               hospitalArr = hospitalArr.concat(res.data.obj)
                this.hospital_options = hospitalArr
              }
            })
          })
          
        
        
      },
      //获取省
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

        console.log(this.addForm.province);

        //var prmas = provinceId.join()

        //console.log(prmas);

        this.addForm.city = "";
        this.addForm.region = "";
        this.addForm.hospital = "";
        this.removeForm.city = "";
        this.removeForm.region = "";
        this.removeForm.hospital = "";
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
        this.addForm.region = "";
        this.addForm.hospital = "";
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
        //获取医院
        this.axios.get(this.common.getApi() + '/sys/api/hospital/getHospital',{
          params:{
            params:{
              provinceId: provinceId,
              cityId: cityId
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
      //获取医院级别
      getHospitalLevel(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalLevel','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.level_options = res.data.obj;
          }
        })
      },
      //获取医院性质
      getHospitalNature(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalNature','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.xz_options = res.data.obj;
          }
        })
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
//      this.addForm.city = "";
//      this.addForm.region = "";
//      this.addForm.hospital = "";
        this.addForm.hospital_room_2 = ''
        this.axios.get(this.common.getApi() + '/sys/api/sectionOffice/getSonOffice',{
          params:{
            params:{
              parentId: parentId
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
      //获取医院等级
      getHospitalGrade(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalGrade','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_grade_options = res.data.obj;
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
            this.fields_1_options = res.data.obj;
          }
        })
      },
      //获取从医领域二级
      getSonFields(parentId){
        this.axios.get(this.common.getApi() + '/sys/api/fields/getSonFields',{
          params:{
            params:{
              parentId: parentId
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.fields_2_options = res.data.obj;
          }
        })
      },
      //医院类型 {
      getHospitalType(){
        this.axios.get(this.common.getApi() + '/sys/api/systemmaster/getHospitalType','',{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.hospital_type_options = res.data.obj;
          }
        })
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.addForm.zc_1 = '';
        this.addForm.zc_2 = '';
        this.removeForm.zc_1 = '';
        this.removeForm.zc_2 = '';
        this.addForm.date_size = '';
        this.addForm.hospital_xz = '';
        this.addForm.hospital_room_1 = '';
        this.addForm.hospital_room_2 = '';
        this.addForm.register_date = "";
        this.addForm.fields_1 = '';
        this.addForm.fields_2 = '';
        this.addForm.start_date = '';
        this.addForm.end_date = '';
      },
    }
  }
</script>

<style>
  .addParam-wrapper .inputlength{
    width: 350px;
  }
   .addParam-wrapper .el-form-item {
    margin-bottom: 18px;
}
  .addParam-wrapper .selectlength{
    width: 320px;
  }

  .addParam-wrapper .add-wrapper,
  .addParam-wrapper .remove-wrapper{
    width: 350px;
    min-height: 200px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    position: relative;
    background: #fff;
  }

  .addParam-wrapper .btn-big{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 50px;
    cursor: pointer;
  }

  .addParam-wrapper .tags{
    background: transparent;
    border: none;
  }

  .addParam-wrapper .registertime-tag{
    width: 100%;
    background: transparent;
    border: none;
  }

  .addParam-wrapper .btn-content{
    text-align: center;
    border-top: 1px solid #DCDFE6;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }

  .addParam-wrapper .tag-wrapper{
    box-sizing: border-box;
    padding-bottom: 50px;

  }
  .secondBox{
        border-radius: 4px;
    border: 1px solid #DCDFE6;
    width: 400px;
    padding: 4px 10px;
    background: #fff;
    color: #606266;
    line-height: 24px;

  }
   .secondBox span {
     font-size: 14px;
   }
      .addParam-wrapper .el-form{
        width: 980px;
    }
    .selectTo{
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background: #009EE9;
      color: #fff;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }
</style>