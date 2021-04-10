<template>
  <el-menu :default-active="currentmenu.toString()" class="el-menu-vertical-demo" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <h3 class="sysname">快餐店管理系统</h3>
    <el-menu-item :index="index.toString()" v-for="(item, index) in nsMenu" :key="index" @click="changemenu(index)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">
        {{ item.label }}
      </span>
    </el-menu-item>
    <el-submenu :index="(index + nsMenu.length).toString()" v-for="(item, index) in hsMenu"
      :key="index + nsMenu.length">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="(index + nsMenu.length).toString()" v-for="(sonitem, index) in item.children"
          :key="index + nsMenu.length">
          <i :class="'el-icon-' + sonitem.icon"></i>
          <router-link :to="sonitem.path" class="router">{{ sonitem.label }}
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({
        menu: state => state.menu.menu,
        currentmenu: state => state.menu.currentmenu,
      }),
      nsMenu() {
        return this.menu.filter((item) => !item.children);
      },
      hsMenu() {
        return this.menu.filter((item) => item.children);
      },
    },
    watch: {
      currentmenu() {
        switch (this.$store.state.menu.currentmenu) {
          case 0: return this.$router.push('/').catch(err => {
            console.log('不能重复点击导航，有点问题啊',err)
          })
          case 1: return this.$router.push('/shop').catch(err => {
            console.log('不能重复点击导航，有点问题啊',err)
          })
          case 2: return this.$router.push('/user').catch(err => {
            console.log('不能重复点击导航，有点问题啊',err)
          })
        }
      }
    },
    methods: {
      changemenu(index) {
        this.$store.commit("selectMenu", index);
      },
    },
    mounted() {
      if(this.$store.state.menu.currentmenu==0){this.$router.push('/')}
    },
  };
</script>

<style scoped lang="less">
  .el-menu {
    .sysname {
      color: rgba(154, 225, 240, 0.87);
      text-align: center;
    }

    height: 100vh;

    &-item {
      padding: 0;
      margin: 0;
    }

    &-vertical-demo.el-menu {
      width: 12vw;
      min-width: 150px;
      border: 0;

      .router {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .el-submenu .el-menu-item {
    width: 12%;
    min-width: 150px;
  }
</style>