import Head from 'next/head'

import { Box } from '@chakra-ui/layout'

import { initLiveChatScript, initGoogleAnalytics } from '../utils/analytics'

import Hero from './hero'
import Features from './features'
import Steps from './steps'
import Footer from './footer'
// import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import Navbar from '../components/navbar'
import Product from './product'

// const Navbar = dynamic(() => import('../components/navbar'))

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => window && window.eval(initLiveChatScript), 10000)
    setTimeout(() => window && window.eval(initGoogleAnalytics), 0)
  }, [])
  return (
    <>
      <Box
        minHeight="100vh"
        position="relative"
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
          <Product />
          <Features />
          <Steps />
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default LandingPage
