<template>
    <el-aside>
    	<el-row class="tac" style="height: 100%;">
  		  <el-col style="height: 100%;">
  		    <el-menu
  		      :default-active="$route.path"
  		      class="slider"
  		      background-color="#f4f4f4"
  		      text-color="#333"
  		      active-text-color="#13B5BB"
  		      router
  		      >
  			    <el-submenu v-for="(item,index) in menuList" :key="index" :index='item.id'>
  			      <template slot="title">
  			        <i :class="item.icon"></i>
  			        <span>{{item.title}}</span>
  			      </template>
  			      <el-menu-item-group >
  			        <el-menu-item v-for="child in item.children" :key="child.id" :index='child.index'>{{child.childtitle}}</el-menu-item>
  			      </el-menu-item-group>
  			    </el-submenu>
  		    </el-menu>
  		  </el-col>
    	</el-row>
    </el-aside>	
</template>

<script>
export default {
  name: 'slider',
  data(){
    return {
      menuList:[
        {
          id:'1',
          title: '会员管理',
          icon:'el-icon-star-on',
          children:[
            {
              index:'/vipInformation',
              childtitle:'会员信息'
            },
            {
              index:'/vipQcAudit',
              childtitle:'电话QC记录'
            },
            {
              index:'/vipZyzAudit',
              childtitle:'执业证审核'
            },
            {
              index:'/vipIntegration',
              childtitle:'积分管理'
            },  
          ]
        },
        {
          id:'2',
          title: '商城管理',
          icon:'el-icon-goods',
          children:[
            {
              index:'/goodsSeries',
              childtitle:'商品系列'
            }, 
            {
              index:'/goodsAdmin',
              childtitle:'商品管理'
            }, 
            {
              index:'/goodsOrder',
              childtitle:'订单列表'
            }, 
          ]
        },        
        {
          id:'3',
          title: '调研项目管理',
          icon:'el-icon-setting',
          children:[
            {
              index:'/proManage',
              childtitle:'项目管理'
            },            
          ]
        },
        {
          id:'4',
          title: '网站信息维护',
          icon:'el-icon-edit-outline',
          children:[
            {
              index:'/settingBanner',
              childtitle:'banner配置'
            }, 
            {
              index:'/settingNotice',
              childtitle:'网站公告'
            },   
            {
              index:'/settingQuestion',
              childtitle:'常见问题'
            },
            {
              index:'/settingRule',
              childtitle:'兑换规则'
            },
            {
              index:'/settingFeedback',
              childtitle:'业务联系'
            },
          ]
        },
        {
          id:'5',
          title: '系统管理',
          icon:'el-icon-edit-outline',
          children:[
            {
              index:'/manAccount',
              childtitle:'账户管理'
            },
            {
              index:'/manRole',
              childtitle:'角色管理'
            },
          ]
        },        
      ]
    }
  },
  mounted() {
    //this.getUserList()
    this.getInfoById()
  },
  methods: {
    //根据用户角色id来拿到列表
    getInfoById(){
      //todo动态改变这个id
        // var id = Number(this.$route.query.id)
        var id = 20
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
                  res.data.obj.oneList.map(e=>{
                      switch (e) {
                          case 1:
                            childList.push({
                              id:'1',
                              title: '会员管理',
                              icon:'el-icon-star-on',
                              children:[]
                            })
                            break;
                          case 2:
                            childList.push({
                              id:'2',
                              title: '商城管理',
                              icon:'el-icon-goods',
                              children:[]
                            })
                            break;
                          case 3:
                            childList.push({
                              id:'3',
                              title: '调研项目管理',
                              icon:'el-icon-setting',
                              children:[]
                            })
                            break;
                          case 4:
                            childList.push({
                              id:'4',
                              title: '网站信息维护',
                              icon:'el-icon-edit-outline',
                              children:[]
                            })
                            break;
                          case 5:
                            childList.push({
                              id:'5',
                              title: '系统管理',
                              icon:'el-icon-edit-outline',
                              children:[]
                            })
                            break;
                      }
                  })

                    console.log(childList);
                    
 
                  res.data.obj.twoList.map(e=>{
                     switch (e) {
                        case 5:
                          childList[0].children.push({
                            index:'/vipInformation',
                            childtitle:'会员信息'
                          })
                          break;
                        case 6:
                          childList[0].children.push({
                            index:'/vipQcAudit',
                            childtitle:'电话QC记录'
                          })
                          break;
                        case 7:
                          childList[0].children.push({
                            index:'/vipZyzAudit',
                            childtitle:'执业证审核'
                          })
                          break;
                        case 8:
                          childList[0].children.push({
                          index:'/vipIntegration',
                          childtitle:'积分管理'
                        })
                          break;
                        case 9:
                          childList[1].children.push({
                            index:'/goodsSeries',
                            childtitle:'商品系列'
                          })
                          break;
                        case 10:
                          childList[1].children.push({
                            index:'/goodsAdmin',
                            childtitle:'商品管理'
                          })
                          break;
                        case 11 :
                          childList[1].children.push({
                            index:'/goodsOrder',
                            childtitle:'订单列表'
                          })
                          break;
                        case 12:
                          childList[2].children.push({
                            index:'/proManage',
                            childtitle:'项目管理'
                          })
                          break;
                        case 13:
                          childList[3].children.push({
                            index:'/settingBanner',
                            childtitle:'banner配置'
                          })
                          break;
                        case 14:
                          childList[3].children.push({
                          index:'/settingNotice',
                          childtitle:'网站公告'
                        })
                          break;
                        case 15:
                          childList[3].children.push({
                        index:'/settingQuestion',
                        childtitle:'常见问题'
                      })
                          break;
                        case 16:
                          childList[3].children.push({
                          index:'/settingRule',
                          childtitle:'兑换规则'
                        })
                          break;
                        case 17 :
                          childList[3].children.push({
                          index:'/settingFeedback',
                          childtitle:'业务联系'
                        })
                          break;
                        case 19:
                          childList[4].children.push({
                            index:'/manAccount',
                            childtitle:'账户管理'
                          })
                          break;
                        case 20:
                          childList[4].children.push({
                            index:'/manRole',
                            childtitle:'角色管理'
                          })
                          break;
                    }
                  })
                  this.menuList=childList
                }else{
                  this.$message.error(res.data.msg)
                  
                }
              }).catch(function(err){
            })
      },
    //拿到用户权限列表
    getUserList(){
            console.log('1');
            
            this.axios.get(this.common.getApi() + '/sys/api/auth/getAuthority').then((res) => {
            if(res.data.success){
                console.log(res.data);
                this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log(err);
          })
      },
  },

}
</script>

<style>
	.el-aside,.tac{
		height: 100%;
	}
	
	.slider{
	  height: 100%;
	}
	
	.el-menu-item-group__title{
	  padding: 0;
	}
	
	.el-aside .el-submenu{
	  /*border-bottom: 1px solid #fff;*/
	}
	
	.el-submenu .el-menu-item {
    /*border-top: 1px solid #fff;*/
  }
</style>