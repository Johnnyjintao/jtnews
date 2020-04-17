// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import Vuex from 'vuex'

import router from './router/router'
import './assets/public.less'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import global from './global';
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueResource);

Vue.prototype.$global = global;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
