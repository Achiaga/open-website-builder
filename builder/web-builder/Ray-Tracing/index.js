import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'

import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import { getIsMidScreen } from './helpers'

import HorizontalRayTracing from './horizontal/horizontal-rays'
import VerticalRayTracing from './vertical/vertical-rays'

export const RayTracing = ({
  width,
  gridColumnWidth,
  blockPostRef: draggingBlock,
  builderRef,
}) => {
  if (!draggingBlock) return null
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)

  const isMidScreen = getIsMidScreen(draggingBlock, width)

  return (
    <Portal id="main-builder" containerRef={builderRef}>
      <HorizontalRayTracing
        layouts={layouts}
        draggingBlock={draggingBlock}
        gridColumnWidth={gridColumnWidth}
        gridRowHeight={gridRowHeight}
      />
      <VerticalRayTracing
        layouts={layouts}
        draggingBlock={draggingBlock}
        gridColumnWidth={gridColumnWidth}
        gridRowHeight={gridRowHeight}
      />
      {isMidScreen && (
        <Box
          pos="absolute"
          left="50%"
          transform="translate(-50%,0)"
          top="0"
          zIndex="9999"
          bg="green.500"
          width="1px"
          h="100%"
        />
      )}
    </Portal>
  )
}
