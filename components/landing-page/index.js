import Head from 'next/head'
import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'

import Navbar from '../navbar'
import Hero from './hero'
import VideoDemo from './video-demo'
import Comparison from './comparison'
import Features from './features'
import Steps from './steps'
import CardInfo from './card-info'
import Footer from './footer'

import { initLiveChatScript } from '../../utils/analytics'

function loadScript() {
  window && window.eval(initLiveChatScript)
}

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => loadScript(), 0)
  }, [])

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="100vw"
    >
      <Head>
        <meta
          name="google-site-verification"
          content="UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E"
        />
        <title>Antfolio - Build a beautiful website in 15 minutes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app" />
      </Head>

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
        <Comparison />
        <Features />
        <Steps />
        <CardInfo />
        <Footer />
      </Box>
    </Box>
  )
}

export default LandingPage
