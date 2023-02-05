const auth = [
    {
        key: 'GOOGLE_CLIENT_ID',
        label: 'Google Client ID',
        value: null,
        type: 'string',
        description: 'Your google oauth client id - https://google.com/',
        encrypted: true,
    },
    {
        key: 'GOOGLE_CLIENT_SECRET',
        label: 'Google Client Secret',
        value: null,
        type: 'string',
        description: 'Your google oauth client secret - https://google.com/',
        encrypted: true,
    },
    {
        key: 'GITHUB_CLIENT_ID',
        label: 'Github Client ID',
        value: null,
        type: 'string',
        description: 'Your github oauth client id - https://github.com/',
        encrypted: true,
    },
    {
        key: 'GITHUB_CLIENT_SECRET',
        label: 'Github Client Secret',
        value: null,
        type: 'string',
        description: 'Your github oauth client secret - https://github.com/',
        encrypted: true,
    },
]

module.exports = auth
