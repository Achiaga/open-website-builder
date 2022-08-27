import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Navbar from '../navbar'
// import ArrowRight from '../../assets/arrow-right'
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

const GuideImage = ({ height, width, redirectUrl, imageUrl }) => {
  return (
    <Box
      height={height}
      w={width}
      d="flex"
      pos="relative"
      transition="opacity 0.3s"
      borderRadius="0.6rem"
      overflow="hidden"
      margin="auto"
      _hover={{ opacity: '0.85' }}
    >
      <Link href={redirectUrl} passHref>
        <a>
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="contain"
            objectPosition="center center"
          />
        </a>
      </Link>
    </Box>
  )
}

// const TurnThePage = ({ redirectUrl }) => {
//   return (
//     <Link href={redirectUrl} passHref>
//       <a>
//         <Box d="flex" alignItems="center">
//           <Text
//             fontSize="2xl"
//             color="primary.500"
//             mr="1rem"
//             _hover={{ color: 'primary.700' }}
//           >
//             Turn the page
//           </Text>
//           <ArrowRight fill="#506bf0" />
//         </Box>
//       </a>
//     </Link>
//   )
// }

const MainBlogCard = () => {
  return (
    <Box>
      <Box
        d="flex"
        flexDirection="column"
        mt="12rem"
        mb="8rem"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Text as="h1" fontSize="3.5rem" fontWeight="900" pb="1rem">
          Guides
        </Text>
        <Text as="p" fontSize="1.25rem" fontWeight="500" color="gray.400">
          Simple tutorials & walkthroughs
        </Text>
      </Box>
    </Box>
  )
}

const ArticleCard = ({
  title,
  imageUrl,
  imgWidth = '90%',
  description,
  bg,
  redirectUrl,
}) => {
  return (
    <Link href={redirectUrl}>
      <Box
        color="gray.500"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="15px"
        boxShadow="0 20px 40px -10px rgba(0,0,0,.06)!important"
        bg={bg || 'transparent'}
        _hover={{
          transform: 'scale(1.02)',
        }}
        transition="ease-out 0.08s"
      >
        <Box bg={bg || 'transparent'} borderRadius="15px">
          <GuideImage
            height={['60vw', '250px']}
            width={imgWidth}
            redirectUrl={redirectUrl}
            imageUrl={imageUrl}
          />
        </Box>
        <Box mb="0.5rem" padding="1rem" pl="1.5rem">
          <ArticleTitle fontSize="18px" url={redirectUrl}>
            {title}
          </ArticleTitle>
          {description && (
            <Text fontWeight="400" fontSize="lg" lineHeight="1.8" mt="0.2rem">
              {description}
            </Text>
          )}
        </Box>
      </Box>
    </Link>
  )
}

const BlogPage = () => {
  return (
    <Box>
      <Navbar isSticky={false} />
      <Box px={['1.5rem', '5rem']} zIndex="1">
        <Box as="section" pb="8rem">
          <MainBlogCard />
        </Box>
        <Box
          d="grid"
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
          gridGap="5%"
          mt="1rem"
          pb="10rem"
        >
          <ArticleCard
            title="Enable analytics & A/B Testing"
            imageUrl="https://antfolio.s3.amazonaws.com/idea.png"
            redirectUrl="/guides"
            imgWidth="70%"
            description="Cooming Soon"
            bg="white"
          />
          <ArticleCard
            title="Enable custom forms"
            imageUrl="https://antfolio.s3.amazonaws.com/idea.png"
            redirectUrl="/guides"
            imgWidth="70%"
            description="Cooming Soon"
            bg="white"
          />
          <ArticleCard
            title="Best Font Families for each use case"
            imageUrl="https://antfolio.s3.amazonaws.com/idea.png"
            redirectUrl="/guides"
            imgWidth="70%"
            description="Cooming Soon"
            bg="white"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BlogPage
