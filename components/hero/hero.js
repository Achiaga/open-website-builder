import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Text, useMediaQuery } from '@chakra-ui/react'

import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import Button from '../commun/button'

const Hero = ({ handleFreeTrial }) => {
  const [t] = useTranslation()
  const router = useRouter()
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')

  const handleButton = (e) => {
    AnalyticsEvent('modal_open', 'hero')
    // handleFreeTrial(e);
    router.push('/templates')
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDir={['column', 'row']}
      justifyContent="space-between"
      alignItems="center"
      w={['90vw', '100%']}
      mt={['1rem', '2rem']}
      pt={['1rem', '3rem']}
      mb={['2rem', '6.5rem']}
      pl={['0.5rem', '0rem']}
    >
      <Box position="absolute" left="28rem" top="2rem" zIndex="9999">
        <Text
          as="h1"
          fontWeight="extrabold"
          fontFamily="Montserrat"
          fontSize="6rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          lineHeight="7rem"
        >
          Build your
          <Text as="h1" color="primary.500">
            Online
          </Text>
          <Text as="h1" color="primary.500">
            Portfolio
          </Text>
          in 5 mins
        </Text>
      </Box>
      {/* <Box
        display="flex"
        flexDirection="column"
        alignItems="baseline"
        justifyContent="center"
        ml={[0, '6.5rem']}
        w={['100%', '30%']}
        mt={4}
      >
        <Text
          as="h1"
          fontWeight="bold"
          color="black"
          fontFamily="Montserrat"
          fontSize={['2.5rem', '40px']}
          lineHeight={['3rem', '120%']}
          paddingBottom={['1rem', '0']}
        >
          {t.hero.title_1}
          <Text as="span" color="primary.500">
            {t.hero.title_color_2}
            <br />
          </Text>
          {t.hero.title_3}
        </Text>
        {isSmallerThan900 && (
          <Image
            marginleft={'-10rem'}
            src={'/hero.png'}
            alt="hero_image"
            width={720}
            height={458}
          />
        )}
        <Text
          color="gray.600"
          marginTop="1.25rem"
          fontFamily="Montserrat"
          fontSize="24px"
          as="h2"
        >
          {t.hero.subtitle}
        </Text>
        <Button
          fontSize="xl"
          minW="7.5rem"
          w="18rem"
          h={14}
          onClick={handleButton}
          marginTop="1.5rem"
        >
          {t.hero.button}
        </Button>
      </Box> */}
      <Box
        position="relative"
        width="100%"
        height="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={['0rem', '3rem']}
      >
        {!isSmallerThan900 && (
          <img
            src={'/heroArt.png'}
            alt="hero_image"
            layout="fill"
            loading="eager"
          />
        )}
        {/* {!isSmallerThan900 && (
          <Box position="absolute" left="-0.5rem" bottom="-6.5rem">
            <Image
              src={'/hero_2.png'}
              alt="hero_2_image"
              width={200}
              height={345}
            />
          </Box>
        )} */}
      </Box>
    </Box>
  )
}

export default Hero
