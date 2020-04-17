import axios from 'axios'
import {Message,Dialog} from 'element-ui'
//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
import router from '../router/router'

//创建一个axios实例
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;


//request拦截器
instance.interceptors.request.use(
  config => {
    //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    if(localStorage.getItem("token")){
      config.headers.Authorization = `token ${localStorage.getItem("token")}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//respone拦截器
instance.interceptors.response.use(
    response => {
      if(response.status && response.status==200 && response.data.code==-1){
        Message.error(response.data.msg);
        return response.data;
      }


      return response.data;
    },
    error => {
        if(error.response.status == 401){
          Message.error('token已过期，请重新登录')
          router.replace({name: 'login'});
        }
        Message.error(error.response.data.msg);
        console.log('error.response,',error.response)
        return Promise.reject(error.response);
    }
);

export default instance
