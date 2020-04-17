import Vue from 'vue';
import axios from './axios';
const API_ROOT = 'http://192.168.1.175:5000'

export const http = {
  regist(data){
    return axios.post(API_ROOT+'/api/user/regist',data);
  },
  login(data){
    return axios.post(API_ROOT+'/api/user/login',data);
  },
  getuserinfo(){
    return axios.post(API_ROOT+'/api/user/getuserinfo');
  },

  createupdate(data){
    return axios.post(API_ROOT+'/api/project/createupdate',data);
  },
  getprojectlist(data){
    return axios.post(API_ROOT+'/api/project/getprojectlist',data);
  },
  deleteproject(data){
    return axios.post(API_ROOT+'/api/project/delete',data);
  },
  getprojectdetail(data){
    return axios.post(API_ROOT+'/api/project/getprojectdetail',data);
  },

  getapigrouplist(data){
    return axios.post(API_ROOT+'/api/apigroup/getapigrouplist',data);
  },
  deleteapigroup(data){
    return axios.post(API_ROOT+'/api/apigroup/deleteapigroup',data);
  },
  cuapigroup(data){
    return axios.post(API_ROOT+'/api/apigroup/cuapigroup',data);
  },

  createapi(data){
    return axios.post(API_ROOT+'/api/api/createapi',data);
  },

  updateapi(data){
    return axios.post(API_ROOT+'/api/api/updateapi',data);
  },

  getapidetail(data){
    return axios.post(API_ROOT+'/api/api/getapidetail',data);
  },
  deleteapi(data){
    return axios.post(API_ROOT+'/api/api/deleteapi',data);
  },

  getapilist(data){
    return axios.post(API_ROOT+'/api/api/getapilist',data);
  },

  joinproject(data){
    return axios.post(API_ROOT+'/api/proauth/joinproject',data);
  },
  joinproject2(data){
    return axios.post(API_ROOT+'/api/proauth/joinproject2',data);
  },
  deleteproauth(data){
    return axios.post(API_ROOT+'/api/proauth/deleteproauth',data);
  },
  findpersoninpro(data){
    return axios.post(API_ROOT+'/api/proauth/findpersoninpro',data);
  },
  updatePermission(data){
    return axios.post(API_ROOT+'/api/proauth/updatePermission',data);
  },

  getPermissionById(data){
    return axios.post(API_ROOT+'/api/proauth/getPermissionById',data);
  },
}



