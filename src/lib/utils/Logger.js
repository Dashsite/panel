import pino from 'pino'

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: true,
            ignore: 'pid,hostname',
        },
    },
    level: process.env.LOG_LEVEL || 'info',
})

export default logger
