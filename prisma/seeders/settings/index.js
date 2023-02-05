const settings = () => {
    // collect all settings in this directory
    // they are exported as an array of objects
    // except for the index.js file
    const settings = require('require-all')({
        dirname: __dirname,
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/,
        recursive: false,
    })
    delete settings.index

    // convert the settings arrays into an object with the file name as namespace
    // and the array as the value
    const settingsObject = Object.entries(settings).reduce((acc, [namespace, settings]) => {
        acc[namespace] = settings
        return acc
    }, {})

    // convert each array of settings into an prisma config object that looks like this:
    // {
    //    id: `${namespace}:${key}`,
    //    value: {
    //        value: JSON.stringify({
    //            value: value,
    //            type: type,
    //            description: description,
    //            encrypted: encrypted,
    //            label: label,
    //            validation: validation,
    //        }),
    //    expires: null,
    // }
    const prismaConfig = Object.entries(settingsObject).reduce((acc, [namespace, settings]) => {
        acc[namespace] = settings.map(({ key, value, type, description, encrypted, label, validation }) => ({
            id: `${namespace}:${key}`,
            value: JSON.stringify({
                value: {
                    label: label,
                    value: value,
                    type: type,
                    encrypted: encrypted,
                    validation: validation,
                    description: description,
                },
                expires: null,
            }),
        }))
        return acc
    }, {})

    return prismaConfig
}

module.exports = settings
