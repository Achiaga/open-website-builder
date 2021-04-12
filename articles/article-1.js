import { Box } from '@chakra-ui/layout'
import Navbar from '../components/navbar'

const Article1 = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box px="10rem" zIndex="1">
          Header Image 1
        </Box>
        <Box>Title 1</Box>
        <Box>Text 1</Box>
      </Box>
    </>
  )
}

export default Article1
