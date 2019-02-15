<template>
  <div class="article">


    <div class="search_line">
      <el-input v-model="input" placeholder="请输入关键字" maxlength="10"></el-input>

      <el-button type="primary" icon="el-icon-search">搜索</el-button>

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
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
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
  export default {
    data() {
      return {
        dialogVisible:false,
        category_name:'',
        tableData: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods:{
      showDialog(){
        this.dialogVisible = true;
        this.category_name = '';
      },
      AddCategory(){
        let params = {name:this.category_name}
        category.create_category(params).then(()=>{
          this.GetCategoryList();
        }).catch(()=>{

        });

        this.dialogVisible = false;
      },

      GetCategoryList(){
        let params = {}
        category.get_category_list(params).then((content)=>{
            this.tableData = content.data.data;
        }).catch(()=>{

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

  }
</style>
