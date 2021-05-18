import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { FiZap } from 'react-icons/fi'
import NextImage from 'next/image'

export const BannerImage = ({ height, width, imageUrl }) => {
  return (
    <Box
      height={height}
      w={width}
      d="flex"
      pos="relative"
      overflow="hidden"
      mt={['2rem', 0]}
    >
      <NextImage
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
      />
    </Box>
  )
}

export const Header = ({ children }) => {
  return (
    <Text
      as="h1"
      fontSize={['42px', '6xl']}
      color="gray.500"
      fontWeight="700"
      textAlign="center"
      py="1rem"
    >
      {children}
    </Text>
  )
}
export const Description = ({ children }) => {
  return (
    <Text
      as="p"
      fontSize="xl"
      color="gray.500"
      fontWeight="500"
      textAlign={['justify', 'left']}
      py="1rem"
    >
      {children}
    </Text>
  )
}
export const ArticleDate = ({ children }) => {
  return (
    <Text
      as="time"
      fontSize={['md', 'lg']}
      color="gray.400"
      fontWeight="400"
      textAlign="center"
      justifyContent="center"
      d="flex"
      pt={['1rem', '2rem']}
    >
      {children}
    </Text>
  )
}

export const ListWrapper = ({ title, items }) => {
  return (
    <Box px={[0, '5rem']} py="2rem">
      <Text fontSize="2xl" py="1rem" as="h2">
        {title}
      </Text>
      <List fontSize="xl" spacing={4}>
        {items.map((item, index) => {
          return (
            <ListItem d="flex" key={index} alignItems="center">
              <ListIcon as={FiZap} color="primary.500" />
              <Text>{item}</Text>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
export const ListWithLinks = ({ title, items, ordered }) => {
  return (
    <Box px={[0, '0']} py="1rem">
      <Text fontSize="2xl" py="1rem" as="h2">
        {title}
      </Text>
      <List spacing={4}>
        {items.map((item, index) => {
          return (
            <ListItem d="flex" key={index} alignItems="center">
              {ordered && (
                <Text mr={['0.5rem', '1rem']} w="1rem">
                  {index + 1}.
                </Text>
              )}
              <a href={item.link} target="_blank" rel="noreferrer">
                <Text color="primary.500" mr={['0.5rem', '1rem']} minW="120px">
                  {item.title}
                </Text>
              </a>{' '}
              {/* -{' '} */}
              <Text ml={['0.5rem', '1rem']} my={['0.5rem', '1rem']}>
                {item.description}
              </Text>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export const TLDR = ({ items }) => {
  return <ListWrapper title={'TL:DR'} items={items} />
}

export const Paragraph = ({ children }) => {
  return (
    <Text
      as="p"
      fontSize="xl"
      color="gray.500"
      fontWeight="300"
      textAlign={['justify', 'left']}
      pt="1rem"
      pb="1rem"
    >
      {children}
    </Text>
  )
}
export const Subtitle = ({ children }) => {
  return (
    <Text
      as="h2"
      fontSize="2xl"
      color="gray.500"
      fontWeight="600"
      textAlign="left"
      pt="2rem"
    >
      {children}
    </Text>
  )
}

export const ContentWrapper = ({ children }) => {
  return (
    <Box maxW={['100%', '50vw']} m="auto" lineHeight="1.6" fontSize="18px">
      {children}
    </Box>
  )
}
