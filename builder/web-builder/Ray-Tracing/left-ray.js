import { Box } from '@chakra-ui/layout'

const LeftRay = ({ closestItem }) => {
  return (
    <Box
      pos="absolute"
      left={`${-closestItem.diff}px`}
      zIndex="2"
      bg="green.500"
      width={`${closestItem.diff}px`}
      h="1px"
      flexDir="row"
      d="flex"
      justifyContent="space-between"
    >
      <Box
        textAlign="flex-start"
        lineHeight="0"
        fontSize="2xs"
        color="red.400"
        ml="-3px"
      >
        x
      </Box>
      <Box textAlign="center">{closestItem.diff}</Box>
      <Box
        textAlign="flex-end"
        lineHeight="0"
        fontSize="2xs"
        color="red.400"
        mr="-3px"
      >
        x
      </Box>
    </Box>
  )
}

export default LeftRay
