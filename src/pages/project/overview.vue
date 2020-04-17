<template>
  <div id="overview">
    <div class="row">
      <div class="title">{{projectData.project_name}}</div>
      <div class="cont">
        <ul>
          <li>
            <span>项目id：</span>
            <span>{{projectData.project_id}}</span>
          </li>
          <li>
            <span>项目类型：</span>
            <span>{{projectData.type}}</span>
          </li>
          <li>
            <span>版本号：</span>
            <span>{{projectData.version}}</span>
          </li>
          <li>
            <span>更新日期：</span>
            <span>{{formatDate(projectData.last_update_time)}}</span>
          </li>
          <li>
            <span>权限：</span>
            <span>
              {{projectData.permission == 1?'管理员':
                  projectData.permission == 2?'读写':
                  projectData.permission == 3?'只读':
                  projectData.permission == 4?'待审批':'被拒绝'}}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <ul class="rowul displayflex">
        <li v-for="item of itemlist">
          <div class="left">
            <img draggable="false" :src='item.img'/>
          </div>
          <div class="right">
            <p>{{item.name}}</p>
            <p class="color-yellow">{{item.num}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="dt">
      <div class="title">项目动态</div>
      <div class="tb">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="操作时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作内容">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>


</template>

<script>
  import navbar from '../../components/navbar.vue';
  import {formatDate} from '../../utils/date'
  export default {
    components: {navbar},
    name:'indexpage',
    props:["projectData"],
    data(){
      return{
        itemlist:[
          {'name':'接口数','num':'145','img':require('../../assets/img/jiekou.png')},
          {'name':'项目文档数','num':'66','img':require('../../assets/img/wendang.png')},
          {'name':'协作人员数','num':'45','img':require('../../assets/img/persons.png')},
          {'name':'项目文件数','num':'18','img':require('../../assets/img/wenjian.png')},
        ]
      }
    },
    mounted(){

    },
    methods: {
      formatDate(time){
        return formatDate(time)
      }
    }
  }

</script>


<style scoped lang="less">
  #overview{
    padding:20px;
    background: #f7f8fc;
    .row{
      margin-bottom: 20px;
    }
    .title{
      font-size: 20px;
      font-weight: 600;
    }
    .cont{
      overflow: hidden;
      padding: 15px;
      ul{
        width: 50%;
        li{
          width: 50%;
          float: left;
          line-height: 30px;
        }
      }
    }
    .rowul{
      justify-content: space-around;
      vertical-align: center;
      li{
        background: #ffffff;
        width: 20%;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 10px 30px rgba(0,0,0,.1);
        cursor: pointer;
        &:hover{
          box-shadow: 0 10px 30px rgba(0,0,0,.3);
        }
        .left{
          img{
            width: 40px;
            height: 40px;
            margin-top: 10px;
            margin-left: 10px;
          }
        }
        .right{
          p{
            text-align: right;
            color: #999;
          }
          .color-yellow{
            margin-top: 10px;
            font-size: 20px;
            color: #333333;
          }
        }
      }
    }

    .dt{
      margin-top: 100px;
      box-shadow: 0 10px 30px rgba(0,0,0,.1);
      padding: 20px;
    }
  }
</style>
