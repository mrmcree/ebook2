<template>
  <div class="home">
    <mt-swipe :auto="4000" class="banners">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
    <tab/>
    <div class="con" v-for="item in booktitle" :key="item.id">
      <p class="p1">{{item.title}}</p>
      <meiwen :booklistid="{id:item._id}"></meiwen>
      <div class="shux">
        <router-link :to="{name:'book',params:{id:item._id}}" tag="p" class="loadmore">加载更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import meiwen from "@/meiwen.vue";
export default {
  name: "home",

  data() {
    return {
      banners: [],
      booktitle: {}
    };
  },
  created() {
    //轮播
    this.$api.banners().then(res => {
      this.banners = res.data.data;
    });
    //首页分类
    this.$http({
      url: "/api/recommendPage/nodes/5910018c8094b1e228e5868f"
    }).then(res => {
      var arr = res.data.data;
      if (res.data.ok) {
        this.booktitle = arr.filter(item => {
          //  return arrs.includes(item.order!=2);
          return item.title != "m站顶部banner";
        });
      }
    });
    this.$http({ url: "/api/ranking/54d43437d47d13ff21cad58b" }).then(res => {
      if (res.data.ok) {
        // console.log(res);
      }
    });
  },
  components: {
    meiwen
  }
};
</script>
<style scoped lang="scss">
.home {
  overflow: hidden;
  padding-bottom: 50px;
  .banners {
    height: 113px;
    img {
      width: 100%;
    }
  }
  .p1{
    font-weight: bold;
    padding:20px;
  }
  .loadmore{
    text-align: center;
    padding: 10px 0;
  }
}
</style>
