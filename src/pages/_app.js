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

  return (
    <Providers emotionCache={emotionCache} session={session}>
      {getLayout(
        <Component {...pageProps}>
          <Head>
            <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
            <meta
              name='description'
              content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
            />
            <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>
        </Component>
      )}
    </Providers>
  )
}

export default App
