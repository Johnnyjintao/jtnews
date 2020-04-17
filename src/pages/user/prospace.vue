<template>
  <div class="prospace">
    <div class="logo"><b>yumdoc</b></div>
    <div class="container">

      <div class="pane">
        <b class="pi_title">现在，请创建或加入一个项目吧</b>
        <p class="pi_msg">一个人可以同时拥有多个项目，不同项目的人员以及数据相互独立。</p>
        <ul>

          <li :class="tabChecked=='1'?'pi_li checked':'pi_li'" @click="tabchange('1')">
            <div class="f_column">
              <b class="pi_li_title">[新建]&nbsp;一个新的项目</b>
              <p>适合团队负责人、项目负责人、或者初次使用EOLINKER的用户。</p>
              <p>创建项目之后，您将成为该项目的最高管理员。</p>
              <i v-if="tabChecked=='1'"></i>
              <img v-if="tabChecked=='1'" src="../../assets/img/check.png" />
            </div>
          </li>

          <li :class="tabChecked=='2'?'pi_li checked':'pi_li'" @click="tabchange('2')">
            <div class="pi_li_column">
              <b class="pi_li_title">[加入]&nbsp;一个现有的项目</b>
              <p>适合开发人员、测试等协作成员。</p>
              <p>创建项目之后，您将成为该项目的最高管理员。</p>
              <i v-if="tabChecked=='2'"></i>
              <img v-if="tabChecked=='2'" src="../../assets/img/check.png" />

            </div>
          </li>

          <li class="pi_li pi_li2">
            <div class="pi_li_column">
              <b class="pi_li_title">{{tabChecked=='1'?"项目名称":"项目ID"}}</b>
              <el-input :placehoder="tabChecked=='1'?'请输入项目名称':'请输入项目ID'" v-model="spacecon"></el-input>
            </div>
          </li>

        </ul>

        <div class="footer" style="margin-top: 20px;text-align: center">
          <el-button>返回</el-button>
          <el-button type="primary">完成</el-button>
        </div>
      </div>


    </div>
  </div>
</template>
<script>


  export default {
    components:{},
    data() {
      return {
        tabChecked:'1',
        spacecon:''
      }
    },
    methods:{
      tabchange(state){
        this.tabChecked = state;
      },
      prospace(){
        this.$router.push({path:"home/indexpage"})
      }
    }

  }
</script>
<style lang="less">
  .prospace {
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
      width: 870px;
      position: absolute;
      left: 50%;
      margin-left: -385px;
      top: 10%;
      border-radius: 3px;
      box-shadow: 0 10px 30px rgba(0,0,0,.1);
      background: #fff;
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
        padding: 40px;
        width: 100%;
        float: left;
        display: inline-block;
        .pi_title{
          font-size: 26px;
        }
        .pi_msg{
          font-size: 12px;
          color: #999;
          padding: 20px 0 30px;
        }

        ul{
          .pi_li2{
            margin-top: 20px;
            padding: 10px 20px !important;
          }
          .pi_li{
            position: relative;
            cursor: pointer;
            padding: 20px;
            border: 1px solid #e5e5e5;

            &.checked{
              border: 1px solid #FE6000;
            }
            .pi_li_title{
              font-size: 18px;
              margin: 10px 0;
              display: inline-block;
            }
            p{
              margin: 5px 0;
              color: #999;
            }
            i{
              position: absolute;
              right: 0;
              top: 0;
              border-left: 30px solid transparent;
              border-right: 30px solid #FE6000;
              border-top: 30px solid #FE6000;
              border-bottom: 30px solid transparent;

            }
            img{
              position: absolute;
              right: 10px;
              top: 10px;
              width: 20px;
              height: 20px;
            }
            .pi_li_checked{
              position: absolute;
              right: 0;
              top: 0;
              width: 30px;
              height: 30px;
              z-index: 1;
            }
          }
        }
        .footer{
          button{
            width: 150px;
            height: 40px;
          }
        }

      }
    }
  }
</style>
