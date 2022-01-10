import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Apps/Home/Home.vue'
import Login from '../views/Login/index.vue'
import Detail from '../views/Apps/Detail/index.vue'
import Search from '../views/Apps/Search/index.vue'
import TV from "../views/Apps/TV/index.vue"
import Movies from "../views/Apps/Movies/index.vue"
import WatchList from "../views/Apps/WatchList/index.vue"
import Profiles from "../views/Apps/Profiles/index.vue"
import JwtService from "@/common/jwt.service";
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/tv',
        name: 'TV',
        component: TV,
    },
    {
        path: '/movies',
        name: 'Movies',
        component: Movies,
    },
    {
        path: '/watch-list',
        name: 'WatchList',
        component: WatchList,
    },
    {
        path: '/profiles',
        name: 'Profiles',
        component: Profiles,
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        children: [{
            path: '/search/:name',
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            hideNavbar: true,
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const auth = JwtService.getToken()
    if (to.name !== 'Login' && !auth) next({
        name: 'Login'
    })
    else next()
})

export default router