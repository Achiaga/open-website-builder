import { Box, Text } from '@chakra-ui/react'
import Navbar from '../navbar'
import PricingCards from './PricingCards'

const PricingPage = () => {
  return (
    <Box height="100vh">
      <Navbar isSticky={false} color="white" />
      <Box as="section" pb="14">
        <Box
          bg="#43E28E linear-gradient(91.56deg, #43E28E 0%, #506bf0 122.55%)"
          height={['50vh', '40rem']}
        >
          <Box
            h="50vh"
            flexDir="column"
            d="flex"
            alignItems="center"
            justifyContent="center"
            bgSize="contain"
            bgImage="url(./confetti.png)"
          >
            <Text
              as="h1"
              fontSize="5rem"
              color="white"
              fontWeight="800"
              textAlign="center"
            >
              Switch to Antfolio
            </Text>
            <Text
              as="h2"
              position="relative"
              maxWidth="40ch"
              margin="0 2rem"
              color="white"
              fontSize="1.2rem"
              lineHeight="1.8"
              textAlign="center"
              fontWeight="500"
            >
              Antfolio helps indiviual and startups of all sizes build better
              portfolios.
            </Text>
          </Box>
          <Box top="0" mt={['-10%', '-5%']} w="100vw">
            <PricingCards />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PricingPage
