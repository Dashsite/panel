const system = [
    {
        key: 'EMAIL_SERVER_HOST',
        label: 'SMTP Host Address',
        value: null,
        type: 'string',
        description: 'The host address of your SMTP server',
        encrypted: false,
    },
    {
        key: 'EMAIL_SERVER_PORT',
        label: 'SMTP Port',
        value: null,
        type: 'number',
        description: 'The port of your SMTP server',
        encrypted: false,
    },
    {
        key: 'EMAIL_SERVER_USERNAME',
        label: 'SMTP Username',
        value: null,
        type: 'string',
    },
    {
        key: 'EMAIL_SERVER_PASSWORD',
        label: 'SMTP Password',
        value: null,
        type: 'string',
        encrypted: true,
    },
    {
        key: 'EMAIL_FROM_ADDRESS',
        label: 'Email From Address',
        value: null,
        type: 'string',
        description: 'The email address that emails will be sent from',
        encrypted: false,
    },
]

module.exports = system
