<template>
  <div id="tabbar">
    <mt-tabbar style="position:fixed">
      <mt-tab-item>
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <router-link to="/" class="link">首页</router-link>|
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/about" class="link">书架</router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/rank" class="link">分类</router-link>|
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: "tabbar"
};
</script>
<style lang='scss'>
.mint-tabbar {
  position: fixed;
  bottom: 0;
  z-index: 100;
  height:50px;
}
</style>