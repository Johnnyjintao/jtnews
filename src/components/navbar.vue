<template>
  <header id="header" class="">
    <div class="header_wrap">
      <span class="contitle" v-if="path!='/prolist' && projectData">{{projectData.project_name}}({{projectData.project_id}})</span>
      <span class="contitle" v-if="path=='/prolist'">项目列表</span>
      <div class="right">
        <div class="userinfo">
          <img src="../assets/img/head.png" alt="">
          <span class="el-dropdown-link">{{user.user_name}}</span>
          <span class="qx">
              {{projectData.permission == 1?'管理员':
                  projectData.permission == 2?'读写':
                  projectData.permission == 3?'只读':
                  projectData.permission == 4?'待审批':'被拒绝'}}
            </span>
        </div>
        <el-button class="publish_btn" @click="handleCommand">注销</el-button>
      </div>
    </div>
  </header>

</template>

<script>

  //  import { mapState, mapMutations } from 'vuex'

  export default {
    data(){
      return{
        user:this.$global.user,
        path:this.$route.path,
      }
    },

    props:['projectData'],

    mounted:function(){

    },
    methods: {

      handleCommand() {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            localStorage.removeItem('token');
            this.$global.user.islogin = false;
            this.$router.replace('/login');
          }).catch(() => {
          });

      }

    }


  }

</script>


<style scoped lang="less">
  #header {
    position: relative;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
    height: 70px;
    padding: 0 50px;
    background: #fff;
    z-index: 1;
    .header_wrap {
      position: relative;
      height: 100%;
      z-index: 100;
      text-align: center;

      .contitle{
        height: 100%;
        line-height: 70px;
        font-size: 20px;
      }
      .logo {
        position: absolute;
        top: 50%;
        left: 0;
        width: 94px;
        /*background: url(../assets/img/logo.png)no-repeat;*/
        background-size: contain;
        transform: translateY(-50%);
        text-decoration:none;
        font-size: 30px;
        font-weight: 700;
        color: #409EFF;
      }
      .right {
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
        .publish_btn {
          float: right;
        }
          margin-left: 40px;
          .userinfo {
            margin-right: 20px;
            .qx{
              background: #4aafe9;
              color: #ffffff;
              padding: 5px;
              border-radius: 3px;
              margin-left: 20px;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 100%;
              vertical-align: middle;
              margin-right: 5px;
            }
          }
        }
    }
  }


</style>
