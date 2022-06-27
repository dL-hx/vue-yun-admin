import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'// 引入vuex

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 关闭浏览器关于环境的提示
Vue.config.productionTip = false

// 注入全局
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 引用
// this.postRequest()

Vue.use(ElementUI);

new Vue({
  router,
  store, // 注入store
  render: h => h(App)
}).$mount('#app')
