import Head from 'next/head'

import { Box } from '@chakra-ui/layout'

import { initLiveChatScript, initGoogleAnalytics } from '../utils/analytics'

import Hero from './hero'
import VideoDemo from './video-demo'
import Features from './features'
import Steps from './steps'
import CardInfo from './card-info'
import Footer from './footer'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Navbar = dynamic(() => import('../components/navbar'))

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => window.eval(initLiveChatScript), 10)
    setTimeout(() => window.eval(initGoogleAnalytics), 10)
  }, [])
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="100vw"
      fontFamily="Montserrat"
    >
      <Head>
        <title>Antfolio - Build beautiful websites faster than ever!</title>
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
        <Features />
        <Steps />
        <CardInfo />
        <Footer />
      </Box>
    </Box>
  )
}

export default LandingPage
