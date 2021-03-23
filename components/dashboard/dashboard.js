import { Box, Text, Grid, GridItem } from '@chakra-ui/react'
import LogoSvg from '../../assets/logo'

const Dashboard = () => {
  return (
    <Box>
      <Box width="full" paddingX="20" paddingTop="5">
        <Box pt={[0, 4]} w={[10, 20]}>
          <LogoSvg width="5rem" />
        </Box>
      </Box>
      <Box w="full" display="flex" alignItems="center" justifyContent="center">
        <Text as="h1" fontSize="5xl" fontWeight="500">
          Choose your Template
        </Text>
      </Box>
      <Box
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY="1"
      >
        <Text as="h4" fontSize="xl">
          We already design the template, so you dont have to.{' '}
        </Text>
        <Text as="h4" fontSize="xl">
          {'  All of them are fully customizable.'}
        </Text>
      </Box>
      <Box
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingY="5"
      >
        <Text as="h4" fontWeight="semibold" fontSize="2xl" color="primary.500">
          Choose One - Populate - Publish
        </Text>
      </Box>

      <Grid
        w="full"
        templateColumns="repeat(3, 1fr)"
        gap={10}
        paddingX="16"
        mt="10"
      >
        <Box w="100%" h="lg" bg="blue.500">
          template1
        </Box>
        <Box w="100%" h="lg" bg="blue.500">
          template2
        </Box>
        <Box w="100%" h="lg" bg="blue.500">
          template3
        </Box>
        <Box w="100%" h="lg" bg="blue.500">
          template4
        </Box>
        <Box w="100%" h="lg" bg="blue.500">
          template5
        </Box>
      </Grid>
    </Box>
  )
}

export default Dashboard
