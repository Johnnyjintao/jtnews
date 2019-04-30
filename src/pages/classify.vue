<template>
  <div class="article">


    <div class="search_line">
      <el-input v-model="name" placeholder="请输入关键字" maxlength="10"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
      <el-button @click="resetData" type="success">重置</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="showDialog">新增分类</el-button>

    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="分类名称"
        width="180">
      </el-table-column>

      <el-table-column
        prop="createdAt"
        label="创建日期"
        width="180">
      </el-table-column>

      <el-table-column
        prop="updatedAt"
        label="修改日期">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="updateData(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="新增分类" :visible.sync="dialogVisible">

        <span>分类名称：</span>
        <el-input v-model="category_name" autocomplete="off" maxlength="10" placeholder="请输入分类名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddCategory">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import {category} from './api/category';
  import {Message} from 'element-ui';
  export default {
    data() {
      return {
        dialogVisible:false,
        category_name:'',
        tableData: [],
        limit:0,
        offset:10,
        name:''
      }
    },
    methods:{
      showDialog(){
        this.dialogVisible = true;
        this.category_name = '';
      },
      searchData(){
        this.GetCategoryList();
      },
      resetData(){
        this.name = '';
        this.limit = 0;
        this.GetCategoryList();
      },

      updateData(row){
        this.dialogVisible = true;
        this.category_name = row.name;
      },
      deleteData(row){
        this.$confirm('确定要删除此分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          category.del_category({id:row.id}).then((data)=>{
            this.GetCategoryList();
          }).catch(()=>{

          });
        }).catch(()=>{});
      },
      AddCategory(){
        if(this.category_name.trim() == ''){
          Message.error('分类名称不能为空')
          return
        }
        let params = {name:this.category_name}
        category.create_category(params).then(()=>{
          this.GetCategoryList();
        }).catch((data)=>{
          Message.error(data.msg)
        });

        this.dialogVisible = false;
      },

      GetCategoryList(){
        let {limit,offset,name} = this.$data;
        let params = {limit,offset,name}
        category.get_category_list(params).then((content)=>{
            this.tableData = content.data;
        }).catch((data)=>{
          Message.error(data.msg)
        });
      }
    },
    mounted(){
      this.GetCategoryList();
    }
  }
</script>


<style scoped lang="less">
  .article{
    padding:20px;
    .search_line{
      margin-bottom: 20px;
    }
    .el-input{
      width: 200px;
    }
    .el-button{
      margin-left: 20px;
    }
    .el-table{
      margin-top: 20px;
    }
  }
</style>
