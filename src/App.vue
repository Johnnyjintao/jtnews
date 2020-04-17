<template>

  <div id="app">
    <div v-if="islogin">
      <router-view ></router-view>
    </div>

  </div>
</template>


<script>
  import {http} from "./api/http";

  export default {
    name: 'App',
    data:function(){
      return{
        isoverflow:'',
        islogin:false
      }
    },

    mounted(){
      this.getuserinfo();
    },

    methods:{
      getuserinfo(){
        http.getuserinfo().then((res)=>{
          this.islogin = true;
          if(res.code == 0){
            this.$global.user = res.data;
            this.$global.islogin = true;
          }
        }).catch(()=>{
          this.islogin = true;
          this.$global.islogin = true;
        })
      }
    }
  }

</script>

<style lang="less">
  #app {
    position: relative;
    width: 100%;
    height:100%;

  }
</style>
