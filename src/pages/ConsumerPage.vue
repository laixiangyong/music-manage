<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" style="width: 300px; display: inline-block;" placeholder="筛选相关用户"
          class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加新用户</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table size="mini" style="width: 100%;height: 670px;" :data="data" @selection-change="handleSelectionChange"
      border>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="用户图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="consumer-img">
            <img :src="getUrl(scope.row.avator)" style="width: 100%;" alt="">
          </div>
          <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeAvatorUpload"
            :on-success="handleAvatorSuccess">
            <el-button size="mini">更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
      <el-table-column label="性别" width="50" align="center">
        <template slot-scope="scope">
          {{ changeSex(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="120" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="240" align="center"></el-table-column>
      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">
          {{ attachBirth(scope.row.birth) }}
        </template>
      </el-table-column>
      <el-table-column prop="introduction" label="签名" align="center"></el-table-column>
      <el-table-column prop="location" label="地区" width="120" align="center"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total,prev,pager,next" :current-page="currentPage" :page-size="pageSize"
        :total="tableData.length" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- 新增 -->
    <el-dialog title="添加新用户" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" :rules="rules" label-width="80px">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="registerForm.username" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号" size="mini">
          <el-input v-model="registerForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" v-model="registerForm.birth" placeholder="选择日期"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="registerForm.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="签名" size="mini">
          <el-input v-model="registerForm.introduction" placeholder="签名" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="addConsumer">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改用户" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="form.username" placeholder="歌手名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号" size="mini">
          <el-input v-model="form.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日" size="mini">
          <el-date-picker type="date" v-model="form.birth" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="location" label="地区" size="mini">
          <el-input v-model="form.location" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="签名" size="mini">
          <el-input v-model="form.introduction" placeholder="签名" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="editConsumer">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除用户" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button size="mini" @click="delVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="deleteRow">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delConsumer, getAllConsumer, setConsumer, updateConsumer, } from '../api/index'
import { mixin } from '../mixins/index';
export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false,//添加弹窗是否显示
      editVisible: false,//编辑弹窗是否显示
      delVisible: false,//删除弹窗是否显示
      registerForm: { //添加
        username: '',
        password: '',
        sex: 1,
        phoneNum: '',
        email: '',
        birth: '',
        location: '',
        introduction: ''
      },
      form: { //编辑
        id: '',
        username: '',
        password: '',
        sex: '',
        phoneNum: '',
        email: '',
        birth: '',
        location: '',
        introduction: ''
      },
      tableData: [],
      tempData: [],
      select_word: '',
      pageSize: 5,  //分页每页大小
      currentPage: 1, //当前页
      idx: -1,//当前选择项
      mutipleSelection: [],//哪些项已选择打√
      rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        phoneNum: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        introduction: [{ required: true, message: "签名不能为空", trigger: "blur" }],
        location: [{ required: true, message: "地区不能为空", trigger: "blur" }],
      }
    }
  },
  computed: {
    // 计算当前搜索结果表里的数据
    data() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created() {
    this.getData();
  },
  watch: {
    // 搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着他的内容变化
    select_word: function () {
      if (this.select_word == '') {
        this.tableData = this.tempData;
      } else {
        this.tableData = [];
        for (let item of this.tempData) {
          if (item.username.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    },
  },
  methods: {
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 查询所有用户
    getData() {
      this.tempData = [];
      this.tableData = [];
      getAllConsumer().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      })
    },
    // 添加用户
    addConsumer() {
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          let d = this.registerForm.birth;
          let dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          let params = new URLSearchParams();
          params.append('username', this.registerForm.username)
          params.append('password', this.registerForm.password)
          params.append('sex', this.registerForm.sex)
          params.append('avator', '/img/user.jpg')
          params.append('phoneNum', this.registerForm.phoneNum)
          params.append('email', this.registerForm.email)
          params.append('birth', dateTime)
          params.append('location', this.registerForm.location)
          params.append('introduction', this.registerForm.introduction)
          setConsumer(params).then(res => {
            if (res.code == 1) {
              this.getData();
              this.notify('添加成功', 'success')
            } else {
              this.notify('添加成功', 'error')
            }
          })
            .catch(err => {
              console.log(err);
            });
          this.centerDialogVisible = false;
          this.registerForm = { //添加
            username: '',
            password: '',
            sex: '',
            phoneNum: '',
            email: '',
            birth: '',
            location: '',
            introduction: ''
          }
        }
      })
    },
    // 弹出编辑页面
    handleEdit(row) {
      this.editVisible = true;
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        sex: row.sex,
        phoneNum: row.phoneNum,
        email: row.email,
        birth: row.birth,
        location: row.location,
        introduction: row.introduction
      }
    },
    // 保存修改页面修改的数据
    editConsumer() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let d = new Date(this.form.birth);
          let dateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          let params = new URLSearchParams();
          params.append('id', this.form.id)
          params.append('username', this.form.username)
          params.append('password', this.form.password)
          params.append('sex', this.form.sex)
          params.append('phoneNum', this.form.phoneNum)
          params.append('email', this.form.email)
          params.append('birth', dateTime)
          params.append('location', this.form.location)
          params.append('introduction', this.form.introduction)
          updateConsumer(params).then(res => {
            if (res.code == 1) {
              this.getData();
              this.notify('修改成功', 'success')
            } else {
              this.notify('修改失败', 'error')
            }
          })
            .catch(err => {
              console.log(err);
            });
          this.editVisible = false;
        }
      })
    },
    // 更新图片
    uploadUrl(id) {
      return `${this.$store.state.HOST}/consumer/updateConsumerPic?id=${id}`
    },
    // 删除一名用户
    deleteRow() {
      delConsumer(this.idx).then(res => {
        if (res) {
          this.getData();
          this.notify('删除成功', 'success')
        } else {
          this.notify('删除失败', 'error')
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

.consumer-img {
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
</style>