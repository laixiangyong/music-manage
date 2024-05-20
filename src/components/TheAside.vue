<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#334256"
            text-color="#ffffff" active-text-color="#20a0ff" router>
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <!-- 图标 -->
                        <i :class="item.icon"></i>
                        {{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../assets/js/bus'
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-document',
                    index: 'Info',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-document',
                    index: 'Consumer',
                    title: '用户管理'
                },
                {
                    icon: 'el-icon-document',
                    index: 'Singer',
                    title: '歌手管理'
                },
                {
                    icon: 'el-icon-document',
                    index: 'SongList',
                    title: '歌单管理'
                },
            ]
        }
    },
    computed:{
        // 设置默认显示的页面
        onRoutes(){
            return this.$route.path.replace('/','')//去掉/
        }
    },
    created(){
        // 通过Bus进行组件间的通信，来折叠侧边栏
        bus.$on('collapse',msg=>{
            this.collapse = msg
        })
    }
}
</script>

<style scoped>
.sidebar {
    /* 设置为块状 */
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    background-color: #334256;
    overflow-y: scroll;
}
/* 删除滚动条 */
.sidebar::-webkit-scrollbar{
    width: 0;
}
/* 当collapse为false时此段样式不起作用 */
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}

/* 将循环的高度设置为100%，解决左侧菜单上面细下面粗的问题 */
.sidebar >ul{
    height: 100%;
}
</style>