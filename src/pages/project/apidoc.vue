<template>
  <div id="apidoc">
    <div class="leftcon">
      <el-button class="addbtn el-icon-plus" type="primary" @click="diglogshow2">新建分组</el-button>
      <ul v-for="(item,index) of api_group_list">
          <li :class="item.checked?'checked displayflex':'displayflex'" @click.stop="checkgroup(index)">
            <span >{{item.api_group_name}}</span>
            <el-dropdown v-if="item.api_group_id!='all'&&item.api_group_id!='default'" @command="handleCommand">
              <i class="el-icon-more"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" :command="{type:'a',item}">编辑</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" :command="{type:'b',item}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
      </ul>
    </div>
    <div class="rightcon">
      <div class="searchline">
        <el-input v-model="searchTxt" placeholder="请输入标题进行检索" ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="success" @click="reset">重置</el-button>
        <el-button type="primary" class="addbtn el-icon-plus" @click="routego('apidocedit',{})">新建文档</el-button>
      </div>
      <div class="ct">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            >
          </el-table-column>
          <el-table-column
            prop="path"
            label="URL"
            >
          </el-table-column>
          <el-table-column
            prop="create_user_name"
            label="创建者"
            >
          </el-table-column>
          <el-table-column
            prop="update_user_name"
            label="最近更新者"
            >
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新日期"
            >
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.update_time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="caozuo"
            label="操作">
            <template slot-scope="scope">
              <span class="caozuo" v-if="projectData.permission=='1'||projectData.permission=='2'" @click="routego('apidocedit',{api_id:scope.row.api_id})">编辑</span>
              <span class="caozuo" @click="routego('apidocpreview',{api_id:scope.row.api_id})">查看</span>
              <span class="caozuo" v-if="projectData.permission=='1'||projectData.permission=='2'" @click="deleteApi(scope.row.api_id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :small="false"
          @current-change="handleCurrentChange"
          :current-page.sync="currentpage"
          layout="total, prev, pager, next"
          :total="total"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>


    <el-dialog
      class="edg_lookpic"
      :title="group_title"
      :before-close="closedialog"
      :visible="groupvisible"
      width="500px">
      <el-input v-model="api_group_name" placeholder="请输入分组名称"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="groupvisible=false">取 消</el-button>
        <el-button type="primary" @click="cuapigroup" :loading="groupLoading">确 定</el-button>
      </span>
    </el-dialog>

  </div>


</template>

<script>
  import navbar from '../../components/navbar.vue';
  import {http} from '../../api/http';
  import {Message} from 'element-ui';
  import {formatDate} from '../../utils/date'
  export default {
    props:['projectData'],
    components: {navbar},
    name:'indexpage',
    data(){
      return{
        searchTxt:'',
        tableData:[],
        radio:'admin',
        groupvisible:false,
        api_group_name:'',
        api_group_id:'all',
        api_group_list:[],
        groupLoading:false,
        group_title:'新建分组',
        limit:10,
        currentpage:1,
        total:0
      }
    },

    mounted(){
      this.getapigrouplist();
      this.getapilist();
    },
    methods: {
      closedialog(){
        this.groupvisible = false;
      },
      handleCurrentChange(val) {
        this.currentpage = val;
        this.getapilist();
        console.log(`当前页: ${val}`);
      },

      formatDate(date){
        return formatDate(date)
      },
      checkgroup(i){
        let arr = this.api_group_list;
        for(let item of arr){
          item.checked = false;
        }
        arr[i].checked = true;
        this.api_group_list = arr;
        this.api_group_id = arr[i].api_group_id;
        this.getapilist();
      },
      handleCommand(commend){
        if(commend.type == 'a'){
          this.group_title = '编辑分组';
          this.editgroup(commend.item);
        }else{
          this.deleteapigroup(commend.item.api_group_id);
        }
      },
      editgroup(data){
        this.api_group_id = data.api_group_id;
        this.api_group_name = data.api_group_name;
        this.groupvisible = true;
      },
      deleteapigroup(api_group_id){
        this.$confirm('删除分类会将分类下的所有数据归类到默认分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteapigroup({api_group_id}).then((res)=>{
            if(res.code == 0){
              this.groupvisible = false;
              this.getapigrouplist();
            }
          })
        })

      },

      cuapigroup(){
        let api_group_id;
        if(this.group_title == '新建分组'){
          api_group_id = '';
        }else{
          api_group_id = this.api_group_id;
        }
        let api_group_name = this.api_group_name;
        let project_id = this.projectData.project_id;
        if(!api_group_name){
          Message.error('请输入分组名称！');
          return;
        }
        this.groupvisible = true
        http.cuapigroup({api_group_id,api_group_name,project_id}).then((res)=>{
          if(res.code == 0){
            Message.success(res.msg);
            this.groupvisible = false;
            this.getapigrouplist();
          }
        })
      },
      getapigrouplist(){
        let project_id = this.projectData.project_id;
        http.getapigrouplist({project_id}).then((res)=>{
          if(res.code == 0){
            let arr = [{api_group_name:'所有接口',api_group_id:'all',project_id:this.project_id},{api_group_name:'默认分组',api_group_id:'default',project_id:this.project_id}]
            let arr2 = [...arr,...res.data];
            for(let item of arr2){
              item.checked = false;
            }
            arr2[0].checked = true;
            this.api_group_list = arr2;
          }
        })
      },
      getapilist(){
        let project_id = this.projectData.project_id;
        let api_group_id = this.api_group_id;
        let searchTxt = this.searchTxt;
        let offset = (this.currentpage-1)*10;
        let limit = this.limit;

        http.getapilist({project_id,api_group_id,searchTxt,offset,limit}).then((res)=>{
          if(res.code == 0){
              this.tableData = res.data;
              if(res.data.length>0){
                this.total = parseInt(res.data[0].total);
              }else{
                this.total = 0;
              }
          }
        })
      },

      deleteApi(api_id){
        this.$confirm('您确定要删除此api吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteapi({api_id}).then((res)=>{
            if(res.code == 0){
              Message.success(res.msg);
              this.getapilist();
            }
          })
        }).catch(()=>{})
      },
      search(){
        this.currentpage = 1;
        this.getapilist();
      },
      reset(){
        this.currentpage = 1;
        this.searchTxt = '';
        this.api_group_id = 'all';
        this.getapilist();
      },
      routego(path,params={}){
        this.$router.push({name:path,params});
      },

      diglogshow2(){
        this.group_title = '新建分组';
        this.groupvisible = true;

      }
    }
  }

</script>


<style scoped lang="less">
  #apidoc{
    background: #f7f8fc;
    padding:20px;
    height: 100%;
    overflow: hidden;
    .leftcon{
      float: left;
      box-shadow: 0 10px 30px rgba(0,0,0,.1);
      width: 230px;
      height: 100%;
      background: #ffffff;

      li{
        padding: 10px 20px;
        cursor: pointer;
        align-items: center;

        &.checked{
          background: #4aafe9;
          color: #ffffff;
        }
        span{
          flex: 1;
        }
        &:hover{
          background: #4aafe9;
          color: #ffffff;
        }
      }
      .title{
        height: 65px;
        line-height: 65px;
        padding: 0 20px;
        font-size: 20px;
        border-bottom: 1px solid #e5e5e5;
        font-weight: 600;
      }
      .addbtn{
        margin: 20px;
        color: #ffffff;
      }
    }

    .rightcon{
      margin-left: 250px;
      box-shadow: 0 10px 30px rgba(0,0,0,.1);
      height: 100%;
      background: #ffffff;
      .searchline{
        padding: 20px;
        border-bottom: 1px solid #e5e5e5;
        .el-input{
          width: 220px;
          margin-right: 20px;
        }
      }
      .ct{
        padding: 20px;
        .caozuo{
          color: #409EFF;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
    .el-pagination{
      text-align: center;
      margin:20px;
    }
  }
</style>
