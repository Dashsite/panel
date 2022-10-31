import Joi from 'Joi'

const alphanumWithSpaces = /^[\w\-\s]+$/

const productSchema = Joi.object().keys({
    name: Joi.string().min(2).max(50).regex(alphanumWithSpaces).required().label('Name'),
    price_per_hour: Joi.number().required().positive().precision(2).label('Price per hour'),
    filter_type: Joi.boolean().required().label('Filter type'),
    product_categories_id: Joi.number().required().label('Category'),
    product_provider_id: Joi.number().required().label('Provider'),
})
const proxmoxProductSchema = productSchema.keys({
    cpu_cores: Joi.number().required().label('CPU cores'),
    memory: Joi.number().required().label('Memory'),
    minimum_memory: Joi.number().required().label('Minimum memory'),
    disk_size: Joi.number().required().label('Disk size'),
    cpu_ballooning: Joi.boolean().required().label('CPU ballooning'),
})
const pterodactylProductSchema = productSchema.keys({
    memory: Joi.number().required().label('Memory'),
    cpu: Joi.number().required().label('CPU'),
    disk_storage: Joi.number().required().label('Disk storage'),
    block_io_weight: Joi.number().required().label('Block IO weight'),
    db_limit: Joi.number().required().label('DB limit'),
    allocation_limit: Joi.number().required().label('Allocation limit'),
    backup_limit: Joi.number().required().label('Backup limit'),
})

const productCategoriesSchema = Joi.object({
    name: Joi.string().min(2).max(50).regex(alphanumWithSpaces).required().label('Name'),
    product_provider_id: Joi.number().required().label('Provider'),
})

export { proxmoxHostSchema, proxmoxProductSchema, pterodactylProductSchema, productCategoriesSchema }
