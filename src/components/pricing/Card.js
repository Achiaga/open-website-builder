import { Box } from '@chakra-ui/layout'

export const Card = (props) => {
  const { children, ...rest } = props
  return (
    <Box
      position="relative"
      p="2rem 3.125vw"
      overflow="hidden"
      bg={'gray.50'}
      shadow="lg"
      maxW="md"
      {...rest}
    >
      {children}
    </Box>
  )
}
