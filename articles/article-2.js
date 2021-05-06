import {
  Box,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { FiZap } from 'react-icons/fi'
import NextImage from 'next/image'
import Navbar from '../components/navbar'

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
      <NextImage
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

const ListWrapper = ({ title, items }) => {
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
const ListWithLinks = ({ title, items, ordered }) => {
  return (
    <Box px={[0, '3rem']} py="1rem">
      <Text fontSize="2xl" py="1rem" as="h2">
        {title}
      </Text>
      <List fontSize="xl" spacing={4}>
        {items.map((item, index) => {
          return (
            <ListItem d="flex" key={index} alignItems="center">
              {ordered && (
                <Text mr={['0.5rem', '1rem']} fontSize="lg" w="1rem">
                  {index + 1}.
                </Text>
              )}
              <a href={item.link} target="_blank" rel="noreferrer">
                <Text color="primary.500" mr={['0.5rem', '1rem']}>
                  {item.title}
                </Text>
              </a>{' '}
              - <Text ml={['0.5rem', '1rem']}>{item.description}</Text>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

const TLDR = ({ items }) => {
  return <ListWrapper title={'TL:DR'} items={items} />
}

const Paragraph = ({ children }) => {
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

const Article2 = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box bg="primary.500">
          <BannerImage
            height={['80vw', '40vw']}
            width={'100vw'}
            redirectUrl="blog/article-1"
            imageUrl="/features_template.png"
          />
        </Box>
        <Box px={['1.5rem', '10rem']} zIndex="1" pb="10rem">
          <ArticleDate>May 6, 2021</ArticleDate>
          <Header>Alternative to Carrd</Header>
          <ContentWrapper>
            <Description>
              Carrd is a very popular website builder to create simple pages and
              it is really good at doing that, but that doesn’t mean it’s right
              for everyone.
            </Description>
            <Subtitle>What is carrd good for?</Subtitle>
            <TLDR
              items={[
                'Simple pages with not a lot of customization',
                'Creating websites fast',
                'People who need to get something out fast without thinking too much on design',
              ]}
            />
            <Paragraph>
              Whether you’re looking for alternatives for your new site, or want
              to switch from Carrd to something different, you’re in the right
              place! We know the market and we know the competitors inside out.
            </Paragraph>
            <Paragraph>
              We have tested dozens of websites and portfolio builders so you
              don't have to.
            </Paragraph>
            <Paragraph>
              Here are the alternatives grouped by use case.
            </Paragraph>
            <ListWithLinks
              ordered
              title="10 alternatives to Carrd"
              items={[
                {
                  title: 'Antfolio',
                  description:
                    'Best for highly customizable landing pages and portfolios.',
                  link: 'https://antfolio.app/',
                },
                {
                  title: 'Wix',
                  description: 'Best for business.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Unicorn Platform',
                  description:
                    'Best for people who don´t want to think on design.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Ghost',
                  description: 'Best for blogging.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Shopify',
                  description: 'Best for ecommerce.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Webnode',
                  description: 'Cheapest website builder.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'BigCommerce',
                  description: 'Best for large online stores.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Squarespace',
                  description: 'Best for design.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'Elementor',
                  description: 'Best for wordpress websites.',
                  link: 'https://anfolio.app',
                },
                {
                  title: 'GoDaddy',
                  description: 'Best for customer support.',
                  link: 'https://anfolio.app',
                },
              ]}
            />
            <Subtitle>
              <b>
                <a href="https://antfolio.app/">Antfolio: </a>
              </b>
              Best alternative overall
            </Subtitle>
            <Paragraph>
              Antfolio is the closest builder to carrd in terms on functionality
              and ease of use. It allows you
              <Paragraph>
                <b>Main differences</b>
              </Paragraph>
              <HStack spacing="24px">
                <Image src="/features_template.png" w="50%" />
                <Image src="/features_template.png" w="50%" />
              </HStack>
              <Paragraph>
                The builder is the biggest differentiator. Card has a fixed
                layout that you can customize with a variety of blocks (
                buttons, images, forms ...). Antfolio offers a builder with no
                fixed layout, this means you can positions blocks anywhere on
                the page and create the layouts you want without any constrains.
                This allows users to be much more creative with their design.
              </Paragraph>
              <Paragraph>
                Antfolio allows users to create highly customizable websites in
                minutes. It uses a simple drag and drop builder. What makes
                Antfolio unique is how their builder work. It allows you to
                positions items anywhere on the page resize them and create
                amazing layouts. It also offers a high variety of 3D
                illustrations and icons.
              </Paragraph>
            </Paragraph>
          </ContentWrapper>
        </Box>
      </Box>
    </>
  )
}

export default Article2
