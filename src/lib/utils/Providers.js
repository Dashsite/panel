import PropTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'
import ThemeProvider from 'src/@core/theme/ThemeComponent'
import { CacheProvider } from '@emotion/react'
import { Provider as StoreProvider } from 'react-redux'
import store from 'src/redux/store'

/**
 * Component that provides the store, session and emotion cache to all components underneath it.
 */
const Providers = ({ children, emotionCache, session }) => {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </StoreProvider>
    </CacheProvider>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  emotionCache: PropTypes.object.isRequired,
  session: PropTypes.any
}

export default Providers
