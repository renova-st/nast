import NastCore from 'nast'
import NastForm from 'nast-form'
import NastAuth from 'nast-auth'
import NastApi, { RequestBuilder, } from 'nast-api'
import settings from './_config'
import Vue from 'vue'
import components from 'components'

Vue.mixin({
  components,
})

NastCore.createApp(settings, {
  form: { NastForm, },
  api: { NastApi, RequestBuilder, },
  auth: { NastAuth, },
})

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
//
// Vue.config.productionTip = false
//
// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app')
