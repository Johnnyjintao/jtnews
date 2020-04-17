<template>
  <div class="login">
    <div class="logo"><b>yumdoc</b></div>
    <div class="container">

      <div class="pane">
        <ul class="c_header">
          <li :class="state=='login'?'checked':''" @click="tabchange('login')">登录</li>
          <li :class="state=='prospace.vue'?'checked':''" @click="tabchange('prospace.vue')">注册</li>
        </ul>
        <div class="paneitem" v-if="state == 'login'">
          <div style="padding-bottom: 20px;color:#999">欢迎来到yumdoc</div>
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-s-home"
            maxlength="16"
            v-model="login_account">
          </el-input>
          <el-input
            style="margin-top: 20px"
            placeholder="请输入密码"
            maxlength="16"
            minlength="6"
            type="password"
            prefix-icon="el-icon-s-cooperation"
            v-model="login_password">
          </el-input>

          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
        </div>
        <div class="paneitem" v-if="state == 'prospace.vue'">
          <el-input
            placeholder="昵称（真实姓名）"
            prefix-icon="el-icon-s-custom"
            maxlength="16"
            v-model="regist_username">
          </el-input>
          <el-input
            style="margin-top: 15px;"
            placeholder="账号（手机号/邮箱/6-16位字符）"
            prefix-icon="el-icon-s-home"
            maxlength="16"
            minlength="6"
            v-model="regist_account">
          </el-input>
          <el-input
            style="margin-top: 15px"
            placeholder="密码（6-16位字符）"
            maxlength="16"
            minlength="6"
            prefix-icon="el-icon-s-cooperation"
            type="password"
            v-model="regist_password">
          </el-input>
          <el-input
            style="margin-top: 15px"
            placeholder="请再次确认密码"
            maxlength="16"
            minlength="6"
            prefix-icon="el-icon-s-cooperation"
            type="password"
            v-model="regist_password2">
          </el-input>
          <el-button type="primary" @click="registbtn" :loading="registLoading">注册</el-button>
        </div>
      </div>
      <div class="pane">

        <b class="pi_title">您会喜欢上yumdoc</b>
        <p>· 全面的基础服务</p><p>· 良好的操作体验</p><p>· 托管无限数量的项目</p><p>. 支持人员权限管理</p>
        <b class="pi_title">针对企业用户</b>
        <p>· 业内领先的研发管理解决方案</p><p>· 丰富的产品组合</p><p>· 支持Open API与Webhook</p><p>· 支持企业级人员权限管理</p>
      </div>


    </div>
  </div>
</template>
<script>
  import {Message} from 'element-ui';
  import {http} from "../../api/http";

  export default {
    components:{},
    watch:{
      regist_account(val){
        this.regist_account=val.replace(/[\u4e00-\u9fa5]/ig,'');
      },
      login_account(val){
        this.login_account=val.replace(/[\u4e00-\u9fa5]/ig,'');
      }
    },

    data() {
      return {
        login_account:'',
        login_password:'',

        regist_account:'',
        regist_username:'',
        regist_password:'',
        regist_password2:'',

        state:'login',
        tablist:[{id:'login',name:'登录',checked:true},{id:'prospace.vue',name:'注册',checked:false}],
        registLoading:false,
        loginLoading:false,
      }
    },
    methods:{
      tabchange(state){
        this.state = state;
      },
      login(){

        if(!this.login_account){
          Message.error('请输入账号');
          return;
        }

        if(!this.login_password){
          Message.error('请输入密码');
          return;
        }

        this.loginLoading = true;
        let params = {password:this.login_password,account:this.login_account};
        http.login(params).then((res)=>{
          if(res.code == 0){
            localStorage.setItem('token', res.data.token);
            this.$global.user = res.data.user;
            this.$router.replace({name:'prolist'});
          }
          this.loginLoading = false;
        }).catch(()=>{
          this.loginLoading = false;
        })
      },
      registbtn(){
        if(!this.regist_username){
          Message.error('请输入昵称');
          return;
        }
        if(!this.regist_account){
          Message.error('请输入账号');
          return;
        }

        if(!this.regist_password){
          Message.error('请输入密码');
          return;
        }
        if(!this.regist_password2){
          Message.error('请再次输入密码');
          return;
        }
        this.registLoading = true;
        let params = {user_name:this.regist_username,password:this.regist_password,account:this.regist_account};
        http.regist(params).then((res)=>{
          if(res.code == 0){
            Message.error('注册成功，请登录！');
            this.registLoading = false;
          }
        }).catch(()=>{
          this.registLoading = false;
        })
      }
    }

  }
</script>
<style lang="less">
  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/yumdocbg.png") no-repeat;
    background-position: 0 100%;
    background-size: 100%;

    .logo{
      font-size: 28px;
      margin: 50px;
    }
    .container{
      width: 770px;
      position: absolute;
      left: 50%;
      margin-left: -385px;
      top: 15%;
      border-radius: 3px;
      box-shadow: 0 10px 30px rgba(0,0,0,.1);

      .c_header{
        overflow: hidden;
        display: inline-block;
        margin: 20px;
        li{
          display: inline-block;
          padding: 10px 20px;
          border: 1px solid #e5e5e5;
          float: left;
          cursor: pointer;

          &:first-child{
            border-right: none;
          }
          &.checked{
            background: #089462;
            color: #ffffff;
          }
        }
      }
      .pane{
        padding: 20px;
        width: 49%;
        float: left;
        display: inline-block;
        &:first-child{
          border-right: 1px solid #e5e5e5;
        }
        .paneitem{
          padding: 15px;

          .el-button{
            margin-top: 20px;
            width: 100%;
          }
        }
        .pi_title{
          display: block;
          padding: 0;
          color: #666;
          font-size: 16px;
          &:nth-child(n+2){
            margin-top: 30px;
          }
        }
        p{
          color: #666;
          margin-top: 8px;
        }
      }
    }
  }
</style>
