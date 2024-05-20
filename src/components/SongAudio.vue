<template>
    <div class="song-audio">
        <audio id="player" :src="url" controls="controls" preload="true" @canplay="startPlay" @ended="ended">
        </audio>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'song-audio',
    computed: {
        ...mapGetters([
            'id',
            'url',
            'isPlay'
        ])
    },
    data() {
        return {

        }
    },
    // 监听播放还是暂停
    watch: {
        isPlay: function () {
            // 防止控制台报错：The element has no supported sources.
            // 延迟0.5s加载dom
            setTimeout(() => {
                this.togglePlay();
            }, 500)
        }
    },
    methods: {
        // 获取链接后准备播放
        startPlay() {
            let player = document.querySelector('#player');
            // 开始播放
            player.play();
        },
        // 播放完后触发
        ended() {
            this.isPlay = false
        },
        // 开始暂停
        togglePlay() {
            let player = document.querySelector('#player');
            if (this.isPlay) {
                player.play();
            } else {
                player.pause();
            }
        }
    },
}
</script>

<style>
.song-audio {
    display: none;
}
</style>