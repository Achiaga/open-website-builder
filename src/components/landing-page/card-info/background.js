import { Box } from '@chakra-ui/react'
import FooterCircle from '../../../../assets/footer-circle'

const BackgroundCircle = () => {
  return (
    <Box
      display={['none', 'block']}
      pos="absolute"
      left="-5rem"
      bottom="-25rem"
    >
      <FooterCircle />
    </Box>
  )
}

export default BackgroundCircle
