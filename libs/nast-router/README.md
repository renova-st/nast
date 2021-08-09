# nast-router

## Installation
```
npm i -S nast-router
```

## Prepare
```
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
```

## Basic use
```
export default {
  name: 'About',
  data() {
    return {
      breadcrumbs: [],
    }
  },
  mounted() {
    $app.router.set({ title: 'New about title', }) // set current route
    $app.router.set('index', { route: { name: 'index', query: { test: '123', }, }, title: 'New index title', })
    this.breadcrumbs = $app.router.breadcrumbs()
  },
}
```