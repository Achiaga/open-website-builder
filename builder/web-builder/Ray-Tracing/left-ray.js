import { Box } from '@chakra-ui/layout'

const LeftRay = ({ closestItem, draggingBlockPos }) => {
  const width = Math.abs(closestItem.diff)
  const leftPos = closestItem.right ? draggingBlockPos.w : -closestItem.diff
  // console.log({ leftPos, closestItem })
  return (
    <Box
      pos="absolute"
      left={`${leftPos}px`}
      top={`${draggingBlockPos.y}px`}
      zIndex="2"
      bg="green.500"
      width={`${width}px`}
      h="1px"
      flexDir="row"
      d="flex"
      justifyContent="space-between"
    >
      {closestItem.diff > 3 && (
        <>
          <Box
            textAlign="flex-start"
            lineHeight="0"
            fontSize="xs"
            color="green.500"
            ml="-3px"
          >
            x
          </Box>
          <Box textAlign="center">{Math.round(closestItem.diff)}</Box>
          <Box
            textAlign="flex-end"
            lineHeight="0"
            fontSize="xs"
            color="green.500"
            mr="-3px"
          >
            x
          </Box>
        </>
      )}
    </Box>
  )
}

export default LeftRay
