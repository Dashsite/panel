import { SessionProvider } from 'next-auth/react'
import ThemeProvider from 'src/@core/theme/ThemeComponent'
import { CacheProvider } from '@emotion/react'
import { Provider as StoreProvider } from 'react-redux'
import store from 'src/redux/store'

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

export default Providers
