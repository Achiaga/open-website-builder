import { Box, Button, Text } from '@chakra-ui/react'
import Navbar from '../navbar'
import { PricingCard } from './PricingCard'

const ActionButton = (props) => (
  <Button size="lg" w="full" fontWeight="bold" {...props} />
)

const PricingCards = () => {
  return (
    <Box
      d="grid"
      gridTemplateColumns="repeat( auto-fit, minmax(320px, 1fr) )"
      gridColumnGap="1rem"
      justifyItems="center"
      alignItems="center"
      px="3rem"
    >
      <PricingCard
        data={{
          price: 0,
          name: 'Starter',
          description: 'For individuals and teams getting started.',
          subHeader: 'Includes',
          features: ['1 Portfolio', 'Unlimited blocks'],
        }}
        button={
          <ActionButton variant="outline" colorScheme="primary">
            Get started
          </ActionButton>
        }
      />
      <PricingCard
        zIndex={1}
        isPopular
        data={{
          price: 10,
          name: 'Pro',
          description: 'For power users and small teams',
          subHeader: 'Everything in Starter, plus',
          features: [
            'Unlimited portfolios',
            'Animations',
            'Upload images',
            'No watermark',
            'Integrations',
            'Contact forms',
            'Premiun Templates',
            'SEO',
          ],
        }}
        button={<ActionButton colorScheme="primary">Get started</ActionButton>}
      />
      <PricingCard
        data={{
          price: 399,
          name: 'Enterprise',
          description:
            'Have custom requirements, or want to offer Antfolio to your clients?',
          subHeader: 'Coming soon',
          features: [
            'Custom Integrations',
            'Dedicated designer',
            'Dedicated marketing specialist',
            'Advance SEO',
          ],
        }}
        button={
          <ActionButton variant="outline" colorScheme="primary">
            Contact us
          </ActionButton>
        }
      />
    </Box>
  )
}

const PricingPage = () => {
  return (
    <>
      <Navbar isSticky={false} color="white" />
      <Box as="section" pb="14" height="100vh" overflow="scroll">
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
            bgImage="url(https://res.cloudinary.com/pitch-software/image/upload/f_auto/v1600165895/website-images/images/about/confetti.png)"
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
    </>
  )
}

export default PricingPage
