<template>
  <div class="block_content"  style="margin-left: 20px">
    <div class="block_content_line"></div>
    <div class="bc_con " v-for="(item,index) of flowData" >
      <div class="displayflex">
        <li >
          <div class="icon" @click="hideblock(index)">
            <i class="el-icon-caret-right" v-show="!item.show && (item.type=='object' || item.type=='array')"></i>
            <i class="el-icon-caret-bottom" v-show="item.show && (item.type=='object' || item.type=='array')"></i>
          </div>

          <span>{{item.name}}</span>
        </li>
        <li>{{item.type}}</li>
        <li>{{item.exam}}</li>
        <li class="displayflex">
          <span>{{item.explain}}</span>
          <i  v-if="!preview" class="el-icon-delete" @click="delItem(index)"></i>
        </li>
      </div>


      <jsonView v-if="(item.type=='object' || item.type=='array') && item.show" :flowData="item.child" :arraychild="item.type=='array'?true:false"></jsonView>
    </div>

    <div class="bc_add" v-if="!addshow && !preview" @click="showAdd"><i class="el-icon-plus"></i>添加</div>

    <div class="bc_add_con " v-if="addshow">
      <div class="bca_list displayflex">
        <el-input v-model="pa_name" placeholder="请填写参数名" v-if="!arraychild"></el-input>
        <el-input placeholder="不可填写" :disabled="true" v-if="arraychild"></el-input>

        <el-select v-model="optionsvalue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-input v-model="pa_mock" placeholder="mock规则" v-if="showInput()"></el-input>
        <el-input v-model="pa_exam" placeholder="示例值" v-if="showInput()"></el-input>
        <el-input v-model="pa_explain" placeholder="参数说明" v-if="showInput()"></el-input>

        <el-input placeholder="不可填写" :disabled="true" v-if="!showInput()"></el-input>
        <el-input placeholder="不可填写" :disabled="true" v-if="!showInput()"></el-input>
      </div>
      <div class="bca_bottom">
        <el-button @click="addshow=false">取消</el-button>
        <el-button type="primary" @click="addItem">确定</el-button>
      </div>

    </div>



  </div>
</template>



<script>
  import Mock from 'mockjs'
export default {
  name: 'JsonView',
  props: {
    preview:false,//是预览状态不允许操作
    flowData: {},
    arraychild:false,//如果是数组的子集，则不展示参数名称，只显示值
  },
  data () {
    return {
      visible:false,
      addshow:false,
      pa_name:'',
      pa_exam:'',
      pa_mock:'',
      pa_explain:'',
      optionsvalue:'string',
      options: [{
        value: 'string',
        label: 'string'
      }, {
        value: 'array',
        label: 'array'
      }, {
        value: 'object',
        label: 'object'
      }, {
        value: 'number',
        label: 'number'
      }, {
        value: 'boolean',
        label: 'boolean'
      }]
    }
  },

  methods:{
    //如果是数组的子集 并且是array 或者object  则不显示
    showInput(){
      if(this.arraychild && (this.optionsvalue=='array' || this.optionsvalue == 'object')){
        return false
      }
      return true

    },
    showAdd(){
      this.addshow = true;
      this.pa_name = '';
      this.pa_explain = '';
      this.pa_exam = '';
      this.pa_mock = '';
    },
    hideblock(index){
      this.flowData[index].show = !this.flowData[index].show ;
    },
    delItem(index){
      this.flowData.splice(index,1) ;
    },
    addItem(){

      let obj = {
        child: [],
        explain: this.pa_explain,
        name: this.pa_name,
        type: this.optionsvalue,
        show:true,
      }



      if(!this.pa_name && !this.arraychild){
        this.$message.error('请选择参数名称');
        return;
      }

      if(!this.pa_exam && this.arraychild && this.optionsvalue!='object' && this.optionsvalue!='array'){
        this.$message.error('请填写示例值');
        return;
      }

      if(this.optionsvalue == 'number'){
        if(typeof(parseFloat(this.pa_exam)) == 'number' && this.pa_exam!=''){
          this.pa_exam = parseFloat(this.pa_exam);
        }else{
          this.$message.error('请填写number类型的示例值');
          return;
        }
      }
      if(this.optionsvalue == 'boolean'){
        if(this.pa_exam=='false'){
          this.pa_exam = false
        }else{
          this.pa_exam = true
        }
      }

      for(let item of this.flowData){

        if(item.name == obj.name && obj.name!=''){
          this.$message.error('名称有重复');
          return;
        }
      }
      obj["exam|"+this.pa_mock] = this.pa_exam;
      obj.mock = this.pa_mock;
      obj = Mock.mock(obj)

      this.flowData.push(JSON.parse(JSON.stringify(obj)));
      this.addshow = false
    }

  }

}
</script>
<style scoped lang="less" >
  .block_content{
    position: relative;
    display: block;
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    .bc_con li{
      padding: 7px 10px;
      flex: 1;
      border: 1px solid #e5e5e5;
      width: 25%;
      white-space:normal; word-break:break-all;
      &.displayflex{
        align-items: center;
        span{
          flex: 1;
        }
      }
      i{
        font-size: 18px;
        cursor: pointer;
      }
      .el-icon-delete {
        padding: 0 0 0 10px;
        float: right;
      }
    }
    .icon{
      width: 20px;
      display: inline-block;
    }
    .bc_add{
      padding: 5px 10px;
      color: #4aafe9;
      cursor: pointer;
      margin-left: 10px;
      margin-top: 10px;
    }
    .bc_add_con{
      border: 1px solid #e5e5e5;
      margin-top: 10px;
      padding: 10px 0;
      .bca_list{
        .el-input{
          flex: 1;
          margin: 0 10px;
        }
        .el-select{
          flex: 1;
        }
      }
      .bca_bottom{
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>
