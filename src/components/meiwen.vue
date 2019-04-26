<template>
  <div class="meiwen">
    <ul v-for="item in booklist" :key="item.id">
      <router-link :to="{name:'bookDetail',query:{id:item._id}}" class="mui-table-view-cell" tag="li">
        <div class="book">
          <div class="book-left">
            <img class="cover" :src="item.cover" alt>
            <!-- <h4 class="title">{{item.title}}</h4>
            <h5>{{item.author}}</h5>-->
          </div>
          <div class="book-right">
              <h4 class="title">{{item.title}}</h4>
            <p class="intro">{{item.shortIntro}}</p>
            <!-- <p class="m-p1">{{item.isSerial?'连载中':'完结'}}</p> -->
            <div class="bottom-info">
              <p class="m-p2">{{item.majorCate}}</p>
              <p class="m-p1">{{item.minorCate}}</p>
              <p class="m-p2">
                <span>{{item.latelyFollower>1000?parseInt(item.latelyFollower/1000)+'k':item.latelyFollower}}</span>人气
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      booklist: []
    };
  },
  props: ["booklistid"],
  mounted() {
    this.getlist(this.booklistid.id);
  },
  methods: {
    getlist(id) {
      this.$api.bootd(id).then(res => {
        var data = res.data.data;
        if (res.data.ok) {
          this.booklist = data.map(item => {
            return item.book;
          });
        }
      });
    }
  },
  watch: {
    booklistid: "getlist"
  }
};
</script>
<style lang="scss" scoped>
.meiwen {
  margin-top: 10px;
  background-color: #fff;
  p {
    font-size: 13px;
    color: #333;
  }
  .book {
    display: flex;
    /* flex-wrap: wrap; */
    overflow: hidden;
    height: 130px;
    margin-bottom: 5px;

    .book-left {
      display: flex;
      padding: 15px 0 15px 20px;
      
      .author {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .book-right {
      margin: 20px 10px 0 10px;
      .title {
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 5px;
      }
      .intro {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;

        text-overflow: ellipsis;
        line-height: 15px; /*no*/
        max-height: 45px; /*no*/
        overflow: hidden;
        margin-bottom: 10px;
      }
      .bottom-info {
        display: flex;
        justify-content: space-between;
      }
    }

    .cover {
      box-shadow: 0 0 10px #ccc;
      max-width: 100px; /*no*/
      height: 100px; /*no*/
    }
  }
}
</style>
