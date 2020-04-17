<template>
  <div id="person">
    <div class="leftcon">
      <p class="title">人员类型</p>
      <ul>
        <li v-for="(item,index) of typelist" :class="item.checked?'checked':''" @click="toggleTypelist(index,item.name)">{{item.name}}</li>
      </ul>
    </div>
    <div class="rightcon">
      <div class="searchline" v-if="isadmin">
        <el-button type="primary" @click="dialogvisible3=true">添加人员</el-button>
      </div>
      <div class="ct">
        <el-table
          :data="tableDataShow"
          style="width: 100%">
          <el-table-column
            prop="user_name"
            label="员工姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="员工ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="permission"
            label="权限"
            width="180">
            <template slot-scope="scope">
              {{scope.row.permission == 1?'管理员':
              scope.row.permission == 2?'读写':
              scope.row.permission == 3?'只读':
              scope.row.permission == 4?'待审批':'审批拒绝'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <div v-if="isadmin">
                <span class="caozuo" @click="diglogshow1(scope.row.user_id)" v-if="scope.row.permission=='2' || scope.row.permission=='3'">设置权限</span>
                <span class="caozuo" @click="deleteData(scope.row.user_id)"v-if="scope.row.permission==2||scope.row.permission=='3'">删除</span>

                <span class="caozuo" @click="diglogshow2(scope.row.user_id)" v-if="scope.row.permission=='4'">通过</span>
                <span class="caozuo" @click="refuse(scope.row.user_id)" v-if="scope.row.permission=='4'">拒绝</span>
              </div>
            </template>

          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      class="edg_lookpic"
      title="设置权限"
      :before-close="dialogcancel"
      :visible="dialogvisible1"
      width="500px">
        <el-radio v-model="radio1" label=1>管理员</el-radio>
        <el-radio v-model="radio1" label=2>读写</el-radio>
        <el-radio v-model="radio1" label=3>只读</el-radio>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogcancel">取 消</el-button>
        <el-button type="primary" @click="dialogdo">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      class="edg_lookpic"
      title="审批"
      :before-close="dialogcancel"
      :visible="dialogvisible2"
      width="500px">
      <div style="margin: 10px 0">请选择给该员工分配权限</div>
      <el-radio v-model="radio2" label=2>只读</el-radio>
      <el-radio v-model="radio2" label=3>读写</el-radio>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogcancel">取消</el-button>
        <el-button type="primary" @click="approve">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="edg_lookpic"
      title="邀请加入"
      :before-close="dialogcancel"
      :visible="dialogvisible3"
      width="500px">

      <div class="row displayflex">
        <div style="width: 100px">用户ID：</div>
        <el-input placeholder="请输入邀请人的用户id" v-model="add_user_id"></el-input>
      </div>
      <div class="row displayflex">
        <div style="width: 100px">用户权限：</div>
        <div>
          <el-radio v-model="radio3" label='2'>读写</el-radio>
          <el-radio v-model="radio3" label='3'>只读</el-radio>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogcancel">取消</el-button>
        <el-button type="primary" @click="joinproject2">确 定</el-button>
      </span>
    </el-dialog>

  </div>


</template>

<script>
  import navbar from '../../components/navbar.vue';
  import {http} from '../../api/http';
  import {Message} from  'element-ui';
  export default {
    props:['projectData'],
    components: {navbar},
    name:'indexpage',
    data(){
      return{
        typelist:[{name:"全部",checked:true},{name:"管理员",checked:false},{name:"读写",checked:false},{name:"只读",checked:false},{name:"待审批",checked:false},{name:"审批拒绝",checked:false}],
        searchTxt:'',
        tableData:[],
        tableDataShow:[],
        dialogvisible1:false,
        dialogvisible2:false,
        dialogvisible3:false,
        radio1:'2',
        radio2:'2',
        radio3:'2',
        isadmin:false,
        user:this.$global.user,
        set_user_id:'',
        type:"全部",
        add_user_id:''
      }
    },
    mounted(){
      this.findpersoninpro()
    },
    methods: {
      joinproject2(){
        if(!this.add_user_id){
          Message.error('请填写用户id');
          return;
        }
        let params = {project_id:this.projectData.project_id,permission:this.radio3,user_id:this.add_user_id};
        http.joinproject2(params).then((res)=>{
          if(res.code==0){
            this.dialogvisible3 = false;
            this.findpersoninpro()
          }
        })
      },
      toggleTypelist(index,name){
        for(let item of this.typelist){
          item.checked = false;
        }
        this.typelist[index].checked = true;
        this.type = name;
        this.thetableDataShow();
      },

      reset(){

      },
      approve(){
        this.updatePermission(this.radio2);
      },

      refuse(set_user_id){
        this.set_user_id = set_user_id
        this.$confirm('确定拒绝通过吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updatePermission(5);
        })
      },

      deleteData(user_id){
        this.$confirm('确定删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {user_id,project_id:this.projectData.project_id}
          http.deleteproauth(params).then((res)=>{
            if(res.code == 0){
              Message.success(res.msg);
              this.findpersoninpro()
            }
          })
        })
      },

      updatePermission(permission){
        let params = {project_id:this.projectData.project_id,permission,user_id:this.user.user_id,set_user_id:this.set_user_id};
        http.updatePermission(params).then((res)=>{
          if(res.code==0){
            this.dialogvisible1 = false;
            this.findpersoninpro()
          }
        })
      },

      findpersoninpro(){
        let params = {project_id:this.projectData.project_id};
        http.findpersoninpro(params).then((res)=>{
          if(res.code==0){
            let flag = false;
            for(let item of res.data){
              if(item.permission == "1" && item.user_id == this.user.user_id){
                flag = true;
              }
            }
            this.tableData = res.data;
            this.thetableDataShow();
            this.isadmin = flag;
          }
        })
      },

      thetableDataShow(){
        let tableData = this.tableData;
        let arr1= [];
        for(let item of tableData){
          if(this.type == '全部'){
            arr1.push(item);
          }else if(this.type == '管理员' && item.permission == '1'){
            arr1.push(item);
          }else if(this.type == '读写' && item.permission == '2'){
            arr1.push(item);
          }else if(this.type == '只读' && item.permission == '3'){
            arr1.push(item);
          }else if(this.type == '待审批' && item.permission == '4'){
            arr1.push(item);
          }else if(this.type == '审批拒绝' && item.permission == '5'){
            arr1.push(item);
          }
        }
        this.tableDataShow = arr1;

      },

      dialogcancel(){
        this.dialogvisible1 = false;
        this.dialogvisible2 = false;
        this.dialogvisible3 = false;
      },
      dialogdo(){
        if(this.radio1 == '1'){
          this.$confirm('您要将该员工设置为管理员吗？设置成功后您将从管理员变为普通员工，并具备读写权限', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatePermission(1);
          })
        }else{
          this.updatePermission(this.radio1);
        }

      },
      diglogshow1(set_user_id){
        this.dialogvisible1 = true;
        this.set_user_id = set_user_id;
      },

      diglogshow2(set_user_id){
        this.dialogvisible2 = true;
        this.set_user_id = set_user_id;
      }
    }
  }

</script>


<style scoped lang="less">
  #person{
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
        height: 45px;
        line-height: 45px;
        padding: 0 20px;
        cursor: pointer;
        &:hover{
          background: #4aafe9;
          color: #ffffff;
        }
        &.checked{
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

    .edg_lookpic{
      .row{
        align-items: center;
        margin-bottom: 20px;
      }
    }
  }
</style>
