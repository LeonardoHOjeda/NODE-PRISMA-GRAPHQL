
import './alias'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { handleErrorMiddleware } from './middlewares/error_handler'
import { rateLimiterMiddleware } from './middlewares/rate_limiter'
import { schema } from './graphql'
import { settings } from './config/settings'
import logger from './helpers/logger'
import routes from './router'

class App {
  public app: Express

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(
      morgan('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]')
    )
    this.app.use(cors({ origin: '*' }))
    this.app.use(rateLimiterMiddleware)
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes () {
    this.app.use(routes)
    this.app.use(handleErrorMiddleware)
  }

  async start () {
    const httpServer = http.createServer(this.app)
    const server = new ApolloServer({
      schema,
      introspection: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageDisabled()]
    })

    await server.start()
    logger.info('🚀 GraphQL server started')

    this.app.use('/graphql', expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token
      })
    }))
    return httpServer.listen(settings.PORT, () => {
      logger.info(`🚀 Server listen on port ${settings.PORT}`)
    })
  }
}

const app = new App()
export const server = app.start()
