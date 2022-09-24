import Joi from 'Joi'

const alphanumWithSpaces = /^[\w\-\s]+$/

const addressSchema = Joi.object().keys({
    firstname: Joi.string().required().alphanum().min(2).max(40).label('Firstname'),
    lastname: Joi.string().required().alphanum().min(2).max(40).label('Lastname'),
    company_name: Joi.string().alphanum().min(2).max(255).label('Company name'),
    adress_line_1: Joi.string().required().regex(alphanumWithSpaces).min(2).max(255).label('Adress line 1'),
    adress_line_2: Joi.string().regex(alphanumWithSpaces).min(2).max(255).label('Adress line 2'),
    zipcode: Joi.string().required().min(2).max(10).label('Zipcode'),
    country: Joi.string().required().alphanum().min(2).max(40).label('Country'),
    state: Joi.string().regex(alphanumWithSpaces).min(2).max(40).label('State'),
    phone: Joi.string().min(2).max(40).label('Phone'),
    city: Joi.string().required().alphanum().min(2).max(40).label('City'),
    tax_id: Joi.string().min(2).max(100).label('Tax ID'),
    invoice_email: Joi.array()
        .required()
        .min(1)
        .max(5)
        .items(Joi.string().email().messages({ 'string.invoice_email': 'Email is not valid' }))
        .label('invoice_email'),
})

export { addressSchema }
