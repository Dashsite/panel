import Joi from 'Joi'

const alphanumWithSpaces = /^[\w\-\s]+$/

const providerInstancesSchema = Joi.object().keys({
    name: Joi.string().required().regex(alphanumWithSpaces).min(2).max(191).label('Name'),
    filter_type: Joi.boolean().required().label('Filter type'),
    connection_data: Joi.object().required().label('Connection data'),
})

const productProviderSchema = Joi.object().keys({
    name: Joi.string().required().regex(alphanumWithSpaces).min(2).max(191).label('Name'),
})

export { providerInstancesSchema, productProviderSchema }
