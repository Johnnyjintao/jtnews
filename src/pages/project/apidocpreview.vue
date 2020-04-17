<template>
  <div id="apidocedit">
    <div class="titleline displayflex">
      <span @click="back">返回接口列表</span>
    </div>

    <div class="wrap">
      <div class="con">
        <div class="edt_bd">
          <div class="edt_row displayflex">
            <span class="edt_row_tit">标题</span>
            <div class="edt_row_right">
              {{title}}
            </div>
          </div>
          <div class="edt_row displayflex">
            <span class="edt_row_tit">请求路径</span>
            <div class="edt_row_right">
              <span>{{method_value}}</span>
              <span style="margin-left: 20px">{{path}}</span>
            </div>
          </div>

          <div class="edt_row displayflex">
            <span class="edt_row_tit">分组</span>
            <div class="edt_row_right">{{group_label}}</div>
          </div>

          <div class="edt_row displayflex">
            <span class="edt_row_tit">状态</span>
            <div class="edt_row_right">{{state_value}}</div>
          </div>

        </div>

        <div class="edt_bd" v-if="reqHeadData.length>0">
          <div class="headtitle">请求头部</div>
          <HeaderTable :data="reqHeadData" :preview="true"></HeaderTable>
        </div>

        <div class="edt_bd" v-if="(reqparam_value=='Raw'&&reqparam_RawData!='') || (reqparam_value=='FormData'&&reqparam_FormData.length>0) || (reqparam_value=='JSON'&&reqparam_JsonData.length>0)">
          <div class="headtitle">请求参数（参数类型：{{reqparam_value}}）</div>
          <el-row v-if="reqparam_value=='Raw'">
            <div class="exam">{{reqparam_RawData}}</div>
          </el-row>

          <el-row v-if="reqparam_value=='FormData'">
            <FormTable :data="reqparam_FormData" :preview="true"></FormTable>
          </el-row>
          <el-row v-if="reqparam_value=='JSON'">
            <el-col :span="10">
              <prism-editor  :code="formatJSON(this.reqparam_JsonData)" language="js" :readonly="true" class="w-full" />
            </el-col>
            <el-col :span="14">
              <ul class="title displayflex" >
                <li >参数名</li>
                <li>参数类型</li>
                <li >示例值</li>
                <li>参数说明</li>
              </ul>
              <JsonView :flowData="reqparam_JsonData" :preview="true"></JsonView>
            </el-col>
          </el-row>
        </div>

        <div class="edt_bd" v-if="getrestData.length>0">
          <div class="headtitle">GET/REST参数</div>
          <FormTable :data="getrestData" :preview="true"></FormTable>
        </div>

        <div class="edt_bd" v-if="(resparam_value=='Raw'&&resparam_RawData!='') || (resparam_value=='JSON'&&resparam_JsonData.length>0)">
          <div class="headtitle">返回参数（参数类型：{{resparam_value}}）</div>

          <el-row v-if="resparam_value=='Raw'">
            <div class="exam">{{resparam_RawData}}</div>
          </el-row>

          <el-row v-if="resparam_value=='JSON'">
            <el-col :span="10">
              <prism-editor  :code="formatJSON(this.resparam_JsonData)" language="js" :readonly="true" class="w-full" />
            </el-col>
            <el-col :span="14">
              <ul class="title displayflex" >
                <li >参数名</li>
                <li>参数类型</li>
                <li >示例值</li>
                <li>参数说明</li>
              </ul>
              <JsonView :flowData="resparam_JsonData" :preview="true"></JsonView>
            </el-col>
          </el-row>
        </div>

        <div class="edt_bd" v-if="resHeadData.length>0">
          <div class="headtitle">返回头部</div>
          <HeaderTable :data="resHeadData" :preview="true"></HeaderTable>
        </div>


        <div class="edt_bd">
          <div class="headtitle">示例</div>
          <div>示例调用地址：<a>{{sucuri}}</a></div>
        </div>

        <!--<div class="edt_bd" v-if="textarea_fail!=''">-->
          <!--<div class="headtitle">失败示例</div>-->
          <!--<div>示例调用地址：<a>{{failuri}}</a></div>-->
          <!--<div class="exam" style="margin-top: 10px">{{textarea_fail}}</div>-->
        <!--</div>-->

      </div>
    </div>
  </div>




</template>

<script>
  import JsonView from "../../components/JsonView";
  import {Message} from 'element-ui';
  import {http} from '../../api/http'
  import PrismEditor from 'vue-prism-editor'
  import 'prismjs'
  import 'prismjs/themes/prism.css'
  import HeaderTable from "../../components/HeaderTable";
  import FormTable from "../../components/FormTable";

  export default {
    components: {HeaderTable,FormTable, JsonView, PrismEditor},
    name:'indexpage',
    props:['projectData'],
    data(){
      return{
        user:this.$global.user,
        title:'',//标题
        method_value:'GET',//请求方式
        path:'',//请求路径
        group_value:'default',//分组id
        group_label:'默认分组',
        state_value:'open',//状态 （open启用 close禁用）

        reqHeadData:[],//请求头部
        reqparam_value:'JSON',//请求参数类型
        reqparam_RawData:'', //请求参数raw数据
        reqparam_FormData:[],//请求参数formdata数据
        reqparam_JsonData:[],//请求参数json数据
        getrestData:[],// get/rest参数

        resHeadData:[],//返回头部
        resparam_value:'JSON',//返回参数类型
        resparam_RawData:'', //返回参数raw数据
        resparam_JsonData:[],//返回参数json数据

        textarea_suc:'',//成功示例
        textarea_fail:'',//失败示例


        tabname_head:'first',
        tabname_foot:'first',
        tabname_exam:'first',
        options_state:[{value: 'open', label: '启用'}, {value: 'close', label: '弃用'}],
        options_group:[],
        options_method:[{value: 'GET', label: 'GET'}, {value: 'POST', label: 'POST'}, {value: 'PUT', label: 'PUT'}, {value: 'DELETE', label: 'DELETE'}, {value: 'HEAD', label: 'HEAD'}, {value: 'OPTIONS', label: 'OPTIONS'}, {value: 'PATCH', label: 'PATCH'}],
        options_param:[{value: 'JSON', label: 'JSON'}, {value: 'FormData', label: 'FormData'}, {value: 'Raw', label: 'Raw'}],

        saveLoading:false,
        api_id:'',//有值为编辑 没值为新增
      }
    },

    watch:{

    },

    mounted(){
      let api_id = this.$route.params.api_id;
      if(api_id){
        this.api_id = api_id;
        this.getapidetail();
      }
      this.getapigrouplist();
    },

    methods: {
      getapigrouplist(){
        let project_id = this.projectData.project_id;
        http.getapigrouplist({project_id}).then((res)=>{
          if(res.code == 0){
            let arr2 = res.data;
            for(let item of arr2){
              item.label = item.api_group_name;
              item.value = item.api_group_id;
            }
            let arr1 = [{label:'默认分组',value:'default'}]
            this.options_group = [...arr1,...arr2];
          }
        })
      },
      getapidetail(){
        http.getapidetail({api_id:this.api_id}).then((res)=>{
          if(res.code == 0){
            let data = res.data;
            this.title = data.title,//标题
            this.method_value = data.method;//请求方式
            this.path = data.path;//请求路径
            this.group_value = data.api_group_id;//分组id
            let flag = false;
            for(let item of this.options_group){
              if(item.value == data.api_group_id){
                this.group_label = item.label;//分组id
                flag = true
              }
            }
            if(!flag){ //如果分组不存在，则分配到默认分组中
              this.group_value = 'default';//分组id
            }

            this.state_value = data.state;//状态 （open启用 close禁用）

            this.reqHeadData = JSON.parse(data.reqHeadData);//请求头部
            this.reqparam_value = data.reqparam_value;//请求参数类型

            this.reqparam_RawData = JSON.parse(data.reqparam_RawData); //请求参数raw数据
            this.reqparam_FormData = JSON.parse(data.reqparam_FormData);//请求参数formdata数据
            this.reqparam_JsonData = JSON.parse(data.reqparam_JsonData);//请求参数json数据
            this.getrestData = JSON.parse(data.getrestData);// get/rest参数

            this.resHeadData = JSON.parse(data.resHeadData);//返回头部
            this.resparam_value = data.resparam_value;//返回参数类型
            this.resparam_RawData = JSON.parse(data.resparam_RawData); //返回参数raw数据
            this.resparam_JsonData = JSON.parse(data.resparam_JsonData);//返回参数json数据

            this.textarea_suc = JSON.parse(data.textarea_suc);//成功示例
            this.textarea_fail = JSON.parse(data.textarea_fail);//失败示例
            this.sucuri = data.sucuri;
            this.failuri = data.failuri;
          }
        })
      },
      formatJSON(data){
        let theobj;
        const initObj = function(data,obj={}){
          for(let i=0;i<data.length;i++){
            let item = data[i];
            if(!item.name){ //这是 数组类型的子集
              if(item.type == 'object'){
                obj.push({});
              }else if(item.type == 'array'){
                obj.push([]);
              }else{
                obj.push(item.exam);
              }
            }else if(item.type == 'array'){
              obj[item.name] = [];
            }else if(item.type == 'object'){
              obj[item.name] = {};
            }else{
              obj[item.name] = item.exam;
            }
            if(item.child.length>0){
              if(item.name){
                initObj(item.child,obj[item.name]);
              }else{
                initObj(item.child,obj[i]);
              }
            }
          }
          theobj = obj;
        }

        initObj(data,{})
        return JSON.stringify(theobj,false,2)
      },
      back(){
        this.$router.go(-1)
      },

    }
  }

</script>


<style scoped lang="less">
  #apidocedit{

    height: 100%;
    overflow: hidden;
    .titleline{
      position: absolute;
      top: 20px;
      z-index: 3;
      background: #ffffff;
      align-items: center;
      box-sizing: border-box;
      padding-left: 30px;
      span{
        margin-left: 10px;
        cursor: pointer;
        background: url("../../assets/img/return-o.png") no-repeat;
        background-size: 18px;
        padding-left: 25px;
        &:hover{
          color: #4aafe9;
          background: url("../../assets/img/return-o2.png") no-repeat;
          background-size: 18px;
        }
      }
      .el-button{
          height: 35px;
          margin-left: 20px;
          line-height: 0;
        }
    }
    .wrap{

      height: 92%;
      overflow-y: scroll;
      background: #f7f8fc;
    }
    .con{
      margin: 20px;


      .edt_row{
        padding: 10px;
        align-items: center;
        .edt_row_tit{
          width: 80px;
          font-weight: 600;
          display: inline-block;
        }
        .edt_row_right{
          flex: 1;
          .el-select{
            min-width: 120px;
          }
        }
      }



      .edt_bd{
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        background: #ffffff;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);

        .headtitle{
          margin: 5px 0 10px 0;
          font-weight: 600;
        }
        .exam{
          border: 1px solid #e5e5e5;
          padding: 10px;
          min-height: 80px;
        }

        .title{
          margin-left: 20px;
          margin-top: 5px;
          background: #f5f2f0;
          li{
            flex: 1;
            border: 1px solid #e5e5e5;
            padding: 13px;
            padding-left: 26px;
          }
        }

      }
    }




  }

</style>
