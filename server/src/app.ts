import { json } from 'express'
import app from './utils/app'
import startServer from './utils/server'
import router from './router'
import corsConfig from './utils/cors/corsConfig'
import errorHandler from './middlewares/errorHandler/errorHandler.middleware'
import sessionConfig from './utils/session/sessionOptions'
import session from 'express-session'
import compression from 'compression'
import helmet from 'helmet'

app.use(json())

app.use(corsConfig)

app.use(compression())

app.use(helmet())

app.use(session(sessionConfig))

app.use('/api', router)

app.use(errorHandler)

// Runs the express server.
startServer()
