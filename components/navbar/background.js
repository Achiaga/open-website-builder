import { Box } from '@chakra-ui/react'
import BgCircle from '../../assets/navbar-circle'
import LogoSvg from '../../assets/logo'
import { useRouter } from 'next/router'

const BackgroundCircles = () => {
  const router = useRouter()
  const handleLogoRedirect = () => {
    router.push('/')
  }
  return (
    <>
      <Box pos="absolute" right={-79} top={-92}>
        <BgCircle />
      </Box>
      <Box
        pos="relative"
        cursor="pointer"
        pt={[0, 4]}
        w={[10, 14]}
        onClick={handleLogoRedirect}
      >
        <LogoSvg w="full" />
      </Box>
    </>
  )
}

export default BackgroundCircles
