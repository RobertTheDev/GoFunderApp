import { createLogger, transports, format, addColors } from 'winston'

const { combine, timestamp, printf, colorize, errors } = format

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const { NODE_ENV } = process.env

function logLevel(): string {
  const env = NODE_ENV !== undefined ? String(NODE_ENV) : 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
addColors(colors)

// Chose the aspect of your log customizing the log format.
const logFormat = combine(
  // Tell Winston that the logs must be colored
  colorize({ all: true }),
  errors({ stack: true }),
  // Add the message timestamp with the preferred format
  timestamp({
    format: 'DD-MM-YYYY hh:mm:ss.SSS A',
  }),
  // Define the format of the message showing the timestamp, the level and the message
  printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
)

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const logTransports = [
  // Allow the use the console to print the messages
  new transports.Console({ level: 'http' }),
  // Allow to print all the error level messages inside the error.log file
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new transports.File({ filename: 'logs/all.log' }),
]

// Create the logger instance that has to be exported
// and used to log messages.
const winstonLogger = createLogger({
  exitOnError: false,
  levels: logLevels,
  level: logLevel(),
  format: logFormat,
  transports: logTransports,
})

export default winstonLogger
