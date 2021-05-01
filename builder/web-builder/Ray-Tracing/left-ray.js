import { Box } from '@chakra-ui/layout'

const LeftRay = ({ closestItem, draggingBlockPos }) => {
  const width = closestItem?.right
    ? closestItem.diff - draggingBlockPos.w
    : closestItem.diff
  return (
    <Box
      pos="absolute"
      {...(closestItem.right
        ? { right: `${-closestItem.diff + draggingBlockPos.w}px` }
        : { left: `${-closestItem.diff}px` })}
      zIndex="2"
      bg="green.500"
      width={`${width}px`}
      h="1px"
      flexDir="row"
      d="flex"
      justifyContent="space-between"
    >
      {closestItem.diff && (
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
          <Box textAlign="center">{closestItem.diff}</Box>
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
