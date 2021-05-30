import { Box } from '@chakra-ui/layout'
import { getAlignment, getIsAlign } from './horizontal-helpers'
import { getVerticalAlignment } from './vertical-helpers'

const XMark = ({ top, bottom, left, right, isEquidistant }) => {
  return (
    <Box
      as="span"
      lineHeight="0"
      pos="absolute"
      {...(top && { top })}
      {...(bottom && { bottom })}
      {...(left && { left })}
      {...(right && { right })}
      fontSize={isEquidistant ? 'sm' : '2xs'}
    >
      x
    </Box>
  )
}

const VerticalXs = ({ withX, distance, isEquidistant }) => {
  const left = isEquidistant ? '-2px' : '-1px'
  return (
    <>
      {withX && distance > 0 && (
        <XMark left={left} top={0} isEquidistant={isEquidistant} />
      )}
      {distance > 0 && (
        <Box
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          color="gray.500"
        >
          {Math.round(distance)}
        </Box>
      )}
      {withX && distance > 0 && (
        <XMark left={left} bottom={0} isEquidistant={isEquidistant} />
      )}
    </>
  )
}
const HorizontalXs = ({ withX, distance, isEquidistant }) => {
  return (
    <>
      {withX && distance > 0 && (
        <Box
          as="span"
          lineHeight="0"
          pos="absolute"
          left={isEquidistant ? '-5px' : '-2px'}
          fontSize={isEquidistant ? 'sm' : '2xs'}
        >
          X
        </Box>
      )}
      {distance > 0 && (
        <Box
          pos="absolute"
          left="50%"
          transform="translateX(-50%)"
          color="gray.500"
        >
          {Math.round(distance)}
        </Box>
      )}
      {withX && distance > 0 && (
        <Box
          as="span"
          lineHeight="0"
          pos="absolute"
          right={isEquidistant ? '-5px' : '-2px'}
          fontSize={isEquidistant ? 'sm' : '2xs'}
        >
          X
        </Box>
      )}
    </>
  )
}

const VerticalRay = ({
  top,
  left,
  height,
  distance,
  widthX,
  width,
  isEquidistant,
}) => {
  return (
    <Box
      zIndex="9999"
      bg={isEquidistant ? 'green.500' : 'blue.500'}
      pos="absolute"
      top={`${top}px`}
      left={`${left}px`}
      height={`${height}px`}
      width={`${width}px`}
    >
      <Box
        d="flex"
        height="100%"
        color={isEquidistant ? 'green.500' : 'red'}
        pos="relative"
      >
        <VerticalXs
          withX={widthX}
          distance={distance}
          isEquidistant={isEquidistant}
        />
      </Box>
    </Box>
  )
}

const AlignmentRay = ({
  top,
  left,
  width,
  height,
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
      height={`${height}px`}
    >
      <Box
        d="flex"
        width="100%"
        color={isEquidistant ? 'green.500' : 'red'}
        pos="relative"
      >
        <HorizontalXs
          withX={widthX}
          distance={distance}
          isEquidistant={isEquidistant}
        />
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
      height={isEquidistant ? 2 : 1}
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
  const commonValues = {
    left: origin.x,
    width: dest.x + dest.w - origin.x,
    isEquidistant,
    height: isEquidistant ? 2 : 1,
  }
  return (
    <>
      {getIsAlign(alignment.center) && (
        <AlignmentRay {...commonValues} top={origin.y + origin.h / 2} />
      )}
      {getIsAlign(alignment.top) && (
        <AlignmentRay {...commonValues} top={origin.y} />
      )}
      {getIsAlign(alignment.bottom) && (
        <AlignmentRay {...commonValues} top={origin.y + origin.h} />
      )}
      {getIsAlign(alignment.bottomTop) && (
        <AlignmentRay {...commonValues} top={origin.y} />
      )}
      {getIsAlign(alignment.topBottom) && (
        <AlignmentRay {...commonValues} top={origin.y + origin.h} />
      )}
    </>
  )
}

// ####################### Vertical Rays
export const VerticalCenterAlignment = ({
  origin,
  index,
  distances,
  blocks,
}) => {
  const dest = blocks[index + 1]
  const distance = Math.round(dest.y - origin.y - origin.h)
  const isEquidistant = distances[distance] > 1
  return (
    <VerticalRay
      top={origin.y + origin.h}
      left={origin.x + origin.w / 2}
      height={distance}
      width={isEquidistant ? 2 : 1}
      distance={distance}
      isEquidistant={isEquidistant}
      widthX
    />
  )
}
export const VerticalSidesAlignment = ({ dragBlock, blocks }) => {
  const copyBlocks = blocks.filter((block) => block.i !== dragBlock.i)
  return copyBlocks.map((block, index) => {
    const [dest, origin] = [block, dragBlock].sort((a, b) => b.y - a.y)
    const alignment = getVerticalAlignment(origin, dest, origin)
    return (
      <VerticalRays
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

const VerticalRays = ({ alignment, dest, origin, isEquidistant }) => {
  const commonValues = {
    top: origin.y,
    height: dest.y + dest.h - origin.y,
    isEquidistant,
    width: isEquidistant ? 2 : 1,
  }
  return (
    <>
      {getIsAlign(alignment.center) && (
        <VerticalRay {...commonValues} left={origin.x + origin.w / 2} />
      )}
      {getIsAlign(alignment.left) && (
        <VerticalRay {...commonValues} left={origin.x} />
      )}
      {getIsAlign(alignment.right) && (
        <VerticalRay {...commonValues} left={origin.x + origin.w} />
      )}
      {getIsAlign(alignment.leftRight) && (
        <AlignmentRay {...commonValues} left={origin.x} />
      )}
      {getIsAlign(alignment.rightLeft) && (
        <AlignmentRay {...commonValues} left={origin.x} />
      )}
    </>
  )
}
