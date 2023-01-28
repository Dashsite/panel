import Keyv from 'keyv'
import KeyvTiered from '@keyv/tiered'
import Log from './Logger'

const system = () =>
    new Keyv(process.env.DATABASE_URL, {
        namespace: 'system',
        table: 'config',
    })

const auth = () =>
    new Keyv(process.env.DATABASE_URL, {
        namespace: 'auth',
        table: 'config',
    })

const Config = {
    system: new KeyvTiered({
        remote: system(),
        local: new Keyv(),
    }),
    auth: new KeyvTiered({
        remote: auth(),
        local: new Keyv(),
    }),
}

// apply error handler to all config connections
Object.values(Config).forEach(connection => {
    connection.on('error', err => Log.error(`Config connection error: ${err}`))
})

export default Config
