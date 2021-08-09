import NastRouter from 'nast-router'
import Vuex from 'vuex'
import Vue from 'vue'
import App from './App'

Vue.use(Vuex)
const store = new Vuex.Store({ modules: { router: NastRouter.store(), }, })

const routes = [
  { path: '/', name: 'index', component: () => import('./HelloWorld'), title: 'Главная', },
  { path: '/about', name: 'about', component: () => import('./About'), parent: 'index', title: 'О странице', },
]

const router = new NastRouter(Vue, routes, store)

global.$app = {
  router,
}

new Vue({
  router: $app.router.router(),
  store,
  render: (h) => h(App),
}).$mount('#app')
