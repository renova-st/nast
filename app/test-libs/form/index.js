import NastForm from 'nast-form'
import Vue from 'vue'
import App from './App'

Vue.use(NastForm.vue(), {})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
