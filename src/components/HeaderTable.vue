<template>
  <div class="headtable">
    <el-table
      :data="data"
      :border="true"
      style="width: 100%">
      <el-table-column
        label="标签"
        width="220">
        <template slot-scope="scope">
          <el-autocomplete
            class="inline-input"
            v-model="scope.row.name"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            v-if="!preview"
          ></el-autocomplete>
          <div v-if="preview">{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="fill"
        label="必填"
        width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.fill" v-if="!preview"></el-switch>
          <div v-if="preview">{{scope.row.fill}}</div>
        </template>

      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
        <template slot-scope="scope">
          <el-input v-model="scope.row.content" placeholder="请输入内容" v-if="!preview"></el-input>
          <div v-if="preview">{{scope.row.content}}</div>
        </template>

      </el-table-column>
      <el-table-column
        v-if="!preview"
        label="操作">
        <template slot-scope="scope" >
            <el-button @click="reqHead_del(scope.$index)" type="text" size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="!preview" class="add" type="primary" icon="el-icon-plus" @click="addrow">添加</el-button>
  </div>
</template>



<script>
import {Message} from 'element-ui'
export default {
  name: 'HeaderTable',
  props: {
    data: {},
    preview:false
  },
  data () {
    return {
      restaurants: [{value:'Accept'}, {value:'Accept-Charset'}, {value:'Accept-Encoding'}, {value:'Accept-Language'}, {value:'Accept-Ranges'}, {value:'Authorization'},
        {value:'Cache-Control'}, {value:'Connection'}, {value:'Cookie'}, {value:'Content-Length'}, {value:'Content-Type'}, {value:'Content-MD5'}, {value:'Date'}, {value:'Expect'},
        {value:'From'}, {value:'Host'}, {value:'If-Match'}, {value:'If-Modified-Since'}, {value:'If-None-Match'}, {value:'If-Range'}, {value:'If-Unmodified-Since'},
        {value:'Max-Forwards'}, {value:'Origin'}, {value:'Pragma'}, {value:'Proxy-Authorization'}, {value:'Range'}, {value:'Referer'}, {value:'TE'}, {value:'Upgrade'}, {value:'User-Agent'},
        {value:'Via'}, {value:'Warning'}],
    }
  },

  methods:{
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    reqHead_del(i){
      this.$confirm('此操作将删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.data.splice(i,1)
      })
    },
    addrow(){
      let row = {"name":'','fill':true,'content':'',edit:true}
      this.data.push(row);
    }

  }

}
</script>
<style scoped lang="less" >
.headtable{

  .add{
    margin-top: 10px;
  }
}
</style>
