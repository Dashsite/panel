import { SessionProvider } from 'next-auth/react'
import ThemeProvider from 'src/@core/theme/ThemeComponent'
import { CacheProvider } from '@emotion/react'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { Provider as StoreProvider } from 'react-redux'
import store from 'src/redux/store'

const Providers = ({ children, emotionCache, session }) => {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider store={store}>
        <SettingsProvider>
          <SessionProvider session={session}>
            <SettingsConsumer>
              {({ settings }) => {
                return <ThemeProvider settings={settings}>{children}</ThemeProvider>
              }}
            </SettingsConsumer>
          </SessionProvider>
        </SettingsProvider>
      </StoreProvider>
    </CacheProvider>
  )
}

export default Providers
