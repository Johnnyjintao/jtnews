<template>
  <div id="filter">
  </div>
</template>


<script>
  import {user} from './api/user';

  export default {
    name: 'App',
    data:function(){
      return{
      }
    },
    mounted(){
      let token = localStorage.getItem('token');
      //这里调接口检测token是否失效，失效就跳转到登录
      if(token){
        user.getuserinfo({}).then((content)=>{
          this.$store.dispatch('USERINFO', content.data);
          this.$router.replace({path:'/home/indexpage'})
        }).catch((error)=>{
          this.$router.replace('login')
        });
      }else{
        this.$router.replace('login')
      }

    },
    methods:{

    }
  }

</script>

<style lang="less">

</style>
