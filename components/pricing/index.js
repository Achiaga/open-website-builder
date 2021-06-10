import Head from 'next/head'
import { Box, Text } from '@chakra-ui/react'
import Navbar from '../navbar'
import PricingCards from './PricingCards'

const PricingPage = () => {
  return (
    <Box height="100vh" overflowY="auto">
      <Head>
        <title>Antfolio - Pricing - Build your website in 15 minutes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app/pricing" />
      </Head>
      <Navbar isSticky={false} color="white" />
      <Box as="section" pb="14">
        <Box
          paddingTop={['3rem', '4rem']}
          bg="linear-gradient(0deg, rgba(80,107,240,1) 0%, rgba(80,107,240,1) 42%, rgba(72,96,216,1) 86%)"
          height={['60vh', '50rem']}
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
              fontSize={['3.5rem', '5rem']}
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
              fontSize={['1rem', '1.2rem']}
              lineHeight="1.8"
              textAlign="center"
              fontWeight="500"
            >
              Antfolio helps creators of any size to increase sales. We only win
              if you win. Get the most out of your product.
            </Text>
          </Box>
          <Box top="0" mt={['-10%', '00%']} w="100vw">
            <PricingCards />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PricingPage
