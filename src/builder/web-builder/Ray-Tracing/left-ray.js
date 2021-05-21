import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'

const LeftRay = ({ closestItem, draggingBlockPos, builderRef }) => {
  const width = Math.abs(closestItem.diff)
  const leftPos = closestItem.right ? draggingBlockPos.w : -closestItem.diff
  return (
    <Portal containerRef={builderRef}>
      <Box
        pos="absolute"
        left={`${leftPos}px`}
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
    </Portal>
  )
}

export default LeftRay
