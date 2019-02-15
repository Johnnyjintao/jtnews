
import Vue from 'vue';
import axios from './axios';
var API_ROOT = 'http://192.168.80.199:4000/api/v1/'

export const article = {

  save_draft(data){
    return axios.post(API_ROOT + 'user/login',data);
    // return Vue.http.post(API_ROOT + 'user/login',data)
  },



}



