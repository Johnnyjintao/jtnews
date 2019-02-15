<template>

  <div id="app" :style="{overflow:isoverflow}">
    <router-view ></router-view>
  </div>
</template>


<script>

  export default {
    name: 'App',
    data:function(){
      return{
        isoverflow:''
      }
    },
    computed: {

    },


    watch:{
      $route(to,from){
        console.log('ttt',to.path);
        if(to.path.indexOf('home')!='-1'){
          this.$data.isoverflow = 'scroll';
        }else{
          this.$data.isoverflow = 'hidden';
        }
      }
    },

    methods:{

    }
  }

</script>

<style lang="less">
  #app {
    position: relative;
    width: 100%;
    height:100%;
    background: #f4f5f6;

  }
</style>
