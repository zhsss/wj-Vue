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
                        import ('../components/strategy/Article')
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