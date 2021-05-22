// import { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { customTheme } from '../custom-theme'
// import { Fonts } from '../fonts'
import { store } from '../app/store'
// import { pageview, initHorjar } from '../src/utils/analytics'

import '../styles/globals.css'
import '../src/builder/web-builder/styles.css'
import '../styles/QuillStyle.css'
import '../styles/tableStyles.css'
import { ThemeProvider } from '@chakra-ui/system'
import CSSReset from '@chakra-ui/css-reset'

function MyApp({ Component, pageProps }) {
  // const router = useRouter()

  // useEffect(() => {
  //   nitHorjar()
  // }, [])
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     pageview(url)
  //   }

  //   router.events.on('routeChangeComplete', handleRouteChange)

  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
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
