<template>
  <div id="home">
    <navbar ></navbar>


    <div class="horContainer">
      <leftmenu></leftmenu>

      <el-main id="page">
        <router-view />
      </el-main>


    </div>


  </div>
</template>


<script>
  import navbar from '../components/navbar.vue';
  import leftmenu from '../components/leftmenu.vue'

  export default {
    name: 'App',
    components:{navbar,leftmenu},
    data:function(){
      return{
        curPage:0
      }
    },
    methods:{
      navitemclick(index){
        if(index == '0'){
          this.$router.push({path:'/'})
        }else if(index == '1'){
          this.$router.push({path:'/mine'})
        }else if(index == '2'){
          this.$router.push({path:'/friend'})
        }

        this.$data.curPage = index;
      }
    }
  }

</script>

<style lang="less">
  #home {
    position: relative;
    width: 100%;
    background: #f4f5f6;
    .horContainer {
      position: relative;
      width: 1138px;
      min-width: 1138px;
      margin: 36px auto 0;
      font-size: 0;
      .pageView {
        position: relative;
        width: 934px;
        height: fit-content;
        min-height: 100%;
        background: #fff;
        overflow: inherit;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
        margin-left: 24px;
        font-size: 14px;
        padding: 0;
      }
    }

    #page {
      position: relative;
      width: 934px;
      height: fit-content;
      min-height: 300px;
      background: #fff;
      overflow: inherit;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
      margin-left: 24px;
      font-size: 14px;
      padding: 0;
      float: left;
    }
  }
</style>
