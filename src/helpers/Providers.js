import { SessionProvider } from 'next-auth/react'
import ThemeProvider from 'src/@core/theme/ThemeComponent'
import { CacheProvider } from '@emotion/react'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

const Providers = ({ children, emotionCache, session }) => {
  return (
    <CacheProvider value={emotionCache}>
      <SettingsProvider>
        <SessionProvider session={session}>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeProvider settings={settings}>{children}</ThemeProvider>
            }}
          </SettingsConsumer>
        </SessionProvider>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default Providers
