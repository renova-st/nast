import NastStore from 'nast-store'
import Vue from 'vue'
import App from './App'

const stores = {
  app: {
    state: {
      user: {},
    },
    mutations: {
      user(state, value) {
        state.user = value
      },
    },
    namespaced: true,
  },
}

const store = new NastStore(Vue, stores)

global.$app = {
  store,
}

new Vue({
  store: store.store(),
  render: (h) => h(App),
}).$mount('#app')
