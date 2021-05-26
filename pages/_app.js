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
import '../styles/tableStyles.css'
import { NextSeo } from 'next-seo'

const currentURL = 'https://www.antfolio.app'
const previewImage = 'https://www.antfolio.app/social-image.png'
const siteName = 'Antfolio'
const pageTitle = 'Build Beautiful Websites Faster than ever!'
const description =
  'Antfolio is the fastest and easiest way to build beautiful websites with no-code. Have your blazing fast website live in minutes.'

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
    <>
      <NextSeo
        title={pageTitle}
        description={description}
        canonical={currentURL}
        openGraph={{
          type: 'website',
          url: currentURL,
          title: pageTitle,
          description: description,
          images: [
            {
              url: previewImage,
              width: 1200,
              height: 628,
              alt: 'Antfolio social image',
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          image: previewImage,
          handle: '@antfolio_app',
          site: siteName,
          cardType: 'summary_large_image',
        }}
      />
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <Fonts />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default MyApp
