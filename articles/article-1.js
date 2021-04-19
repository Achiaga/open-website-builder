import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Navbar from '../components/navbar'
import { FiZap } from 'react-icons/fi'
const BannerImage = ({ height, width, imageUrl }) => {
  return (
    <Box
      height={height}
      w={width}
      d="flex"
      pos="relative"
      overflow="hidden"
      mt={['2rem', 0]}
    >
      <Image
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
      />
    </Box>
  )
}

const Header = ({ children }) => {
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
const Description = ({ children }) => {
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
const ArticleDate = ({ children }) => {
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

const TLDR = ({ items }) => {
  return (
    <Box px={[0, '5rem']} py="2rem">
      <Text fontSize="2xl" py="1rem" as="h2">
        TLDR
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

const Parragraph = ({ children }) => {
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
const Subtitle = ({ children }) => {
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

const ContentWrapper = ({ children }) => {
  return (
    <Box maxW={['100%', '60vw']} m="auto">
      {children}
    </Box>
  )
}

const Article1 = () => {
  return (
    <>
      <Box>
        <Navbar />
        <BannerImage
          height={['80vw', '40vw']}
          width={'100vw'}
          redirectUrl="blog/article-1"
          imageUrl="/blogImg.png"
        />
        <Box px={['1.5rem', '10rem']} zIndex="1" pb="10rem">
          <ArticleDate>April 10, 2021</ArticleDate>
          <Header>How to make the switch to Pitch</Header>
          <ContentWrapper>
            <Description>
              Convincing others to try new software is never easy. One of the
              most common questions we hear is, “How can I help my team get
              started?” After speaking with hundreds of people, we’ve put
              together a guide to help new teams successfully make the
              transition. Here are our top tips.
            </Description>
            <TLDR items={['1', '2', '3']} />
            <Parragraph>
              Since January, we’ve shipped 13 new features and 55 improvements
              that make creating and collaborating on decks fast and easy. Check
              out the latest updates and see why it’s never been a better time
              to get your team on board.
            </Parragraph>
            <Subtitle>Make the switch to Pitch faster</Subtitle>
            <Parragraph>
              When teams have a central space to work they can accomplish
              anything — from raising money to delivering more customer-centric
              products. But getting teams to change their ways of working can be
              tough, even when the benefits outweigh the temporary discomfort of
              doing things differently.
            </Parragraph>
            <Parragraph>
              So this quarter, we set out to make it easy for teams to get
              started, migrate over their existing materials, and create
              beautiful decks quicker than ever.
            </Parragraph>
          </ContentWrapper>
        </Box>
      </Box>
    </>
  )
}

export default Article1
