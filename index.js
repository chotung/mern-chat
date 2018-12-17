const { graphql, buildSchema } = require("graphql");

const db = {
    users: [
        { id: '1', email: 'alex@gmail.com', name: 'Alex' },
        { id: '1', email: 'alex@gmail.com', name: 'Max' }, 
    ]
}


const schema = buildSchema(`
  type Query  {
    users: User
  }

  type User {
      id: ID!
      email: String!
      name: String
      avatarUrl: String
  }
`)

//Resolver
const rootValue = {
  message: () => "GraphQL works"
};

// graphql(
//     schema,
//     query,
//     rootValue
// )

graphql(
  schema,
  `
    {
      message
    }
  `,
  rootValue
)
  .then(console.log)
  .catch(console.error);
