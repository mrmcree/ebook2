export default {
  //@阅读主题 bookThemes
  book: {
    title: "",
    chapters:[],
    source:[],
    sourceCurrent:0,
    content:[],
    fontFamily:['小米雅亭','方正屏显雅宋','方正清刻本悦宋简体','方正聚珍'],
    themes: {
      classic: {
        color: "#000",
        background: `url(${require("../../public/skin/skin-default.jpg")})`
      },
      dark: {
        color: "#fff",
        background: "#000"
      },
      light: {
        color: "#000",
        background: `url(${require("../../public/skin/skin-light.jpg")})`
      },
      default: {
        color: "#000",
        background: "#fff"
      }
    }
  }
};
