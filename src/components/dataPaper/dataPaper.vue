<template>
  <div class="data-wrapper" style="padding:50px;">

    电话: <el-input style="width:300px" v-model="form.phone"></el-input><br><br>
    查询类型：<el-select style="width: 200px;" v-model="form.type">
                <el-option label="001" value="001"></el-option>
                <el-option label="002" value="002"></el-option>
                <el-option label="003" value="003"></el-option>
                <el-option label="004" value="004"></el-option>
                <el-option label="005" value="005"></el-option>
                <el-option label="006" value="006"></el-option>
              </el-select>
              <br><br>
       <!-- 内外网选择：       
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio>
              <br><br> -->
              <el-button type="primary" @click="submit">提交</el-button>
              <br>
              <br>
              <br>
              <br>
              <p v-text="text"></p>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
  name: 'slider',
  data(){
    return {
      text:'',
      radio:'1',
      form:{
        phone:'',
        type:''
      }
      
    }
  },
  methods:{
    submit(){

     var CalcuMD5 = function (pwd) {
        pwd = pwd.toUpperCase();
        pwd = md5(pwd);
        return pwd;
      }
      var str = this.form.phone + this.form.type + "18A2911D-563D-19B8-90CD-747C9887F5281"

      var sn = CalcuMD5(str)
      
      this.axios({
        url:'http://www.yishengshuo.com:8080/doctor_wechat_api/wechat/api/index',
        method:'post',
        data:{
          "data": [{
			    "phone": this.form.phone
          }],
          "FnType": this.form.type,
          "sn": sn
        }
      }).then((res) => {
          this.text = res.data
          
        
      })
    },
  }
}
</script>

<style>
  .vipIntegrationRecord-wrapper .title{
    width: 100%;
    padding: 10px 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 13px;
    font-size: 14px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E9EEF3;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }

  .vipIntegrationRecord-wrapper .title span{
    font-size: 17px;
    font-weight: bold;
    margin-right: 20px;
  }

  .vipIntegrationRecord-wrapper .title i{
    font-size: 17px;
    margin-right: 5px;
  }

  .vipIntegrationRecord-wrapper .el-pagination{
    text-align: center;
    margin-top: 2%;
  }
</style>