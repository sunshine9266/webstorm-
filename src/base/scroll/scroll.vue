<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
    export default {
      props:{
        probeType:{   //控制beter-scroll  的滚动监听事件,是快还是慢的滚动触发
          type:Number, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          default:1
        },
        click:{
          type:Boolean,
          default:true
        },
        data:{
          type:Array,
          default:null
        }
      },
      mounted(){
        setTimeout(()=>{
          this._initScroll()
        },20)
      },
      methods:{
        _initScroll(){
          if(!this.$refs.wrapper){
            return;
          }
          this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:this.click
          })
        },
        enable(){
          this.scroll && this.scroll.enable()
        },
        disable(){
          this.scroll && this.scroll.disable() //禁用better-scroll
        },
        refresh(){
          this.scroll && this.scroll.refresh()   //强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法
        },
        scrollTo(){
          this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        //滚动到哪儿去
        scrollToElement(){
          this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
        }

      },
      watch:{
        data(){ //当data数据变化的时候监听下,然后刷新下,只在这里刷新一遍就行
          setTimeout(()=>{
            this.refresh()
          },20)
        }
      }
    }
</script>

<style scoped>

</style>
