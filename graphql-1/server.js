import express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import axios from 'axios'

import { DEFAULTS } from './constants.js'

const app = express()

// graphql schema
const schema = buildSchema(`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type User {
    name: String
    age: Int
    college: String
  }

  type Query {
    hello: String
    helloWithoutNullReturn: String!
    welcome(name: String, dayOfWeek: String!): String
    getUser: User
    getUsers: [User]
    getPostsFromTypiCodeApi: [Post]
  }
`)

const root = {
  hello: () => {
    // return 'Hello World'
    return null
  },
  helloWithoutNullReturn: () => {
    // return null
    return 'Hello that cannot return null'
  },
  welcome: args => {
    // console.log(args)
    return `Hey person named: ${ args.name }. Today is ${ args.dayOfWeek }`
  },
  getUser: () => {
    const user = {
      name: 'Ashish Karki',
      age: 35,
      college: 'UNLV'
    }

    return user
  },
  getUsers: () => {
    const users = [
      {
        name: 'Ashish Karki',
        age: 35,
        college: 'UNLV'
      },
      {
        name: 'Tavish Karki',
        age: 1,
        college: 'Golu tuition'
      }
    ]

    console.log(`getUsers returns: ${ JSON.stringify(users) }`)
    return users
  },
  getPostsFromTypiCodeApi: async () => {
    const result = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
    return result.data
  }
}

// setup routes
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
)

// setup listening
app.listen(DEFAULTS.PORT, () =>
  console.log(`GraphQL started at port ${ DEFAULTS.PORT }`)
)
