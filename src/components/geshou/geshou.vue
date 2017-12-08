<template>
  <div class="singer">
  	<list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer';
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  const HOT_NAME= "热门"
  const HOT_SINGER_LENGTH= 10
  export default {
    data(){
      return{
        singers:[]
      }
    },
    created(){
      this._getSingerList()
    },
    methods:{
      _getSingerList(){
        getSingerList().then((res)=>{
          if(res.code==ERR_OK){
            this.singers =this._normallizeSinger(res.data.list)
            console.log(this.singers)
          }
        })
      },
      //使数据按字母排序的方法
      _normallizeSinger(list){
        let map = {
            hot:{
              title:HOT_NAME,
              items:[]
            }
        }
        //前十条的热歌
        list.forEach((item,index)=>{
          if(index<HOT_SINGER_LENGTH){
            map.hot.items.push(new Singer({  //通过ES6创建一个实例类
              id:item.Fsinger_mid,    //歌曲ID
              name:item.Fsinger_name //歌手名,以及歌手头像
            }))
          }
          const key = item.Findex   //字母缩写
          if(!map[key]){
            map[key] = {
              title:key,
              items:[]
            }
          }
          map[key].items.push(new Singer({
            id:item.Fsinger_mid,
            name:item.Fsinger_name
          }))
        })
       //对象的遍历并不能保证有序的,为了得到有序列表,我们需要先处理成数组
        let hot = []
        let ret = []
        for(let key in map){
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title===HOT_NAME){
            hot.push(val)
          }
        }
        //按照从小到大进行排序
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components:{
      ListView
    }
  }
</script>

<style scoped>
  /*使用better-scroll的条件是:父容器的高度固定好,子容器的高度撑开,才能滚动*/
	.singer{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>
