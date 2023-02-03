import Keyv from 'keyv'
import KeyvTiered from '@keyv/tiered'
import Log from './Logger'
import { validateWithJoi } from '../validations/settings'

export const remoteInstance = namepspace =>
    new Keyv(process.env.DATABASE_URL, {
        namespace: namepspace,
        table: 'config',
    })

const namespaceList = ['system', 'auth', 'pterodactyl']

// Create a new config connection for each namespace
// Use a tiered connection to allow for local caching
/**
 * @type {Record<string, KeyvTiered & { validate: (key: string, newValue: any) => Promise<null | object> }>}
 */
const Config = namespaceList.reduce((acc, namespace) => {
    acc[namespace] = new KeyvTiered({
        local: new Keyv(),
        remote: remoteInstance(namespace),
    })
    return acc
}, {})

Object.values(Config).forEach(connection => {
    if (connection instanceof KeyvTiered) {
        /**
         * @description Validate a new value for a key using the validation rules
         * @param {string} key
         * @param {any} newValue
         * @returns {null | object}
         * @example
         * Error object:
         * {
         *  "email": "Email address is already in use."
         *  "username": "Username is already in use."
         *  "password": "Password must be at least 6 characters long."
         * }
         *
         */
        connection.validate = async (key, newValue) => {
            const valueObject = await connection.get(key)
            const { type, description, encrypted, validation, ...rest } = valueObject

            // validate using joi
            return validateWithJoi(newValue, type, validation)
        }

        // create a new setValue method that sets the value in the tiered provider
        // a value is an object with a value, type, description, encrypted flag and validation rule
        // only update the value in this object if the value is valid
        /**
         * @description Set the value for a key, encrypting the value if the encrypted flag is set
         * @param {string} key
         * @param {any} newValue
         * @returns {Promise<any>}
         */
        connection.setValue = async (key, newValue) => {
            const valueObject = await connection.get(key)
            const { type, description, encrypted, ...rest } = valueObject

            const error = connection.validate(key, newValue)

            if (Object.keys(error).length > 0) return error

            if (encrypted) {
                // encrypt the value
            }

            const res = await connection.set(key, { ...valueObject, value: newValue })

            return res
        }

        /**
         * @description Get the value for a key, decrypting the value if the encrypted flag is set
         * @param {string} key
         * @returns {Promise<any>}
         */
        connection.getValue = async key => {
            const valueObject = await connection.get(key)
            const { value, encrypted, ...rest } = valueObject

            if (encrypted) {
                // decrypt the value
            }

            return value
        }

        /**
         * @description Get the option object for a key, decrypting the value if the encrypted flag is set
         * @param {string} key
         * @returns {Promise<{value: any, type: string, description: string, encrypted: boolean, validation: string}>}
         */
        connection.getOptionObject = async key => {
            const valueObject = await connection.get(key)
            const { value, ...rest } = valueObject

            if (encrypted) {
                // decrypt the value
            }

            return rest
        }

        // apply error handler to all config connections
        connection.on('error', err => Log.error(`Config connection error: ${err}`))
    }
})

export default Config
