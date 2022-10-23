import pino from 'pino'

const Log = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: true,
                    ignore: 'pid,hostname',
                },
            },
            {
                target: 'pino-pretty',
                level: 'error',
                options: {
                    ignore: 'pid,hostname',
                    colorize: false,
                    translateTime: true,
                    destination: './logs/error.log',
                    mkDir: true,
                },
            },
            {
                target: 'pino-pretty',
                options: {
                    ignore: 'pid,hostname',
                    colorize: false,
                    translateTime: true,
                    destination: './logs/info.log',
                    mkDir: true,
                },
            },
        ],
    },
    level: process.env.LOG_LEVEL || 'info',
})

export default Log
