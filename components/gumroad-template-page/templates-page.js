import Head from 'next/head'
import { Box, Text, Grid } from '@chakra-ui/react'
import Navbar from '../navbar'

import Template from './template-layout'

const TEMPLATES = [
  {
    id: 'landing-page-3d-monkeyflow',
    imageUrl: '/landing-page-3d-monkeyflow.jpg',
    tags: [],
  },
  {
    id: 'card-angelina',
    imageUrl: '/card-angelina.jpg',
    tags: [],
  },
  {
    id: 'courses-sketch-ninja-design',
    imageUrl: '/courses-sketch-ninja-design.jpg',
    tags: [],
  },
  {
    id: 'tailwind-templates',
    imageUrl: '/tailwind-templates.jpg',
    tags: [],
  },
  {
    id: 'books-plack',
    imageUrl: '/books-plack.jpg',
    tags: [],
  },
  {
    id: 'empty',
    imageUrl: '/empty.jpg',
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
      <Navbar isSticky={false} />
      <Box
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={[2, '8rem']}
      >
        <Text
          as="h1"
          textAlign={['center', 'left']}
          fontWeight="bold"
          color="gray.500"
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
        pt={[0, '5rem']}
      >
        {TEMPLATES.map((templateInfo) => (
          <Template key={templateInfo.id} templateInfo={templateInfo} />
        ))}
      </Grid>
    </Box>
  )
}

export default TemplatePage
