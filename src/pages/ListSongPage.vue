<template>
  <div class="table">
    <div class="crumbs">
      <i class="el-icon-tickets"></i>歌单歌曲信息
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" style="width: 300px; display: inline-block;" placeholder="请输入歌曲名"
          class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌曲</el-button>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <el-table size="mini" style="width: 100%;height: 670px;" :data="tableData" @selection-change="handleSelectionChange"
      border>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="name" label="歌手-歌名" align="center"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增 -->
    <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px" action="" id="tf">
        <el-form-item prop="singerName" label="歌手名" size="mini">
          <el-input v-model="registerForm.singerName" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item prop="songName" label="歌曲名" size="mini">
          <el-input v-model="registerForm.songName" placeholder="歌曲名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="getSongId">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="删除歌曲" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button size="mini" @click="delVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="deleteRow">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { listSongOfSongListId, delListSong, listSongAdd, songOfSongId, songOfSongName } from '../api/index'
import { mixin } from '../mixins/index';
export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      delVisible: false, //删除弹窗是否显示
      registerForm: {
        songName: '',//歌名
        singerName: '',//歌手名
      },
      tableData: [],
      tempData: [],
      select_word: '',
      mutipleSelection: [], //哪些项已选择打√
      songListId: '', //歌单id
      idx: -1,//当前选择项
    };
  },

  created() {
    this.songListId = this.$route.query.id;
    this.getData();
  },
  watch: {
    // 搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着他的内容变化
    select_word: function () {
      if (this.select_word == '') {
        this.tableData = this.tempData;
      }
      else {
        this.tableData = [];
        for (let item of this.tempData) {
          if (item.name.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    },
  },
  methods: {
    // 查询所有歌单歌曲
    getData() {
      this.tempData = [];
      this.tableData = [];
      listSongOfSongListId(this.songListId).then(res => {
        for (let item of res) {
          this.getSong(item.songId);
        }
      });
    },
    // 根据歌曲id查询歌曲对象，放到tempData和tableData里
    getSong(id) {
      songOfSongId(id).then(res => {
        this.tempData.push(res);
        this.tableData.push(res);
        console.log('table:',this.tableData);
      }).catch(err => {
        console.log(err);
      })
    },
    // 添加歌曲前获取到歌曲ID
    getSongId() {
      let _this = this;
      var songOfName = _this.registerForm.singerName + '-' + _this.registerForm.songName;
      songOfSongName(songOfName).then(res => {
        if (res[0]) {
          _this.addSong(res[0].id);
        }
        else {
          this.registerForm = {
            songName: '',
            singerName: '',
          };
          this.notify('没有此歌手或歌名', 'error');
        }
      })
    },
    // 添加歌曲
    addSong(songId) {
      let _this = this;
      let params = new URLSearchParams();
      params.append('songId', songId);
      params.append('songListId', this.songListId);
      listSongAdd(params).then(res => {
        if (res.code == 1) {
          this.getData();
          this.notify('添加成功', 'success');
        }
        else {
          this.notify('添加失败', 'error');
        }
      })
        .catch(err => {
          console.log(err);
        });
      _this.centerDialogVisible = false;
      this.registerForm = {
        songName: '',
        singerName: '',
      };
    },
    // 删除一首歌曲
    deleteRow() {
      delListSong(this.idx).then(res => {
        if (res) {
          this.getData();
          this.notify('删除成功', 'success');
        }
        else {
          this.notify('删除失败', 'error');
        }
      })
        .catch(err => {
          console.log(err);
        });
      this.delVisible = false;
    },
  },

}
</script>
  
<style>
.handle-box {
  margin-bottom: 20px;
}

.song-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}

.handle-input {
  width: 300px;
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.play {
  position: absolute;
  z-index: 100;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 18px;
  left: 15px;
}

.icon {
  /* 字体大小 */
  width: 2em;
  height: 2em;
  color: white;
  fill: currentColor;
  overflow: hidden;
}
</style>