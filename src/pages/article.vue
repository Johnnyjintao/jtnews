<template>
  <div class="article">
    <div class="search_line">
      <el-input v-model="name" placeholder="请输入关键字"></el-input>

      <!--<el-select v-model="value" placeholder="请选择发布状态">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->

      <el-button type="primary" icon="el-icon-search">搜索</el-button>

    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="文章标题"
      >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        >
      </el-table-column>
      <el-table-column
        prop="state"
        label="类型">
        <template slot-scope="scope">
          <div :class="scope.row.state=='draft'?'color-red':''">
            {{scope.row.state=='draft'?'草稿':'正文'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="categoryId"
        label="分类">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="lookData(scope.row)" type="text" size="small">预览</el-button>
          <el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="edg_preview"
               title="预览"
               width="500px"
               :visible.sync="visible">
      <div class="pvc_title">{{detailinfo.title}}</div>
      <div class="pv_header displayflex">
        <div class="pvc_author">作者:{{detailinfo.author}}</div>
        <div class="pvc_date">日期:{{detailinfo.createdAt}}</div>
      </div>

      <div class="pv_content">
        <div v-html="detailinfo.content"></div>
      </div>

    </el-dialog>
  </div>

</template>

<script>
  import {article} from "./api/article";
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        tableData: [],
        options: [],
        name: '',
        limit:0,
        offset:10,
        visible:false,
        detailinfo:{}
      }
    },
    mounted() {
      this.queryData();
    },
    methods:{
      queryData(){
        let {name,limit,offset} = this.$data;
        let params = {name,limit,offset}
        article.query_article(params).then((res)=>{
          this.tableData = res.data;
        }).catch((data)=>{
          Message.error(data.msg);
        })
      },
      lookData(row){
          this.visible = true;
          this.query_detail(row.id);
      },
      deleteData(row){
        this.$confirm('确定要删除这篇文章吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          article.del_article({id:row.id}).then((data)=>{
            this.queryData();
          }).catch((data)=>{
            Message.error(data.msg)
          });
        }).catch(()=>{});
      },
      editData(row){
        this.$router.push({
          path:'edit',
          query: {
            article_id:row.id
          }
        })
      },

      query_detail(id){
          article.query_article_detail({id}).then((res)=>{
              this.detailinfo = res.data;
          }).catch((data)=>{
            Message.error(data.msg);
          })
      }
    }
  }
</script>


<style scoped lang="less">
    .article{
      padding:20px;
      .el-input{
        width: 200px;
        margin-right: 20px;
      }
      .el-button{
        margin-left: 20px;
      }
      .el-table{
        margin-top: 20px;
      }


      .el-dialog{

      }

      .edg_preview{
        .pvc_title{
          font-size: 18px;
          text-align: center;
        }
        .pv_header{
          justify-content: space-around;
          margin: 15px 0;
          color: #999;
          font-size: 12px;
        }
      }
    }

</style>
<style lang="less">
  .pv_content{
    min-height: 300px;
    margin-top: 20px;
    img{
      max-width: 400px;
    }
  }
</style>
