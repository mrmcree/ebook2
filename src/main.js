import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "lib-flexible";
import "normalize.css";
import VueLazyload from "vue-lazyload";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import http from "./api/http";
import tab from './components/tab'
import * as api from './api/api'
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(VueLazyload, {
  observer: true,
  preLoad: 1.3,
  error: require("../public/loading.gif"),
  loading: require("../public/loading.gif"),
  attempt: 3
});
import { Button, Header, Range, Loadmore,Swipe,SwipeItem,Tabbar, TabItem  } from "mint-ui";
Vue.use(tab)
new Vue({
  router,
  components: {
    Button,
    Header,
    Range,
    Loadmore,
    Swipe,SwipeItem,Tabbar, TabItem
  },
  store,
  render: h => h(App)
}).$mount("#app");
