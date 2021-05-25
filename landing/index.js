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
import { NextSeo } from 'next-seo'

// const Navbar = dynamic(() => import('../components/navbar'))

const currentURL = 'https://www.antfolio.app'
const previewImage = 'https://www.antfolio.app/social-image.png'
const siteName = 'Antfolio'
const pageTitle = 'Build Beautiful Websites Faster than ever!'
const description =
  'Antfolio is the fastest and easiest way to build beautiful websites with no-code. Have your blazing fast website live in minutes.'

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => window && window.eval(initLiveChatScript), 10000)
    setTimeout(() => window && window.eval(initGoogleAnalytics), 0)
  }, [])
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
          handle: '@antfolio_app',
          site: siteName,
          cardType: 'summary_large_image',
        }}
      />
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
