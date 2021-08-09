
export default [
  { path: '', component: () => import('layouts/main/Index'), children: [
    { path: '', name: 'index', icon: 'genderless', component: () => import('pages/index/Index'), },
  ], },
]
