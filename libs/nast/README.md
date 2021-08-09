# nast

## Installation
```
npm i -S nast
```

## Basic usage
```
import NastCore from 'nast'

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
}

NastCore.createApp(settings)
```