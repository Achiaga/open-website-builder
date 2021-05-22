import Image from 'next/image'
import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../../hooks/translation'

import CheckIcon from '../../../../assets/check-icon'
import CloseIcon from '../../../../assets/close-icon'
import BackgroundCircles from './background'
import ImageMobileSlider from './img-slider'

const Item2 = {
  title: 'sexy_1',
  colorTitle: 'sexy_color_2',
  title2: 'sexy_3',
  imageUrl: '/sexy.png',
  alt: 'sexy',
  color: 'green.400',
  icon: CheckIcon,
}
const Item1 = {
  title: 'un_sexy_1',
  colorTitle: 'un_sexy_color_2',
  title2: 'un_sexy_3',
  imageUrl: '/unsexy.png',
  alt: 'unsexy_image',
  color: 'red.400',
  icon: CloseIcon,
}

const ComparisionItem = ({ item }) => {
  const [t] = useTranslation()
  return (
    <Box
      display={['none', 'flex']}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
      ml="15px"
    >
      <Box display={['none', 'flex']} alignItems="center" pb={8}>
        {item.icon()}
        <Text
          as="p"
          pl="1.5rem"
          fontSize="30px"
          lineHeight="43.2px"
          textAlign={'center'}
          fontWeight="700"
        >
          {t.comparison[item.title]}
          <Text as="span" color={item.color}>
            {t.comparison[item.colorTitle]}
          </Text>
          {t.comparison[item.title2]}
        </Text>
      </Box>
      <Box
        width="30vw"
        height="40vw"
        boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
        borderRadius="5px"
        overflow="hidden"
        pos="relative"
      >
        <Image
          src={item.imageUrl}
          alt={item.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
        />
      </Box>
    </Box>
  )
}

const Comparison = () => {
  const [t] = useTranslation()

  return (
    <Box
      bg={['primary.100', 'transparent']}
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w={['100vw', '100%']}
      pb={['1.5rem', '7rem']}
      mx={['auto', 0]}
      mt={['0', '12rem']}
    >
      <Box
        w={['90vw', '100%']}
        mx={['auto', 0]}
        mt={['2rem', '6rem']}
        mb={['2rem', '6rem']}
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
          {t.comparison.title_1}
          <Text as="span" color="primary.500">
            {t.comparison.title_color_2}
          </Text>
          <Text as="span" d={['none', 'flex']} justifyContent="center">
            {t.comparison.title_3}{' '}
            <Text as="span" color="primary.500" d={['none', 'block']} ml="14px">
              {t.comparison.title_color_4}
            </Text>
          </Text>
        </Text>
        <Text
          as="h2"
          textAlign={['center', 'center']}
          position="relative"
          fontSize={['22px', '22px']}
          m={['auto']}
          my={['1rem', '3rem']}
          mb={['2rem', '2rem']}
          width={['auto', '80rem']}
          color="gray.600"
          lineHeight={['30px', '50px']}
        >
          {t.comparison.subtitle}
        </Text>
        <ImageMobileSlider />
        <Box
          position="relative"
          display={['none', 'flex']}
          justifyContent="center"
          alignItems="center"
          w="100%"
          pt="5rem"
          px="2rem"
        >
          <ComparisionItem item={Item1} />
          <ComparisionItem item={Item2} />
        </Box>
      </Box>
    </Box>
  )
}

export default Comparison
