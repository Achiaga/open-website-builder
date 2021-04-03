import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import LogoSvg from '../../assets/logo'

const MobileVersion = () => {
  const router = useRouter()
  const redirectLogo = () => {
    router.push('/')
  }
  return (
    <Box d={['fixed', 'none']} w="100vw" h="100vh">
      <Box
        d="flex"
        w="100%"
        pb="8"
        p={2}
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box onClick={redirectLogo} pb="6" cursor="pointer">
          <LogoSvg width="3.5rem" />
        </Box>
        <Text
          as="h4"
          textAlign="center"
          fontSize={{ sm: 'md', base: 'xl', md: '2xl' }}
          fontWeight="semibold"
          pb="6"
        >
          <Text>Sorry,</Text>
          <Text>the builder is not avialable for mobile</Text>
        </Text>
        <Text as="span" textAlign="center" fontSize="lg">
          <Text>Please, access the builder</Text>
          <Text>from your computer</Text>
        </Text>
      </Box>
    </Box>
  )
}

export default MobileVersion
