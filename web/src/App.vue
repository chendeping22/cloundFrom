<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #606266;
  width:100%;
  height: 100%;
	/*background-color: #f8fafd;*/
	overflow: auto;
}

 
</style>
