import { makeExecutableSchema } from '@graphql-tools/schema'
import { helloWorld } from './modules/hello-world'
import { alumnos } from './modules/alumnos'
import { profesores } from './modules/profesores'

export const schema = makeExecutableSchema({
  typeDefs: [helloWorld.typeDef, alumnos.typeDef, profesores.typeDef],
  resolvers: [helloWorld.resolver, alumnos.resolver, profesores.resolver]
})
