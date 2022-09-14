import Head from 'next/head'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import Providers from 'src/lib/utils/Providers'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }) => {
    const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

    if (Component.blank === true) {
        return getLayout(<Component {...pageProps} />)
    }

    return (
        <Providers emotionCache={emotionCache} session={session}>
            {getLayout(
                <Component {...pageProps}>
                    <Head>
                        <title>{`${themeConfig.templateName}`}</title>
                        <meta
                            name='description'
                            content={`${themeConfig.templateName} – The most intuitive application to manage servers.`}
                        />
                        <meta name='keywords' content='Pterodactyl, ProxMox, Server, proxmox, Virtualization, host' />
                        <meta name='viewport' content='initial-scale=1, width=device-width' />
                    </Head>
                </Component>
            )}
        </Providers>
    )
}

export default App
