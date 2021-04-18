import { useEffect } from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { customTheme } from '../custom-theme'
import { Fonts } from '../fonts'
import { store } from '../app/store'
import { InitializeAnalytics } from '../utils/analytics'

import '../styles/globals.css'
import '../builder/web-builder/styles.css'
import '../styles/QuillStyle.css'

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
        <CSSReset />
        <Fonts />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default MyApp
