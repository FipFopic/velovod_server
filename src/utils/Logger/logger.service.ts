import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { configService } from 'src/config/config.service'
import { Logger, format, LoggerOptions, transports, createLogger } from 'winston'
import 'winston-daily-rotate-file'

const {
  combine,
  timestamp,
  printf,
  prettyPrint,
  colorize,
  json,
  errors
} = format

const logDirectory = 'logs'
const filename = join(logDirectory, 'app-%DATE%.log')
const level = configService.server.isProduction() ? 'error' : 'debug'

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory)
}

/**
 * Console log output format setting
 */
const consoleOutputFormat = combine(
  colorize(),
  prettyPrint(),
  json(),
  printf((info: any) => {
    return `${info.timestamp} ${info.level}: ${info.message}`
  })
)

/**
 * Setting the file log output format
 */
const fileOutputFormat = combine(
  printf((info: any) => {
    if (info.stack) {
      return `${info.timestamp} ${info.level} ${info.message} : ${info.stack}`
    }

    return `${info.timestamp} ${info.level} : ${info.message}`
  })
)

const options: LoggerOptions = {
  level,
  exitOnError: false,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true })
  ),
  transports: [
    // Console log output
    new transports.Console({
      handleExceptions: true,
      format: consoleOutputFormat
    }),
    // File log output
    new transports.DailyRotateFile({
      handleExceptions: true,
      format: fileOutputFormat,
      filename
    })
  ]
}

const logger: Logger = createLogger(options)

const stream = {
  write: (message: string) => {
    logger.info(message)
  }
}

export { logger, stream }
