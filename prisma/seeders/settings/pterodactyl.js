const pterodactyl = [
    {
        key: 'API_URL',
        label: 'Pterodactyl API URL',
        value: '',
        type: 'string',
        description: 'The URL to your pterodactyl panel API',
        validation: 'uri',
    },
    {
        key: 'APP_API_KEY',
        label: 'Pterodactyl application API Key',
        value: null,
        type: 'string',
        description: 'The application API key for your pterodactyl application',
        encrypted: true,
    },
    {
        key: 'ADMIN_API_KEY',
        label: 'Pterodactyl admin API Key',
        value: null,
        type: 'string',
        description:
            'The admin API key for your pterodactyl application - create a user api key with admin permissions',
        encrypted: true,
    },
]

module.exports = pterodactyl
