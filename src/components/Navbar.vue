<template>
  <header>
    <div class="l-content">
      <el-menu :default-active="currentmenu.toString()" class="el-menu-demo" mode="horizontal"
        background-color="#dee2e7" text-color="black" active-text-color="#409EFF">
        <el-menu-item :index="index.toString()" v-for="(item, index) in nsMenu" :key="index" @click="changemenu(index)">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <el-avatar :src="userImg"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <div @click="openlog">
            <el-dropdown-item v-if="!login">
              登陆
            </el-dropdown-item>
          </div>
          <div @click="openreg">
            <el-dropdown-item v-if="!register">
              注册
            </el-dropdown-item>
          </div>
          <div @click="drawer=true">
            <el-dropdown-item v-if="login">
              个人中心</el-dropdown-item>
          </div>
          <div @click="Qlogin" v-if="login">
            <el-dropdown-item>退出</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-drawer title="登陆" :visible.sync="dialog" direction="rtl" size="30%" :before-close="close" ref="drawer"
      v-if="!login">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="handleClose" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
            }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer title="注册" :visible.sync="diares" direction="rtl" size="30%" :before-close="close" ref="drawer"
      v-if="!register">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请再次输入密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.rpassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="handleClose" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
            }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer title="个人中心" :visible.sync="drawer" :with-header="false" v-if="login">
      <span>我来啦!</span>
    </el-drawer>
  </header>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({
        menu: (state) => state.menu.menu,
        currentmenu: (state) => state.menu.currentmenu,
        login: (state) => state.menu.login,
        register: (state) => state.menu.register,
        wrong: (state) => state.menu.wrong,
        wrong2: (state) => state.menu.wrong2,
      }),
      nsMenu() {
        return this.menu.filter((item) => !item.children);
      },
    },
    watch: {
      wrong() {
        this.apperror(5)
      },
      wrong2() {
        this.apperror(7)
      },
      login() {
        this.apperror(6)
      }
    },
    data() {
      return {
        userImg: require("../assets/images/user01.jpg"),
        form: {
          name: "",
          password: "",
          rpassword: '',
        },
        dialog: false,
        diares: false,
        drawer: false,
        loading: false,
        formLabelWidth: "80px",
        timer: null,
      };
    },
    methods: {
      changemenu(index) {
        this.$store.commit("selectMenu", index);
      },
      openlog() {
        if (this.login) {
          return (this.drawer = true);
        }
        this.dialog = true;
      },
      openreg() {
        if (this.login) {
          return (this.drawer = true);
        }
        this.diares = true;
      },
      close() {
        this.dialog = this.diares = false;
      },
      apperror(val) {
        switch (val) {
          case 1: return this.$message({
            message: "请正确输入用户名和密码",
            type: "warning",
          })
          case 2: return this.$message({
            message: "两次密码输入不一致",
            type: "warning",
          })
          case 3: return this.$message({
            type: "success",
            message: "退出成功!",
          })
          case 4: return this.$message({
            type: "info",
            message: "已取消",
          })
          case 5: return this.$message.error('用户名或密码错误')
          case 6: return this.$message({
            type: "success",
            message: "登陆成功!",
          })
          case 7: return this.$message.error('该用户名已经被注册')
        }
      },
      handleClose() {
        if (!this.form.name && !this.form.password) {
          return this.apperror(1)
        }
        if (this.loading) {
          return;
        }
        if (this.diares) {
          if (this.form.password !== this.form.rpassword) {
            return this.apperror(2)
          }
          return this.$confirm("确定要注册吗？")
            .then((_) => {
              this.loading = true;
              this.timer = setTimeout(() => {
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                  this.$store.commit("Rlogin", this.form);
                }, 400);
              }, 2000);
            })
            .catch((err)=>{err})
        }
        return this.$confirm("确定要登陆吗？")
          .then((_) => {
            this.loading = true;
            this.timer = setTimeout(() => {
              setTimeout(() => {
                this.loading = false;
                this.$store.commit("Rlogin", this.form);
                this.drawer = true
              }, 400);
            }, 2000);
          })
          .catch((err)=>{err})
      },
      cancelForm() {
        this.loading = false;
        this.diares = this.dialog = false;
        clearTimeout(this.timer);
      },
      Qlogin() {
        if (!this.login) {
          return;
        }
        this.$confirm("此操作退出登陆, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.commit("Qlogin");
            this.apperror(3)
          })
          .catch(() => {
            this.apperror(4)
          });
      },
    },
    created() {
      this.$store.commit("getmenu");
    },
  };
</script>

<style scoped lang="less">
  header {
    width: 88vw;
    display: flex;
    justify-content: space-between;
    background-color: #e7dede;
    color: #333;
    text-align: center;

    .r-content {
      transform: translate(-1vw,1vh);
      .el-avatar--circle {
        cursor: pointer;
        transition: all 2s;
        animation: zhuan 8s linear infinite;
      }

      @keyframes zhuan {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>