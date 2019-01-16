<template>
  <section class="login">
    <img class="page1_logo" src="~@/assets/img/login_bg.png">
    <article class="login-box">
      <!--<div class="login-box-line">
        <el-button type="primary" @click="handleSubmit('formInline')">登录</el-button>
        <el-button class="registbtn" @click="handleRegist('formInline')">注册</el-button>
      </div>-->

      <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm">

          <el-input type="text" v-model.number="formInline.username" autocomplete="off" placeholder="请输入账号">
            <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
          </el-input>
          <el-input type="password" v-model.number="formInline.password" autocomplete="off"  placeholder="请输入密码">
            <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
          </el-input>

        <div class="login-box-line">
          <el-button type="primary" @click="handleSubmit('formInline')" :loading="submitloading">登录</el-button>
          <el-button @click="handleRegist('formInline')">注册</el-button>
        </div>

      </el-form>


    </article>
  </section>
</template>
<script>

  import {user} from '../api/user';
  import store from '../../store'

  export default {
    data() {
      return {
        submitloading:false,
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            {required: true, message: 'Please fill in the user username', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {


      login(params){
        return user.login({
          username:params.username+'',
          password:params.password+'',
        })
      },


      regist(params){
        return user.regist({
          username:params.username+'',
          password:params.password+'',
        })
      },

      handleSubmit(name) {

        this.$refs[name].validate(async (valid) => {
          if (valid) {

            try {
              this.$data.submitloading = true;
              const ret = await this.login(this.formInline);
              this.$data.submitloading = false;

              let content = ret.body;


              if(content.code == 0){
                  this.$message('登录成功!');

                  this.$store.dispatch('UserLogin', content.data.token);
                  this.$store.dispatch('UserName', content.data.username);
                  this.$router.replace({path:'/home'})
              }else{
                this.$message(content.msg);
              }
            } catch (e) {
              this.$data.submitloading = false;
              console.log('失败1,',e)
            }

          } else {
            console.log('失败2,',e)
          }
        })
      },

      handleRegist(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.$data.registloading = true;
            try {
              const ret = await this.regist(this.formInline);
              this.$data.registloading = false;
              if(ret.body.code != '-1'){
                this.$message(ret.body.msg);
              }else{
                this.$message(ret.body.msg);
              }


            } catch (e) {
              this.$data.registloading = false;
              console.log('失败1,',e)
            }

          } else {
            console.log('失败2,',e)
          }
        })
      }

    }
  }
</script>
<style scoped lang="less">
  .login {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: #4d7dd2;
    background: linear-gradient(#4d7dd2, #4c79d2);
    &:after{
      content: "";
      display: block;
      height: 100%;
      margin-top: -70px;
      background: url(~@/assets/img/login_bg.png) repeat;
    }
    .login-box{
      width: 600px;
      top: 35%;
      left: 50%;
      position: absolute;
      margin-left: -300px;
      text-align: center;

      .el-input{
        width:300px;
        margin: 10px auto;
      }

      .login-box-line{
        margin-top: 20px;
        button{
          width: 160px;
          height: 60px;
          font-size: 16px;
          &.registbtn{
            border:1px solid #ffffff;
            color: #ffffff;
            background-color: transparent;
            &:hover{
              border:1px solid #d4d4d4;
              color: #d4d4d4;
            }
            &:active{
              border:1px solid #999999;
              color: #999999;
            }
          }
        }

      }

    }

    .ripple {
      position: absolute;
      &>i {
        border: 1px solid #fff;
        position: absolute;
        border-bottom: 0;
        border-radius: 50%;
        opacity: 0;
        animation: ripple 10s infinite ease-out;
      }
      &.left {
        width: 800px;
        height: 800px;
        bottom: -750px;
        left: 50px;
        &>i {
          width: 200px;
          height: 200px;
        }
      }
      &.right {
        width: 100px;
        height: 100px;
        top: 25%;
        right: -50px;
        &>i {
          width: 100px;
          height: 100px;
        }
      }
      .r2 {
        animation-delay: 2s;
      }
      .r3 {
        animation-delay: 4s;
      }
      .r4 {
        animation-delay: 6s;
      }
      .r5 {
        animation-delay: 8s;
      }
    }

  }


</style>
