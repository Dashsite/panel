const legal = [
    {
        key: 'ENABLE_TOS',
        value: false,
        type: 'boolean',
        label: 'Enable Terms of Service',
    },
    {
        key: 'TOS_CONTENT',
        value: [
            {
                id: 'sheNwCUP5A',
                type: 'header',
                data: {
                    text: 'Editor.js',
                    level: 2,
                },
            },
        ],
        type: 'text',
        isHtml: true,
        label: 'Terms of Service Content',
    },
    {
        key: 'ENABLE_PRIVACY_POLICY',
        value: false,
        type: 'boolean',
        label: 'Enable Privacy Policy',
    },
    {
        key: 'PRIVACY_POLICY_CONTENT',
        value: [
            {
                id: 'sheNwCUP5A',
                type: 'header',
                data: {
                    text: 'Editor.js',
                    level: 2,
                },
            },
        ],
        type: 'text',
        isHtml: true,
        label: 'Privacy Policy Content',
    },
]

module.exports = legal
