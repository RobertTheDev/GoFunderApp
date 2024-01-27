import { type Server, createServer } from 'http'
import logger from '../logger'
import app from '../app'
import 'dotenv/config'

// Get the server port from dotenv.
const serverPort: number = Number(process.env.SERVER_PORT)

const server: Server = createServer(app)

// Run the server port.
export default function startServer(): void {
  try {
    server.listen(serverPort, () => {
      logger.info(`App is running on ${serverPort}.`)
    })
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}
