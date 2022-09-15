import nextConnect from 'next-connect'
/**
 * Custimalized nextConnect handler with default options
 * @param {import('next-connect').Options<Req, Res>} options
 * @returns {import('next-connect').NextConnect<Req, Res>}
 */
export default options => {
    let handlerOptions
    options?.onError ?? (handlerOptions = { onError: (err, req, res) => res.status(500).json({ error: err.message }) })
    options?.onNoMatch ?? (handlerOptions = { onNoMatch: (req, res) => res.status(405).end() })

    return nextConnect({
        ...handlerOptions,
        ...options,
    })
}
