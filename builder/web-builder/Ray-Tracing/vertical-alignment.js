import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'

const VerticalAlignment = ({ closestItem, draggingBlockPos, builderRef }) => {
  const { right, left } = closestItem
  const topBlock =
    closestItem.y < draggingBlockPos.y ? closestItem : draggingBlockPos
  const lowBlock =
    closestItem.y < draggingBlockPos.y ? draggingBlockPos : closestItem
  const heights = Math.abs(lowBlock.y - topBlock.y + lowBlock.h)
  return (
    <Portal id="main-builder" containerRef={builderRef}>
      {left && (
        <Box
          pos="absolute"
          left={`${closestItem.x}px`}
          top={`${topBlock.y}px`}
          zIndex="2"
          bg="green.500"
          width="2px"
          h={`${heights}px`}
          d="flex"
          justifyContent="space-between"
          fontSize="sm"
          flexDir="column"
        />
      )}
      {right && (
        <Box
          pos="absolute"
          left={`${closestItem.x + closestItem.w}px`}
          top={`${topBlock.y}px`}
          zIndex="2"
          bg="green.500"
          width="2px"
          h={`${heights}px`}
          d="flex"
          justifyContent="space-between"
          fontSize="sm"
          flexDir="column"
        />
      )}
    </Portal>
  )
}

export default VerticalAlignment
