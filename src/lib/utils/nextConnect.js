import nextConnect from 'next-connect'
/**
 * Custimalized nextConnect handler with default options
 * @param {import('next-connect').Options<Req, Res>} options
 * @returns {import('next-connect').NextConnect<Req, Res>}
 */
export default options => {
    let handlerOptions
    options?.onError ??
        (handlerOptions = {
            onError: (err, req, res) => {
                Log.error(err.message, 'Unhandled error in nextConnect handler')
                return res.status(500).json({ error: err.message })
            },
        })
    options?.onNoMatch ??
        (handlerOptions = {
            onNoMatch: (req, res) => {
                Log.error(error.message, 'No matching route in nextConnect handler')
                return res.status(405).end()
            },
        })

    return nextConnect({
        ...handlerOptions,
        ...options,
    })
}
