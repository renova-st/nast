import NastRouter from './router'
import NastApi, { RequestBuilder, } from './api'
import NastStore from './store'
import NastAuth from './auth'
import NastDate from './date'
import NastForm from './form'
import NastSecure from './secure'
import NastHelpers from './helpers'
import NastUi from './ui'

export default {
  router: { NastRouter, },
  api: { NastApi, RequestBuilder, },
  store: { NastStore, },
  auth: { NastAuth, },
  date: { NastDate, },
  form: { NastForm, },
  secure: { NastSecure, },
  helpers: { NastHelpers, },
  ui: { NastUi, },
}
