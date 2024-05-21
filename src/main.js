import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './assets/css/main.css'
import VCharts from 'v-charts'
//引入 
import VueRouter from 'vue-router'

//防止使用V-Charts时控制台报错
Vue._watchers = Vue.prototype._watchers = []

Vue.use(ElementUI, { locale })
// 关闭vue的生产提示
Vue.config.productionTip = false
// 应用插件
Vue.use(VueRouter)
//使用VCharts
Vue.use(VCharts)
// 创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    router:router,
    store
})
