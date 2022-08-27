import { Box } from '@chakra-ui/layout'

import Hero from './hero'
import Features from './features'
import Footer from './footer'

import Navbar from '../components/navbar'
import Product from './product'
import Integration from './integration'

// const Navbar = dynamic(() => import('../components/navbar'))

const LandingPage = () => {
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
          <Integration />
          <Features />
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default LandingPage
