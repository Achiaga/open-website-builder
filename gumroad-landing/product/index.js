import { Box, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'
import CursorBuilderIcon from '../../assets/build-cursor-icon'
import StaticsIcon from '../../assets/statics-icon'
import RightArrow from '../../assets/right-arrow-icon'
import BeautifulTemplateIcon from '../../assets/beautiful-template-icon'
import Button from '../../components/commun/button'

const DetailsProduct = ({ icon, title, body, link, linkText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="baseline"
        justifyContent="center"
      >
        <Box pb="0.7rem" h="48px">
          {icon}
        </Box>
        <Text as="h4" fontSize="2xl" fontWeight="regular" pb="1rem">
          {title}
        </Text>
        <Text as="p" fontSize="md" fontWeight="thin" pb="2rem">
          {body}
        </Text>
      </Box>
      <Box>
        <Link href={link}>
          <Box display="flex" alignItems="center">
            <RightArrow />
            <Text
              as="p"
              fontSize="lg"
              fontWeight="regular"
              cursor="pointer"
              pl="1rem"
            >
              {linkText}
            </Text>
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

const Product = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pb={['2rem', '4rem']}
    >
      <Text
        as="h1"
        fontSize={['4xl', '7xl']}
        fontWeight="regular"
        textAlign="center"
        pb="2rem"
      >
        Design Beautiful Landing Pages <br /> That Convert More
      </Text>
      <Text
        as="p"
        textAlign="center"
        px={['2rem', '15rem']}
        fontSize={['12px', '16px']}
        pb={['2rem', '4rem']}
      >
        It is no secret that better landing pages for a product converts more
        visitors into customers. Companies spend lot of money and resources on
        creating beautiful landing pages with great UI/UX. Antfolio provides
        this for you with amazing landing pages already premade by us. You just
        need to choose one of our beautiful templates and start increase sales.
      </Text>
      <Box
        pos="relative"
        height={['200px', '500px']}
        width={['300px', '1300px']}
      >
        <Image
          src="/product.png"
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
        />
      </Box>
      <Box mt="2rem">
        <a href="" target="_blank" rel="noreferrer">
          <Button
            fontSize="lg"
            p="1.25rem"
            bg="gray.900"
            color="gray.50"
            border="2px solid black"
            _hover={{
              bg: 'transparent',
              border: '2px solid black',
              color: 'black',
            }}
            _active={{ bg: 'gray.300' }}
          >
            Demo Final Result
          </Button>
        </a>
      </Box>
      <Box
        d="grid"
        gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        gridGap="7rem"
        mt="1rem"
        pb="10rem"
        pt="5rem"
        px={['2rem', '7rem']}
      >
        <DetailsProduct
          icon={<CursorBuilderIcon />}
          title="Customize all you want our beautiful templates"
          body="With our easy drag-and-drop builder and our landing page templates, you will differencate yourself from other gumroad creators, and convert more customers increasing your sales."
          link="/templates"
          linkText="Browser to templates"
        />
        <DetailsProduct
          icon={<StaticsIcon />}
          title="Show the value of your product and Increase Sales"
          body="By explaining better the value of your product plus adding images of it will give you more credebality and convince a visitor to buy your product. And Antfolio allow you to do this in a beautiful way."
          link="/templates"
          linkText="Learn More"
        />
        <DetailsProduct
          icon={<BeautifulTemplateIcon />}
          title="Gumroad Payment inside your page. No Redirects."
          body="With our Gumroad integration, your users can use Gumroad payment inside your Antfolio page. You can just share your Antfolio website and the user will be able to pay in there and it will be exactly the same as if the user have paid on Gumroad."
          link="/templates"
          linkText="See Features"
        />
      </Box>
    </Box>
  )
}

export default Product
