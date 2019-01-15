<template>
  <section class="login">
    <article class="login-box">

      <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm">

          <el-input type="text" v-model.number="formInline.username" autocomplete="off" placeholder="请输入账号">
            <template slot="prepend"><icon class="el-icon-info"></icon></template>
          </el-input>
          <el-input type="password" v-model.number="formInline.password" autocomplete="off"  placeholder="请输入密码">
            <template slot="prepend"><icon class="el-icon-info"></icon></template>
          </el-input>

        <div class="login-box-line">
          <el-button type="primary" @click="handleSubmit('formInline')">登录</el-button>
          <el-button @click="handleRegist('formInline')">注册</el-button>
        </div>

      </el-form>

    </article>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex';
  import {user} from '../api/user';

  export default {
    data() {
      return {
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
      ...mapActions({
        userLogin: 'user/userLogin',
        userRegist: 'user/userRegister'
      }),

      login(name,password){
        user.login({
          name,
          password
        }).then((content)=>{
          console.log('suc,',content)
        }).catch((error)=>{
          console.log('error,',error)
        })
      },

      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              const ret = await this.login(this.formInline);

              this.$ls.set("BOBLOG_ADMIN_TOKEN", ret.token);

              const BOBLOG_ADMIN_TOKEN = this.$ls.get("BOBLOG_ADMIN_TOKEN");
              if (BOBLOG_ADMIN_TOKEN) {
                this.$Message.success('登录成功!');
                window.location.href = '/user/index';
              }

            } catch (e) {
              console.log('失败1,',e)
            }

          } else {
            console.log('失败2,',e)
          }
        })
      },

      handleRegist(name) {

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
    background: #c6c7a7;

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
          width: 130px;
        }
      }

    }



  }


</style>
