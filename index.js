const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const { graphql, buildSchema } = require("graphql");
const crypto = require('crypto')


const db = {
    users: [
        { id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://gravatar.com/...'},
        { id: '2', email: 'alex@gmail.com', name: 'Max', avatarUrl: 'https://gravatar.com/...'}, 
    ],
    messages: [
      { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
      { id: '2', userId: '2', body: 'Hel', createdAt: Date.now() },
      { id: '3', userId: '3', body: 'He', createdAt: Date.now() },
    ]
}

//! inside the bracket makes it cannot be null 
// ! outside of bracket cannot be a null
const schema = buildSchema(`
  type Query  {
    users: [User!]!
    user(id:ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
      id: ID!
      email: String!
      name: String
      avatarUrl: String
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`)

//Resolver
const rootValue = {
  users: () => db.users,
  user: args => db.users.find(user => user.id === args.id),
  messages: () =>  db.messages,

  addUser: ({ email, name}) => {
    const user = {
      id: crypto.randomBytes(10).toString('hex'),
      email,
      name
    }

    db.users.push(user)

    return user
  }
};



app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(3000, () => console.log('Listing on 3000'))