import Vue from 'vue'
import Router from 'vue-router'

import article from '../pages/article.vue'
import edit from '../pages/edit.vue'
import classify from '../pages/classify.vue'
import aboutme from '../pages/aboutme.vue'
import login from '../pages/user/login.vue'
import regist from '../pages/user/regist.vue'

import indexpage from '../pages/indexapge/indexpage.vue';
import home from '../pages/home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      children:[
        {
          path: '/home/regist',
          name: 'regist',
          component:regist
        },

        {
          path: '/home/article',
          name: 'article',
          component:article
        },
        {
          path: '/home/edit',
          name: 'edit',
          component: edit
        },
        {
          path: '/home/classify',
          name: 'classify',
          component: classify
        },
        {
          path:'/home/indexpage',
          component:indexpage,
          name:'indexpage'
        },
        {
          path:'/home/aboutme',
          component:aboutme,
          name:'aboutme'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },

  ]
})
