<template>
  <div class="goodAdmin-wrapper">

    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEditVisible"
      width="30%"
      center>
      <div>
        <el-form ref="editform" :model="editform" label-width="120px" :rules="rules" size="mini" style=" height:500px;overflow-y:scroll;padding-right:20px;">
          <el-form-item label="编号：" prop="giftname" required>
            <el-input v-model="editform.giftname"></el-input>
          </el-form-item>
          <el-form-item label="医院名称：" prop="giftsidcode" required>
            <el-input v-model="editform.giftsidcode"></el-input>
          </el-form-item>
          <el-form-item label="医院级别：" prop="giftsecondkind" required>
            <el-select style="width: 100%;" v-model="editform.giftsecondkind">
              <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
            </el-select>
          </el-form-item>        
          <el-form-item label="医院等级：" prop="giftprize" required>
            <el-input v-model="editform.giftprize"></el-input>
          </el-form-item>
          <el-form-item label="医院性质：" prop="giftstaus" required>
            <el-select style="width: 100%;" v-model="editform.giftstaus">
              <el-option label="正常商品" value="0"></el-option>
              <el-option label="热门奖品" value="1"></el-option>
              <el-option label="下架奖品" value="2"></el-option>
              <el-option label="待审核商品" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院类型：" >
            <el-select style="width: 100%;" v-model="editform.supplierid">
              <el-option label="大家说" value="0"></el-option>
              <el-option label="一点通" value="1"></el-option>
              <el-option label="一点通录入" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专科类型：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="床位数：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名1：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名2：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名3：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名4：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名5：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名6：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名7：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名8：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名9：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
          <el-form-item label="别名10：" prop="giftdiscribe" required>
            <el-input type="textarea" v-model="editform.giftdiscribe"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('editform')">确 定</el-button>
      </span>
    </el-dialog>

    <div class="query-wrapper">
      <el-form label-width="100px" size="mini" :inline="true">
        <el-form-item label="省：">
          <el-select style="width: 200px;" v-model="province">
            <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市：">
          <el-select style="width: 200px;" v-model="city">
            <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院级别：">
          <el-select style="width: 200px;" v-model="hospitalLevel">
            <el-option v-for="item in categoryList" :label="item.categoryName" :value="item.categoryName" :key="item.categoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院名称：" >
          <el-input style="width: 200px;" type="number" v-model="hospitalName"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="getGiftsList(pageIndex,pageSize)">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
        <br />
        <el-form-item style="padding-left: 50px;">
          
          <el-button type="primary" @click="dialogEditVisible = true">增加</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      :header-cell-style="{background:'#E9EEF3',color:'#606266'}"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        label="编号"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="医院名">
      </el-table-column>
      <el-table-column
        prop="giftstairkind"
        label="医院级别">
      </el-table-column>
      <el-table-column
        prop="giftname"
        label="医院等级">
      </el-table-column>
      <el-table-column
        prop="giftstaus"
        label="医院性质">
      </el-table-column>
      <el-table-column
        prop="groundingtime"
        label="医院类型">
      </el-table-column>
      <el-table-column
        prop="convertcount"
        label="专科类型">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="床位数">
      </el-table-column>
      <el-table-column
        prop="giftprize"
        label="别名1">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名2">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名3">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名4">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名5">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名6">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名7">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名8">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名9">
      </el-table-column> 
      <el-table-column
        prop="giftprize"
        label="别名10">
      </el-table-column> 
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editshow(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="changeGrounding(scope.row)">删除</el-button>
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
        pageSize: 6,
        pageTotal: null,      
        giftsId:null,
        categoryName: null,
        type: null,
        count:null,
        addform:{
          giftname:null,
          giftsecondkind:null,
          giftprize:null,
          giftdiscribe:null,
          giftsidcode:null,
          giftstaus:null,
          fileParam:null,
          giftsidcode:null,
          giftstaus:null,
          supplierid:''
        },
        fileList: [],
        editform:{
          giftname:null,
          giftsecondkind:null,
          giftprize:null,
          giftdiscribe:null,
          giftsidcode:null,
          giftstaus:null,
          fileParam:null,
          giftsidcode:null,
          giftstaus:null,
          id:null,
          fileList:[],
          supplierid:''
        },
        categoryList:[],
        rules: {
          giftname: [
            { required: true, message: '请填写商品名称', trigger: 'blur' },
          ],
          giftsecondkind: [
            { required: true, message: '请选择所属系列', trigger: 'change' }
          ],
          giftprize:[
            { required: true, message: '请填写商品价格', trigger: 'blur' }
          ],
          giftdiscribe:[
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ],
          // supplierid:[
          //   { required: true, message: '请选择提供商', trigger: 'change' }
          // ],
          giftstaus:[
            { required: true, message: '请选择商品状态', trigger: 'change' }
          ],
          giftsidcode:[
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getGiftsList(this.pageIndex,this.pageSize);
      this.getGiftCategoryList();
    },
    methods:{
      handleSelectionChange(){
        
      },
      resetForm(){
        this.giftsId = null;
        this.categoryName = null;
        this.type = null;
        this.count = null;
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload1(file){
        
      },
      newhandlesuccess1(file){
        console.log(file);
      },
      newhandleChange1(response,file,filelist){
        this.addform.fileParam = file;
        console.log(this.addform.fileParam);
      },      
      handleExceed2(files, fileList) {
        this.$message.warning(`最多只能选择1个文件`);
      },
      beforeUpload2(file){
        
      },
      newhandlesuccess2(file){
        console.log(file);
      },
      newhandleChange2(response,file,filelist){
        this.editform.fileParam = file;
        console.log(this.editform.fileParam);
      },       
      changeGrounding(row){
        console.log(row.giftstaus)
        var type = null;
        if(row.giftstaus == "待审核商品" || row.giftstaus == "下架奖品"){
          type = 1;
        }else if(row.giftstaus == "正常商品" || row.giftstaus == "热门奖品"){
          type = 0;
        }
        this.axios.post(this.common.getApi() + '/sys/api/gifts/changeGrounding',{
          params:{
            id: Number(row.id),
            type: type
          },
        }).then((res) => {
          if(res.data.success){
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getGiftsList(this.pageIndex,this.pageSize);
          }else{
            this.$message.error(res.data.msg);
          }
        })        
      },
      getGiftsList(pageIndex,pageSize){
        this.loading = true
        var countEntity = null;
        if(this.type && this.count){
         countEntity = {type:Number(this.type),count:Number(this.count)}
        }else{
          countEntity = null;
        }
        this.axios.get(this.common.getApi() + '/sys/api/gifts/getGiftsList',{
          params:{
            pageIndex: pageIndex,
            pageSize: pageSize,
            params:{
              giftsId: this.giftsId,
              categoryName: this.categoryName,
              countEntity: countEntity
            }            
          }
          
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.tableData = res.data.obj.list
          for(var i = 0; i < this.tableData.length; i++){
            if(this.tableData[i].giftstaus == 0){
              this.tableData[i].giftstaus = "正常商品"
            }else if(this.tableData[i].giftstaus == 1){
              this.tableData[i].giftstaus = "热门奖品"
            }else if(this.tableData[i].giftstaus == 2){
              this.tableData[i].giftstaus = "下架奖品"
            }else if(this.tableData[i].giftstaus == 5){
              this.tableData[i].giftstaus = "待审核商品"
            }
          }
          this.loading =false
          this.pageTotal = res.data.obj.pager.total;
          console.log(this.pageTotal);
        })
      },
      go(currentPage){
        this.getGiftsList(currentPage,this.pageSize);
      },
      onSubmit(formName) {
        if(formName == 'addform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
  //          this.isload = true;
              if(this.addform.fileParam){
                var addform = new FormData();
                addform.append('giftname', this.addform.giftname);
                addform.append('giftstairkind', this.addform.giftsecondkind);
                addform.append('giftprize', Number(this.addform.giftprize));
                addform.append('giftdiscribe', this.addform.giftdiscribe);
                addform.append('file', this.addform.fileParam[0].raw);
                addform.append('giftsidcode', this.addform.giftsidcode);
                addform.append('giftstaus', this.addform.giftstaus);
                addform.append('supplierid', this.addform.supplierid);
                
                this.axios.post(this.common.getApi() + '/sys/api/gifts/addGifts',addform,{
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then((res) => {
  //              this.isload = false                
                  if(res.data.success){
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    })
                    this.getGiftsList(this.pageIndex,this.pageSize);
                    this.dialogAddVisible = false;
                  }else{
                    this.$message.error(res.data.msg);
                  }
                  
                })
              }else{
                this.$message.error("请上传图片");
              }
            }else {
              console.log('error submit!!');
              return false;
            }
          })
        }else if(formName == 'editform'){
          this.$refs[formName].validate((valid) => {
            if (valid) {
  //          this.isload = true;
              
              var editform = new FormData();
              editform.append('id', this.editform.id);
              editform.append('giftname', this.editform.giftname);
              editform.append('giftstairkind', this.editform.giftsecondkind);
              editform.append('giftprize', Number(this.editform.giftprize));
              editform.append('giftdiscribe', this.editform.giftdiscribe);
              if(this.editform.fileParam){
                editform.append('file', this.editform.fileParam[0].raw);                
              }else{
                console.log(this.editform.giftpicurl);
                editform.append('giftpicurl', this.editform.giftpicurl);
              }
              editform.append('giftsidcode', this.editform.giftsidcode);
              editform.append('giftstaus', this.editform.giftstaus);
              editform.append('supplierid', this.editform.supplierid);
              
              
              this.axios.post(this.common.getApi() + '/sys/api/gifts/editGifts',editform,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then((res) => {
//              this.isload = false
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '保存成功'
                  })
                  this.getGiftsList(this.pageIndex,this.pageSize);
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
      editshow(row){
        this.axios.get(this.common.getApi() + '/sys/api/gifts/getGifts',{
          params:{
            params:{
              id: row.id
            }
          }
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          if(res.data.success){
            this.dialogEditVisible = true;
            this.editform.giftname = res.data.obj.giftname;
            this.editform.giftsidcode = res.data.obj.giftsidcode;
            this.editform.giftprize = res.data.obj.giftprize;
            this.editform.giftsecondkind = res.data.obj.giftstairkind;
            this.editform.giftstaus = res.data.obj.giftstaus.toString();
            this.editform.supplierid = res.data.obj.supplierid.toString();
            this.editform.giftdiscribe = res.data.obj.giftdiscribe;
            this.editform.id = res.data.obj.id;
            this.editform.giftpicurl = res.data.obj.giftpicurl;
            this.editform.fileList.push(res.data.obj.giftpicurl);
          }else{
            this.$message.error(res.data.msg);
          }
//        this.categoryList = res.data.obj.list;
//        this.pageTotal = res.data.obj.pager.total;
//        console.log(this.pageTotal);
        })        
//      this.dialogEditVisible = true;
      }
    }
  }  
</script>

<style>
  .goodAdmin-wrapper .query-wrapper {
    min-height: 100px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background: #E9EEF3;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  
  .goodAdmin-wrapper .el-pagination{
    text-align: center;
    margin-top: 20px;
  }  
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{

    -webkit-appearance: none !important;
    margin: 0; 
}                                                                             

input[type="number"]{-moz-appearance:textfield;}  
</style>