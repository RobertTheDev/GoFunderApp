import 'dotenv/config'
import 'express-async-errors'
import express, { type Express, type RequestHandler } from 'express'
import cors from 'cors'
import router from '../router/index.js'
import helmet from 'helmet'
import compression from 'compression'
import winstonLogger from '../utils/winston/winstonLogger.js'
import cookieParser from 'cookie-parser'
import { type Server, createServer } from 'http'
import morganMiddleware from '../middlewares/morgan/morgan.middleware.js'
import session from 'express-session'
import path from 'path'
import sessionConfig from '../utils/session/sessionOptions.js'
import errorHandler from '../middlewares/errorHandler/errorHandler.middleware.js'

// import rateLimiter from '../../utils/limiter/rateLimiter.js'

// This handler runs the express server when called.

// Set up express.
const app: Express = express()
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

const filename: string = new URL(import.meta.url).pathname
const dirname: string = path.dirname(filename)

app.use(express.static(path.join(dirname, 'public')))
app.use('/uploads', express.static('uploads'))

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  if (sessionConfig.cookie !== undefined) {
    sessionConfig.cookie.secure = true // serve secure cookies
  }
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
const serverPort: number = Number(process.env.SERVER_PORT)

// Sets up the app router.
app.use('/api', router as RequestHandler)

app.use(errorHandler)

// Run the server port.
export default function startServer(): void {
  const server: Server = createServer(app)

  try {
    server.listen(serverPort, () => {
      winstonLogger.info(`App is running on ${serverPort}.`)
    })
  } catch (error) {
    winstonLogger.error(error)
    process.exit(1)
  }
}
