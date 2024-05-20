import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './assets/css/main.css'
//引入 
import VueRouter from 'vue-router'

Vue.use(ElementUI, { locale })
// 关闭vue的生产提示
Vue.config.productionTip = false
// 应用插件
Vue.use(VueRouter)
// 创建vm
new Vue({
    el: '#app',
    render: h => h(App),
    router:router,
    store
})
