import { json, static as staticFolder } from 'express'
import app from './utils/app/index.js'
import startServer from './utils/server/index.js'
import router from './router/index.js'
import corsConfig from './utils/cors/corsConfig.js'
import errorHandler from './middlewares/errorHandler/errorHandler.middleware.js'
import sessionConfig from './utils/session/sessionOptions.js'
import session from 'express-session'
import compression from 'compression'
import helmet from 'helmet'

// Set up JSON with express.
app.use(json())

// Reduce server fingerprinting
app.disable('x-powered-by')

// Sets up cors.
app.use(corsConfig)

// Sets up compression.
app.use(compression())

// Sets up helmet.
app.use(helmet())

// Sets up session handling.
app.use(session(sessionConfig))

// Sets up public folder.
app.use(staticFolder('public'))

// Sets up the API routes.
app.use('/api', router)

// Set up error handling middleware.
app.use(errorHandler)

// Runs the express server.
startServer()
