import { Box } from '@chakra-ui/layout'
import BgCircle from '../../assets/navbar-circle'

const BackgroundCircles = () => {
  return (
    <>
      <Box pos="absolute" right={-79} top={-92}>
        <BgCircle />
      </Box>
    </>
  )
}

export default BackgroundCircles
