import { Box, List, ListItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Navbar from '../components/navbar'

const BannerImage = ({ height, width, imageUrl }) => {
  return (
    <Box height={height} w={width} d="flex" pos="relative" overflow="hidden">
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
      fontSize="6xl"
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
      fontSize="xl"
      color="gray.500"
      fontWeight="500"
      textAlign="left"
      py="1rem"
    >
      {children}
    </Text>
  )
}
const ArticleDate = ({ children }) => {
  return (
    <Text
      fontSize="xl"
      color="gray.400"
      fontWeight="300"
      textAlign="center"
      pt="2rem"
    >
      {children}
    </Text>
  )
}

const TLDR = () => {
  return (
    <Text>
      <List>
        <ListItem>Good</ListItem>
        <ListItem>Super Good</ListItem>
        <ListItem>Extra super good</ListItem>
      </List>
    </Text>
  )
}

const ContentWrapper = ({ children }) => {
  return (
    <Box maxW={['80vw', '60vw']} m="auto">
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
          height={'40vw'}
          width={'100vw'}
          redirectUrl="blog/article-1"
          imageUrl="https://images.unsplash.com/photo-1618159072219-620bc5c8f3f0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1525&q=80"
        />
        <Box px="10rem" zIndex="1">
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
            <TLDR></TLDR>
            <Box>Text 1</Box>
          </ContentWrapper>
        </Box>
      </Box>
    </>
  )
}

export default Article1
