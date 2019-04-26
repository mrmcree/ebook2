<template>
  <div class="book">
    <div
      class="container"
      ref="wrapper"
      style="height:100vh;overflow:hidden;postion:fiex;top:0;"
      :style="{ color: theme.color, background: theme.background,fontFamily:font }"
    >
      <ul ref="content" class="wrapper">
        <li v-for="(item, index) in bookContent" :key="index" :data-name="item.title">
          <div class="nav">
            <div class="title" v-text="item.title"></div>
            <div
              class="content"
              @click="toolBarShow=true"
              v-html="$options.filters.formatHtml(item.content)"
            >{{item.content}}</div>
          </div>
        </li>
      </ul>
      <div id="page"></div>
    </div>
    <div class="toolBar" v-show="toolBarShow">
      <mt-header :title="bookTitle" class="header">
        <div @click="$router.go(-1)" slot="left">
          <mt-button icon="back">返回</mt-button>
        </div>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <div class="space" @click="toolBarShow = false"></div>
      <div class="footer">
        <!-- <input type="color" @change="changeFontSkin" v-model="fontColor">
        <input type="color" @change="changeBgSkin" v-model="bgColor">-->
        <mt-range
          class="fontSizeSelect"
          v-model="fontSize"
          :min="10"
          :max="50"
          :step="5"
          :bar-height="3"
          style="width:80%;margin:0 auto;"
        >
          <div
            slot="start"
            @click="fontSize > 10 ? (fontSize -= 5) : (fontSize = 10)"
          >aa&nbsp;&nbsp;</div>
          <div slot="end" @click="fontSize < 50 ? (fontSize += 5) : (fontSize = 50)">&nbsp;&nbsp;AA</div>
        </mt-range>
        <div class="theme-select">
          <div
            class="theme"
            v-for="(item, index) in bookThemes"
            :key="index"
            @click="changeSkin(item)"
          >{{ index | format }}</div>
        </div>
        <div class="font-select">
          <div
            class="font"
            v-for="(item,index) in bookFont"
            :key="index"
            @click="font=item"
          >{{item}}</div>
        </div>
        <div class="source-select">
          <!-- 当前源:{{sourceName}} | vip:{{bookChapters?'是':'否'}} -->
          <div
            v-for="(item,index) in bookSource"
            :key="index"
            @click="changeSource(index)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
//TODO:更多换肤 
//TODO:换字体
*/
import BScroll from "better-scroll";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Toast } from "mint-ui";
import { async, reject } from "q";
import { setTimeout } from "timers";
export default {
  name: "book",
  data() {
    return {
      fontSize: 10,
      toolBarShow: false,
      contentScroll: undefined,
      el: document.querySelectorAll(".wrapper li"),
      theme: {},
      font: "",
      pageIndex: "",
      contentIndex: ""
    };
  },
  filters: {
    format(value) {
      switch (value) {
        case "classic":
          value = "经典";
          break;
        case "dark":
          value = "夜间";
          break;
        case "light":
          value = "清新";
          break;
        default:
          value = "默认";
      }
      return value;
    },
    formatHtml(text) {
      var reg = new RegExp("\n", "g");
      var res = text.replace(reg, "<br>");
      return res;
    }
  },
  watch: {
    fontSize(newVal) {
      document.querySelector(".container").style.fontSize = newVal + "px";
      document.querySelector(".container").style.lineHeight =
        newVal * 1.2 + "px";
    },
    bookChapters() {
      this.el = document.querySelectorAll(".wrapper li");
    }
  },
  methods: {
    changeSource(index) {
      this.changeSourceCurrent(index);
      this.switchBookSource({ id: this.$route.query.id }).then(res => {
        let link = this.bookChapters.find(item => item.title === this.bookTitle)
          .link;
        console.log(res)
      });
    },
    next() {
      // console.log(this.chapterList[this.pageIndex+1])
      this.pageIndex++;
      // console.log(this.bookChapters[this.pageIndex].link)
      return new Promise((resolve, reject) => {
        this.getContent(this.bookChapters[this.pageIndex].link).then(res => {
          // this.content.push(res.data.chapter);
          resolve(res);
        });
      });
      // this.getData();
    },
    prev() {
      if (this.pageIndex < 0) {
        Toast("第一页了");
        return;
      }
      this.pageIndex--;
      this.getContent(this.bookChapters[this.pageIndex].link);
    },
    changeSkin(theme) {
      this.theme = theme;
    },
    ...mapActions(["switchBookSource"]),
    ...mapMutations({
      changeTitle: "CHANGE_BOOK_TITLE",
      changeSourceCurrent: "CHANGE_BOOK_SOURCE_CURRENT",
      changeContent: "CHANGE_BOOK_CONTENT",
      emptyBookContent: "EMPTY_BOOK_CONTENT"
    }),

    getContent(link) {
      this.$api.bookcontent(encodeURIComponent(link)).then(response => {
        let res = response.data.chapter;
        this.changeContent({
          title:
            res.title !== "."
              ? res.title
              : this.bookContent[this.contentIndex].title,
          content: res.isVip ? "vip章节，请点击换源即可免费阅读" :res.cpContent?res.cpContent: res.body
        });
      });
    }
  },
  beforeMount() {
    this.emptyBookContent();
    this.getContent(this.$route.query.link);
    // console.log(this.bookSource[this.bookSourceCurrent])
  },
  computed: {
    ...mapGetters([
      "bookThemes",
      "bookChapters",
      "bookTitle",
      "bookFont",
      "bookSource",
      "bookSourceCurrent",
      "bookContent"
    ])
  },
  mounted() {
    // 滚动修改标题
    let { link } = this.$route.query;
    this.pageIndex = this.bookChapters.findIndex(item => item.link === link);
    this.contentIndex = this.bookContent.findIndex(
      item => item.title === this.bookTitle
    );
    this.changeTitle(this.bookChapters.find(item => item.link === link).title);
    this.$nextTick(() => {
      if (this.contentScroll) return;
      this.contentScroll = new BScroll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: {
          // 当上拉距离超过30px时触发 pullingUp 事件
          threshold: 30
        }
      });

      this.contentScroll.on("scroll", pos => {
        var top = Math.abs(pos.y);
        var el = this.el;
        for (var i = 0; i < el.length; i++) {
          if (top > el[i].offsetTop) {
            this.changeTitle(el[i].getAttribute("data-name"));
          }
        }
      });
      this.contentScroll.on("pullingUp", () => {
        // console.log("上拉加载操作");
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        this.next().then(res => {
          this.contentScroll.finishPullUp();
          this.contentScroll.refresh();
        });
      });
    });
  }
};
</script>
<style scoped lang="scss">
@import "../assets/font.scss";
.book {
  color: var(--theme-font-color);
}
.toolBar {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  .header {
    background: #000;
    color: #fff;
  }
  .space {
    width: 100%;
    height: calc(100vh - 140px);
  }
  .footer {
    position: absolute;
    bottom: 0;
    height: 200px;
    width: 100%;
    background: #000;
    color: #fff;
    .theme-select,
    .font-select,
    .source-select {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
      height: 50px;
      line-height: 50px;
    }
    .fontSizeSelect {
      padding: 10px 0;
    }
    .chapter-select {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
    }
    .btn {
      font-size: 14px;
      background: #000;
      color: #fff;
    }
  }
}
.nav {
  padding-top: 20px;
  .title {
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
  }
}
.bottom-tip {
  color: red;
}
</style>
