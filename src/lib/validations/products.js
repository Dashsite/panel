import Joi from 'Joi'

const proxmoxHostSchema = Joi.object({
    name: Joi.string().required(),
    max_cpu: Joi.number().required(),
    max_memory: Joi.number().required(),
    max_disk: Joi.number().required(),
})

const proxmoxProductSchema = Joi.object({
    name: Joi.string().required(),
    price_per_hour: Joi.number().required(),
    cpu_cores: Joi.number().required(),
    memory: Joi.number().required(),
    minimum_memory: Joi.number().required(),
    disk_size: Joi.number().required(),
    cpu_balooning: Joi.boolean().required(),
})

const pterodactylProductSchema = Joi.object({
    name: Joi.string().required(),
    price_per_hour: Joi.number().required(),
    memory: Joi.number().required(),
    cpu: Joi.number().required(),
    disk_storage: Joi.number().required(),
    block_io_weight: Joi.number().required(),
    db_limit: Joi.number().required(),
    allocation_limit: Joi.number().required(),
    backup_limit: Joi.number().required(),
})

export {}
