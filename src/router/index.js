import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home/home'
import main from '@/components/main/main'
import proManage from '@/components/proManage/proManage'
import proAdd from '@/components/proAdd/proAdd'
import proEdit from '@/components/proEdit/proEdit'
import proParameter from '@/components/proParameter/proParameter'
import proSample from '@/components/proSample/proSample'
import addParam from '@/components/addParam/addParam'
import sampleRecord from '@/components/sampleRecord/sampleRecord'
import proIntegration from '@/components/proIntegration/proIntegration'
import proStatistics from '@/components/proStatistics/proStatistics'
import vipInformation from '@/components/vipInformation/vipInformation'
import vipJoinRecord from '@/components/vipJoinRecord/vipJoinRecord'
import vipRecommendRecord from '@/components/vipRecommendRecord/vipRecommendRecord'
import vipQcAudit from '@/components/vipQcAudit/vipQcAudit'
import vipZyzAudit from '@/components/vipZyzAudit/vipZyzAudit'
import vipIntegration from '@/components/vipIntegration/vipIntegration'
import goodsSeries from '@/components/goodsSeries/goodsSeries'
import goodsAdmin from '@/components/goodsAdmin/goodsAdmin'
import goodsOrder from '@/components/goodsOrder/goodsOrder'
import vipEdit from '@/components/vipEdit/vipEdit'
import vipIntegrationRecord from '@/components/vipIntegrationRecord/vipIntegrationRecord'
import vipActivity from '@/components/vipActivity/vipActivity'
import vipTelVerify from '@/components/vipTelVerify/vipTelVerify'
import settingBanner from '@/components/settingBanner/settingBanner'
import settingIntr from '@/components/settingIntr/settingIntr'
import settingNotice from '@/components/settingNotice/settingNotice'
import settingQuestion from '@/components/settingQuestion/settingQuestion'
import settingRule from '@/components/settingRule/settingRule'
import settingFeedback from '@/components/settingFeedback/settingFeedback'
import sendEmail from '@/components/sendEmail/sendEmail'
import sendMessage from '@/components/sendMessage/sendMessage'
import login from '@/components/login/login'
import manAccount from '@/components/manAccount/manAccount'
import manRole from '@/components/manRole/manRole'
import allList from '@/components/allList/allList'
import activity from '@/components/activity/activity'
import hospital from '@/components/hospital/hospital'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: 'main',
      children: [
        {
          path: 'main',
          name: '首页',
          component: main,
        },
        {
          path: 'settingBanner',
          name: 'banner设置',
          component: settingBanner,
        },
        {
          path: 'settingIntr',
          name: '平台简介',
          component: settingIntr,
        },
        {
          path: 'settingNotice',
          name: '网站公告',
          component: settingNotice,
        },
        {
          path: 'settingRule',
          name: '兑换工作',
          component: settingRule,
        },
        {
          path: 'settingQuestion',
          name: '常见问题',
          component: settingQuestion,
        },
        {
          path: 'settingFeedback',
          name: '业务联系',
          component: settingFeedback,
        },
        {
          path: 'vipInformation',
          name: '会员信息',
          component: vipInformation,
        },
        {
          path: 'vipJoinRecord',
          name: '参与记录',
          component: vipJoinRecord,
        },
        {
          path: 'vipQcAudit',
          name: '电话QC记录',
          component: vipQcAudit,
        },
        {
          path: 'vipZyzAudit',
          name: '执业证审核',
          component: vipZyzAudit,
        },
        {
          path: 'vipRecommendRecord',
          name: '推荐记录',
          component: vipRecommendRecord,
        },
        {
          path: 'vipIntegration',
          name: '积分管理',
          component: vipIntegration,
        },
        {
          path: 'vipEdit',
          name: '编辑会员信息',
          component: vipEdit,
        },
        {
          path: 'vipIntegrationRecord',
          name: '会员积分记录',
          component: vipIntegrationRecord,
        },
        {
          path: 'vipActivity',
          name: '活跃度',
          component: vipActivity,
        },
        {
          path: 'vipTelVerify',
          name: '电话QC审核',
          component: vipTelVerify,
        },
        {
          path: 'goodsSeries',
          name: '商品系列',
          component: goodsSeries,
        },
        {
          path: 'goodsAdmin',
          name: '商品管理',
          component: goodsAdmin,
        },
        {
          path: 'goodsOrder',
          name: '订单列表',
          component: goodsOrder,
        },
        {
          path: 'proManage',
          name: '项目管理',
          component: proManage,
        },
        {
          path: 'proAdd',
          name: '增加项目',
          component: proAdd,
        },
        {
          path: 'proEdit',
          name: '编辑项目',
          component: proEdit,
        },
        {
          path: 'proParameter',
          name: '项目参数',
          component: proParameter,
        },
        {
          path: 'proParameter',
          name: '项目参数',
          component: proParameter,
        },
        {
          path: 'proSample',
          name: '项目抽样',
          component: proSample,
        },
        {
          path: 'addParam',
          name: '添加抽样条件',
          component: addParam,
        },
        {
          path: 'sampleRecord',
          name: '项目抽样记录',
          component: sampleRecord,
        },
        {
          path: 'proIntegration',
          name: '项目积分',
          component: proIntegration,
        },
        {
          path: 'proStatistics',
          name: '项目进度',
          component: proStatistics,
        },
        {
          path: 'sendEmail',
          name: '发送邮件',
          component: sendEmail,
        },
        {
          path: 'sendMessage',
          name: '发送短信',
          component: sendMessage,
        },
        {
          path: 'manAccount',
          name: '账户管理',
          component: manAccount,
        },
        {
          path: 'manRole',
          name: '角色管理',
          component: manRole,
        },
        {
          path: 'allList',
          name: '权限列表',
          component: allList,
        },
        {
          path: 'activity',
          name: '活跃度管理',
          component: activity,
        }, {
          path: 'hospital',
          name: '医院管理',
          component: hospital,
        },
        
        


      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
})


router.beforeEach((to, from, next) => {
  const nextRoute = ['首页','banner设置','平台简介','网站公告','兑换工作','常见问题','业务联系','会员信息','参与记录','电话QC记录','执业证审核','推荐记录','积分管理','编辑会员信息',
    '会员积分记录',
    '活跃度',
    '电话QC审核',
    '商品系列',
    '商品管理',
    '订单列表',
    '项目管理',
    '增加项目',
    '编辑项目',
    '项目参数',
    '项目抽样',
    '添加抽样条件',
    '项目抽样记录',
    '项目积分',
    '项目进度',
    '发送邮件',
    '发送短信',
    '账户管理',
    '角色管理'
  ] // 需要登录的页面
  let isLogin = Boolean(localStorage.getItem('isLogin')) // 判断是否登录，本地存储有用户数据则视为已经登录
  // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
  if (nextRoute.indexOf(to.name) >= 0) { // 检测是否登录的页面
    if (!isLogin) { // 如果未登录（本地存储无用户数据），并且要跳到登录页面
      if (from.name === 'login') {
        next('/')
        console.log('1');
        return
      }
      // 先到登录页面，并保存当权页面path，登录页面做处理后跳到到当前页面。
      router.push({
        name: 'login',
        params: {
          redirect: to.fullPath 
        }
      })
    }
  }
  // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
  if (to.name === 'login') {
    if (isLogin) {
      next('/')
      return
    }
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})


export default router
