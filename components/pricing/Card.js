import { Box, useColorModeValue as mode } from '@chakra-ui/react'

export const Card = (props) => {
  const { children, ...rest } = props
  return (
    <Box
      position="relative"
      p="2rem 3.125vw"
      overflow="hidden"
      bg={mode('white', 'gray.700')}
      shadow="lg"
      maxW="md"
      {...rest}
    >
      {children}
    </Box>
  )
}
