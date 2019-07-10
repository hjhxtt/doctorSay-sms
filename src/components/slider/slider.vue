<template>
    <el-aside style="width:220px;">
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
  			    <el-submenu v-for="item in menuList" :key="item.id" :index='item.id'>
  			      <template slot="title">
  			        <i :class="item.icon"></i>
  			        <span>{{item.title}}</span>
  			      </template>
  			      <el-menu-item-group >
  			        <el-menu-item v-for="child in item.children" :key="child.url" :index='child.url'>{{child.authorityName}}</el-menu-item>
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
        // {
        //   id:'1',
        //   title: '会员管理',
        //   icon:'el-icon-star-on',
        //   children:[
        //     {
        //       url:'/vipInformation',
        //       authorityName:'会员信息'
        //     },
        //     {
        //       url:'/vipQcAudit',
        //       authorityName:'电话QC记录'
        //     },
        //     {
        //       url:'/vipZyzAudit',
        //       authorityName:'执业证审核'
        //     },
        //     {
        //       url:'/vipIntegration',
        //       authorityName:'积分管理'
        //     },  
        //   ]
        // },
        // {
        //   id:'2',
        //   title: '商城管理',
        //   icon:'el-icon-goods',
        //   children:[
        //     {
        //       url:'/goodsSeries',
        //       authorityName:'商品系列'
        //     }, 
        //     {
        //       url:'/goodsAdmin',
        //       authorityName:'商品管理'
        //     }, 
        //     {
        //       url:'/goodsOrder',
        //       authorityName:'订单列表'
        //     }, 
        //   ]
        // },        
        // {
        //   id:'3',
        //   title: '调研项目管理',
        //   icon:'el-icon-setting',
        //   children:[
        //     {
        //       url:'/proManage',
        //       authorityName:'项目管理'
        //     },            
        //   ]
        // },
        // {
        //   id:'4',
        //   title: '网站信息维护',
        //   icon:'el-icon-edit-outline',
        //   children:[
        //     {
        //       url:'/settingBanner',
        //       authorityName:'banner配置'
        //     }, 
        //     {
        //       url:'/settingNotice',
        //       authorityName:'网站公告'
        //     },   
        //     {
        //       url:'/settingQuestion',
        //       authorityName:'常见问题'
        //     },
        //     {
        //       url:'/settingRule',
        //       authorityName:'兑换规则'
        //     },
        //     {
        //       url:'/settingFeedback',
        //       authorityName:'业务联系'
        //     },
        //   ]
        // },
        // {
        //   id:'5',
        //   title: '系统管理',
        //   icon:'el-icon-edit-outline',
        //   children:[
        //     {
        //       url:'/manAccount',
        //       authorityName:'账户管理'
        //     },
        //     {
        //       url:'/manRole',
        //       authorityName:'角色管理'
        //     },
        //   ]
        // },        
      ]
    }
  },
  mounted() {
    this.getAuthority()
  },
  methods: {
    getAuthority(){
      var $this = this
      this.axios.get(this.common.getApi() + '/sys/api/auth/getAuthority').then(res=>{
            if(res.data.success){
              var newList = []
              res.data.obj.map((e,i)=>{
                console.log(e.authorityName);
                newList.push({
                  id:String(i+1),
                  title:e.authorityName,
                  children:e.sonList
                })
              })

                newList.map((e,i)=>{
                  if(i == 0){
                    e.icon= 'el-icon-star-on'
                  }else if(i == 1){
                    e.icon= 'el-icon-goods'
                  }else if(i == 2){
                    e.icon= 'el-icon-setting'
                  }else if(i == 3){
                    e.icon= 'el-icon-edit-outline'
                  }else if(i == 4){
                    e.icon= 'el-icon-edit-outline'
                  }
                })

              console.log(newList);
             
              this.menuList = newList
            }else{
              debugger
              this.$message.error(res.data.msg);
              localStorage.removeItem('isLogin')
              this.$router.push('/login')
              this.$store.state.openTab=[]
            }
            
        })
    },
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