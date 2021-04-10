<template>
  <div id="app">
    <com-aside></com-aside>
    <div class="main">
      <com-navbar></com-navbar>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import { mapState } from "vuex";
  import ComAside from './components/Aside.vue'
  import ComNavbar from './components/Navbar.vue'
  export default {
    components: {
      ComNavbar,
      ComAside,
    },
    mounted() {
      if (!this.$store.state.menu.login) {
        this.$router.push('/')
      }
    },
  }
</script>

<style lang="less">
  html,
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    display: flex;
    justify-content: space-around;
  }
</style>