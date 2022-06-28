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
import {initMenu} from "@/utils/menus";


Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 引用
// this.postRequest()


// 使用 router.beforeEach 注册一个全局前置守卫
router.beforeEach((to, from, next)=>{
  // to 要去的路由; from 来自哪里的路由 ; next() 放行
  // 用户登录成功时，把 token 存入 sessionStorage，如果携带 token，初始化菜单，放行
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    // 如果用户不存在
    if (!window.sessionStorage.getItem('user')) {
      // 判断用户信息是否存在
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          // 存入用户信息，转字符串，存入 sessionStorage
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          // 同步用户信息 编辑用户
          store.commit('INIT_ADMIN',resp)
          next();
        }
      })
    }
    next();
  } else {
    if (to.path === '/') {// 是登录页面
      next()
    } else {
      next('/?redirect=' + to.path)
    }
  }

})


Vue.use(ElementUI);

new Vue({
  router,
  store, // 注入store
  render: h => h(App)
}).$mount('#app')
