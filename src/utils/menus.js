// 定义加载菜单的menu.js 文件
import {getRequest} from "./api";


export const initMenu = (router, store)=>{
    if (store.state.routes.length > 0) {
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
                // 判断组件以什么开头，到对应的目录去找
                if (component.startsWith('Home')) {
                    // 懒加载组件
                    require(['@/views/' + component + '.vue'], resolve);
                }else if (component.startsWith('Emp')) {
                    require(['@/views/emp/' + component + '.vue'], resolve);
                }else if (component.startsWith('Per')) {
                    require(['@/views/per/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sal')) {
                    require(['@/views/sal/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sta')) {
                    require(['@/views/sta/' + component + '.vue'], resolve);
                }else if (component.startsWith('Sys')) {
                    require(['@/views/sys/' + component + '.vue'], resolve);
                }
            },
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;
}
