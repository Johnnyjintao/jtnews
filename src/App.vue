<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>


<script>

  export default {
    name: 'App',
    data:function(){
      return{
          curPage:0
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
    background: #f4f5f6;

  }
</style>
