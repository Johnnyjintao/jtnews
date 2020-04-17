<template>
  <div id="home">
    <leftmenu ></leftmenu>
    <div id="page">
      <navbar></navbar>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>


</template>


<script>
  import navbar from '../components/navbar.vue';
  import leftmenu from '../components/leftmenu.vue'

  export default {
    name: 'App',
    components:{navbar,leftmenu},
    data:function(){
      return{
        curPage:0,
        path:this.$route.path
      }
    },
    mounted(){
      console.log('this.$route.params.id,',this.$route.params.id)
    },
    methods:{
      navitemclick(index){
        if(index == '0'){
          this.$router.push({path:'/'})
        }else if(index == '1'){
          this.$router.push({path:'/mine'})
        }else if(index == '2'){
          this.$router.push({path:'/friend'})
        }

        this.$data.curPage = index;
      }
    }
  }

</script>

<style lang="less">
  #home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #page {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      bottom: 0;
      padding-left: 235px;
      background: #fff;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
      font-size: 14px;
      height: 100%;
      overflow: hidden;
      .content{
        position: absolute;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        padding-left: 235px;
        margin-top: 70px;
        overflow-y: auto;
      }
    }
  }
</style>
