
import Vue from 'vue';
import axios from './axios';
var API_ROOT = 'http://192.168.1.175:4000/api/v1/'


export const category = {

  create_category(data){
    return axios.post(API_ROOT + 'category/create_category',data);
  },

  get_category_list(data){
    return axios.post(API_ROOT + 'category/get_category_list',data);
  },

  update_category(data){
    return axios.post(API_ROOT + 'category/update_category',data);
  },

  del_category(data){
    return axios.post(API_ROOT + 'category/del_category',data);
  },

}



