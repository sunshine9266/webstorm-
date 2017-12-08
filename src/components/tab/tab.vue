<template>
  <div class="tab">
  	<!--默认渲染成tag标签 -->
  	<!--当当前路由被激活的时候，vue会给当前激活的router-link添加router-link-active类，我们给它定义样式-->
    <router-link tag="div" class="tab-item" to="/tuijian">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/geshou">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/paihang">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/sousuo">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped>
  .tab{
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }
  .tab .tab-item{   	
      flex: 1;
      text-align: center;
   }
  .tab .tab-item .tab-link{
    	
    padding-bottom: 5px;
    color: rgba(255, 255, 255, 0.7);
  }
  .tab .router-link-active .tab-link{
    color:#ffcd32;
    border-bottom: 2px solid #ffcd32;
  }
</style>