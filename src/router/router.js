import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import login from '../pages/user/login.vue'
import prospace from '../pages/user/prospace.vue'


import home from '../pages/home.vue';
import prolist from '../pages/project/prolist.vue';
import overview from '../pages/project/overview.vue';
import apidoc from '../pages/project/apidoc.vue';
import apidocedit from '../pages/project/apidocedit.vue';
import apidocpreview from '../pages/project/apidocpreview.vue';

import prodoc from '../pages/project/prodoc.vue';
import profile from '../pages/project/profile.vue';
import person from '../pages/project/person.vue';
import global from '../global'

Vue.use(Router)

const router =  new Router({
  routes: [


    {
      path: '/prolist',
      name: 'prolist',
      component:prolist,
      meta: {requiresAuth: true},
      children:[
        {
          path: '/prolist/:id/overview',
          name: 'overview',
          component:overview,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/apidoc',
          name: 'apidoc',
          component:apidoc,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/apidocedit',
          name: 'apidocedit',
          component:apidocedit,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/apidocpreview',
          name: 'apidocpreview',
          component:apidocpreview,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/prodoc',
          name: 'prodoc',
          component:prodoc,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/profile',
          name: 'profile',
          component:profile,
          meta: {requiresAuth: true},
        },
        {
          path: '/prolist/:id/person',
          name: 'person',
          component:person,
          meta: {requiresAuth: true},
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/',
      component:login
    },
    {
      path: '/prospace',
      name: 'prospace',
      component:prospace
    },

  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = localStorage.getItem('token');
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
        next();
    }else{
      next({
        path: '/login',
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }

});

export default router;
