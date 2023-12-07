import gql from 'graphql-tag';

export const typeDef = gql`
  type Query {
    alumnos: [Alumno]
    alumno(id: Int!): Alumno
  }

  type Mutation {
    createAlumno(input: CreateAlumnoInput): Alumno
  }

  type Alumno {
    id: Int!
    name: String!
    lastname: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  input CreateAlumnoInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }
`
