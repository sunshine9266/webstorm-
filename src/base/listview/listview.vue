<template>
  <!--将data传入这个组件,这样当data改变的时候,子组件里面监听重新计算scroll-->
   <scroll class = 'listview' :data="data" ref="listview">
     <!--<div>-->
       <ul >
         <li class="list-group" v-for="group in data" ref = "listGroup">
           <h2 class="list-group-title">{{group.title}}</h2>
           <ul>
             <li class="list-group-item" v-for="item in group.items">
               <img class = 'avatar' v-lazy="item.avatar"/>
               <span class="name">{{item.name}}</span>
             </li>
           </ul>
         </li>
       </ul>

     <!--</div>-->
     <div class="list-shortcut" @touchstart = "onShortcutTouchStart">
       <ul>
         <li v-for="(item,index) in shortcutList" :data-index="index" class="item">
           {{item}}
         </li>
       </ul>
     </div>
   </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
    export default {
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
      computed:{
        shortcutList(){
//          map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
//          map() 方法按照原始数组元素顺序依次处理元素。
//          注意： map() 不会对空数组进行检测。 map() 不会改变原始数组。
          return this.data.map((group) => {
            return group.title.substr(0,1)
          })
        }
      },
      methods:{
        onShortcutTouchStart(e){
          //点击时获取点击第几个的索引
          let anchorIndex = getData(e.target,'index');
          console.log(anchorIndex)
          this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
        }
      },
      components:{
        Scroll
      }
    }
</script>

<style scoped>
  .listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #222;
  }
  .list-group{
    padding-bottom: 30px;
  }
  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color:rgba(255, 255, 255, 0.5);
    background: #333;

  }
  .list-group-item{
    display: flex;
    align-items: center;
    padding: 20px 0 0 30px;

  }
  .list-group-item .avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .list-group-item .name{
    margin-left: 20px;
    color: rgba(255, 255, 255, 0.5);
    font-size:14px;
  }
  .list-shortcut{
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
  }
  .item{
  padding: 3px;
  line-height: 1;
  color:rgba(255, 255, 255, 0.5);
  font-size: 12px;
  }
  .current{
    color: #ffcd32;
  }
  .list-fixed{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .fixed-title{
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: #333;
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
