/**
 * Joi error message formatter as Joi.ValidationError
 * @param {import('Joi').ValidationError} error
 */
export default error => error.details.map(e => ({ [e.context.label]: e.message }))
