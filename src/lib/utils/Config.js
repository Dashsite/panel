import Keyv from 'keyv'
import KeyvTiered from '@keyv/tiered'
import Log from './Logger'

export const remoteInstance = namepspace =>
    new Keyv(process.env.DATABASE_URL, {
        namespace: namepspace,
        table: 'config',
    })

const namespaceList = ['system', 'auth', 'pterodactyl']

// Create a new config connection for each namespace
// Use a tiered connection to allow for local caching
const Config = namespaceList.reduce((acc, namespace) => {
    acc[namespace] = new KeyvTiered({
        local: new Keyv(),
        remote: remoteInstance(namespace),
    })
    return acc
}, {})

// apply error handler to all config connections
Object.values(Config).forEach(connection => {
    if (connection instanceof KeyvTiered) {
        connection.on('error', err => Log.error(`Config connection error: ${err}`))
    }
})

export default Config
