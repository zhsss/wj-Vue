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

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
    // 设置反向代理，前端请求默认发送到 http://localhost:8443/api
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
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

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    components: { App },
    template: '<App/>'
})