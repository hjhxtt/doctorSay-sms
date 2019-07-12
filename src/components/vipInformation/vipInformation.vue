<template>
  <div class="vipInformation-wrapper">
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="月度跨度：" prop="monthNum">
            <el-select v-model="ruleForm.monthNum">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="11" value="11"></el-option>
              <el-option label="12" value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadMemberAnalysis('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <div class="title">
      <i class="el-icon-search"></i><span>会员搜索</span>
    </div>
    <div class="query-wrapper">
      <el-form ref="form" :inline="true" size="mini" label-width="120px">
        <el-form-item label="用户名：">
          <el-input style="width:200px;" v-model="form.memberName"></el-input>
        </el-form-item>
        <el-form-item label="用户ID:">
          <el-input style="width:200px;" v-model="form.memberId"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" >
          <el-input style="width:200px;" v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="激活状态:">
          <el-select style="width: 200px;" v-model="form.state">
            <el-option label="未激活" value="0"></el-option>
            <el-option label="已激活" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select style="width: 200px;" v-model="form.auditState">
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="ID审核" value="3"></el-option>
            <el-option label="待定" value="4"></el-option>
            <el-option label="未审核通过" value="5"></el-option>
            <el-option label="信息填写错误" value="6"></el-option>
            <el-option label="科室电话错误" value="7"></el-option>
            <el-option label="未联系到本人" value="8"></el-option>
            <el-option label="兼职" value="9"></el-option>
            <el-option label="测试" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传证书:">
          <el-select style="width: 200px;" v-model="form.certificateState">
            <el-option label="未上传" value="0"></el-option>
            <el-option label="已上传" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
        <!-- <el-form-item label="所在省份:">
          <el-select style="width: 200px;" v-model="form.provinceId" @change="getCityByProvince(form.provinceId)">
            <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市:">
          <el-select style="width: 200px;" v-model="form.cityId">
            <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
          </el-select>
        </el-form-item> -->
        <el-row>
              <el-form-item label="所在省份：" prop="province">
                <el-select v-model="form.province" class="selectlength" @change = "getCityByProvince(form.province)" >
                  <el-option v-for="item in province_options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="selectTo" @click="addProvince()">></div>
                <div class="secondBox"  style=" float:left;">

                  <span style="margin-left: 10px;"> </span>
                  <el-tag v-for="(tag,index) in province_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,province_tags,queryProvince)">
                    {{tag.name}}
                  </el-tag>
                </div>
              </el-form-item>
                
          </el-row>
          <el-row>
              <el-form-item label="所在城市：" prop="city">
                <el-select v-model="form.city" class="selectlength"  multiple>
                  <el-option v-for="item in city_options" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item >
                <div class="selectTo" @click="addCity()">></div>
                <div class="secondBox"  style=" float:left;">
                  <span style="margin-left: 10px;"> </span>
                  <el-tag v-for="(tag,index) in city_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,city_tags,queryCity)">
                    {{tag.name}}
                  </el-tag>
                </div>
            </el-form-item>
          </el-row>
        <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
        <el-form-item label="性别 :">
          <el-select style="width: 200px;" v-model="form.sex">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐人:">
          <el-input style="width:200px;" v-model="form.recommandCode"></el-input>
        </el-form-item>
        
        <el-form-item label="推荐码">
          <el-input style="width:200px;" v-model="form.smscode"></el-input>
        </el-form-item>
        <el-form-item label="会员邮箱:">
          <el-input style="width:200px;" v-model="form.memberEmail"></el-input>
        </el-form-item>
        <el-form-item label="行政职位 :">
          <el-select v-model="form.administrativeposition" style="width: 200px;">
            <el-option v-for="item in xzzw_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
        <!-- <el-form-item label="会员职称:">
          <el-select v-model="form.zc_1" @change = "getStationTechnicalTitle(form.zc_1)" style="width: 98px;">
            <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
          </el-select>
          <el-select v-model="form.memberstation" style="width: 98px;">
            <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
          </el-select>
        </el-form-item> -->
        <el-row>
            <el-form-item label="职称：">
                <el-select v-model="form.zc_1" class="selectlength" @change = "getStationTechnicalTitle(form.zc_1)">
                  <el-option v-for="item in zc_1_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
                </el-select>
              
            </el-form-item>
                <el-form-item label="">
                  <el-select v-model="form.zc_2" class="selectlength" multiple>
                    <el-option v-for="item in zc_2_options" :value="item.stationId" :key="item.stationId" :label="item.stationName"></el-option>
                  </el-select>
                </el-form-item>
                  
                  <el-form-item label="">
                  <div class="selectTo" @click="addZc">></div>
                  <div class="secondBox"  style=" float:left;">
                    <el-tag v-for="(tag,index) in zc_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,zc_tags,memberstationQuery)">
                      {{tag.name}}
                    </el-tag>
                  </div>
                </el-form-item>
              
            </el-row>
        <div class="button" style="float:right;" @click="showMoreQuery=true" v-show="!showMoreQuery">
          <el-button type="text">展开</el-button>
        </div>
        <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
        <div class="more_query" v-show="showMoreQuery">
            <el-form-item label="是否填证件号:">
            <el-select style="width: 200px;" v-model="form.memberidcardState">
              <el-option label="未填" value=0></el-option>
              <el-option label="已填" value=1></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件编号 :">
            <el-input v-model="form.memberidcard" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="审核方式:">
            <el-select style="width: 200px;" v-model="form.checkMethod">
              <el-option label="科室电话" value=1></el-option>
              <el-option label="执业证" value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活跃度:">
            <el-select style="width: 70px;" v-model="form.fizzType">
              <el-option label="等于" value=0></el-option>
              <el-option label="大于" value=1></el-option>
              <el-option label="小于" value=2></el-option>
            </el-select>
            <el-select style="width: 128px;" v-model="form.type">
              <el-option label="休眠用户" value=1></el-option>
              <el-option label="边缘" value=2></el-option>
              <el-option label="活跃" value=3></el-option>
              <el-option label="忠诚" value=4></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间 :">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 200px;"
              v-model="form.register_time"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
          <!-- <el-form-item label="工作科室:">
            <el-select v-model="form.hospital_room_1" @change="getSonOffice(form.hospital_room_1)" style="width: 98px;">
              <el-option v-for="item in hospital_1_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
            </el-select>
            <el-select v-model="form.membersectionoffice" style="width: 98px;">
              <el-option v-for="item in hospital_2_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
            </el-select>
          </el-form-item> -->
           <el-row>
            <el-form-item label="科室：">
                <el-select v-model="form.hospital_room_1" class="selectlength" @change="getSonOffice(form.hospital_room_1)">
                  <el-option v-for="item in hospital_1_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="">
                  <el-select v-model="form.hospital_room_2" class="selectlength"  multiple>
                  <el-option v-for="item in hospital_2_options" :value="item.sectionofficeid" :label="item.sectionofficename" :key="item.sectionofficeid"></el-option>
                </el-select>
                </el-form-item>
                  <el-form-item label="">
                  <div class="selectTo" @click="addHospitalRoom()">></div>
                  <div class="secondBox"  style=" float:left;">
                    <el-tag v-for="(tag,index) in room_tags" :key="tag.name" closable :type="tag.type" class="tags" @close="closeTag(index,room_tags,membersectionofficeQuery)">
                      {{tag.name}}
                    </el-tag>
                  </div>
                </el-form-item>
              
            </el-row>
          <el-form-item label="医院级别:">
            <el-select v-model="form.hospitalLevel" style="width: 200px;">
              <el-option v-for="item in level_options" :label="item.sysname" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
          <el-form-item label="参与项目ID:">
            <el-input style="width:200px;" v-model="form.projectId"></el-input>
          </el-form-item>
          <el-form-item label="完成项目ID:">
            <el-input style="width:200px;" v-model="form.completeProjectId"></el-input>
          </el-form-item>
          <div class="button" style="float:right;" @click="showMoreQuery=false">
            <el-button type="text">收起</el-button>
          </div>
          <div class="line" style="max-width:1000px;width:100%;height:1px;background:#BEBEBE;margin-bottom:20px;margin-top:10px;"></div>
          </div>


        <!-- <el-form-item label="出生年份:">
          <el-date-picker
            type="year"
            style="width: 200px;"
            v-model="form.birDate"
            value-format="yyyy">
          </el-date-picker>
        </el-form-item>
        
        <el-form-item label="会员医龄">
          <el-date-picker
            type="year"
            style="width: 94px;"
            v-model="form.doctorAgeBegin"
            value-format="yyyy">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            type="year"
            style="width: 94px;"
            v-model="form.docotorAgeEnd"
            value-format="yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="从医领域:">
          <el-select v-model="form.fields_1" @change="getSonFields(form.fields_1)" style="width: 98px;">
            <el-option v-for="item in fields_1_options" :value="item.id" :key="item.id" :label="item.fieldname"></el-option>
          </el-select>
          <el-select v-model="form.membertechnical" style="width: 98px;">
            <el-option v-for="item in fields_2_options" :value="item.id" :key="item.id" :label="item.fieldname"></el-option>
          </el-select>
        </el-form-item> -->
        
        
        <el-checkbox-group v-model="form.checklist" style="padding-left: 120px;margin-bottom: 20px;">
          <el-checkbox label="0">搜索未审核通过</el-checkbox>
          <el-checkbox label="1">搜索未激活会员</el-checkbox>
        </el-checkbox-group>
        <el-form-item style="padding-left: 120px;">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="downloadMember">导出全部选中</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">导出会员分析</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">会员信息批量更新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">根据医生医院查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">
      <i class="el-icon-search"></i><span>会员搜索结果</span><span v-if="total" style="color:red;font-size:14px;">共{{total}}条数据</span><span v-else style="color:red;font-size:14px;">共0条数据</span>
    </div>
    <el-table
    :data="tableData"
    v-loading="loading"
    border
    size="mini"
    style="width: 100%"
    :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
    ref="multipleTable"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="30">
    </el-table-column>
    <el-table-column
      prop="id"
      width="60"
      label="用户id">
    </el-table-column>
    <el-table-column
      width="100"
      prop="memberHandphone"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="memberRealname"
      width="70"
      label="会员姓名">
    </el-table-column>
    <el-table-column
      prop="memberSex"
      width="30"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="memberFizz"
      width="60"
      label="活跃度">
    </el-table-column>
    <el-table-column
      prop="memberState"
      width="70"
      label="激活状态">
    </el-table-column>
    <el-table-column
      prop="province"
       width="50"
      label="地区">
    </el-table-column>
    <el-table-column
      prop="city"
       width="60"
      label="区域">
    </el-table-column>
    <el-table-column
      prop="sectionoffice"
      label="所在科室">
    </el-table-column>
    <el-table-column
      prop="memberIntegral"
      width="50"
      label="会员积分">
    </el-table-column>
    <!--<el-table-column
      prop="recommendcode"
      label="推荐人">
    </el-table-column>-->
    <el-table-column
      prop="recommendcode"
      width="60"
      label="推荐码">
    </el-table-column>
    <el-table-column
      prop="isblackname"
      width="50"
      label="会员状态">
    </el-table-column>
    <el-table-column
      prop="checkMethodStr"
      width="80"
      label="审核方式">
    </el-table-column>
    <el-table-column
      fixed="right"
      width="50"
      label="参与记录">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toJoinRecord(scope.row)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      width="50"
      label="推荐记录">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toRecommendRecord(scope.row)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="140">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
        <el-button type="text" size="small" style="margin-left: 0;" @click="showdialog(scope.row)">设置审核状态</el-button>
        <el-button type="text" size="small" @click="toIntegrationRecord(scope.row)">查看积分记录</el-button>
        <el-button type="text" size="small" @click="toActivity(scope.row)">活跃度</el-button>
        <!-- <el-button type="text" size="small" @click="cancelMemer(scope.row)">注销</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="go">
  </el-pagination>
    <el-dialog
      title="订单审核"
      :visible.sync="editdialogVisible"
      width="30%"
      center>
      <div>
        
        <el-form label-width="120px" ref="editform"  :model="editform" style="margin-top: 2%;" :rules="rules">
          <el-form-item label="会员id： ">
            <el-input disabled  :value="editform.id" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="会员姓名： " >
            <el-input disabled :value="editform.name" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="会员审核状态： " prop="isblackname">
            <el-select v-model="editform.isblackname" style="width: 80%;">
              <el-option value='0' label='未审核'></el-option>
              <el-option value='2' label='审核通过 '></el-option>
              <el-option value='3' label='ID审核'></el-option>
              <el-option value='4' label='待定'></el-option>
              <el-option value='5' label='未审核通过'></el-option>
              <el-option value='6' label='信息填写错误'></el-option>
              <el-option value='7' label='科室电话错误'></el-option>
              <el-option value='8' label='未联系到本人'></el-option>
              <el-option value='9' label='不良和注销'></el-option>
              <el-option value='10' label='测试'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注： " >
            <el-input  v-model="editform.isblackRemark" style="width: 80%;"></el-input>
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
    data () {
      return {
        showMoreQuery:false,
        loading:true,
        tableData: [],
        form:{
          memberName: null,
          id: null,
          memberId: null,
          realName: null,
          state:null,
          auditState: null,
          recommandCode:null,
          smscode:null,
          certificateState:null,
          projectId:null,
          completeProjectId:null,
          provinceId:null,
          province:null,
          cityId:null,
          doctorAgeBegin:null,
          docotorAgeEnd:null,
          birDate:null,
          zc_1:null,
          zc_2:null,
          memberstation:null,
          sex:null,
          register_time:null,
          registTimeBegin:null,
          registTimeEnd:null,
          memberidcard:null,
          fields_1:null,
          membertechnical:null,
          hospitalLevel:null,
          hospital_room_1:null,
          membersectionoffice:null,
          memberEmail:null,
          fizzType:null,
          type:null,
          fizz:null,
          memberidcardState:null,
          checklist:[],
          serchState:null,
          checkMethod:null
        },
        zc_1_options:[],
        zc_2_options:[],
        province_options:[],
        city_options:[],
        xzzw_options:[],
        fields_1_options:[],
        fields_2_options:[],
        hospital_1_options:[],
        hospital_2_options:[],
        level_options:[],
        total:null,
        pageIndex: 1,
        pageSize:30,
        userid:null,
        multipleSelection:null,
        ids:null,
        dialogVisible: false,
        ruleForm: {
          monthNum:null,
        },
        rules: {
          monthNum: [
            { required: true, message: '请选择跨度', trigger: 'change' },
          ],
          isblackname:[
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ]
        },
        editdialogVisible:false,
        editform:{
          isblackname:null,
          id:null,
          name:null,
          remark:'',
        },
        city_tags: [],
        room_tags:[],
        zc_tags: [],
        province_tags: [],
        queryCity:[],
        queryProvince:[],
        memberstationQuery:[],
        membersectionofficeQuery:[]
      };
    },
    beforeDestroy() {
      sessionStorage.setItem('form',JSON.stringify(this.form) )
      sessionStorage.setItem('province_tags',JSON.stringify(this.province_tags))

      sessionStorage.setItem('city_tags',JSON.stringify(this.city_tags))

      sessionStorage.setItem('zc_tags',JSON.stringify(this.zc_tags))

      sessionStorage.setItem('room_tags',JSON.stringify(this.room_tags))
      
      sessionStorage.setItem('showMoreQuery',JSON.stringify(this.showMoreQuery))
      
  

    },
    mounted(){
      
      this.getProvince();
      this.getStationDuties();
      this.getAdminiStraion();
      this.getParentFields();
      this.getParentOffice();
      this.getHospitalLevel();
      
      if ( Boolean(sessionStorage.getItem('form'))) {
        this.form = JSON.parse(sessionStorage.getItem('form'))


      if(Boolean(JSON.parse(sessionStorage.getItem('province_tags')))){
        this.province_tags = JSON.parse(sessionStorage.getItem('province_tags'))
      }

      if(Boolean(JSON.parse(sessionStorage.getItem('city_tags')))){
        this.city_tags = JSON.parse(sessionStorage.getItem('city_tags'))
      }

      if(Boolean(JSON.parse(sessionStorage.getItem('zc_tags')))){
        this.zc_tags = JSON.parse(sessionStorage.getItem('zc_tags'))
      }

      if(Boolean(JSON.parse(sessionStorage.getItem('room_tags')))){
        this.room_tags = JSON.parse(sessionStorage.getItem('room_tags'))
      }
        this.showMoreQuery = sessionStorage.getItem('showMoreQuery')
        this.form.province = null
        this.form.city = null
        this.form.zc_1 = null
        this.form.zc_2 = null
        this.form.hospital = null
        this.form.hospital = null
        this.form.hospital_room_1 = null
        this.form.hospital_room_2 = null
        this.getMemberList(this.pageIndex,this.pageSize);
      }else{
        this.getMemberList(this.pageIndex,this.pageSize);
      }
    },
    methods: {
      resetForm(formName) {
          this.form.memberName = null
          this.form.memberId = null
          this.form.realName = null
          this.form.state = null
          this.form.auditState = null
          this.form.recommandCode = null
          this.form.smscode = null
          this.form.certificateState = null
          this.form.projectId = null
          this.form.completeProjectId = null
          this.form.provinceId = null
          this.form.cityId = null
          this.form.doctorAgeBegin = null
          this.form.docotorAgeEnd = null
          this.form.birDate = null
          this.form.zc_1 = null
          this.form.memberstation = null
          this.form.sex = null
          this.form.register_time = null
          this.form.registTimeBegin = null
          this.form.registTimeEnd = null
          this.form.memberidcard = null
          this.form.fields_1 = null
          this.form.membertechnical = null
          this.form.hospitalLevel = null
          this.form.hospital_room_1 = null
          this.form.membersectionoffice = null
          this.form.memberEmail = null
          this.form.fizzType = null
          this.form.type = null
          this.form.fizz = null
          this.form.memberidcardState = null
          this.form.checklist = []
          this.form.serchState = null
          this.form.province = null
        this.form.city = null
        this.form.zc_1 = null
        this.form.zc_2 = null
        this.form.hospital = null
        this.form.hospital = null
        this.form.hospital_room_1 = null
        this.form.hospital_room_2 = null
        this.form.checkMethod = null
        this.form.administrativeposition = null
          this.province_tags = []
              this.city_tags = []
              this.zc_tags = []
              this.room_tags = []
              this.queryCity = []
            this.queryProvince= []
            this.memberstationQuery= []
            this.membersectionofficeQuery= []
      },
      addHospitalRoom(){
        var objArr = []
        this.form.hospital_room_2.map(e=>{
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
      addZc(){

        var objArr = []
        this.form.zc_2.map(e=>{

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
      addCity(){
          var objArr = []
          this.form.city.map(e=>{

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
                name: this.getLable(this.form.province,this.province_options,'provinceId','provinceName'),
                type:'',
                id:this.form.province
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
      closeTag(index,taglist,paramlist){
        taglist.splice(index,1);
        paramlist.splice(index,1);
        console.log(taglist);
        console.log(paramlist);
      },
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.ids = [];
        for(var i = 0; i < this.multipleSelection.length;i++){
          this.ids.push(this.multipleSelection[i].id)
        }
        this.ids = this.ids.join(',');
        console.log(this.ids);
      },
      showdialog(row){
        this.editform.id = row.id;
        this.editform.name = row.memberRealname;
        this.editform.isblackname = row.isblackname;
        this.editdialogVisible = true;
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if(this.editform.isblackname != '0' && this.editform.isblackname != '2'){
              if(this.editform.remark == ''){
                this.$message.error('请填写备注')
                return false
              }
            }

            this.axios.post(this.common.getApi() + '/sys/api/member/setAuditState',{
              params:{
                id: Number(this.editform.id),
                isblackname: Number(this.editform.isblackname),
                blackRemark :this.editform.remark
              }
            }).then((res) => {
              if(res.data.success){
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.editdialogVisible = false;
                this.getMemberList(this.pageIndex,this.pageSize);
                this.editform.remark = ''
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
      downloadMember(){
        debugger
        if(this.ids){
          this.axios({
            url:this.common.getApi() + '/sys/api/member/downloadMember',
            method:'get',
            params: {
              ids: this.ids
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            const fileName = '会员信息.csv'
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

           debugger

          this.axios({
            url:this.common.getApi() + '/sys/api/member/downloadMember',
            method:'get',
            params: {
              memberName:this.form.memberName,
              realName: this.form.realName,
              hospitalLevel: this.form.hospitalLevel,
              state: this.form.state,
              auditState: this.form.auditState,
              projectId: this.form.projectId,
              certificateState: this.form.certificateState,
              recommandCode: this.form.recommandCode,
              completeProjectId: this.form.completeProjectId,
              smscode: this.form.smscode,
              provinceId:this.form.provinceId,//省份
              cityId: this.form.cityId,//城市
              birDate: this.form.birDate,
              doctorAgeBegin: this.form.doctorAgeBegin,
              docotorAgeEnd: this.form.docotorAgeEnd,
              memberstation: this.form.memberstation,//职称
              membersectionoffice: this.form.membersectionoffice,//科室
              administrativeposition: this.form.administrativeposition,
              memberEmail: this.form.memberEmail,
              sex: this.form.sex,
              serchState: this.form.serchState,
              registTimeBegin: this.form.registTimeBegin,
              registTimeEnd: this.form.registTimeEnd,
              fizz:this.form.fizz,
              memberidcard: this.form.memberidcard,
              memberidcardState: this.form.memberidcardState,
              membertechnical: this.form.membertechnical
            },
            responseType: 'blob',
          }).then((res) => {
            let data = res.data
            const blob = data
            const fileName = '会员信息.csv'
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
      downloadMemberAnalysis(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ids){
              this.axios({
                url:this.common.getApi() + '/sys/api/member/downloadMemberAnalysis',
                method:'get',
                params: {
                  ids: this.ids,
                  monthNum: this.ruleForm.monthNum
                },
                responseType: 'blob',
              }).then((res) => {
                let data = res.data
                const blob = data
                const fileName = '会员信息.csv'
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
              this.axios({
                url:this.common.getApi() + '/sys/api/member/downloadMemberAnalysis',
                method:'get',
                params: {
                  memberName:this.form.memberName,
                  realName: this.form.realName,
                  hospitalLevel: this.form.hospitalLevel,
                  state: this.form.state,
                  auditState: this.form.auditState,
                  projectId: this.form.projectId,
                  certificateState: this.form.certificateState,
                  recommandCode: this.form.recommandCode,
                  completeProjectId: this.form.completeProjectId,
                  smscode: this.form.smscode,
                  provinceId:this.form.provinceId,
                  cityId: this.form.cityId,
                  birDate: this.form.birDate,
                  doctorAgeBegin: this.form.doctorAgeBegin,
                  docotorAgeEnd: this.form.docotorAgeEnd,
                  memberstation: this.form.memberstation,
                  membersectionoffice: this.form.membersectionoffice,
                  administrativeposition: this.form.administrativeposition,
                  memberEmail: this.form.memberEmail,
                  sex: this.form.sex,
                  serchState: this.form.serchState,
                  registTimeBegin: this.form.registTimeBegin,
                  registTimeEnd: this.form.registTimeEnd,
                  fizz:this.form.fizz,
                  memberidcard: this.form.memberidcard,
                  memberidcardState: this.form.memberidcardState,
                  membertechnical: this.form.membertechnical,
                  monthNum: this.ruleForm.monthNum
                },
                responseType: 'blob',
              }).then((res) => {
                let data = res.data
                const blob = data
                const fileName = '会员信息.csv'
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      search(){
        if(this.form.register_time){
          this.form.registTimeBegin = this.form.register_time[0];
          this.form.registTimeEnd = this.form.register_time[1];
        }
        if(this.form.type && this.form.fizzType){
          this.form.fizz = {
            type: Number(this.form.type),
            fizzType: Number(this.form.fizzType)
          }
        }
//      console.log(this.fizz);
        console.log(this.form.checklist);
        console.log(this.form.serchState);
        if(this.form.checklist.indexOf("0") != -1 && this.form.checklist.indexOf("1") != -1){//0,1
          this.form.serchState = {
            mobileNot: 1,
            auditNot: 1
          }
        }else if(this.form.checklist.indexOf("0") != -1 && this.form.checklist.indexOf("1") == -1){//0
          this.form.serchState = {
            auditNot: 1
          }
        }else if(this.form.checklist.indexOf("0") == -1 && this.form.checklist.indexOf("1") != -1){
          this.form.serchState = {
            mobileNot: 1
          }
        }else{
          this.form.serchState = null
        }
        this.getMemberList(this.pageIndex,this.pageSize);
      },
      go(currentPage){
        this.getMemberList(currentPage,this.pageSize);
      },
      getMemberList(pageIndex,pageSize){
        if(this.form.sex == 1){
          this.form.sex = '女'
        }else if(this.form.sex == 0){
          this.form.sex = '男'
        }
        this.loading = true
        console.log(pageIndex)


       


        if(this.province_tags.length>0){
          this.province_tags.map(e=>{
            this.queryProvince.push(e.id)
          })
        }

        if(this.city_tags.length>0){
          this.city_tags.map(e=>{
            this.queryCity.push(e.id)
          })
        }

        if(this.zc_tags.length>0){
          this.zc_tags.map(e=>{
            this.memberstationQuery.push(e.id)
          })
        }

        if(this.room_tags.length>0){
          this.room_tags.map(e=>{
            this.membersectionofficeQuery.push(e.id)
          })
        }

        

       




        this.axios.post(this.common.getApi() + '/sys/api/member/getMemberList',{
          pageIndex:pageIndex,
          pageSize:pageSize,
          params:{
            memberId: this.form.memberId,
            memberName:this.form.memberName,
            realName: this.form.realName,
            hospitalLevel: this.form.hospitalLevel,
            state: this.form.state,
            auditState: this.form.auditState,
            projectId: this.form.projectId,
            certificateState: this.form.certificateState,
            recommandCode: this.form.recommandCode,
            completeProjectId: this.form.completeProjectId,
            smscode: this.form.smscode,
            provinceId:this.queryProvince,//省份 this.queryProvince todo
            cityId: this.queryCity,//城市
            birDate: this.form.birDate,
            doctorAgeBegin: this.form.doctorAgeBegin,
            docotorAgeEnd: this.form.docotorAgeEnd,
            memberstation: this.memberstationQuery,//职称
            membersectionoffice: this.membersectionofficeQuery,//科室
            administrativeposition: this.form.administrativeposition,
            memberEmail: this.form.memberEmail,
            sex: this.form.sex,
            serchState: this.form.serchState,
            registTimeBegin: this.form.registTimeBegin,
            registTimeEnd: this.form.registTimeEnd,
            fizz:this.form.fizz,
            memberidcard: this.form.memberidcard,
            memberidcardState: this.form.memberidcardState,
            membertechnical: this.form.membertechnical,
            checkMethod:this.form.checkMethod

          },
        }).then((res) => {
          
          if(res.data.success){
            for(var i = 0; i < res.data.obj.list.length; i++){
              //性别
              if(res.data.obj.list[i].memberSex == 0){
                res.data.obj.list[i].memberSex = "男"
              }else if(res.data.obj.list[i].memberSex == 1){
                res.data.obj.list[i].memberSex = "女"
              }
              //活跃度
              if(res.data.obj.list[i].memberFizz == 1){
                res.data.obj.list[i].memberFizz = "休眠用户"
              }else if(res.data.obj.list[i].memberFizz == 2){
                res.data.obj.list[i].memberFizz = "边缘"
              }else if(res.data.obj.list[i].memberFizz == 3){
                res.data.obj.list[i].memberFizz = "活跃"
              }else if(res.data.obj.list[i].memberFizz == 4){
                res.data.obj.list[i].memberFizz = "忠诚"
              }
              //激活状态
              if(res.data.obj.list[i].memberState == 0){
                res.data.obj.list[i].memberState = "未激活"
              }else if(res.data.obj.list[i].memberState == 1){
                res.data.obj.list[i].memberState = "已激活"
              }
              //会员状态
              if(res.data.obj.list[i].isblackname == 0){
                res.data.obj.list[i].isblackname = "未审核"
              }else if(res.data.obj.list[i].isblackname == 2){
                res.data.obj.list[i].isblackname = "审核通过"
              }else if(res.data.obj.list[i].isblackname == 3){
                res.data.obj.list[i].isblackname = "ID审核"
              }else if(res.data.obj.list[i].isblackname == 4){
                res.data.obj.list[i].isblackname = "待定"
              }else if(res.data.obj.list[i].isblackname == 5){
                res.data.obj.list[i].isblackname = "未审核通过"
              }else if(res.data.obj.list[i].isblackname == 6){
                res.data.obj.list[i].isblackname = "信息填写错误 "
              }else if(res.data.obj.list[i].isblackname == 7){
                res.data.obj.list[i].isblackname = "科室电话错误"
              }else if(res.data.obj.list[i].isblackname == 8){
                res.data.obj.list[i].isblackname = "未联系到本人"
              }else if(res.data.obj.list[i].isblackname == 9){
                res.data.obj.list[i].isblackname = "兼职"
              }else if(res.data.obj.list[i].isblackname == 10){
                res.data.obj.list[i].isblackname = "测试"
              }
            }
            this.tableData = res.data.obj.list;
            this.total = res.data.obj.pager.total;
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
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

        this.form.city = "";


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
        this.form.zc_2 = ''
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
        this.form.hospital_room_2 = ''
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

      toEdit(row){
        console.log(row.id);
        sessionStorage.setItem('userid',row.id);
        this.$router.push({ path: 'vipEdit'});
      },
      toJoinRecord(row){
        sessionStorage.setItem('userid',row.id);
        this.$router.push({ path: 'vipJoinRecord'});
      },
      toRecommendRecord(row){
        sessionStorage.setItem('userid',row.id);
        this.$router.push({ path: 'vipRecommendRecord'});
      },
      toIntegrationRecord(row){
        
        sessionStorage.setItem('userid',row.id);
        sessionStorage.setItem('userName',row.memberRealname);
        this.$router.push({ path: 'vipIntegrationRecord'});
      },
      toActivity(row){
        sessionStorage.setItem('userid',row.id);
        this.$router.push({ path: 'vipActivity'});
      },
      cancelMemer(row){
        console.log(row)
        this.axios.post(this.common.getApi() + '/sys/api/member/cancelMemer',{
          params:{
            id: Number(row.id),
          }
        }).then((res) => {
          if(res.data.code == '200'){
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getMemberList(this.pageIndex,this.pageSize);
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }
    },

  };
</script>

<style>
  .vipInformation-wrapper{

  }

  .vipInformation-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }

  .vipInformation-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .vipInformation-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }

  .vipInformation-wrapper .query-wrapper{
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .vipInformation-wrapper .el-form-item--mini.el-form-item,
  .vipInformation-wrapper .el-form-item--small.el-form-item {
    margin-bottom: 12px;
  }

  .vipInformation-wrapper .el-button+.el-button {
    margin-left: 0px;
  }

  .el-pagination{
    margin-top: 2%;
    text-align: center;
  }
  .query-wrapper form{
    max-width: 1000px;
    padding: 0 20px;
  }
  .secondBox{
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    width: 200px;
    background: #fff;
    color: #606266;
    line-height: 24px;
    min-height: 27px;

  }
   .secondBox span {
     font-size: 12px;
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
    .query-wrapper .tags {
    background: transparent;
    border: none;
}
</style>