# nast-store

### Installation

<pre><code>npm i -S nast-store</code></pre>

### Prepare

<pre><code>
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
</code></pre>

### Basic usage

<pre><code>
$app.store.mutation('app.user', {
  username: 'admin',
  fullName: 'Administrator',
})

$app.store.state('app.user').fullName
</code></pre>