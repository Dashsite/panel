import Keyv from 'keyv'
import Log from './Logger'

const system = new Keyv(process.env.DATABASE_URL, {
    namespace: 'system',
    table: 'config',
})

const auth = new Keyv(process.env.DATABASE_URL, {
    namespace: 'auth',
    table: 'config',
})

const config = { system, auth }

// apply error handler to all config connections
Object.values(config).forEach(connection => {
    connection.on('error', err => Log.error(`Config connection error: ${err}`))
})

export default config
