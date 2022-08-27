import { Box } from '@chakra-ui/layout'

import Hero from './hero'
import VideoDemo from './video-demo'
import Features from './features'
import Steps from './steps'
import CardInfo from './card-info'
import Footer from './footer'

import Navbar from '../components/navbar'

// const Navbar = dynamic(() => import('../components/navbar'))

const LandingPage = () => {
  return (
    <>
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
