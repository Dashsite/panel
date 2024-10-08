import Joi from 'Joi'
import { validationOptions } from 'src/lib/validations'

// create a function that validates a value using a comma separated list of validation rules
// like 'required,max:255,min:3'
const validateWithJoi = (newValue, valueObject, key) => {
    const { type, label, validation } = valueObject

    if (!validation) return null

    // create a schema to validate the value
    const schema = Joi.object({
        [key]: createValidationRule(validation, type).label(label),
    })

    // validate the value
    const { error } = schema.validate({ [key]: newValue }, validationOptions)

    return error
}

const createValidationRule = (rules, type) => {
    let settingValidation = Joi[type]()

    // split the validation rules into an array
    const rulesArray = rules.split(',')

    // loop through the rules and add them to the validation schema
    rulesArray.forEach(rule => {
        const [ruleName, ruleValue] = rule.split(':')

        // if the rule has no parameter, just add the rule
        if (!ruleValue) {
            settingValidation = settingValidation[ruleName]()
            return
        }

        // parse rule parameter to int if its a number, to boolean if its true or false, to regex if its a regex
        let parsedRuleValue = ruleValue
        if (ruleValue === 'true') parsedRuleValue = true
        if (ruleValue === 'false') parsedRuleValue = false
        if (!isNaN(ruleValue)) parsedRuleValue = parseInt(ruleValue)
        if (ruleValue.match(/^\/.*\/$/)) parsedRuleValue = new RegExp(ruleValue.replace(/^\/|\/$/g, ''))

        settingValidation = settingValidation[ruleName](parsedRuleValue)
    })

    return settingValidation
}

export { validateWithJoi }
