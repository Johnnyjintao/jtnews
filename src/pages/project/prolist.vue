<template>
<div id="home">
  <leftmenu ></leftmenu>
  <div id="page">
    <navbar v-if="projectData" :projectData="projectData"></navbar>
    <router-view v-if="path!='/prolist' && projectData" :projectData="projectData"></router-view>

    <div class="content" v-if="path=='/prolist'">
      <div class="prolist">
        <div class="topmsg" >
          <span>用户名：{{user.user_name}}</span>
          <span style="margin-left: 1rem">用户id：{{user.user_id}}</span>
        </div>

        <div class="list" v-if="!addshow">
          <!--<div class="title">项目列表</div>-->
          <div class="search_line">
            <el-input v-model="searchTxt" placeholder="请输入关键字" maxlength="10"></el-input>

            <el-button type="primary" icon="el-icon-search" @click="getprojectlist">搜索</el-button>
            <el-button type="success" @click="resetData">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="showadddialog">新增项目</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addshow=true">加入项目</el-button>
          </div>

          <el-table
            :border="true"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="project_name"
              label="项目名称"
            >
            </el-table-column>

            <el-table-column
              prop="version"
              label="版本号"
            >
            </el-table-column>

            <el-table-column
              prop="type"
              label="类型"
            >
            </el-table-column>

            <el-table-column
              prop="permission"
              label="权限"
            >
              <template slot-scope="scope">
                <span  v-if="scope.row.permission == 1">管理员</span>
                <span  v-if="scope.row.permission == 2">读写</span>
                <span  v-if="scope.row.permission == 3">只读</span>
                <span class="color-blue" v-if="scope.row.permission == 4">待审批</span>
                <span class="color-red" v-if="scope.row.permission == 5">被拒绝</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="last_update_time"
              label="最后更新时间">
              <template slot-scope="scope">
                <span>{{formatDate(scope.row.last_update_time)}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="260"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.permission!=4 && scope.row.permission!=5">
                  <el-button type="text" size="small"><a :href="projecturl(scope.row.project_id)" target="_blank">打开项目</a></el-button>
                  <el-button type="text" size="small" v-if="scope.row.permission==1 || scope.row.permission==2" @click="updateadddialog(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" v-if="scope.row.permission==1 || scope.row.permission==2" @click="delpro(scope.row.project_id)">删除</el-button>
                </div>
                <div v-if="scope.row.permission==4" class="color-gray">审批中，不可操作</div>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div class="container" v-if="addshow">
          <div class="pane">
            <b class="pi_title">现在，请加入一个项目吧</b>
            <p class="pi_msg">一个人可以同时拥有多个项目，不同项目的人员以及数据相互独立。</p>
            <ul>
              <li class="pi_li checked" @click="tabchange('2')">
                <div class="pi_li_column">
                  <b class="pi_li_title">[加入]&nbsp;一个现有的项目</b>
                  <p>适合开发人员、测试等协作成员。</p>
                  <p>加入项目之后，您将成为该项目的协作者</p>
                  <i ></i>
                  <img src="../../assets/img/check.png" />

                </div>
              </li>
              <li class="pi_li pi_li2">
                <div class="pi_li_column">
                  <b class="pi_li_title">项目ID</b>
                  <el-input placeholder="请输入要加入的项目ID" v-model="spacecon"></el-input>
                </div>
              </li>

            </ul>

            <div class="footer" style="margin-top: 20px;text-align: center">
              <el-button @click="addshow=false">返回</el-button>
              <el-button type="primary" @click="finish">完成</el-button>
            </div>
          </div>
        </div>

        <el-dialog
          class="edg_add"
          title="新增项目"
          :before-close="canceladddialog"
          :visible="adddiglogshow"
          width="700px">

          <p>项目名称</p>
          <el-input class="edg_add_input" type="text" :rows="3" v-model="proname" placeholder="请输入项目名称"></el-input>
          <p>版本号</p>
          <el-input class="edg_add_input" type="text" :rows="3" v-model="proversion" placeholder="请输入版本号"></el-input>
          <p>项目类型</p>
          <el-input class="edg_add_input" type="text" :rows="3" v-model="protype" placeholder="请输入项目类型"></el-input>

          <span slot="footer" class="dialog-footer">
        <el-button @click="canceladddialog">取 消</el-button>
        <el-button type="primary" @click="adddialogdo">确 定</el-button>
      </span>
        </el-dialog>
      </div>
    </div>
  </div>
</div>





</template>

<script>
  import navbar from '../../components/navbar.vue';
  import leftmenu from '../../components/leftmenu.vue';
  import {http} from "../../api/http";
  import {formatDate} from '../../utils/date';
  import {Message} from 'element-ui'
  export default {
    components: {navbar,leftmenu},
    name:'indexpage',
    data(){
      return{
        path:this.$route.path,
        tableData: [],
        tabChecked:'1',
        spacecon:'',
        addshow:false,
        adddiglogshow:false,
        proname:'',
        proversion:'',
        protype:'',
        user:this.$global.user,
        offset:0,
        limit:10,
        searchTxt: "",
        project_id:'',
        total:0,
        projectData:null,
      }
    },
    mounted(){
      if(this.$route.params.id){
        this.getprojectdetail(this.$route.params.id);
      }else{
        this.getprojectlist();
      }
    },

    methods:{

      projecturl(id){
        let url = "#/prolist/"+id+"/overview";
        return url
      },
      formatDate(item){
        return formatDate(item)
      },
      getprojectlist(){
        let params = {searchTxt:this.searchTxt,user_id:this.user.user_id,offset:this.offset,limit:this.limit}
        http.getprojectlist(params).then((res)=>{
          if(res.code == 0){
            this.tableData = res.data;
            if(res.data.length>0){
              this.total = res.data[0].total
            }
          }
          console.log('getprojectlist,,',res.data)
        })
      },
      getprojectdetail(id){
        let params = {project_id:id}
        http.getprojectdetail(params).then((res)=>{
          if(res.code == 0){
            this.getPermissionById(id,res.data[0]);
          }

          console.log('getprojectdetail,,',res.data)
        })
      },
      getPermissionById(id,resdata){
        let params = {project_id:id,user_id:this.user.user_id}
        http.getPermissionById(params).then((res)=>{
          if(res.code == 0){
            resdata.permission = res.data.permission;
            this.projectData = resdata;
          }
        })
      },

      finish(){
        if(!this.spacecon) return;
        let params = {user_id:this.user.user_id,project_id:this.spacecon};
        http.joinproject(params).then((res)=>{
          if(res.code==0){
            this.addshow = false;
          }
        })
      },

      rejoin(id){

      },

      tabchange(state){
        this.tabChecked = state;
      },
      prospace(){
        this.$router.push({path:"home/indexpage"})
      },
      resetData(){
        this.proname = '';
        this.protype = '';
        this.proversion = '';
        this.project_id = '';
        this.searchTxt = '';
        this.limit = 10;
        this.offset = 0;
        this.getprojectlist();
      },
      showadddialog(){
        this.adddiglogshow = true;
        this.proname = '';
        this.protype = '';
        this.proversion = '';
        this.project_id = '';
      },
      updateadddialog(row){
        this.adddiglogshow = true;
        this.proname = row.project_name;
        this.protype = row.type;
        this.proversion = row.version;
        this.project_id = row.project_id;
      },
      canceladddialog(){
        this.adddiglogshow = false;
      },
      adddialogdo(){
        this.adddiglogshow = false;
        let params = {
          project_id: this.project_id,
          project_name: this.proname,
          version: this.proversion,
          type: this.protype,
          user_id:this.$global.user.user_id
        }
        http.createupdate(params).then((res)=>{
          if(res.code == 0){
            Message.success(res.msg);
            this.getprojectlist();
          }
        })
      },
      delpro(project_id){
        this.$confirm('您确定要删除此项目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteproject({project_id}).then((res)=>{
            if(res.code == 0){
              Message.success(res.msg);
              this.getprojectlist();
            }
          })
        }).catch(()=>{})
      },
      openpro(){

      }
    }
  }

</script>


<style scoped lang="less">
  #home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #page {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      bottom: 0;
      padding-left: 235px;
      background: #fff;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
      font-size: 14px;
      height: 100%;
      overflow: hidden;
      .content{
        position: absolute;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        padding-left: 235px;
        margin-top: 70px;
        overflow-y: auto;
      }
    }
  }
  .prolist{
    height: 100%;
    background: #f0f2f5;
    .topmsg{
      position: fixed;
      top: 0;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
      height: 70px;
      padding: 0 50px;
      background: #fff;
      line-height: 70px;
      right: 0;
      width: 100%;
      text-align: right;
      font-size: 1.2rem;
    }
    .list{

      min-height: 80%;
      padding:50px;
      background: #ffffff;

      .search_line{
        margin-bottom: 20px;
      }
      .el-input{
        width: 300px;
      }

      .el-table{
        margin-top: 20px;
      }
    }

    .container{
      width: 870px;
      position: absolute;
      left: 50%;
      margin-left: -385px;
      top: 120px;
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
          font-size: 14px;
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

    .edg_add{
      p{
        margin-bottom: 10px;
      }
      .edg_add_input{
        margin-bottom: 20px;
      }
    }
  }
</style>
