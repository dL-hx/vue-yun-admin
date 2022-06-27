// 定义加载菜单的menu.js 文件
import {getRequest} from "./api";
import router from "@/router";



export const initMenu = (router, store)=>{
    if (router.state.routes.length>0){
        return;
    }




    getRequest('/system/config/menu').then(data=>{
        if (data){
            // 格式化router
            let fmtRoutes = formatRoutes(data)
            // 1. 添加到路由
            router.addRoutes(fmtRoutes)

            // 2. 将数据存入到vuex
            store.commit('initRoutes', fmtRoutes)
        }
    })
}


export function formatRoutes(routes) {
    let fmtRoutes = []
    routes.forEach(router=>{
        let {
            path,
            component,
            name,
            iconCls,
            children
        }= router

        // 判断是否为数组
        if (children && children instanceof Array){
            // 递归
            children = formatRoutes(children)
        }

        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){
                // 懒加载组件
                resolve('../views/' + component + '.vue', resolve)
            },
        }
        fmtRoutes.push(fmRouter)

    })
    return fmtRoutes;
}
