/**
 * Joi error message formatter as Joi.ValidationError
 * @description Each validaiton error has a message property that contains a string with the error message.
 * @param {import('Joi').ValidationError} error
 *
 * @example
 * {
 *  "email": "Email address is already in use."
 *  "username": "Username is already in use."
 *  "password": "Password must be at least 6 characters long."
 * }
 */
export default error => error.details.map(e => ({ [e.context?.key]: e.message }))
