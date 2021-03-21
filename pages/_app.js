import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ThemeProvider, CSSReset } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { customTheme } from '../custom-theme'
import { Fonts } from '../fonts'
import { store } from '../app/store'
import { InitializeAnalytics } from '../utils/analytics'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      InitializeAnalytics()
    } catch (err) {
      console.error(err)
    }
  }, [])
  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <UserProvider>
          <CSSReset />
          <Fonts />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </Provider>
  )
}
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default MyApp
