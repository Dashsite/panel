import Joi from 'joi'
import { joiPassword } from 'joi-password'

const registerSchema = Joi.object().keys({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required().messages({ 'string.email': 'Email is not valid' }),
  password: joiPassword
    .string()
    .min(8)
    .max(128)
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
      'string.max': 'Password must be at most 128 characters long'
    })
})

export { registerSchema }
