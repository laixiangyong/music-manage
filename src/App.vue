<template>
  <div id="app">
    <SongAudio/>
    <router-view></router-view>
  </div>
</template>
<script>
import SongAudio from './components/SongAudio.vue';
export default {
  components:{
    SongAudio
  }
}
</script>

<style>
/* 确保整个页面占满全屏 */
html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* 确保app容器占满 */
#app {
  width: 100%;
  height: 100%;
}</style>
