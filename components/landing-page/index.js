import Head from 'next/head'

import { Box } from '@chakra-ui/react'

import { initLiveChatScript } from '../../utils/analytics'

import Navbar from '../navbar'
import Hero from '../hero'
import Comparison from '../comparison'
import Features from '../features'
import Steps from '../steps'
import CardInfo from '../card-info'
import Footer from '../footer'

const LandingPage = () => {
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
        <title>Antfolio - Build your online portfolio in 15 minutes</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: initLiveChatScript,
          }}
        />
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
