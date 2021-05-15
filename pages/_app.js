import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider, CSSReset } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { customTheme } from '../custom-theme'
import { Fonts } from '../fonts'
import { store } from '../app/store'
import { pageview, initHorjar } from '../utils/analytics'

import '../styles/globals.css'
import '../builder/web-builder/styles.css'
import '../styles/QuillStyle.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    initHorjar()
  }, [])
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
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
