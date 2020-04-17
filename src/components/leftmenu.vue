<template>

  <div class="el-menu-par">
    <el-menu
      :default-active='$route.name'
      class="el-menu-vertical-demo"
      background-color="#3f4d67"
      text-color="#ffffff"
      :router="true"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">

      <div class="logo" >
        <span>yumdoc</span>
      </div>

      <!--<div class="logo logo2"  v-if="!inproject" @click="routego('prolist')">-->
        <!--<div class="left">-->
          <!--<img src="../assets/img/back.png" />-->
        <!--</div>-->
        <!--<span>返回项目列表</span>-->
      <!--</div>-->


      <el-menu-item index="prolist"  v-if="inproject">
        <i class="el-icon-reading"></i>
        <span slot="title">项目列表</span>
      </el-menu-item>

      <div v-if="!inproject">
        <el-menu-item  index="overview">
          <i class="el-icon-reading"></i>
          <span slot="title">项目概览</span>
        </el-menu-item>

        <el-menu-item index="apidoc">
          <i class="el-icon-tickets"></i>
          <span slot="title">api文档</span>
        </el-menu-item>


        <el-menu-item index="person">
          <i class="el-icon-user"></i>
          <span slot="title">人员管理</span>
        </el-menu-item>
      </div>

    </el-menu>
  </div>



</template>

<script>
  export default {
    data(){
      return{
        curkey:'/',
        childPage:0,
        inproject:true,
        path:this.$route.path
      }
    },

    props:['curPage'],
    mounted(){
      if(this.path=='/prolist'){
        this.inproject = true
      }else{
        this.inproject = false
      }
    },
    methods:{


      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      handleSelect(key, keyPath) {
        // this.$router.push({path:'/'+key})
        console.log(key, keyPath);
      }
    }

  }

</script>


<style scoped lang="less">

.el-menu-par{
  width: 235px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 1;
  background: #3f4d67;
  .logo{
    height: 72px;
    line-height: 72px;
    font-size: 22px;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    &.logo2{
      font-size: 15px;
      padding-left: 0px;
      cursor: pointer;
      text-align: left;
      font-weight: 100;
      .left{
        width: 72px;
        height: 72px;
        text-align: center;
      }

      &:hover{
        background: #323e52;
      }
      &:active{
        opacity: 0.8;
      }
    }
    img{
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
    span{
      vertical-align: middle;
    }
  }
  .el-menu{
    border-right: none;
  }
  .el-menu-item{
    min-width: 100%;
    i{
      color: #ffffff;
    }
    &.is-active {
      color: #ffffff;
      background-color: #323e52 !important;
    }
  }
}

</style>
