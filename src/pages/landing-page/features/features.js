import Image from 'next/image'
import { Box, Text } from '@chakra-ui/layout'
import { useTranslation } from '../../../../hooks/translation'
import { event } from '../../../utils/analytics'
import Link from 'next/link'

import Button from '../../../components/commun/button'
import CircleBg from '../../../../assets/features-circle'

const Feature = ({ imageUrl, title, description, isVideo = false, index }) => {
  return (
    <Box
      d="flex"
      flexDir={index % 2 ? 'row' : 'row-reverse'}
      alignItems="center"
      justifyContent="center"
      w="100%"
      px={['32px', '5vw']}
      py={['1rem', '4.5rem']}
    >
      <Box
        display={['none', 'flex']}
        justifyContent="center"
        alignItems="center"
        w={['100%', '100%']}
        height={['60vw', '22vw']}
        pos="relative"
      >
        {isVideo ? (
          <Box
            boxShadow="0px 10px 50px 0px #00000033"
            borderRadius="10px"
            overflow="hidden"
            w="93%"
            height={['60vw', '19vw']}
          >
            <video autoPlay muted loop>
              <source src={imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Image
            src={imageUrl}
            alt="features_simple_image"
            layout="fill"
            objectFit="contain"
          />
        )}
      </Box>
      <Box
        w="100%"
        px={[0, '2rem']}
        pl={[0, index % 2 ? '4rem' : '6rem']}
        d="flex"
        flexDir="column"
      >
        <Text
          as="h4"
          color={'primary.500'}
          whiteSpace="nowrap"
          fontSize={['3xl', '5xl']}
          fontStyle="normal"
          fontWeight="700"
          textAlign="left"
        >
          {title}
        </Text>
        <Box
          as="span"
          color={'gray.500'}
          fontSize="xl"
          textAlign={['justify', 'left']}
          w={['100%', '90%']}
        >
          {description}
        </Box>
      </Box>
    </Box>
  )
}

const Features = () => {
  const [t] = useTranslation()

  const handleButton = () => {
    event({
      action: 'enter_builder',
      category: 'enter_page',
      label: 'enter from link landing page',
    })
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
      mb={['2rem', '15rem']}
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
        <Text as="span" d={['none', 'block']} justifyContent="center">
          {t.features.title_5}
        </Text>
      </Text>
      <Text
        as="h2"
        textAlign="center"
        position="relative"
        fontSize={['22px', '24px']}
        my={['2rem', '1rem']}
        px={['2rem', '0rem']}
        color="gray.600"
      >
        {t.features.subtitle}
      </Text>
      <Box display={['block', 'none']}>
        <Image
          src="/callToAction.png"
          alt="call to action"
          width="200px"
          height="200px"
        />
      </Box>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        minH={'34rem'}
        pt={['0rem', '2rem']}
        px={['0.5rem', '2rem']}
        flexDirection={'column'}
      >
        <Feature
          title={t.features.feature_1}
          description={t.features.feature_text_1}
          imageUrl="/features_simple.png"
          index={1}
        />
        <Feature
          title={t.features.feature_2}
          description={t.features.feature_text_2}
          imageUrl="/features_template.png"
          index={2}
        />
        <Feature
          title={t.features.feature_3}
          description={t.features.feature_text_3}
          imageUrl="/wow-effect.mp4"
          index={3}
          isVideo
        />

        <Feature
          title={t.features.feature_4}
          description={t.features.feature_text_4}
          imageUrl="/always-online.png"
          index={4}
        />
        <Feature
          title={t.features.feature_5}
          description={t.features.feature_text_5}
          imageUrl="/short_features_video.mp4"
          index={5}
          isVideo
        />
        <Link href={`/builder`}>
          <Button
            fontSize="xl"
            minW="7.5rem"
            w="12rem"
            h={14}
            ml={['1rem', '0']}
            mt="2rem"
            background={'black'}
            onClick={handleButton}
            _hover={{
              border: '2px solid black',
              background: 'transparent',
              color: 'black',
            }}
          >
            {t.features.button}
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Features
