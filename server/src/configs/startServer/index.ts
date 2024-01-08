import 'dotenv/config'
import express from 'express'
import type { RequestHandler } from 'express'
import cors from 'cors'
import appRouter from '../../routes/index.js'
import helmet from 'helmet'
import compression from 'compression'
import winstonLogger from 'src/utils/winston/winstonLogger.js'
import cookieParser from 'cookie-parser'
// import rateLimiter from 'src/utils/limiter/rateLimiter.js'

// This handler runs the express server when called.

// Set up express.
const app = express()
app.use(express.json())

// Set up helmet.
app.use(helmet())

// Set up compression.
app.use(compression())

// Set up cookie parser.
app.use(cookieParser())

// Set up cors.
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'DELETE', 'POST', 'PUT'],
  }),
)

// Sets up rate limiting.
// app.use(rateLimiter)

// Get the server port from dotenv.
const serverPort = process.env.SERVER_PORT

// Sets up the app router.
app.use('/api', appRouter as RequestHandler)

// Run the server port.
export default function startServer(): void {
  try {
    app.listen(serverPort, () => {
      winstonLogger.info(`App is running on ${serverPort}.`)
    })
  } catch (error) {
    winstonLogger.error(error)
    process.exit(1)
  }
}
