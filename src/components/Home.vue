<template>
  <div>
    <TheHeader></TheHeader>
    <TheAside></TheAside>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
import TheAside from './TheAside.vue';
import bus from '../assets/js/bus'
export default {
  components: {
    TheHeader,
    TheAside
  },
  data() {
    return {
      collapse: false
    }
  },
  created() {
    // 通过Bus进行组件间的通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  },
}
</script>

<style></style>