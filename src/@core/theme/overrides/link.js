import NextLink from 'next/link'
import { forwardRef } from 'react'

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />
})

export default {
    MuiLink: {
        styleOverrides: {
            root: {
                textDecoration: 'none',
            },
        },
        defaultProps: {
            component: LinkBehaviour,
        },
    },
}
