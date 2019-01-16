
import Vue from 'vue';

var API_ROOT = 'http://192.168.80.199:3000/api/v1/'

export const user = {

  login(data){
    return Vue.http.post(API_ROOT + 'user/login',data)
  },

  regist(data){
    return Vue.http.post(API_ROOT + 'user/regist',data)
  },

  queryvotelist(data){
    return Vue.http.post(API_ROOT + 'vote/query_vote_list',data)
  },


}



