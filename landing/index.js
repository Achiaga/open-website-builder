import Head from 'next/head'

import { Box } from '@chakra-ui/layout'

import { initLiveChatScript, initGoogleAnalytics } from '../utils/analytics'

import Hero from './hero'
import VideoDemo from './video-demo'
import Features from './features'
import Steps from './steps'
import CardInfo from './card-info'
import Footer from './footer'
// import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import Navbar from '../components/navbar'

// const Navbar = dynamic(() => import('../components/navbar'))

const currentURL = 'https://www.antfolio.app'
const previewImage = 'https://www.antfolio.app/blogImgSmall2.png'
const siteName = 'Antfolio'
const pageTitle = 'Build Beautiful Websites Faster than ever!'
const description =
  'ntfolio is the fastest and easiest way to build beautiful websites with no-code. Have your blazing fast website live in minutes.'

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => window && window.eval(initLiveChatScript), 10000)
    setTimeout(() => window && window.eval(initGoogleAnalytics), 0)
  }, [])
  return (
    <>
      <Head>
        <title>Antfolio - Build beautiful websites faster than ever!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={'@antfolio_app'} key="twhandle" />
        <meta name="twitter:image" content={previewImage} key="twimage" />
        <meta name="twitter:title" content={pageTitle} key="twtitle" />
        <meta
          name="twitter:description"
          content={description}
          key="twdescription"
        />

        {/* Open Graph */}
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="100vw"
        fontFamily="Montserrat"
      >
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          w="full"
        >
          <Navbar color="gray.500" />
          <Hero />
          <VideoDemo />
          <Features />
          <Steps />
          <CardInfo />
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default LandingPage
