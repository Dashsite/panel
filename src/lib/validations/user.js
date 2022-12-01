import Joi from 'Joi'
import { joiPasswordExtendCore } from 'joi-password'

const JoiPassword = Joi.extend(joiPasswordExtendCore)

const email = Joi.string().email().messages({ 'string.email': 'Email is not valid' }).label('Email')

const username = Joi.string().min(3).max(30).alphanum().label('Username')

const userDataSchema = Joi.object({
    username: username.required(),
    email: email.required(),
})

const userDataUpdateSchema = Joi.object({
    username: username,
    email: email,
    disabled: Joi.boolean().label('Disabled'),
})

const passwordValidation = JoiPassword.string()
    .min(8)
    .max(70)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .label('Password')
    .messages({
        'password.minOfUppercase': 'Password must contain at least one uppercase letter',
        'password.minOfLowercase': 'Password must contain at least one lowercase letter',
        'password.minOfNumeric': 'Password must contain at least one number',
        'password.noWhiteSpaces': 'Password must not contain any white spaces',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 70 characters long',
    })

const registerSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    role: Joi.string().valid('user', 'admin').label('Role'),
    password: passwordValidation,
})

const resetSchema = Joi.object({
    password: passwordValidation,
})

export { registerSchema, resetSchema, email, username, userDataSchema, userDataUpdateSchema }
