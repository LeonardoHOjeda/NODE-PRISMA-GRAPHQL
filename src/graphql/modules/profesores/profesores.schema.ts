import gql from 'graphql-tag'

export const typeDef = gql`
  type Query {
    profesores: [Profesor]
    profesor(id: Int!): Profesor
  }

  type Mutation {
    createProfesor(input: CreateProfesorInput): Profesor!
    updateProfesor(id: Int!, input: UpdateProfesorInput): Profesor
    deleteProfesor(id: Int!): Profesor
  }

  type Profesor {
    id: Int!
    name: String!
    lastname: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input CreateProfesorInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }

  input UpdateProfesorInput {
    name: String
    lastname: String
    email: String
    password: String
  }
`
