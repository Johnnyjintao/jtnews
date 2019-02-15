<template>
  <div class="registmodal">
    <el-dialog class="regist-dialog" title="注册" :visible.sync="visible"
               :before-close="handleClose">

      <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm">

        <el-input type="text" v-model.number="formInline.username" autocomplete="off" placeholder="请输入账号">
          <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
        </el-input>

        <el-input type="password" v-model.number="formInline.password" autocomplete="off"  placeholder="请输入密码">
          <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
        </el-input>


        <el-input type="password" v-model.number="formInline.again_password" autocomplete="off"  placeholder="再次输入密码">
          <template slot="prepend"><el-icon class="el-icon-info"></el-icon></template>
        </el-input>



        <el-button class="login_btn" type="primary"
                   @click="handleSubmit('formInline')" :loading="submitloading">注册</el-button>
      </el-form>

    </el-dialog>
  </div>

</template>

<script>
  import {user} from '../api/user';


  export default {
    props: ['visible','onClose'],
    data() {
      return {
        reg_visible:true,
        submitloading:false,
        formInline: {
          username: '',
          password: '',
          again_password:''
        },
      }
    },

    mounted:function(){

    },

    methods:{
      handleClose:function () {
        this.formInline.username = '';
        this.formInline.password = '';
        this.formInline.again_password = '';
        this.$props.onClose()
      },

      regist(params){
        return user.regist({
          username:params.username+'',
          password:params.password+'',
        })
      },

      handleSubmit(name) {
        if(!this.formInline.username){
          this.$message('请输入用户名');
          return;
        }else if(!this.formInline.password){
          this.$message('请输入密码');
          return;
        }else if(!this.formInline.again_password){
          this.$message('请再次输入密码');
          return;
        }else if(this.formInline.again_password !== this.formInline.password){
          this.$message('两次密码输入不一致，请确认后重新输入');
          return;
        }
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.$data.registloading = true;
            try {
              const ret = await this.regist(this.formInline);
              this.$data.registloading = false;
              this.$message(ret.data.msg);

              if(ret.data.code != '-1') {
                this.$props.onClose()
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


<style lang="less">
  .registmodal{
    padding:20px;
    .regist-dialog {
      a {
        display: inline-block;
        font-size: 12px;
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
          margin-top: 20px;
          width: 100%;
          font-size: 18px;
          &:hover {
            opacity: 0.8;
          }
          input {
            color: #fff;
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
      }
    }
  }
</style>
