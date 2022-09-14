import Joi from 'Joi'
import { joiPasswordExtendCore } from 'joi-password'

const JoiPassword = Joi.extend(joiPasswordExtendCore)

const email = Joi.string().email().required().messages({ 'string.email': 'Email is not valid' })

const passwordValidation = JoiPassword.string()
    .min(8)
    .max(70)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
        'password.minOfUppercase': 'Password must contain at least one uppercase letter',
        'password.minOfLowercase': 'Password must contain at least one lowercase letter',
        'password.minOfNumeric': 'Password must contain at least one number',
        'password.noWhiteSpaces': 'Password must not contain any white spaces',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 70 characters long',
    })

const registerSchema = Joi.object().keys({
    username: Joi.string().required().min(3).max(30),
    email: email,
    password: passwordValidation,
})

const resetSchema = Joi.object().keys({
    password: passwordValidation,
})

export { registerSchema, resetSchema, email }
