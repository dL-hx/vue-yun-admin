import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

// 权限菜单信息放在内存中
export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{/*同步执行 commit*/
        initRoutes(state, data){
            state.routes = data
        }
    },
    actions: {/*异步执行, dispatch*/

    }
})
