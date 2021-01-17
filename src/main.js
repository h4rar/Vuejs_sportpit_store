import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import Axios from 'axios'
import './assets/styles/styles.scss'


Vue.config.productionTip = false
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}


new Vue({
  render: h => h(App),
    store,
    router
}).$mount('#app')
