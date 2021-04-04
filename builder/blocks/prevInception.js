import { Box } from '@chakra-ui/layout'

export const PrevInception = (props) => {
  const inceptionModifiers = {
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
  }

  return (
    <Box
      w="100%"
      h="100%"
      backgroundImage={`url(${props.imageUrl})`}
      backgroundPosition="50% 50%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      {...inceptionModifiers}
    ></Box>
  )
}
