import Api, { RequestBuilder, } from 'nast-api'

const index = new Api(RequestBuilder, {
  servers: {
    default: 'http://127.0.0.1:8000/api/',
  },
})

index.get([ 'users*', 1, ]).then((response) => {

})

// OR

index.get('users')
  .page(2)
  .size(20)
  .v(2)
  .sort('id,desc')
  .filter({ authorId: 1, })
  .with('posts', (q) => q
    .sort('id,desc')
    .filter({ authorId: 1, })
    .with('comments', (q) => q
      .sort('id,desc')
      .filter({ authorId: 1, })))
  .then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(e)
  })

// get.params({
//   sort: [
//     'id,desc',
//     'title,asc',
//   ],
//   search: 'lorem OR ipsum',
//   filter: {
//     id: 'between:null,10',
//   },
//   with: {
//     users: {
//       filter: { id: 'in:1,2,3', },
//       with: {
//         posts: {
//           sort: [ 'id,desc', ],
//         },
//       },
//     },
//   },
//   query: {
//     other: 'value',
//   },
// })

// get.with(false)
// get.with('author').with('posts').with('posts.comments')
// get.with('posts', { filter: { createdAt: 'between:10.10.2020', }, })

// get.then((response) => {
//   console.log('then', response)
// }).catch((e) => {
//   console.log('catch', e.response)
// })
