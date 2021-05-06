import express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import { DEFAULTS } from './constants.js'

const app = express()

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
  console.log(`GraphQL started at port ${DEFAULTS.PORT}`)
)
