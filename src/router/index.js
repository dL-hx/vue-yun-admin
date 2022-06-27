import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Test1 from '../views/Test1'
import Test2 from '../views/Test2'

Vue.use(VueRouter)

/*从后端获取数据更改到前端*/
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,

    hidden:true,
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[  /*子路由页面跳转*/
      {
        path: '/test1',
        name: 'Test1',
        component: Test1
      },
      {
        path: '/test2',
        name: 'Test2',
        component: Test2
      }
    ]



  },


]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
