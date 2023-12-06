import { makeExecutableSchema } from '@graphql-tools/schema';
import { helloWorld } from './modules/hello-world';
import { alumnos } from './modules/alumnos'

export const schema = makeExecutableSchema({
  typeDefs: [helloWorld.typeDef, alumnos.typeDef],
  resolvers: [helloWorld.resolver, alumnos.resolver],
})