import { type Server, createServer } from 'http'
import winstonLogger from '../winston/winstonLogger'
import app from '../app'
import 'dotenv/config'

// Get the server port from dotenv.
const serverPort: number = Number(process.env.SERVER_PORT)

const server: Server = createServer(app)

// Run the server port.
export default function startServer(): void {
  try {
    server.listen(serverPort, () => {
      winstonLogger.info(`App is running on ${serverPort}.`)
    })
  } catch (error) {
    winstonLogger.error(error)
    process.exit(1)
  }
}
