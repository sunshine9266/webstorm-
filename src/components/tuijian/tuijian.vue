<template>
  <div class="tuijian">
    <scroll ref="scroll" class="slider-content" :data="discList">
      <!--这里v-if的作用因为数据请求会有延时,可能数据没有请求下来,
      但是轮播里面的mounted里面的钩子函数给他们设置宽度的时候就会出错,所以先通过v-if判断下,
      渲染下请求的数据来,再加载下面的组件,再调用slider里面的mounted进行宽度赋值-->
      <div>
      <div v-if="slider.length" class="slider-wrapper">
        <slider>
          <!--此处的dom元素可替换掉组件内部的solt内容插槽-->
          <div v-for="item in slider">
            <a :href="item.linkUrl" class="slederA">
              <!--当我们的better-scroll与fast-click产生冲突的时候使用fast-click的needsclick类告诉它这是需要点击的-->
              <img @load="loadImage" class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="tuijian-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img  width="60" height="60" v-lazy="item.imgurl">
            </div>
            <!--歌单列表-->
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>

</template>

<script type="text/ecmascript-6">
	//导入请求ajax的axios插件
	import axios from "axios";
  import Slider from 'base/slider/slider'
  import {getTuijian,getDistList} from 'api/tuijian'
  import {ERR_OK} from 'api/config'
  import scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    data(){
      return {
        slider:[],
        discList:[]    //歌单列表数据
      }
    },
  	created(){
  		this.getTuijian()
//      setTimeout(()=>{
        this._getDiscList()
//      },1000)
    },
  	methods:{
  		getTuijian(){
  			getTuijian().then((res)=>{
	 				if(res.code===ERR_OK){
	 					this.slider = res.data.slider
	 				}
 				})
			},
      _getDiscList(){
			  //获取歌单列表的方法
        getDistList().then((res)=>{
          if(res.code===ERR_OK){
           this.discList = res.data.list
          }
        })
      },
      loadImage(){
        if(!this.checkloaded){
          this.$refs.scroll.refresh()
          this.checkloaded=true;
        }

      }
  	},
    components:{
      Slider:Slider,
      scroll:scroll,
      loading:Loading
    }
  }

</script>

<style scoped>
  .tuijian{
    position: fixed;
    top: 88px;
    bottom:0;
    width: 100%;
  }
  .slider-content{
    height: 100%;
    overflow: hidden;
  }
  .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
    z-index: 99;
  }
  .slider img{
    width: 100%;
  }
  /*.slederA{*/
    /*display: block;*/
  /*}*/
  .list-title{
    text-align: center;
    line-height: 30px;
    color: #ffcd32;
  }
  .item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
  }
  .item .icon{
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
  }
  .item .icon img{
    border-radius: 5px;
  }
  .item .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size:14px;
    color:#ffcd32;
  }
  .item .text .name{
    color: #ffffff;
    margin-bottom: 10px;
  }
  .item .desc{
    color: rgba(255, 255, 255, 0.3);
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top:50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
