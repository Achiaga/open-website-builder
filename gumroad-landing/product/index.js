import { Box, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'
import CursorBuilderIcon from '../../assets/build-cursor-icon'
import StaticsIcon from '../../assets/statics-icon'
import RightArrow from '../../assets/right-arrow-icon'
import BeautifulTemplateIcon from '../../assets/beautiful-template-icon'

const DetailsProduct = ({ icon, title, body, link, linkText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      justifyContent="center"
    >
      <Box pb="0.7rem">{icon}</Box>
      <Text as="h4" fontSize="2xl" fontWeight="regular" pb="1rem">
        {title}
      </Text>
      <Text as="p" fontSize="md" fontWeight="thin" pb="2rem">
        {body}
      </Text>

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
        fontSize="7xl"
        fontWeight="regular"
        textAlign="center"
        pb="2rem"
      >
        Design Beautiful Landing Pages <br /> That Convert More
      </Text>
      <Text as="p" textAlign="center" px="15rem" fontSize="14px" pb="4rem">
        The secret’s out. While websites are great for information and
        exploration, they’re duds at turning traffic into revenue. With
        Unbounce, you can create and optimize dedicated landing pages that
        prompt your visitors with one focused goal instead of leaving them to
        wander a site full of distractions.
      </Text>
      <Box pos="relative" height="400px" width="600px">
        <Image
          src="/product-landing.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
        />
      </Box>
      <Box
        d="grid"
        gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        gridGap="7rem"
        mt="1rem"
        pb="10rem"
        pt="7rem"
        px="7rem"
      >
        <DetailsProduct
          icon={<CursorBuilderIcon />}
          title="Build Any Page on Your Own"
          body="With our easy drag-and-drop builder and all-you-can-eat buffet of 100+ landing page templates, you can bring any campaign vision to life in a fraction of the time it would take with a developer."
          link="/templates"
          linkText="Browser to templates"
        />
        <DetailsProduct
          icon={<BeautifulTemplateIcon />}
          title="Create the Exact Page You Want"
          body="Design pages that look and act 100% the way you want them to.
            Customizable templates with optional JavaScript and CSS put looks
            and functionality in your hands, for both desktop and mobile."
          link="/templates"
          linkText="Learn More"
        />
        <DetailsProduct
          icon={<StaticsIcon />}
          title="Continually Grow Your ROI"
          body="Get built-in AI conversion power with Smart Traffic and the ability to A/B test your pages to see exactly what’s working. Experiment with messaging, design, and forms to validate what makes more visitors convert more often."
          link="/templates"
          linkText="See Features"
        />
      </Box>
    </Box>
  )
}

export default Product
