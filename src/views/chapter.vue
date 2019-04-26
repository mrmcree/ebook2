<template>
  <div class="chapter container">
    <ul class="chapters">
      <li class="item" v-for="(item, index) in bookChapters" :key="index">
        <router-link :to="{ path: '/book', query: { link: item.link ,id} }">
          <div class="title" v-text="item.title"></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "chapter",
  data() {
    return {
     id:''
    };
  },
  methods: {
    ...mapMutations({
      changebookChapters: "CHANGE_BOOK_CHAPTERS",
      changeBookSource: "CHANGE_BOOK_SOURCE"
    }),
    ...mapActions(['switchBookSource'])
  },
  computed: {
    ...mapGetters(["bookChapters",'bookSourceCurrent'])
  },
  beforeMount() {
    let {id} = this.$route.query;
    this.id=id
    this.switchBookSource({id})
    //获得目录

    // this.$api.bookhy(this.id).then(res => {
    //   this.changeBookSource(res.data)
    //   this.$api.bookmulu(res.data[this.bookSourceCurrent]._id).then(res => {
    //     this.changebookChapters(res.data.chapters)
        
    //   });
    // });
  }
};
</script>
<style scoped lang="scss">
.chapters {
  list-style: none;
  font-size: 14px;
  a {
    text-decoration: none;
    display: block;
    color: black;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
