/* eslint-disable no-new */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
    // 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
    if (store.state.user.username && to.path.startsWith('/admin')) {
        initAdminMenu(router, store)
    }
    if (to.meta.requireAuth) {
        if (store.state.user.username) {
            next()
        } else {
            next({
                path: 'login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export const initAdminMenu = (router, store) => {
    if (store.state.adminMenus.length > 0) {
        return
    }
    axios.get('/menu').then(resp => {
        if (resp && resp.status === 200) {
            var fmtRoutes = formatRoutes(resp.data.result)
            router.addRoutes(fmtRoutes)
            store.commit('initAdminMenu', fmtRoutes)
        }
    })
}

export const formatRoutes = (routes) => {
    console.log(routes)
    let fmtRoutes = []
    if (!routes) {
        return
    }
    routes.forEach(route => {
        if (route.children) {
            route.children = formatRoutes(route.children)
        }

        let fmtRoute = {
            path: route.path,
            component: resolve => {
                require(['./components/admin/' + route.component + '.vue'], resolve)
            },
            name: route.name,
            nameZh: route.nameZh,
            iconCls: route.iconCls,
            children: route.children
        }
        fmtRoutes.push(fmtRoute)
    })
    return fmtRoutes
}

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    components: { App },
    template: '<App/>'
})