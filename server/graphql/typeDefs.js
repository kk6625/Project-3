const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getTests: [Test]
  }

  type Mutation {
    createTest(title: String!, questions: [ID!]!): Test
  }

  type Test {
    id: ID!
    title: String!
    createdBy: User
    questions: [Question]
  }

  type Question {
    id: ID!
    text: String!
    options: [String!]
    correctOption: Int!
  }

  type User {
    id: ID!
    username: String!
  }
`;

module.exports = typeDefs;