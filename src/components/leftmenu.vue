<template>

  <div class="el-menu-par">
    <el-menu
      :default-active='$route.name'
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">

      <el-menu-item index="indexpage">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>

      <el-menu-item index="edit">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">发布</span>
      </el-menu-item>


      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="article">文章管理</el-menu-item>
          <el-menu-item index="classify">分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="aboutme">
        <i class="el-icon-setting"></i>
        <span slot="title">关于我</span>
      </el-menu-item>


    </el-menu>
  </div>



</template>

<script>
  export default {
    data(){
      return{
        curkey:'/',
        childPage:0
      }
    },

    props:['curPage'],
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      handleSelect(key, keyPath) {
        this.$router.push({path:'/'+key})
        console.log(key, keyPath);
      }
    }

  }

</script>


<style scoped lang="less">

.el-menu-par{
  width:180px;
  float: left;
  .el-menu-item{
    min-width: 100%;
    &.is-active {
      color: #409EFF;
      background-color: #ecf5ff;
    }
  }
}

</style>
