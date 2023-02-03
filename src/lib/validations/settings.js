import Joi from 'Joi'
import { validationFormatter, validationOptions } from 'src/lib/validations'

// create a function that validates a value using a comma separated list of validation rules
// like 'required,max:255,min:3,number'
const validateWithJoi = (value, validationRules) => {
    if (!validationRules) return null

    const joiRules = validationRules.split(',').reduce((acc, rule) => {
        const [name, ...args] = rule.split(':')
        const joiRule = Joi[name](...args)
        acc[name] = joiRule
        return acc
    }, {})

    const { error } = Joi.object({ value: Joi.object(joiRules) }).validate({ value }, validationOptions)

    if (error) {
        return validationFormatter(error)
    }

    return null
}

export { validateWithJoi }
