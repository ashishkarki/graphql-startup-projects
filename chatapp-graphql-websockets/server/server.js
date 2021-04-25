import { GraphQLServer } from 'graphql-yoga'

const messages = []

const appTypeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }
`

const appResolvers = {
  Query: {
    messages: () => messages,
  },
}

const server = new GraphQLServer({
  typeDefs: appTypeDefs,
  resolvers: appResolvers,
})

server.start(({ port }) => {
  console.log(`GraphQL Server running on http://localhost: ${port}`)
})
