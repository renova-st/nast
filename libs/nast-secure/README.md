# nast-secure
## Installation
```
npm i -S nast-secure
```

## Prepare
```
import Vue from 'vue'
import App from './App'
import NastSecure from 'nast-secure'

Vue.use(NastSecure.vue(), {})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

## Basic usage
```
$app.secure.clean(html)
```