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
          <ArticleTitle fontSize="6xl" url="blog/article-1">
            Don’t just present. Pitch.
          </ArticleTitle>
          <Text color="gray.500" fontWeight="300" fontSize="2xl" py="2rem">
            Today, we’re launching Pitch to the world. Learn how we’re
            modernizing presentation software to help teams stay connected and
            do their best work.
          </Text>
          <TurnThePage redirectUrl="blog/article-1" />
        </Box>
        <ArticleImage
          height={['60vw', '35vw']}
          width="50%"
          redirectUrl="blog/article-1"
          imageUrl="/blogImgSmall2.png"
        />
      </Box>
    </Box>
  )
}

const ArticleCard = ({ title, imageUrl, description, bg }) => {
  return (
    <Box color="gray.500">
      <Box bg={bg || 'transparent'}>
        <ArticleImage
          height={['60vw', '250px']}
          w="90%"
          redirectUrl="blog/article-1"
          imageUrl={imageUrl}
        />
      </Box>
      <Box mt="1rem">
        <ArticleTitle fontSize="27px" url="blog/article-1">
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
              title="A top VC's recipe for an eye-catching pitch"
              imageUrl="https://www.vectary.com/api/vctr-repo/v2/binary/7bc33b3f-1e38-45b4-a8d0-2966f9372809/e52d95ad-6c6f-4aa9-a7a2-03e51a5fb36d.jpeg"
              description="In this Q&A, we sit down with Martin Mignot of Index Ventures to hear
          his tips for delivering a perfect remote pitch."
            />
            <ArticleCard
              title="What makes Antfolio unique?"
              imageUrl="/coming-soon-article.png"
              bg="primary.500"
            />
            <ArticleCard
              title="How was Antfolio created?"
              imageUrl="/coming-soon-article.png"
              bg="primary.500"
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BlogPage
