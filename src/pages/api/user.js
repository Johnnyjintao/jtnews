
import Vue from 'vue';
import axios from './axios';
var API_ROOT = 'http://192.168.1.175:4000/api/v1/'


export const user = {

  login(data){
    return axios.post(API_ROOT + 'user/login',data);
    // return Vue.http.post(API_ROOT + 'user/login',data)
  },

  regist(data){
    return Vue.http.post(API_ROOT + 'user/regist',data)
  },

  getuserinfo(data){
    return axios.post(API_ROOT + 'user/info',data);
  },


}



