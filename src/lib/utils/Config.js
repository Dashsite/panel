import Keyv from 'keyv'
import KeyvTiered from '@keyv/tiered'
import Log from './Logger'

export const remoteInstance = namepspace =>
    new Keyv(process.env.DATABASE_URL, {
        namespace: namepspace,
        table: 'config',
    })

const system = () => remoteInstance('system')
const auth = () => remoteInstance('auth')
const pterodactyl = () => remoteInstance('pterodactyl')

// TODO -> make it generic!
const Config = {
    system: new KeyvTiered({
        remote: system(),
        local: new Keyv(),
    }),
    auth: new KeyvTiered({
        remote: auth(),
        local: new Keyv(),
    }),
    pterodactyl: new KeyvTiered({
        remote: pterodactyl(),
        local: new Keyv(),
    }),
}

// apply error handler to all config connections
Object.values(Config).forEach(connection => {
    if (connection instanceof KeyvTiered) {
        connection.on('error', err => Log.error(`Config connection error: ${err}`))
    }
})

export default Config
