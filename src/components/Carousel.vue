<template>
  <div id="carousel" :style="{backgroundColor:imgList[curindex].bgcolor}">
    <div class="wrap">
      <transition name="fade">
        <img v-if="show" :src= 'curimg'/>
      </transition>

      <div class="download">
        <a id="side-download" href="/download" class="btn" hidefocus="true" data-res-action="bilog" data-log-action="page" data-log-json="{&quot;type&quot;:&quot;downloadapp&quot;,&quot;source&quot;:&quot;banner&quot;}">下载客户端</a>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        <span class="shadow"></span><span class="shadowr"></span>
      </div>
    </div>

    <div class="leftbtn" @click="toggle('prev')"><</div>
    <div class="rightbtn" @click="toggle('next')">></div>

    <ul class="checklist">
      <li v-for="(item,index) in imgList" :class="{checked:curindex==index}" @click="goindex(index)"></li>
    </ul>
    </div>

</template>

<script>
  import Vue from 'vue';


  export default {
    name: 'Carousel',
    props:['carouselList'],
    data:function() {
      return{
        bgcolor:"#000000",
        curindex: 0,
        show: true,
        imgList: [
          {img:'http://p1.music.126.net/T_yI5hrTLW5QJNcAxf4caw==/109951163544346175.jpg',bgcolor:'#000000'},
          {img:'http://p1.music.126.net/wsk9XmJuLgBEouDehFjtcQ==/109951163542533102.jpg',bgcolor:'#000000'},
          {img:'http://p1.music.126.net/Bmidki_ExzrLrhGcFWbW3A==/109951163544351115.jpg',bgcolor:'#0b0b0b'},
          {img:'http://p1.music.126.net/7nofGpRX-nMOnsKCkfaR2w==/109951163544342932.jpg',bgcolor:'#000000'},
          {img:'http://p1.music.126.net/F6h02mcCfxtVb9zZWKaTKA==/109951163544346673.jpg',bgcolor:'#43cbf3'},
          {img:'http://p1.music.126.net/QytsmCe6X2_nKDyCluRCIQ==/109951163542794447.jpg',bgcolor:'#fed01a'},
        ],
        curimg:'http://p1.music.126.net/T_yI5hrTLW5QJNcAxf4caw==/109951163544346175.jpg',

      }
    },

    mounted:function(){
      this.toggle('next');
      setInterval(()=>{this.toggle('next')},3000)
    },

    methods: {
      toggle(type){
        this.$data.show = false;
        if(type=='prev'){
          if(this.$data.curindex == 0)
            this.$data.curindex = this.$data.imgList.length-1;
          else
            this.$data.curindex = this.$data.curindex-1;

        }else{
          if(this.$data.curindex == this.$data.imgList.length-1)
            this.$data.curindex = 0;
          else
            this.$data.curindex = this.$data.curindex+1;
        }
        this.$data.curimg = this.$data.imgList[this.$data.curindex].img;
        setTimeout(()=>{this.$data.show = true},300)


      },

      goindex(index){
        this.$data.show = false;
        this.$data.curindex = index;
        this.$data.curimg = this.$data.imgList[index].img;
        setTimeout(()=>{this.$data.show = true},300)
      }

    }
  }

</script>


<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0.2;
  }

  #carousel{
    position: relative;
    background: #000000;
    .wrap{
      position: relative;
      width: 982px;
      height: 336px;
      margin: 0 auto;
      .item{
      }


      .download{
        position: absolute;
        right:0px;
        display: inline-block;
        width:254px;
        height: 336px;
        background: red;
        z-index: 2;
      }
    }
    .leftbtn,.rightbtn{
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -31px;
      width: 37px;
      height: 63px;
      z-index: 2;
      line-height: 63px;
      font-size: 35px;
      text-align: center;
      cursor: pointer;
      &:hover{
        background: #000;
        opacity: 0.5;
      }
    }
    .leftbtn{
      left:30px;
    }
    .rightbtn{
      right:30px;
    }
    .checklist{
      position: absolute;
      bottom:20px;
      width:500px;
      left:50%;
      margin-left: -250px;
      li{
        cursor: pointer;
        float: left;
        width:30px;
        height:5px;
        background: #ffffff;
        margin: 0 10px;
        &.checked{
          background: #c20c0c;
        }
      }
    }
  }




</style>
