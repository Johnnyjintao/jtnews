<template>
  <div class="login">
    <div class="page1_logo">头条号</div>

    <div class="center-logo">
      <img src="./images/login_logo.png"/>
    </div>
    <article class="login-box">
      <div class="login-box-line">
        <el-button type="primary" @click="showlogin('formInline')" :loading="submitloading">登录</el-button>
        <el-button class="registbtn" @click="handleRegist()">注册</el-button>
      </div>
    </article>

    <el-dialog class="login-dialog" title="登录" :visible.sync="dialogFormVisible">

        <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm">

          <el-input type="text" v-model.number="formInline.username" autocomplete="off" placeholder="请输入账号">
            <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
          </el-input>
          <el-input type="password" v-model.number="formInline.password" autocomplete="off"  placeholder="请输入密码">
            <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
          </el-input>


          <div class="agree_item">
            <el-checkbox>我已阅读并同意<a href="###">用户协议和隐私条款</a></el-checkbox>
            <a href="###" class="forget">忘记密码</a>
          </div>
          <el-button class="login_btn" type="primary"
                     @click="handleSubmit('formInline')" :loading="submitloading">登录</el-button>
        </el-form>


        <ul slot="footer" class="otherLogin">
          <li class="wx"><span>微信</span></li>
          <li class="qq"><span>QQ</span></li>
        </ul>
      </el-dialog>

    <registmodal :visible="regist_visible" :onClose="handleClose"></registmodal>

    <div class="ripple left">
      <i class="r1"></i>
      <i class="r2"></i>
      <i class="r3"></i>
      <i class="r4"></i>
      <i class="r5"></i>
    </div>
    <div class="ripple right">
      <i class="r1"></i>
      <i class="r2"></i>
      <i class="r3"></i>
      <i class="r4"></i>
      <i class="r5"></i>
    </div>



  </div>
</template>
<script>

  import {user} from '../api/user';
  import store from '../../store';
  import registmodal from './regist.vue'

  export default {
    components:{registmodal},
    data() {
      return {
        submitloading:false,
        regist_visible:false,
        dialogFormVisible: false, // 登录框
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
      handleClose:function(){
        this.$data.regist_visible = false;
      },
      login(params){
        return user.login({
          username:params.username+'',
          password:params.password+'',
        })
      },




      showlogin(){
        this.$data.dialogFormVisible = true
      },


      handleSubmit(name) {

        this.$refs[name].validate(async (valid) => {
          if (valid) {

            try {
              this.$data.submitloading = true;
              const ret = await this.login(this.formInline);
              this.$data.submitloading = false;

              let content = ret;
              this.$store.dispatch('UserLogin', content.data.token);

              if(content.code == 0){
                  let userinfo = await user.getuserinfo({});

                  this.$store.dispatch('USERINFO', userinfo);

                  this.$router.replace({path:'/home/indexpage'})
                this.$message('登录成功!');
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

      handleRegist() {
        this.$data.regist_visible = true;
      }

    }
  }
</script>
<style lang="less">
  .login {
    position: relative;
    display:inline-block;
    width: 100%;
    height: 100%;
    overflow:hidden;
    background-color: #4d7dd2;
    background-image: url('../../assets/img/login_bg.png');


    .page1_logo{
      position: absolute;
      display: inline-block;
      color: #ffffff;
      font-size: 30px;
      left: 30px;
      top: 30px;
    }
    .center-logo{
      text-align: center;
      margin-top: 125px;
    }
    .login-box{
      margin-top: 50px;
      text-align: center;



      .login-box-line{
        text-align: center;
        position: absolute;
        bottom: 30%;
        left: 50%;
        margin-left: -160px;
        button{
          width: 160px;
          height: 60px;
          font-size: 20px;
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



    .login-dialog {
      a {
        display: inline-block;
        font-size: 12px;
        /*color: appColor;*/
      }
      .el-dialog {
        width: 340px !important;
        .el-dialog__header{
          padding-bottom: 0;
        }
        .el-input-group{
          margin: 10px 0;
          &:first-child{
            margin-top: 0;
          }
          .el-input input {
            height: 42px;
          }
        }

        .el-checkbox__label {
          font-size: 12px !important;
          color: #333;
        }
        .el-form-item {
          margin-bottom: 18px;
        }
        .agree_item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .login_btn {
          width: 100%;
          font-size: 18px;
          &:hover {
            opacity: 0.8;
          }
          input {
            color: #fff;
            /*background: appColor;*/
            border: none;
            outline: none;
            cursor: pointer;
          }
        }
      }
      .otherLogin {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0;
        padding: 0;
        width: 100%;
        padding-bottom: 20px;
        li {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 40px;
          margin: 0 12px;
          cursor: pointer;
          span {
            position: absolute;
            left: 8px;
            bottom: -20px;
            font-size: 12px;
            width: 24px;
            line-height: 1;
            color: #505050;
          }
        }

        .wx {
          background: url('../../assets/icon/icon_wx_pc.svg') no-repeat center center;
        }

        .qq {
          background: url('../../assets/icon/icon_qq_pc.svg') no-repeat center center;
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

      @keyframes ripple{
        0% {
          opacity: .4;
        }
        100% {
          opacity: 0;
          transform: scale(4,4);
        }
      }
    }

  }



</style>
