import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import { useRouter } from 'next/router'

import ItemListFeatures from './item-list-features'
import Button from '../commun/button'
import CircleBg from '../../assets/features-circle'

const Features = () => {
  const router = useRouter()
  const [t] = useTranslation()
  const [textIndex, setTextIndex] = useState(0)
  const [stopInterval, setStopInterval] = useState(false)

  useEffect(() => {
    if (!stopInterval) {
      const intervalIndex = setInterval(() => {
        setTextIndex((state) => {
          if (state < 4) setTextIndex(state + 1)
          else setTextIndex(0)
        })
      }, 3000)
      return () => clearInterval(intervalIndex)
    }
  }, [textIndex])

  const selectedImg = {
    0: '/features_simple.png',
    1: '/features_template.png',
    2: '/wow-effect.mp4',
    3: '/always-online.png',
    4: '/pdf_feature.png',
  }[textIndex]

  const handleTextIndex = (e) => {
    const { id } = e.currentTarget
    setStopInterval(true)
    setTextIndex(Number(id))
  }

  const handleButton = (e) => {
    AnalyticsEvent('modal_open', 'features')
    router.push('/templates')
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      mt="4rem"
      mb={['2rem', '6.5rem']}
      mx={['auto', 0]}
    >
      <Box
        display={['none', 'block']}
        position="absolute"
        right="0"
        bottom="-30rem"
      >
        <CircleBg />
      </Box>
      <Text
        as="h1"
        position="relative"
        fontWeight="bold"
        textAlign="center"
        color="black"
        fontFamily="Montserrat"
        fontSize={['2.5rem', '50px']}
        lineHeight={['3rem', '4rem']}
        w={['auto', '50rem']}
        mx="auto"
      >
        {t.features.title_1}
        <Text as="span" color="primary.500">
          {t.features.title_color_2}
        </Text>
        {t.features.title_3}
        <Text as="span" color="primary.500">
          {t.features.title_color_4}
        </Text>
        {t.features.title_5}
      </Text>
      <Text
        as="h2"
        textAlign="center"
        position="relative"
        fontSize="24px"
        my={['2rem', '1rem']}
        color="gray.600"
      >
        {t.features.subtitle}
      </Text>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        minH={'34rem'}
        pt={['0rem', '2rem']}
        px={['0.5rem', '2rem']}
        flexDirection={['column', 'row']}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w={['100%', '60%']}
          minW={'700px'}
        >
          {textIndex === 2 ? (
            <video autoPlay muted width={500}>
              <source src={selectedImg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={selectedImg}
              alt="features_simple_image"
              width={700}
              height={446}
            />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="start"
          alignItems="baseline"
          height="100%"
          py={['2rem', '3rem']}
          flexDir={'column'}
          w={['100%', '30%']}
        >
          <Box
            display="flex"
            justifyContent="start"
            alignItems="baseline"
            height="100%"
            minH="20.5rem"
            flexDir={'column'}
            w={'100%'}
          >
            <ItemListFeatures
              keyItem={0}
              title={t.features.feature_1}
              text={t.features.feature_text_1}
              handleTextIndex={handleTextIndex}
              textIndex={textIndex}
            />
            <ItemListFeatures
              keyItem={1}
              title={t.features.feature_2}
              text={t.features.feature_text_2}
              handleTextIndex={handleTextIndex}
              textIndex={textIndex}
            />
            <ItemListFeatures
              keyItem={2}
              title={t.features.feature_3}
              text={t.features.feature_text_3}
              handleTextIndex={handleTextIndex}
              textIndex={textIndex}
            />
            <ItemListFeatures
              keyItem={3}
              title={t.features.feature_4}
              text={t.features.feature_text_4}
              handleTextIndex={handleTextIndex}
              textIndex={textIndex}
            />
            <ItemListFeatures
              keyItem={4}
              title={t.features.feature_5}
              text={t.features.feature_text_5}
              handleTextIndex={handleTextIndex}
              textIndex={textIndex}
            />
          </Box>
          <Button
            fontSize="xl"
            minW="7.5rem"
            w="12rem"
            h={12}
            ml={['1rem', '0']}
            mt="2rem"
            onClick={handleButton}
          >
            {t.features.button}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Features
