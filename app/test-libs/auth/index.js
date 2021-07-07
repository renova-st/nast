import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync, } from 'vuex-router-sync'
import NastAuth from 'nast-auth'
import App from './App'

const stores = {
  modules: {
    auth: NastAuth.store(),
  },
}
const routes = [
  { path: '/', name: 'index', component: () => import('./HelloWorld'), },
  { path: '/login', name: 'login', component: () => import('./Login'), },
]
Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store(stores)
const router = new VueRouter({
  routes,
})
sync(store, router)


const auth = new NastAuth(store, router)
global.$app = {
  auth,
}

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
