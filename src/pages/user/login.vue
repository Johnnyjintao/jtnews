<template>
  <section class="login">
    <article class="login-box">

      <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm">

          <el-input type="text" v-model.number="formInline.username" autocomplete="off"></el-input>
          <el-input type="password" v-model.number="formInline.password" autocomplete="off"></el-input>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit('formInline')">提交</el-button>
          <el-button @click="handleRegist('formInline')">重置</el-button>
        </el-form-item>
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
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    border: 1px solid #f00;
  }

  .login-box {
    width: 520px;
    height: 420px;
  }

  .login-logo {
    height: 240px;
    margin-bottom: 32px;
    & img {
      width: 100%;
    }
  }
</style>
