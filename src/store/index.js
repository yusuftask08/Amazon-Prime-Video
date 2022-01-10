import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth.module"
import home from "./home.module"
import watchList from "./watchList.module"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        home,
        watchList
    }
})