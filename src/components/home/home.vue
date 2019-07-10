<template>
	<el-container>
		<el-dialog
			title="修改密码"
			:visible.sync="centerDialogVisible"
			width="500px"
			center>
			<el-form :inline="true" class="demo-form-inline">
				<el-row>
					<el-form-item class="ml-50" label="原密码">
						<el-input v-model="oldPassword"></el-input>
					</el-form-item>
						<el-form-item class="ml-50" label="新密码">
							<el-input v-model="newPassword"></el-input>
						</el-form-item>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="modifyPassword">确 定</el-button>
			</span>
		</el-dialog>
	  <el-header>
	    <span>医生说后台管理系统 </span>



			<el-dropdown @command="handleCommand" style="float:right;">
				<span class="el-dropdown-link">
					{{userName}} 用户管理<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
					<el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			
	  </el-header>
	  <el-container>
		<slider></slider>
	    <el-main>
        <div class="app-wrap">
          <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            v-if="openTab.length"
            @tab-click='tabClick'
            @tab-remove='tabRemove'
            >
            <el-tab-pane
               v-for="(item, index) in openTab"
              :label="item.name"
              :name="item.route"
							:key="index"
             >
            </el-tab-pane>
          <div class="content-wrap">
            <router-view/>
          </div>
          </el-tabs>
        </div>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import slider from '@/components/slider/slider.vue'

	export default {
  	name: 'Home',
  	components: {
    	slider
  	},
  	data(){
    	return{
				userName:'',
				isLogin:false,
				centerDialogVisible:false,
				oldPassword:'',
				newPassword:'',
    	}
  	},
	  methods:{
			modifyPassword(){
				let para = {
					oldPassword:this.oldPassword,
					newPassword:this.newPassword
				}
				this.axios.post(this.common.getApi() + '/sys/api/auth/modifyPassword',{
            params:para
          }).then((res) => {
            
                if(res.data.success){
                  this.$message.success(res.data.msg)
                  this.centerDialogVisible = false
                }else{
                  this.$message.error(res.data.msg)
                }
              }).catch(function(err){
            })
			},
			handleCommand(command) {
				if(command == 'loginOut'){
					this.loginOut()
					
				}else if(command == 'editPassword'){

					this.centerDialogVisible=true
					
				}

      },
			//退出登录
			loginOut(){
				// debugger
				sessionStorage.clear()
				
				localStorage.removeItem('isLogin')
				this.isLogin=false
				this.$router.push('/login')
				this.$store.state.openTab=[]
			},
			beforeDestroy() {
				sessionStorage.clear()
			},
	    //tab标签点击时，切换相应的路由
	    tabClick(tab){
	      console.log(this.$route.query.id);
	      console.log("tab",tab);
	      console.log('active',this.activeIndex);
//	      if(this.activeIndex == '/proEdit'){
//	        this.$router.push({path: this.activeIndex+"?id="+this.$route.query.id});
//	      }else{
	        this.$router.push({path: this.activeIndex});
//	      }
	    },
	    //移除tab标签
	    tabRemove(targetName){
	      console.log("tabRemove",targetName);
	      //首页不删
	      if(targetName == '/'){
	        return
	      }
	      this.$store.commit('delete_tabs', targetName);
	      if(targetName == '/vipTelVerify'){
          this.axios.get(this.common.getApi() + '/sys/api/audit/deblockingMember',{
            params:{
              params:{
                id: Number(sessionStorage.getItem('id')),
              }
            },
          }).then((res) => {
            if(res.data.success){
  //          this.$message({
  //            type: 'success',
  //            message: '解锁成功'
  //          })
//              this.$router.push('/vipQcAudit');
            }else{
              this.$message.error(res.data.msg);
            }
          })
	      }
	      if (this.activeIndex === targetName) {
	        // 设置当前激活的路由
	        if (this.openTab && this.openTab.length >= 1) {
	          console.log('=============',this.openTab[this.openTab.length-1].route)
	          this.$store.commit('set_active_index', this.openTab[this.openTab.length-1].route);
	          this.$router.push({path: this.activeIndex});
	        } else {
	          this.$router.push({path: '/'});
	        }
	      }
	    }
	  },
	  mounted () {

			if(Boolean(localStorage.getItem('isLogin'))){
				this.isLogin = true
			}
			if(Boolean(localStorage.getItem('userInfo'))){
				this.userName = JSON.parse(localStorage.getItem('userInfo')).userName
			}
			
	    // 刷新时以当前路由做为tab加入tabs
	    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
	    // 当当前路由是首页时，添加首页到store，并设置激活状态
	    if (this.$route.path !== '/' && this.$route.path !== '/main') {
	      console.log('1');
	      this.$store.commit('add_tabs', {route: '/main' , name: '首页'});
	      this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
	      this.$store.commit('set_active_index', this.$route.path);
	    } else {
	      console.log('2');
	      this.$store.commit('add_tabs', {route: '/main', name: '首页'});
	      this.$store.commit('set_active_index', '/main');
	      this.$router.push('/');
	    }

	  },
	  computed: {
	    openTab () {
	      return this.$store.state.openTab;
	    },
	    activeIndex:{
	      get () {
	        return this.$store.state.activeIndex;
	      },
	      set (val) {
	        this.$store.commit('set_active_index', val);
	      }
	    }
	  },
	  watch:{
	    '$route'(to,from){
	        //判断路由是否已经打开
	        //已经打开的 ，将其置为active
	        //未打开的，将其放入队列里
	        let flag = false;
	        for(let item of this.openTab){
//	          console.log("item.path",item.path)
//	          console.log("t0.path",to.path)

	          if(item.name === to.name){
//	            console.log('to.path',to.path);
	            this.$store.commit('set_active_index',to.path)
	            flag = true;
	            break;
	          }
	        }

	        if(!flag){
	          console.log('to.path',to.path);
	          this.$store.commit('add_tabs', {route: to.path, name: to.name});
	          this.$store.commit('set_active_index', to.path);
	        }

	    }
	  }
	}
</script>

<style>
	.el-header {
    background-color: #009999;
    color: #333;
    text-align: left;
    line-height: 60px;
    color: #FFF;
	}

	.el-header span{
	  font-weight: bold;
	  font-size:18px;
	}

	.el-main {
    color: #333;
    padding: 0;
	}

	.el-container {
		height: 100%;
	}

	.el-tabs.el-tabs--border-card {
    box-shadow: none;
    border-bottom: none;
    height: 100%;
	}

	.app-wrap{
		height: 100%;
	}

	.content-wrap{
    border-top: none;
		height: 100%;
	}

	.el-tabs--border-card{
		border: none;
	}

	.el-tabs__content{
	  height: calc(100% - 69px);
    overflow: auto;
    background: #FBFBFB;
	}

	.el-pagination .el-pager li {
    background-color: #FBFBFB;
  }

  .el-pagination button{
    background-color: #FBFBFB!important;
  }
	.el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
	.ml-50{
		margin-left: 80px;
	}
</style>
