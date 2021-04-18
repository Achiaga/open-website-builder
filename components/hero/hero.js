import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'

import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import Button from '../commun/button'

const Hero = () => {
  const [t] = useTranslation()
  const router = useRouter()

  const handleButton = () => {
    AnalyticsEvent('modal_open', 'hero')
    // handleFreeTrial(e);
    router.push('/templates')
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDir={['column', 'row']}
      alignItems="center"
      w={'100vw'}
      h={['80vh', 'auto']}
      mb={['2rem', '6.5rem']}
      pl={0}
      mt={['2rem', 0]}
      justifyContent="center"
    >
      <Box
        position={['relative', 'absolute']}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        zIndex="1"
        left={['0', '50%']}
        transform={['none', 'translate(-50%,0)']}
      >
        <Text
          as="h1"
          fontWeight="extrabold"
          fontSize={['4rem', '6rem']}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          lineHeight={['120%', '7rem']}
        >
          {t.hero.title_1}
          <Text as="span" color="primary.500">
            {t.hero.title_color_2}
          </Text>
          <Text as="span" color="primary.500">
            {t.hero.title_color_3}
          </Text>
          {t.hero.title_4}
        </Text>
        <Button
          fontSize="xl"
          minW="7.5rem"
          w="18rem"
          h={14}
          onClick={handleButton}
          marginTop="2.5rem"
        >
          {t.hero.button}
        </Button>
      </Box>

      <Box
        position="relative"
        width={[0, '100%']}
        height={[0, '45vw']}
        display={['none', 'flex']}
        mt={['0rem', '3rem']}
      >
        <Image
          src={'/heroArt.png'}
          alt="Antfolio 3D figures showcase "
          layout="fill"
          objectFit="cover"
          priority
          rel="preload"
        />
      </Box>
    </Box>
  )
}

export default Hero
