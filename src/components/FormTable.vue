<template>
  <div class="headtable">
    <el-table
      :data="data"
      :border="true"
      style="width: 100%">
      <el-table-column
        label="参数名"
        width="220">
        <template slot-scope="scope">
          <el-input v-if="!preview"  v-model="scope.row.name" placeholder="请输入参数名"></el-input>
          <div v-if="preview">{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        width="220">
        <template slot-scope="scope">
          <el-select v-model="type_value" v-if="!preview" placeholder="请选择类型">
            <el-option
              v-for="item in options_type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div v-if="preview">{{type_value}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="fill"
        label="必填"
        width="180">
        <template slot-scope="scope">
          <el-switch v-if="!preview" v-model="scope.row.fill"></el-switch>
          <div v-if="preview">{{scope.row.fill}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="content"
        label="说明">
        <template slot-scope="scope">
          <el-input v-if="!preview" v-model="scope.row.content" placeholder="请输入说明"></el-input>
          <div v-if="preview">{{scope.row.content}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="example"
        label="示例">
        <template slot-scope="scope">
          <el-input v-if="!preview" v-model="scope.row.example" placeholder="请输入示例"></el-input>
          <div v-if="preview">{{scope.row.example}}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        v-if="!preview"
      >
        <template slot-scope="scope" >
          <div >
            <el-button @click="reqHead_del(scope.$index)" type="text" size="small">删除</el-button>
          </div>

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
      options_type:[{value: 'string', label: 'string'}, {value: 'number', label: 'number'}, {value: 'boolean', label: 'boolean'}, {value: 'array', label: 'array'}, {value: 'object', label: 'object'}],
      type_value:'string'
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
