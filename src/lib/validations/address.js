import Joi from 'Joi'

const addressSchema = Joi.object().keys({
    firstname: Joi.string().required().alphanum().min(2).max(40).label('Firstname'),
    lastname: Joi.string().required().alphanum().min(2).max(40).label('Lastname'),
    company_name: Joi.string().alphanum().min(2).max(255).label('Company name'),
    adress_line_1: Joi.string()
        .required()
        .regex(/^[\w\-\s]+$/)
        .min(2)
        .max(255)
        .label('Adress line 1'),
    adress_line_2: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(2)
        .max(255)
        .label('Adress line 2'),
    zipcode: Joi.string().required().min(2).max(10).label('Zipcode'),
    country: Joi.string().required().alphanum().min(2).max(40).label('Country'),
    state: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(2)
        .max(40)
        .label('State'),
    phone: Joi.string().min(2).max(40).label('Phone'),
    city: Joi.string().required().alphanum().min(2).max(40).label('City'),
    tax_id: Joi.string().min(2).max(100).label('Tax ID'),
    invoice_email: Joi.string().email().label('Email').messages({ 'string.email': 'Email is not valid' }),
})

export { addressSchema }
