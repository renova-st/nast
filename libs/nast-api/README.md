# nast-api

## Installation
```
npm i -S nast-api</code></pre>
```

## Basic usage
```
import Api, { RequestBuilder, } from 'nast-api'

const api = new Api(RequestBuilder, {})

api.get('localhost/api/users').then((request) => {
  //
})
```

## Config
```
const api = new Api(RequestBuilder, {
  servers: {
    default: 'http://127.0.0.1:8000/api/',
  },
  then: (r) => r,
  catch: (r) => {
    throw r
  },
  finally: () => {},
})
```

## Example
```
api.get('users')
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
```