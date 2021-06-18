/* eslint-disable func-call-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleDetails from '@/components/strategy/ArticleDetails'
import ArticleEditor from '@/components/admin/content/ArticleEditor'
import AdminIndex from '@/components/admin/AdminIndex'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
            // home页面并不需要被访问
            redirect: '/index',
            children: [{
                    path: '/index',
                    name: 'AppIndex',
                    component: () =>
                        import ('../components/home/AppIndex')
                },
                {
                    path: '/strategy',
                    name: 'Strategy',
                    component: () =>
                        import ('../components/strategy/Articles')
                },
                {
                    path: '/strategy/article',
                    name: 'Article',
                    component: ArticleDetails,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/admin/content/editor',
                    name: 'Editor',
                    component: ArticleEditor,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminIndex,
            meta: {
                requireAuth: true
            }
        }
    ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Default',
            redirect: '/home',
            component: Home
        },
        {
            // home页面并不需要被访问，只是作为其它组件的父组件
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/index',
            children: [{
                    path: '/index',
                    name: 'AppIndex',
                    component: () =>
                        import ('../components/home/AppIndex')
                },
                {
                    path: '/strategy',
                    name: 'Strategy',
                    component: () =>
                        import ('../components/strategy/Articles')
                },
                {
                    path: '/admin/content/editor',
                    name: 'Editor',
                    component: () =>
                        import ('../components/admin/content/ArticleEditor'),
                    meta: {
                        requireAuth: true
                    }
                }, {
                    path: '/strategy/article',
                    name: 'Article',
                    component: ArticleDetails,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('../components/Login')
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () =>
                import ('../components/admin/AdminIndex'),
            meta: {
                requireAuth: true
            }
        }
    ]
})