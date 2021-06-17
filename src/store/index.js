/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-multiple-empty-lines */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
        },
        adminMenu: []
    },
    mutations: {
        login(state, user) {
            state.user = user
            window.localStorage.setItem('user', JSON.stringify(user))
        },
        initAdminMenu(state, menus) {
            state.adminMenu = menus
        }
    }

})