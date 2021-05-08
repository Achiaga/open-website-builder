import Link from 'next/link'

import { Box, Text } from '@chakra-ui/react'

import { useTranslation } from '../../hooks/translation'
import Button from '../commun/button'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
let typed
const Hero = () => {
  const [t] = useTranslation()
  const typeRef = useRef()

  useEffect(() => {
    typed = new Typed(typeRef.current, {
      strings: ['Portfolio', 'Landing', 'Proposal', 'Portfolio', 'Resume'],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  return (
    <Box
      position="relative"
      display="flex"
      flexDir={['column', 'row']}
      alignItems="center"
      w={'100vw'}
      h={['80vh', 'auto']}
      mb={['2rem', '2rem']}
      pl={0}
      mt={['2rem', 0]}
      justifyContent="center"
      fontSize={['4rem', '6rem']}
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          lineHeight={['120%', '7rem']}
        >
          {t.hero.title_1}
          <Text
            as="span"
            background="linear-gradient(
              135deg
              ,  #43E28E  0%,#506bf0 100%)"
            backgroundClip="text"
            textFillColor="transparent"
          >
            {t.hero.title_color_2}
          </Text>
          <Text as="span" d="flex" color="primary.500">
            <Box
              whiteSpace="pre"
              ref={typeRef}
              className="typed-animation"
              background="linear-gradient(
                135deg
                ,  #43E28E  0%,#506bf0 100%)"
              backgroundClip="text"
              textFillColor="transparent"
            >
              {typed || t.hero.title_color_3}
            </Box>
          </Text>
          {t.hero.title_4}
        </Text>
        <Link href="/templates">
          <Button
            fontSize="xl"
            minW="7.5rem"
            w="18rem"
            h={14}
            marginTop="2.5rem"
          >
            {t.hero.button}
          </Button>
        </Link>
      </Box>

      <Box
        position="relative"
        width={[0, '100%']}
        height={[0, '45vw']}
        display={['none', 'flex']}
        mt={['0rem', '3rem']}
      >
        {/* <Image
          src={'/heroArt.png'}
          alt="Antfolio 3D figures showcase "
          layout="fill"
          objectFit="cover"
          priority
          loading="eager"
          rel="preload"
        /> */}
      </Box>
    </Box>
  )
}

export default Hero
