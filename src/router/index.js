
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import InfoPage from '../pages/InfoPage.vue'
import ConsumerPage from '../pages/ConsumerPage.vue'
import SingerPage from '../pages/SingerPage.vue'
import SongListPage from '../pages/SongListPage.vue'
import SongPage from '../pages/SongPage.vue'
import Home from '../components/Home.vue'
import ListSongPage from '../pages/ListSongPage.vue'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: '/Info',
          component: InfoPage
        },
        {
          path: '/Consumer',
          component: ConsumerPage
        },
        {
          path: '/Singer',
          component: SingerPage
        },
        {
          path: '/SongList',
          component: SongListPage
        },
        {
          path: '/Song',
          component: SongPage
        },
        {
          path: '/ListSong',
          component: ListSongPage
        },
      ]
    },
  ]
})