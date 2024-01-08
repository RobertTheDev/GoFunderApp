import { createLogger, transports, format } from 'winston'

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
}

const winstonLogger = createLogger({
  levels: logLevels,
  level: 'info',
  format: format.cli(),
  transports: [new transports.Console()],
})

export default winstonLogger
