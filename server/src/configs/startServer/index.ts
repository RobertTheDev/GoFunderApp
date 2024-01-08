import 'dotenv/config'
import express from 'express'
import type { RequestHandler } from 'express'
import cors from 'cors'
import appRouter from '../../routes/index.js'
import helmet from 'helmet'
import compression from 'compression'

// This handler runs the express server when called.

export default function startServer(): void {
  // Set up express.
  const app = express()
  app.use(express.json())

  // Set up helmet.
  app.use(helmet())

  // Set up compression.
  app.use(compression())

  // Set up cors.
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'DELETE', 'POST', 'PUT'],
    }),
  )

  // Get the server port from dotenv.
  const serverPort = process.env.SERVER_PORT

  // Sets up the app router.
  app.use('/api', appRouter as RequestHandler)

  // Run the server port.
  app.listen(serverPort, () => {
    console.log(`App is running on ${serverPort}.`)
  })
}
