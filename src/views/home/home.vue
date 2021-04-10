<template>
    <div id="banner">
        <el-carousel trigger="click" height="70vh">
            <el-carousel-item v-for="item in image" :key="item">
              <img :src="item" alt="" class="food">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
      computed: {
    ...mapState({
    }),
  },
      data() {
        return {
          image: ['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1274765058,2411532386&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1272750083,769283802&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3710564740,3421175855&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023716025,3127445481&fm=26&gp=0.jpg'
    ]
        }
      },
      methods: {
      },
    }
</script>

<style scoped lang="less">
  #banner{
    transform: translate(13vw,7vh);
    width: 70%;
    img{
      width: 100%;
      height:100%
    }
  }
    
</style>