import Vue from 'vue'
import Router from 'vue-router'

import article from '../pages/article.vue'
import edit from '../pages/edit.vue'
import classify from '../pages/classify.vue'
import aboutme from '../pages/aboutme.vue'

import indexpage from '../pages/indexapge/indexpage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexpage',
      redirect: 'indexpage',
    },
    {
      path: '/article',
      name: 'article',
      component:article
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path:'/indexpage',
      component:indexpage,
      name:'indexpage'
    },
    {
      path:'/aboutme',
      component:aboutme,
      name:'aboutme'
    }
  ]
})
