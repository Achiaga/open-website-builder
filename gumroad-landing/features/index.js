import Image from 'next/image'
import { Box, Text } from '@chakra-ui/layout'
import { useTranslation } from '../../hooks/translation'
import BackgroundCircles from './background'

const Feature = ({ imageUrl, title, description, isVideo = false, index }) => {
  return (
    <Box
      d="flex"
      flexDir={['column', 'column', index % 2 ? 'row' : 'row-reverse']}
      alignItems="center"
      justifyContent="center"
      w="100%"
      px={['32px', '5vw']}
      py={['2rem', '2rem', '4.5rem']}
    >
      <Box
        display={['flex', 'flex']}
        justifyContent="center"
        alignItems="center"
        w={['100%', '100%']}
        height={['60vw', '60vw', '28vw']}
        pos="relative"
      >
        {isVideo ? (
          <Box
            boxShadow="0px 10px 50px 0px #00000033"
            borderRadius="10px"
            overflow="hidden"
            w="100%"
            height={['auto', 'auto', '23vw']}
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
        px={[0, 0, '2rem']}
        pl={[0, 0, index % 2 ? '4rem' : '6rem']}
        d="flex"
        flexDir="column"
      >
        <Text
          as="h4"
          color={'primary.500'}
          whiteSpace="nowrap"
          fontSize={['3xl', '3xl', '5xl']}
          fontStyle="normal"
          fontWeight="700"
          textAlign="left"
          mb={['1rem', 0]}
        >
          {title}
        </Text>
        <Box
          as="span"
          color={'gray.500'}
          fontWeight="500"
          fontSize="xl"
          textAlign={['left', 'left']}
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

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      mt={['2rem', '5rem']}
      mb={['2rem', '2rem']}
      mx={['auto', 0]}
    >
      <BackgroundCircles />
      <Text
        as="h1"
        position="relative"
        fontWeight="bold"
        textAlign={'center'}
        color="black"
        fontSize={['2.2rem', '50px']}
        lineHeight={['3rem', '4rem']}
        w={['auto', '60rem']}
        pb={['0.75rem', '0']}
        mx="auto"
      >
        Create your{' '}
        <Text as="span" color="primary.500">
          Dream{' '}
        </Text>
        Website
        <Text as="span" d={['none', 'flex']} justifyContent="center">
          with{' '}
          <Text as="span" color="primary.500" d={['none', 'block']} ml="14px">
            Ease
          </Text>
        </Text>
      </Text>
      {/* <Box
        display={['none', 'block']}
        position="absolute"
        right="0"
        bottom="-30rem"
      >
        <CircleBg />
      </Box> */}
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
          title={'Easy to Use'}
          description={
            'Simple, fast, and powerful Drag and Drop builder. No matter your background, we got you covered. Impress you customers with awesome landing pages.'
          }
          imageUrl="/features_simple.png"
          index={1}
        />
        <Feature
          title={'Blazing Fast'}
          description={
            'Google ranks websites based on speed and Antfolio websites are really fast, they load in less than 0.5 seconds'
          }
          imageUrl="/speed-index.png"
          index={2}
        />
        <Feature
          title={t.features.feature_2}
          description={t.features.feature_text_2}
          imageUrl="/templates.png"
          index={3}
        />

        <Feature
          title={'Custom Domain'}
          description={
            'Add a custom domain (or subdomain) to any of your Websites. Site hosting and SSL certificates out of the box with Antfolio.'
          }
          imageUrl="/custom-domain.png"
          index={4}
        />
        <Feature
          title={'Icons & Illustrations'}
          description={t.features.feature_text_5}
          imageUrl="/illustrations-demo.png"
          index={5}
        />
        <Feature
          title={'Integrations'}
          description={
            'Collect payments, leads, build an Email List, add site analytics, provide live chat support, and much more.'
          }
          imageUrl="/integrations.png"
          index={6}
        />
        <Feature
          title={t.features.feature_5}
          description={
            'If you can make a slide deck, you can make a website!, With just one click you can launch your website to the world.'
          }
          imageUrl="/short_features_video.mp4"
          index={7}
          isVideo
        />
      </Box>
    </Box>
  )
}

export default Features
