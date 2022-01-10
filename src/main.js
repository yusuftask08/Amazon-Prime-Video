import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style.css';
Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.use(VueAwesomeSwiper)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')