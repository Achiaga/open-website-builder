import { Box } from '@chakra-ui/layout'
import { getAlignment, getIsAlign } from './horizontal-helpers'

const AlignmentRay = ({
  top,
  left,
  width,
  distance,
  widthX,
  isEquidistant,
}) => {
  return (
    <Box
      zIndex="9999"
      bg={isEquidistant ? 'green.500' : 'blue.500'}
      pos="absolute"
      top={`${top}px`}
      left={`${left}px`}
      width={`${width}px`}
      h={isEquidistant ? '2px' : '1px'}
    >
      <Box
        d="flex"
        width="100%"
        color={isEquidistant ? 'green.500' : 'red'}
        pos="relative"
      >
        {widthX && distance > 0 ? (
          <Box
            as="span"
            lineHeight="0"
            letterSpacing="0"
            pos="absolute"
            left={isEquidistant ? '-5px' : '-2px'}
            fontSize={isEquidistant ? 'sm' : '2xs'}
          >
            X
          </Box>
        ) : null}
        {distance > 0 ? (
          <Box
            pos="absolute"
            left="50%"
            transform="translateX(-50%)"
            color="gray.500"
          >
            {Math.round(distance)}
          </Box>
        ) : null}
        {widthX && distance > 0 ? (
          <Box
            as="span"
            lineHeight="0"
            letterSpacing="0"
            pos="absolute"
            right={isEquidistant ? '-5px' : '-2px'}
            fontSize={isEquidistant ? 'sm' : '2xs'}
          >
            X
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export const RayToBlock = ({ origin, index, distances, blocks }) => {
  const dest = blocks[index + 1]
  const distance = Math.round(dest.x - origin.x - origin.w)
  const isEquidistant = distances[distance] > 1
  return (
    <AlignmentRay
      top={origin.y + origin.h / 2}
      left={origin.x + origin.w}
      width={distance}
      distance={distance}
      isEquidistant={isEquidistant}
      widthX
    />
  )
}

export const DragToBlock = ({ dragBlock, blocks }) => {
  const copyBlocks = blocks.filter((block) => block.i !== dragBlock.i)
  return copyBlocks.map((block, index) => {
    const [dest, origin] = [block, dragBlock].sort((a, b) => b.x - a.x)
    const alignment = getAlignment(origin, dest, origin)
    return (
      <HorizontalRays
        alignment={alignment}
        origin={origin}
        dest={dest}
        key={index}
        showCenter={false}
        isEquidistant
      />
    )
  })
}

const HorizontalRays = ({ alignment, dest, origin, isEquidistant }) => {
  return (
    <>
      {getIsAlign(alignment.center) && (
        <AlignmentRay
          top={origin.y + origin.h / 2}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.top) && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.bottom) && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.bottomTop) && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.topBottom) && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
    </>
  )
}
