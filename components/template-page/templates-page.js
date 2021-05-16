import Head from 'next/head'
import Link from 'next/link'
import { Box, Text, Grid } from '@chakra-ui/react'

import Template from './template-layout'

import LogoSvg from '../../assets/logo'

const TEMPLATES = [
  {
    id: 'landing-page-3d-monkeyflow',
    imageUrl: '/landing-page-3d-monkeyflow.jpg',
    tags: [],
  },
  {
    id: 'portfolio-designer-tara',
    imageUrl: '/portfolio-designer-tara.jpg',
    tags: [],
  },
  {
    id: 'portfolio-product-desgner-john',
    imageUrl: '/portfolio-product-desgner-john.jpg',
    tags: [],
  },
  {
    id: 'portfolio-fullstack-developer-johndoe',
    imageUrl: '/portfolio-fullstack-developer-johndoe.jpg',
    tags: [],
  },
  {
    id: 'portfolio-storytelling-sasha',
    imageUrl: '/portfolio-storytelling-sasha.jpg',
    tags: [],
  },
  {
    id: 'portfolio-brands-black',
    imageUrl: '/portfolio-brands-black.jpg',
    tags: [],
  },
]

const TemplatePage = () => {
  return (
    <Box>
      <Head>
        <meta
          name="google-site-verification"
          content="UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E"
        />
        <title>Antfolio - The best templates made by our best designers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        width="full"
        display="flex"
        justifyContent={['center', 'space-between']}
        alignItems="center"
        paddingX="20"
        paddingTop="0.5rem"
      >
        <Link href="/">
          <Box pt={[4, 4]} cursor="pointer" w={[10, 20]}>
            <LogoSvg width="3.5rem" />
          </Box>
        </Link>
      </Box>
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        <Text
          as="h1"
          textAlign={['center', 'left']}
          fontWeight="bold"
          color="gray.500"
          pt={[2, 0]}
          fontFamily="Montserrat"
          fontSize={['4xl', '5xl']}
          lineHeight={['3rem', '120%']}
          paddingBottom={['0.5rem', '0']}
        >
          Choose your Template
        </Text>
      </Box>
      <Box
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingY="1"
      >
        <Text
          mt={[0, 2]}
          textAlign={['center', 'left']}
          color="gray.500"
          fontFamily="Montserrat"
          fontSize={['lg', 'xl']}
          px={[8, 0]}
          as="h4"
        >
          We already design the template, so you dont have to.
        </Text>
        <Text
          mt={[6, 1]}
          textAlign={['center', 'left']}
          color="gray.500"
          fontFamily="Montserrat"
          fontSize={['lg', 'xl']}
          as="h4"
        >
          All of them are fully customizable.
        </Text>
      </Box>
      <Box
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={[5, 8]}
        pb="2"
      >
        <Text as="h4" fontWeight="bold" fontSize="2xl" color="primary.500">
          Choose -{' '}
          <Text as="span" color="green.400">
            Populate
          </Text>{' '}
          - Publish
        </Text>
      </Box>

      <Grid
        w="full"
        templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
        gap={10}
        paddingX={['6', '16']}
        mt={[6, 10]}
        mb="10"
      >
        {TEMPLATES.map((templateInfo) => (
          <Template key={templateInfo.id} templateInfo={templateInfo} />
        ))}
      </Grid>
    </Box>
  )
}

export default TemplatePage
