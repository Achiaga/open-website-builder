import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'

function isInsideX(draggingBlockPos, closestItem) {
  return (
    draggingBlockPos.x < closestItem.x + closestItem.w &&
    draggingBlockPos.x > closestItem.x
  )
}
function isInsideY(draggingBlockPos, closestItem) {
  return (
    draggingBlockPos.y < closestItem.y + closestItem.h &&
    draggingBlockPos.y > closestItem.y
  )
}

function isDragBlockInside(draggingBlockPos, closestItem) {
  return (
    isInsideX(draggingBlockPos, closestItem) &&
    isInsideY(draggingBlockPos, closestItem)
  )
}

function isDragBlockLeft(draggingBlockPos, closestItem) {
  return draggingBlockPos.x < closestItem.x
}
function isDragBlockTop(draggingBlockPos, closestItem) {
  return draggingBlockPos.y < closestItem.y
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
function getVerticlaLineDim(draggingBlockPos, closestItem) {
  if (isDragBlockInside(draggingBlockPos, closestItem))
    return {
      top: closestItem.y,
      height: closestItem.h,
      inside: true,
    }
  if (isDragBlockTop(draggingBlockPos, closestItem)) {
    return {
      height:
        closestItem.y +
        closestItem.h / 2 -
        (draggingBlockPos.y + draggingBlockPos.h / 2),
      top: draggingBlockPos.y + draggingBlockPos.h / 2,
    }
  }
  return {
    top: closestItem.y + closestItem.h / 2,
    height:
      draggingBlockPos.y +
      draggingBlockPos.h / 2 -
      (closestItem.y + closestItem.h / 2),
  }
}

const CenterAligmentRay = ({ draggingBlockPos, closestItem }) => {
  const hrLineDim = getHorizontalLineDim(draggingBlockPos, closestItem)
  const vrLineDim = getVerticlaLineDim(draggingBlockPos, closestItem)
  return (
    <Portal id="main-builder">
      {closestItem.middleX && (
        <Box
          pos="absolute"
          left={`${closestItem.w / 2 + closestItem.x}px`}
          top={`${vrLineDim.top}px`}
          zIndex="2"
          bg="green.500"
          width="1px"
          h={`${vrLineDim.height}px`}
          d="flex"
          justifyContent="space-between"
          fontSize="sm"
          flexDir="column"
        >
          {!hrLineDim.inside && (
            <>
              <Box
                textAlign="flex-start"
                lineHeight="0"
                color="red.400"
                ml="-3px"
              >
                x
              </Box>
              <Box textAlign="center" fontSize="xs">
                {Math.round(vrLineDim.height)}
              </Box>
              <Box
                textAlign="flex-end"
                lineHeight="0"
                color="red.400"
                ml="-3px"
              >
                x
              </Box>
            </>
          )}
        </Box>
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
          fontSize="sm"
        >
          {!hrLineDim.inside && (
            <>
              <Box
                textAlign="flex-start"
                lineHeight="0"
                color="red.400"
                ml="-3px"
              >
                x
              </Box>
              <Box textAlign="center" fontSize="xs">
                {Math.round(hrLineDim.width)}
              </Box>
              <Box
                textAlign="flex-end"
                lineHeight="0"
                color="red.400"
                mr="-3px"
              >
                x
              </Box>
            </>
          )}
        </Box>
      )}
    </Portal>
  )
}

export default CenterAligmentRay
