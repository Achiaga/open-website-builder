import { Box } from '@chakra-ui/layout'
import Navbar from '../components/navbar'

const Article2 = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box px="10rem" zIndex="1">
          Header Image 2
        </Box>
        <Box>Title 2</Box>
        <Box>Text 2</Box>
      </Box>
    </>
  )
}

export default Article2
