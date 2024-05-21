<template>
  <div>
    <!-- gutter表示间距20，mgb20跟下面间距20px -->
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ consumerCount }}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{songCount}}</div>
              <div>歌曲总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ singerCount }}</div>
              <div>歌手数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ songListCount }}</div>
              <div>歌单数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--  -->
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3>用户性别比例</h3>
        <div style="background-color: white;">
          <ve-pie :data="consumerSex" :theme="options"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>歌曲类型发布</h3>
        <div style="background-color: white;">
          <ve-histogram :data="songStyle"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { allSong, getAllConsumer,getAllSinger,getAllSongList } from '../api/index'
export default {
  data() {
    return {
      consumerCount:0,//用户总数
      songCount:0,//歌曲总数
      singerCount:0,//歌手数量
      songListCount:0,//歌单数量
      consumer:[],
      consumerSex:{//按性别分类的用户表
        columns:['性别','总数'],
        rows:[
          {'性别':'男','总数':0},
          {'性别':'女','总数':0}
        ]
      } ,
      // 饼图颜色
      options:{
        color:['#87cefa','#ffc0cb']
      },
      songStyle:{//歌单风格分类
        columns:['风格','总数'],
        rows:[
          {'风格':'华语','总数':0},
          {'风格':'欧美','总数':0},
          {'风格':'日韩','总数':0},
          {'风格':'粤语','总数':0},
          {'风格':'BGM','总数':0},
          {'风格':'轻音乐','总数':0},
          {'风格':'电音','总数':0},
        ]
      }
    }
  },
  created(){

  },
  mounted(){
    this.getConsumer();
    this.getAllSong();
    this.getAllSinger();
    this.getAllSongList();
  },
  methods: {
    getConsumer(){
      getAllConsumer().then(res=>{
        this.consumer = res;
        this.consumerCount = res.length;
        this.consumerSex.rows[0]['总数'] = this.setSex(1,this.consumer);
        this.consumerSex.rows[1]['总数'] = this.setSex(0,this.consumer);
      })
    },
    setSex(sex,consumer){//根据性别获取用户数
      let count = 0;
      for(let item of consumer){
        if(sex == item.sex){
          count++;
        }
      }
      return count;
    },
    getAllSong(){
      allSong().then(res=>{
        this.songCount = res.length;
      })
    },
    getAllSinger(){
      getAllSinger().then(res=>{
        this.singerCount = res.length;
      })
    },
    getAllSongList(){
      getAllSongList().then(res=>{
        this.songListCount = res.length;
        for(let item of res){
          this.getByStyle(item.style)
        }
      })
    },
    getByStyle(style){
      for(let item of this.songStyle.rows){
        if(style.includes(item['风格'])){
          item['总数']++;
        }
      }
    },
  },  
}
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 50px;
}

.grid-cont-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: burlywood;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
</style>