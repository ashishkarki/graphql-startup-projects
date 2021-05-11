import express from 'express'
import resolvers from './resolvers'
import schema from './schema'

import { graphqlHTTP } from 'express-graphql'

// environment configuration
require('custom-env').env()

// the app
const app = express()

// listening setup
const PORT = process.env.DEFAULT_PORT || 5000
const NODE_ENV = process.env.NODE_ENV // 'dev'

// paths
app.get('/', (_, res) => {
  res.send('Hello from graphql easy way project!!!')
})

const root = resolvers
// {
//   testValue: () => console.log(`this function just prints ${testValue}`),
// }

app.use(
  `/graphql`,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(PORT, () =>
  console.log(
    `express server running in port: ${PORT} in mode: ${process.env.NODE_ENV}`
  )
)
