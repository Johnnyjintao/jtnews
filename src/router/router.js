import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import article from '../pages/article.vue'
import edit from '../pages/edit.vue'
import classify from '../pages/classify.vue'
import aboutme from '../pages/aboutme.vue'
import login from '../pages/user/login.vue'
import regist from '../pages/user/regist.vue'

import indexpage from '../pages/indexapge/indexpage.vue';
import home from '../pages/home.vue';
import filter from '../pages/filter.vue';

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component:filter
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      meta: {requiresAuth: true},
      children:[
        {
          path: '/home/regist',
          name: 'regist',
          component:regist,
          meta: {requiresAuth: true},

        },

        {
          path: '/home/article',
          name: 'article',
          component:article,
          meta: {requiresAuth: true},

        },
        {
          path: '/home/edit',
          name: 'edit',
          component: edit,
          meta: {requiresAuth: true},

        },
        {
          path: '/home/classify',
          name: 'classify',
          component: classify,
          meta: {requiresAuth: true},

        },
        {
          path:'/home/indexpage',
          component:indexpage,
          name:'indexpage',
          meta: {requiresAuth: true},

        },
        {
          path:'/home/aboutme',
          component:aboutme,
          name:'aboutme',
          meta: {requiresAuth: true},

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

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
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
