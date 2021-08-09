import NastCore from 'nast'
import env from './../../../.env'

const settings = {
  routes: [
    { path: '', component: () => import('./App'), children: [
      { path: '/', name: 'index', component: () => import('./HelloWorld'), title: 'Главная', },
      { path: '/about', name: 'about', component: () => import('./About'), parent: 'index', title: 'О странице', },
    ], },
  ],
  stores: {
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
  },
  env,
}

NastCore.createApp(settings, {})
