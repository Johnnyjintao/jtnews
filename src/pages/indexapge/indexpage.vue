<template>
  <div class="indexpage">
    这是首页

  </div>
</template>

<script>
  export default {
    components: {},
    name:'indexpage',
    data(){
      return{
        carouselList:[
          {url:'1',name:'1'},
          {url:'2',name:'2'},
          {url:'3',name:'3'},
          {url:'4',name:'4'},
        ]
      }
    },

  }

</script>


<style scoped lang="less">
  .indexpage{
    padding:20px;
  }
</style>
