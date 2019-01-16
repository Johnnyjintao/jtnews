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

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      meta: {
        requiresAuth: true
      },
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

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  debugger
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        // query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
});

export default router;
