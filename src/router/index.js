import Vue from 'vue'
import Router from 'vue-router'

import geshou from '../components/geshou/geshou'
import paihang from '../components/paihang/paihang'
import sousuo from '../components/sousuo/sousuo'
import tuijian1 from '../components/tuijian/tuijian'
Vue.use(Router)

export default new Router({
routes: [
     {
      path: '/',
      redirect: 'tuijian'
    },
    {
      path: '/geshou',
      component: geshou
    },
    {
      path: '/paihang',
      component: paihang
    },
    {
      path: '/sousuo',
      component: sousuo
    },
    {
      path: '/tuijian',
      component: tuijian1
    }
]
})
