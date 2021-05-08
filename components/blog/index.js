import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Navbar from '../navbar'
import ArrowRight from '../../assets/arrow-right'
import Link from 'next/link'

const ArticleTitle = ({ url, fontSize, children }) => {
  return (
    <Link href={url} passHref>
      <a>
        <Text
          fontSize={fontSize}
          color="gray.500"
          fontWeight="800"
          _hover={{ color: 'primary.500' }}
        >
          {children}
        </Text>
      </a>
    </Link>
  )
}

const ArticleImage = ({ height, width, redirectUrl, imageUrl }) => {
  return (
    <Box
      height={height}
      w={width}
      d="flex"
      pos="relative"
      transition="opacity 0.3s"
      borderRadius="0.6rem"
      overflow="hidden"
      _hover={{ opacity: '0.85' }}
    >
      <Link href={redirectUrl} passHref>
        <a>
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </a>
      </Link>
    </Box>
  )
}

const TurnThePage = ({ redirectUrl }) => {
  return (
    <Link href={redirectUrl} passHref>
      <a>
        <Box d="flex" alignItems="center">
          <Text
            fontSize="2xl"
            color="primary.500"
            mr="1rem"
            _hover={{ color: 'primary.700' }}
          >
            Turn the page
          </Text>
          <ArrowRight fill="#506bf0" />
        </Box>
      </a>
    </Link>
  )
}

const MainBlogCard = () => {
  return (
    <Box>
      <Box d="flex" mt="3rem">
        <Box
          w="50%"
          pr="3rem"
          d="flex"
          alignItems="start"
          flexDir="column"
          justifyContent="center"
        >
          <ArticleTitle
            fontSize="6xl"
            url="blog/100-website-builder-comparison"
          >
            100 Best Website Builder
          </ArticleTitle>
          <Text color="gray.500" fontWeight="300" fontSize="2xl" py="2rem">
            Today, we’re launching a comparison tool, so you can choose the best
            website builder for you. You can easily filter builders base on
            features on how the website is build.
          </Text>
          <TurnThePage redirectUrl="blog/100-website-builder-comparison" />
        </Box>
        <ArticleImage
          height={['60vw', '35vw']}
          width="50%"
          redirectUrl="blog/100-website-builder-comparison"
          imageUrl="/blogImgSmall2.png"
        />
      </Box>
    </Box>
  )
}

const ArticleCard = ({ title, imageUrl, description, bg, redirectUrl }) => {
  return (
    <Box color="gray.500">
      <Box bg={bg || 'transparent'}>
        <ArticleImage
          height={['60vw', '250px']}
          w="90%"
          redirectUrl={redirectUrl}
          imageUrl={imageUrl}
        />
      </Box>
      <Box mt="1rem">
        <ArticleTitle fontSize="27px" url={redirectUrl}>
          {title}
        </ArticleTitle>
        <Text fontWeight="400" fontSize="lg" lineHeight="1.8" mt="1rem">
          {description}
        </Text>
      </Box>
    </Box>
  )
}

const BlogPage = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box px="10rem" zIndex="1">
          <Box as="section" pb="8rem">
            <MainBlogCard />
          </Box>
          <Box
            d="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            gridGap="5%"
            mt="1rem"
            pb="10rem"
          >
            <ArticleCard
              title="Antfolio, The ultimate website builder"
              imageUrl="https://antfolio.s3.amazonaws.com/mac-study-model.png"
              description="Coming Soon!"
              redirectUrl="/blog"
            />
            <ArticleCard
              title="What makes Antfolio unique?"
              imageUrl="https://antfolio.s3.amazonaws.com/idea.png"
              description="Coming Soon!"
              redirectUrl="/blog"
            />
            <ArticleCard
              title="How was Antfolio created?"
              imageUrl="https://antfolio.s3.amazonaws.com/idea.png"
              description="Coming Soon!"
              redirectUrl="/blog"
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BlogPage
