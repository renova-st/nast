# nast-auth

## Installation
```
npm i -S nast-auth
```

## Prepare
```
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
```

## Basic usage
```
$app.auth.init() // load auth from localstorage
$app.auth.login(user, token)
$app.auth.needAuth(false) // redirect to index
$app.auth.logout()
$app.auth.needAuth(true) // redirect to login
$app.auth.user() // get current user
```