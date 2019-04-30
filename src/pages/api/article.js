
import Vue from 'vue';
import axios from './axios';
var API_ROOT = 'http://192.168.1.175:4000/api/v1/'

export const article = {

  create_article(data){
    return axios.post(API_ROOT + 'article/create_article',data);
  },

  query_article(data){
    return axios.post(API_ROOT + 'article/query_article',data);
  },

  query_article_detail(data){
    return axios.post(API_ROOT + 'article/query_article_detail',data);
  },

  update_article(data){
    return axios.post(API_ROOT + 'article/update_article',data);
  },

  add_article(data){
    return axios.post(API_ROOT + 'article/add_article',data);
  },

  del_article(data){
    return axios.post(API_ROOT + 'article/del_article',data);
  },

}



