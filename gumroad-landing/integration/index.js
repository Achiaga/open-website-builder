import { Box, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'

const DetailsProduct = ({ image, title, body, link, linkText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="10px"
      px="1rem"
      pb="2rem"
      pt="1rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="baseline"
        justifyContent="start"
      >
        <Box
          pos="relative"
          height={['200px', '250px']}
          width="100%"
          borderRadius="10px"
          border="1px solid"
          borderColor="gray.100"
          mb="1rem"
        >
          <Image
            src={image}
            layout="fill"
            objectFit="contain"
            objectPosition="center center"
          />
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
            <Text as="p" fontSize="lg" fontWeight="regular" cursor="pointer">
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
    >
      <Text
        as="h1"
        fontSize={['4xl', '7xl']}
        fontWeight="regular"
        textAlign="center"
        pb="2rem"
      >
        Gumroad Integration
      </Text>
      <Text
        as="p"
        textAlign="center"
        px={['2rem', '15rem']}
        fontSize="14px"
        pb="4rem"
      >
        {
          "We are the best tool to increase your sales for Gumroad creators. Use your Antfolio's website to share with your audience and convert more. We use Gumroad payment mehtod to avoid useless redirects. The payment works the same way as if the user arrives on your gumroad page."
        }
      </Text>
      <Box
        d="grid"
        gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        gridGap="2rem"
        mt="1rem"
        pb="10rem"
        px={['2rem', '4rem']}
      >
        <DetailsProduct
          image={'/gumroad-link.jpeg'}
          title="Copy your Gumroad product link"
          body="Go to your gumroad account and on product/ share -> you can find the url you need to paste on your Antfolio Page on the Button."
          link="/templates"
          linkText="Go to the Guide"
        />
        <DetailsProduct
          image={'/gumroad-button.png'}
          title="Add the gumroad button on antfolio's builder"
          body="Once on the builder, add the gumroad button on your webpage. Where the user will click to pay for the product."
          link="/templates"
          linkText="Go to the Guide"
        />
        <DetailsProduct
          image={'/gumroad-button-link.png'}
          title="Add your gumroad link to the button"
          body="Paste the url of the first step on the button link to connect it with gumroad. And that is all :)"
          link="/templates"
          linkText="Go to the Guide"
        />
      </Box>
    </Box>
  )
}

export default Product
