const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello: String
    }
    input UserInfo {
        username: String!
        password: String!
        age: Int
    }
    type Mutation {
        register(userInfo: UserInfo): RegisterResponse!
        login(userInfo: UserInfo): Boolean!
    }
    type Error {
        field: String!
        message: String!
    }
    type User {
        id: ID!
        username: String!
    }
    type RegisterResponse {
        user: User!
        errors: [Error!]
    }
`;

const resolvers = {
    Query: {
        hello: () => null
    },
    Mutation: {
        register: () => ({
            user: {
                id: 1,
                username: "bob"
            },
            errors: [{
                field: 'username',
                message: 'bad'
            }, {
                field: 'username2',
                message: 'bad2'
            }]
        })
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => console.log(`server started at ${url}`))