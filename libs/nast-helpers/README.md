# nast-date
## Installation
```
npm i -S nast-helpers
```

## Prepare
```
import Vue from 'vue'
import App from './App'
import NastHelpers from 'nast-helpers'

Vue.use(NastHelpers.vue(), {})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

## Basic usage
```
this.$var('loading', true)
this.$var('loading') // true
this.$var('loading', false)
```