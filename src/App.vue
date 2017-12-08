<template>
  <div id="app">
   	<headers></headers>
   	<tab></tab>
    <keep-alive>
      <!--vue2.0提供了一个keep-alive组件,用来缓存组件,避免多次加载相应的组件,减少性能消耗-->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import headers from 'components/m-header/m-header'
import tab from 'components/tab/tab'
export default{
  components:{
  	'headers':headers,
		'tab':tab
  }
}
</script>
<style>
</style>
