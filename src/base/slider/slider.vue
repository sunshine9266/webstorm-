<script src="../../../node_modules/better-scroll/src/bscroll/bscroll.js"></script>
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dota" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
    export default {
      data(){
        return {
          dots:[],//承载小圆点的数组
          currentPageIndex:0   //当前是第几个默认是0
        }
      },
      props:{
        loop:{
          type:Boolean,
          default:true
        },
        autoPlay:{
          type:Boolean,
          default:true
        },
        interval:{
          type:Boolean,
          default:true
        }
      },
      mounted(){
        setTimeout(()=>{
          this.setSliderWidth(false)
          this.$nextTick(()=>{
            this._initSlider()
          })
          this._initDots()   //初始化小圆点按钮
          if(this.autoPlay){
            this.play()
          }
        },20)
        window.addEventListener('resize',()=>{
          if(!this.slider){
            return; //没有初始化时什么也不做
          }
          this.setSliderWidth(true)
          this.slider.refresh()   //强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法
        })
      },
      destroyed (){
        clearTimeout(this.timer)  //每次销毁时清一下定时器
      },
      methods:{
        //设置图片轮播的总宽度
        setSliderWidth (isReset) {
          this.children = this.$refs.sliderGroup.children;//所有的轮播元素
          let width =0;
          let sliderWidth = this.$refs.slider.clientWidth;//每一个的宽度
          for(let i = 0;i<this.children.length;i++){
            let child  = this.children[i];
            addClass(child,'slider-item') ;   //给每一个元素添加一个样式
            child.style.width = sliderWidth+"px";
            width += sliderWidth;
          }
          if(this.loop && !isReset){
            width += sliderWidth*2;  //betterscroll会默认在前后创建两个虚拟的节点,所以宽度追加2倍的宽度
          }
          this.$refs.sliderGroup.style.width = width+'px'

        },
        _initSlider () {
          this.slider = new BScroll(this.$refs.slider,{
            scrollX:true,    //横向滚动
            scrollY:false,
            momentun:false, //惯性
            snap:true,
            snapLoop:this.loop,
            snapThreshold: 0.3, //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
            snapSpeed: 400,   //轮播切换的时间

          })
          this.slider.on('scrollEnd',()=>{
            let pageIndex = this.slider.getCurrentPage().pageX   //获取当前滚动页面的横向索引赋值给当前索引变量,让小圆点切换
            if(this.loop){
              pageIndex-=1
            }
            this.currentPageIndex = pageIndex
            if(this.autoPlay){
              clearTimeout(this.timer)
              //每次自动轮播之前都清除以下定时器,这里是滚动结束里面.滚动结束后如果马上到了自动轮播时间 就比较奇怪,所以清除下重新来
              this.play()
            }
          })
        },
        _initDots (){
          this.dots = new Array(this.children.length);
        },
        play(){
          let pageIndex = this.currentPageIndex+1
          if(this.loop){
            pageIndex+=1
          }
          this.timer = setTimeout(()=>{
            console.log("pageIndex::::"+pageIndex)
            this.slider.goToPage(pageIndex,0,400)  //跳转道页面的横向索引,纵向索引,以及动画时间
          },2000)
        }

      }

    }
</script>

<style scoped>
  .slider-item{
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-decoration: none;
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }
  .dots .dota{
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #7e8c8d;
  }
  .dots .active{
    width: 20px;
    border-radius: 5px;
    background-color: aliceblue;
  }
</style>
