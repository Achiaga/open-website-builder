import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Text, Grid } from '@chakra-ui/react'

import Template from './template'

import LogoSvg from '../../assets/logo'

const Dashboard = () => {
  const router = useRouter()

  const redirectLogo = () => {
    router.push('/')
  }

  const handleEditTemplate = (id) => {
    router.push(`/builder/${id}`)
  }

  const handlePreviewTemplate = () => {
    console.log('preview')
  }

  return (
    <Box>
      <Box
        width="full"
        display="flex"
        justifyContent={['center', 'space-between']}
        alignItems="center"
        paddingX="20"
        paddingTop="0.5rem"
      >
        <Box onClick={redirectLogo} pt={[4, 4]} cursor="pointer" w={[10, 20]}>
          <LogoSvg width="3.5rem" />
        </Box>
      </Box>
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        <Text
          as="h1"
          textAlign={['center', 'left']}
          fontWeight="bold"
          color="black"
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
          color="gray.600"
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
          color="gray.600"
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
        <Template
          handleEditTemplate={handleEditTemplate}
          handlePreviewTemplate={handlePreviewTemplate}
        >
          <Image
            style={{ clipPath: 'inset(0 0 0 50%)' }}
            src={'/template1.png'}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            alt="template1"
            id="template1"
            borderRadius="100px "
          />
        </Template>
        <Template
          handleEditTemplate={handleEditTemplate}
          handlePreviewTemplate={handlePreviewTemplate}
        >
          <Image
            style={{ clipPath: 'inset(0 0 0 50%)' }}
            src={'/template2.png'}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            alt="template2"
            id="template2"
            borderRadius="100px "
          />
        </Template>
        <Template
          handleEditTemplate={handleEditTemplate}
          handlePreviewTemplate={handlePreviewTemplate}
        >
          <Image
            style={{ clipPath: 'inset(0 0 0 50%)' }}
            src={'/template3.png'}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            alt="template3"
            id="template3"
            borderRadius="100px "
          />
        </Template>
        <Template
          handleEditTemplate={handleEditTemplate}
          handlePreviewTemplate={handlePreviewTemplate}
        >
          <Image
            style={{ clipPath: 'inset(0 0 0 50%)' }}
            src={'/template4.png'}
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            alt="template4"
            id="template4"
            borderRadius="100px "
          />
        </Template>
      </Grid>
    </Box>
  )
}

export default Dashboard
