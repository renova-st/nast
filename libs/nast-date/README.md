# nast-date
## Installation
```
npm i -S nast-date
```

## Prepare
```
import Vue from 'vue'
import App from './App'
import NastDate from 'nast-date'

Vue.use(NastDate.vue(), {})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

## Basic usage
```
$app.date.now()
$app.date.format(date)
```