import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Express } from 'express'
import http from 'http'
import logger from '@/helpers/logger'
import { helloWorld } from './modules/hello-world';
import { alumnos } from './modules/alumnos'

export const schema = makeExecutableSchema({
  typeDefs: [helloWorld.typeDef, alumnos.typeDef],
  resolvers: [helloWorld.resolver, alumnos.resolver],
})

export const useGraphQL = async (app: Express, httpServer: http.Server) => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer ({ httpServer }), ApolloServerPluginLandingPageDisabled()],
  })

  await server.start()
  logger.info('🚀 GraphQL server started')

  app.use('/graphql', expressMiddleware(server, {
    context: async ({req}) => ({
      token: req.headers.token
    })
  }));
}