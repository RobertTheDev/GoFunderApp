import 'dotenv/config'
import 'express-async-errors'
import type { RequestHandler } from 'express'
import express from 'express'
import cors from 'cors'
import appRouter from '../../routes/index.js'
import helmet from 'helmet'
import compression from 'compression'
import winstonLogger from '../../utils/winston/winstonLogger.js'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import morganMiddleware from '../../middlewares/morgan/morgan.middleware.js'
import session from 'express-session'
import path from 'path'
import sessionConfig from '../session/sessionOptions.js'
import errorHandler from '../../middlewares/errorHandler/errorHandler.middleware.js'
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
    credentials: true,
  }),
)

const filename = new URL(import.meta.url).pathname
const dirname = path.dirname(filename)

app.use(express.static(path.join(dirname, 'public')))
app.use('/uploads', express.static('uploads'))

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionConfig.cookie.secure = true // serve secure cookies
}

app.use(session(sessionConfig))

app.use(morganMiddleware)

app.get('/api/status', (_req, res) => {
  winstonLogger.info('Checking the API status: Everything is OK')
  res.status(200).send({
    status: 'UP',
    message: 'The API is up and running!',
  })
})

// Sets up rate limiting.
// app.use(rateLimiter)

// Get the server port from dotenv.
const serverPort = process.env.SERVER_PORT

// Sets up the app router.
app.use('/api', appRouter as RequestHandler)

app.use(errorHandler)

// Run the server port.
export default function startServer(): void {
  const server = createServer(app)

  try {
    server.listen(serverPort, () => {
      winstonLogger.info(`App is running on ${serverPort}.`)
    })
  } catch (error) {
    winstonLogger.error(error)
    process.exit(1)
  }
}
