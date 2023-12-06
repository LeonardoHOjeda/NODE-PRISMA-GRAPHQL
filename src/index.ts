import './alias'
import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import logger from './helpers/logger'
import routes from './router'
import http from 'http'
import { rateLimiterMiddleware } from './middlewares/rate_limiter'
import { settings } from './config/settings'
import { handleErrorMiddleware } from './middlewares/error_handler'
import { useGraphQL } from './graphql'

class App {
  public app: Express

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(
      morgan('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]')
    )
    this.app.use(cors({ origin: '*' }))
    this.app.use(rateLimiterMiddleware)
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes() {
    this.app.use(routes)
    this.app.use(handleErrorMiddleware)
  }

  async start() {
    const httpServer = http.createServer(this.app)
    await useGraphQL(this.app, httpServer)
    return httpServer.listen(settings.PORT, () => {
      logger.info('🚀 Server listen on port ' + settings.PORT)
    })
  }
}

const app = new App()
export const server = app.start()
