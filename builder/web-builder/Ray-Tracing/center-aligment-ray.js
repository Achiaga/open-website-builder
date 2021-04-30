import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'

function isDragBlockInside(draggingBlockPos, closestItem) {
  return (
    draggingBlockPos.x < closestItem.x + closestItem.w &&
    draggingBlockPos.x > closestItem.x
  )
}

function isDragBlockLeft(draggingBlockPos, closestItem) {
  return draggingBlockPos.x < closestItem.x
}

function getHorizontalLineDim(draggingBlockPos, closestItem) {
  if (isDragBlockInside(draggingBlockPos, closestItem))
    return {
      width: closestItem.w,
      left: closestItem.x,
      inside: true,
    }
  if (isDragBlockLeft(draggingBlockPos, closestItem)) {
    return {
      width: Math.abs(
        draggingBlockPos.x +
          draggingBlockPos.w / 2 -
          (closestItem.x + closestItem.w / 2)
      ),
      left: draggingBlockPos.x + draggingBlockPos.w / 2,
    }
  }
  return {
    width:
      draggingBlockPos.x +
      draggingBlockPos.w / 2 -
      (closestItem.x + closestItem.w / 2),
    left: closestItem.x + closestItem.w / 2,
  }
}

const CenterAligmentRay = ({ draggingBlockPos, closestItem }) => {
  const hrLineDim = getHorizontalLineDim(draggingBlockPos, closestItem)
  console.log(hrLineDim)
  return (
    <Portal id="main-builder">
      {closestItem.middleX && (
        <Box
          pos="absolute"
          left={`${closestItem.w / 2 + closestItem.x}px`}
          top={`${closestItem.y}px`}
          zIndex="2"
          bg="green.500"
          width="1px"
          h={`${closestItem.h}px`}
        />
      )}
      {closestItem.middleY && (
        <Box
          pos="absolute"
          left={`${hrLineDim.left}px`}
          top={`${closestItem.y + closestItem.h / 2}px`}
          zIndex="2"
          bg="green.500"
          width={`${hrLineDim.width}px`}
          h="1px"
          d="flex"
          justifyContent="space-between"
          fontSize="xs"
        >
          <Box textAlign="flex-start" lineHeight="0" color="red.400" ml="-3px">
            x
          </Box>
          {!hrLineDim.inside && (
            <Box textAlign="center" fontSize="xs">
              {Math.round(hrLineDim.width)}
            </Box>
          )}
          <Box textAlign="flex-end" lineHeight="0" color="red.400" mr="-3px">
            x
          </Box>
        </Box>
      )}
    </Portal>
  )
}

export default CenterAligmentRay
