import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'
import Config from 'src/lib/utils/Config'
import { validationFormatter } from 'src/lib/validations'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
        // get all settings
        let config = {}
        try {
            // get all configs from Config -> iterator over all namespaces
            for await (const provider of Object.keys(Config)) {
                config[provider] = {}
                // get all configs from the namepsace -> iterator over all entries
                for await (const [key, value] of Config[provider].iterator()) {
                    // decrypt the option value if it is encrypted
                    if (value.encrypted) value.value = await Config[provider].getValue(key)
                    config[provider][key] = value
                }
            }

            // sort the providers alphabetically
            config = Object.fromEntries(Object.entries(config).sort(([a], [b]) => a.localeCompare(b)))

            return res.status(200).json(config)
        } catch (error) {
            Log.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
)

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
        const { provider, ...options } = req.body
        if (!provider || !options) return res.status(400).json({ message: 'Missing provider or options' })

        // validate the options
        let validationErrors = {}
        for (const [key, value] of Object.entries(options)) {
            const error = await Config[provider].validate(key, value)
            if (!error) continue

            // if there are multiple errors, add them to the validationErrors object
            validationErrors.details ? validationErrors.details.push(...error.details) : (validationErrors = error)
        }
        // return 400 if there are validation errors
        if (Object.keys(validationErrors).length > 0)
            return res.status(400).json({ error: validationFormatter(validationErrors) })

        // set the config
        try {
            for (const [key, value] of Object.entries(options)) {
                await Config[provider].setValue(key, value)
            }

            return res.status(200).json({ message: 'Config updated' })
        } catch (error) {
            Log.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
)

export default handler
